"use client";
import {
  ArrowUp,
  AtSign,
  ChevronDown,
  Folder,
  Github,
  Image,
  Linkedin,
  Mic,
  RefreshCw,
  Send,
  Terminal,
  Twitter,
  Type,
} from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type Step = "email" | "name" | "message" | "completed";

interface HistoryItem {
  type: Step;
  prompt: string;
  answer: string;
}

function getThemeSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function subscribeToTheme(callback: () => void): () => void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        callback();
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
  return () => observer.disconnect();
}

function getServerSnapshot(): boolean {
  return false;
}

const Footer = () => {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerSnapshot
  );
  const theme = isDark ? "dark" : "light";
  const [step, setStep] = useState<Step>("email");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [currentTime, setCurrentTime] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    // Format: Sat Nov 29 18:55:32
    const updateTime = () => {
      const date = new Date();
      const dateString = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const timeString = date.toLocaleTimeString("en-US", { hour12: false });
      setCurrentTime(`${dateString} ${timeString}`);
    };
    updateTime();
  }, []);

  // Focus input when step changes (only after user has interacted)
  useEffect(() => {
    if (hasInteracted && inputRef.current) {
      inputRef.current.focus();
      // Reset cursor position when step changes
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.setSelectionRange(0, 0);
        // Use setTimeout to avoid setState in effect warning
        setTimeout(() => setCursorPosition(0), 0);
      }
    }
    // Reset email error when step changes
    if (step !== "email") {
      setTimeout(() => setEmailError(false), 0);
    }
  }, [step, hasInteracted]);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (!inputValue.trim()) return;

    const currentAnswer = inputValue.trim();
    let promptText = "";

    if (step === "email") {
      // Validate email
      if (!validateEmail(currentAnswer)) {
        setEmailError(true);
        return;
      }
      setEmailError(false);
      promptText = "Could you share your email with me?";
      setFormData((prev) => ({ ...prev, email: currentAnswer }));
      setHistory((prev) => [
        ...prev,
        { type: "email", prompt: promptText, answer: currentAnswer },
      ]);
      setStep("name");
    } else if (step === "name") {
      promptText = "Great! And may i know your name?";
      setFormData((prev) => ({ ...prev, name: currentAnswer }));
      setHistory((prev) => [
        ...prev,
        { type: "name", prompt: promptText, answer: currentAnswer },
      ]);
      setStep("message");
    } else if (step === "message") {
      promptText = "Awesome, now tell us how we can assist you today.";
      setFormData((prev) => ({ ...prev, message: currentAnswer }));
      setHistory((prev) => [
        ...prev,
        { type: "message", prompt: promptText, answer: currentAnswer },
      ]);
      setStep("completed");
      console.log("Form Submitted:", { ...formData, message: currentAnswer });
    }

    setInputValue("");
    setCursorPosition(0);
  };

  const handleCancel = () => {
    setStep("email");
    setHistory([]);
    setFormData({ email: "", name: "", message: "" });
    setInputValue("");
    setCursorPosition(0);
    setEmailError(false);
    setHasInteracted(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Mark as interacted when user starts typing
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    // Update cursor position
    setCursorPosition(e.target.selectionStart || 0);
    // Clear error when user starts typing again
    if (step === "email" && emailError) {
      setEmailError(false);
    }
  };

  const handleSelectionChange = () => {
    if (inputRef.current && inputRef.current instanceof HTMLTextAreaElement) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter for single-line inputs (email, name)
    if (step !== "message" && e.key === "Enter") {
      e.preventDefault();
      handleNextStep();
      return;
    }

    // For message step:
    // Allow Enter to create new line (default behavior)
    // Submit only on Ctrl+Enter or Cmd+Enter
    if (step === "message" && e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleNextStep();
      return;
    }

    // Update cursor position after arrow key navigation
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      setTimeout(() => {
        if (
          inputRef.current &&
          inputRef.current instanceof HTMLTextAreaElement
        ) {
          setCursorPosition(inputRef.current.selectionStart || 0);
        }
      }, 0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#FDFBF7] dark:bg-black px-6 md:px-12 py-20  transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="mb-16 md:text-left text-center">
        <h2 className="mb-4 font-mono text-zinc-500 text-sm uppercase tracking-widest">
          Contact
        </h2>
        <p className="font-light text-black dark:text-white text-4xl md:text-5xl transition-colors duration-300">
          Lets get in touch
        </p>
      </div>

      {/* Realistic Terminal Container */}
      <div className="mx-auto mb-24 w-full max-w-4xl">
        <div
          className={`${
            theme === "dark"
              ? "bg-[#1e1e1e] border-zinc-800 ring-white/5"
              : "bg-zinc-100 border-zinc-300 ring-black/5"
          } rounded-3xl shadow-2xl overflow-hidden border font-mono text-sm md:text-[15px] leading-normal ring-1`}
        >
          {/* Window Title Bar */}
          <div
            className={`${
              theme === "dark"
                ? "bg-[#2a2a2a] border-black/50"
                : "bg-zinc-200 border-zinc-300/50"
            } h-10 px-4 flex items-center justify-between border-b`}
          >
            <div className="flex gap-2">
              <div className="bg-[#FF5F56] border border-[#E0443E] rounded-full w-3 h-3"></div>
              <div className="bg-[#FFBD2E] border border-[#DEA123] rounded-full w-3 h-3"></div>
              <div className="bg-[#27C93F] border border-[#1AAB29] rounded-full w-3 h-3"></div>
            </div>
            <div
              className={`${
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              } text-xs font-medium flex items-center justify-center gap-2 opacity-80 w-full absolute left-0 pointer-events-none`}
            >
              <Folder
                size={14}
                className={`${
                  theme === "dark"
                    ? "text-blue-400 fill-blue-400/20"
                    : "text-blue-600 fill-blue-600/20"
                }`}
              />
              <span>Contact Form — -zsh — 80x24</span>
            </div>
            <div className="w-12"></div> {/* Spacer for balance */}
          </div>

          {/* Terminal Content - Scrollable Area */}
          <div
            className={`p-4 md:p-5 min-h-[250px] cursor-text ${
              theme === "dark"
                ? "text-zinc-300 selection:bg-blue-500/30 selection:text-white"
                : "text-zinc-800 selection:bg-blue-500/30 selection:text-white"
            }`}
            onClick={() => {
              // Only focus input if clicking empty space and not selecting text
              if (window.getSelection()?.toString().length === 0) {
                setHasInteracted(true);
                inputRef.current?.focus();
              }
            }}
          >
            {/* Login Message */}
            <div
              className={`mb-2 ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Last login: {currentTime} on console
            </div>

            {/* Interaction History */}
            {history.map((item, idx) => (
              <div
                key={idx}
                className="opacity-70 hover:opacity-100 mb-4 transition-opacity duration-300"
              >
                {/* Previous Prompt */}
                <div
                  className={`${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  } mb-2 font-medium`}
                >
                  # {item.prompt}
                </div>

                {/* Frozen Editor State for History */}
                <div className="w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className={`${
                        theme === "dark"
                          ? "bg-[#2a2a2a] border-zinc-700/50 text-zinc-300"
                          : "bg-zinc-200 border-zinc-300 text-zinc-700"
                      } border rounded text-xs px-2 py-1 flex items-center gap-2 w-fit select-none`}
                    >
                      <Folder size={12} />
                      <span>~/contact/{item.type}</span>
                    </div>
                    <div
                      className={`${
                        theme === "dark" ? "text-zinc-300" : "text-zinc-800"
                      } whitespace-pre-wrap wrap-break-word flex-1 min-w-0`}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Current Prompt - Only show if not completed */}
            {step !== "completed" && (
              <div
                className={`${
                  theme === "dark" ? "text-zinc-200" : "text-zinc-900"
                } mb-3 font-medium`}
              >
                # {step === "email" && "Could you share your email with me?"}
                {step === "name" && "Great! And may i know your name?"}
                {step === "message" &&
                  "Awesome, now tell us how we can assist you today."}
              </div>
            )}

            {/* Completed Message */}
            {step === "completed" && (
              <div
                className={`mt-6 animate-in fade-in duration-500 p-4 border rounded-lg ${
                  theme === "dark"
                    ? "border-green-900/30 bg-green-950/10"
                    : "border-green-300 bg-green-50"
                }`}
              >
                <div
                  className={`flex items-center gap-3 ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  } mb-2`}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${
                      theme === "dark" ? "bg-green-500/20" : "bg-green-500/30"
                    } flex items-center justify-center`}
                  >
                    <span className="text-sm">✔</span>
                  </div>
                  <span className="font-semibold">
                    {"Message sent successfully!"}
                  </span>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                  } text-sm pl-9`}
                >
                  Process exited with code 0. Session closed.
                </div>
                <button
                  onClick={handleCancel}
                  className={`flex items-center gap-2 ${
                    theme === "dark"
                      ? "text-zinc-400 hover:text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  } hover:underline transition-all text-xs mt-6 pl-9 group font-mono`}
                >
                  <RefreshCw
                    size={12}
                    className="group-hover:rotate-180 transition-transform duration-500"
                  />
                  <span>./start-new-session.sh</span>
                </button>
              </div>
            )}
          </div>

          {/* Fixed Input Area at Bottom */}
          {step !== "completed" && (
            <div
              className={`border-t ${
                theme === "dark"
                  ? "border-zinc-800 bg-[#1a1a1a]"
                  : "border-zinc-300 bg-zinc-50"
              } p-4 md:p-5`}
            >
              <div className="slide-in-from-bottom-2 flex flex-col animate-in duration-500 fade-in">
                {/* Context Pill */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`${
                      theme === "dark"
                        ? "bg-[#2a2a2a] border-zinc-700/50 text-zinc-300"
                        : "bg-zinc-200 border-zinc-300 text-zinc-700"
                    } border rounded text-xs px-2 py-1 flex items-center gap-2 w-fit`}
                  >
                    <Folder size={12} />
                    <span>~/contact/{step}</span>
                  </div>
                </div>

                {/* Editor Container */}
                <div
                  className={`w-full border rounded-lg overflow-hidden flex flex-col transition-all ${
                    emailError
                      ? theme === "dark"
                        ? "border-red-500/50 bg-red-950/20 focus-within:border-red-500 focus-within:bg-red-950/30"
                        : "border-red-500/70 bg-red-50 focus-within:border-red-500 focus-within:bg-red-100"
                      : theme === "dark"
                      ? "bg-black/40 border-zinc-700/50 focus-within:border-zinc-500 focus-within:bg-black/60"
                      : "bg-white/60 border-zinc-300 focus-within:border-zinc-400 focus-within:bg-white/80"
                  } ${step === "message" ? "min-h-[120px]" : "h-[50px]"}`}
                >
                  {/* Input Area */}
                  <div className="relative flex-1 p-3">
                    <textarea
                      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onSelect={handleSelectionChange}
                      onMouseUp={handleSelectionChange}
                      onKeyUp={handleSelectionChange}
                      className="z-10 absolute inset-0 opacity-0 p-3 w-full h-full resize-none cursor-text"
                      spellCheck={false}
                    />
                    <div
                      className={`${
                        theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                      } whitespace-pre-wrap wrap-break-word leading-relaxed min-h-[24px]`}
                    >
                      {inputValue.slice(0, cursorPosition)}
                      <span
                        className={`inline-block w-0.5 h-5 ${
                          theme === "dark" ? "bg-blue-400" : "bg-blue-600"
                        } animate-pulse align-middle ml-px shadow-[0_0_8px_rgba(96,165,250,0.8)]`}
                      ></span>
                      {inputValue.slice(cursorPosition)}
                    </div>
                    {!inputValue && (
                      <div
                        className={`absolute top-3 left-3 ${
                          theme === "dark" ? "text-zinc-600" : "text-zinc-400"
                        } pointer-events-none select-none`}
                      >
                        {step === "email"
                          ? "jhon@gmail.com"
                          : step === "name"
                          ? "John Doe"
                          : "Type your message..."}
                      </div>
                    )}
                  </div>

                  {/* Toolbar - Only for message step */}
                  {step === "message" && (
                    <div
                      className={`px-3 py-2 border-t ${
                        theme === "dark" ? "border-zinc-800" : "border-zinc-200"
                      } flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          className={`p-1 rounded hover:bg-zinc-700/20 transition-colors ${
                            theme === "dark"
                              ? "text-zinc-400 hover:text-zinc-200"
                              : "text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          <Terminal size={14} />
                        </button>
                        <button
                          className={`p-1 rounded hover:bg-zinc-700/20 transition-colors ${
                            theme === "dark"
                              ? "text-zinc-400 hover:text-zinc-200"
                              : "text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          <Type size={14} />
                        </button>
                        <button
                          className={`p-1 rounded hover:bg-zinc-700/20 transition-colors ${
                            theme === "dark"
                              ? "text-zinc-400 hover:text-zinc-200"
                              : "text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          <Mic size={14} />
                        </button>
                        <button
                          className={`p-1 rounded hover:bg-zinc-700/20 transition-colors ${
                            theme === "dark"
                              ? "text-zinc-400 hover:text-zinc-200"
                              : "text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          <AtSign size={14} />
                        </button>
                        <button
                          className={`p-1 rounded hover:bg-zinc-700/20 transition-colors ${
                            theme === "dark"
                              ? "text-zinc-400 hover:text-zinc-200"
                              : "text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          <Image size={14} />
                        </button>
                      </div>

                      <button
                        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs border ${
                          theme === "dark"
                            ? "border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                            : "border-zinc-300 text-zinc-600 hover:bg-zinc-100"
                        } transition-colors`}
                      >
                        <span>auto (responsive)</span>
                        <ChevronDown size={10} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {emailError && step === "email" && (
                  <div
                    className={`mt-2 px-3 text-xs ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    } font-mono`}
                  >
                    zsh: invalid email format
                  </div>
                )}

                {/* Footer Hint & Buttons */}
                <div className="flex justify-between items-center mt-3 px-1">
                  <div
                    className={`text-[10px] ${
                      theme === "dark" ? "text-zinc-600" : "text-zinc-500"
                    } font-sans select-none`}
                  >
                    {step === "message" ? (
                      <>
                        Press{" "}
                        <span
                          className={`px-1 py-0.5 ${
                            theme === "dark"
                              ? "bg-zinc-800 text-zinc-400"
                              : "bg-zinc-200 text-zinc-600"
                          } rounded mx-0.5`}
                        >
                          ⌘ + Enter
                        </span>{" "}
                        to send
                      </>
                    ) : (
                      <>
                        Press{" "}
                        <span
                          className={`px-1 py-0.5 ${
                            theme === "dark"
                              ? "bg-zinc-800 text-zinc-400"
                              : "bg-zinc-200 text-zinc-600"
                          } rounded mx-0.5`}
                        >
                          Enter
                        </span>{" "}
                        to continue
                      </>
                    )}
                  </div>

                  {/* Buttons only visible for Message step */}
                  {step === "message" && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="hover:bg-zinc-800 px-3 py-1.5 rounded text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
                      >
                        {"Cancel"}
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 shadow-blue-900/20 shadow-lg px-3 py-1.5 rounded font-medium text-white text-xs transition-colors"
                      >
                        <Send size={12} />
                        <span>{"Send"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex md:flex-row flex-col justify-between items-center gap-8 pt-10">
        <div className="flex md:flex-row flex-col items-center gap-6 font-mono text-zinc-500 dark:text-zinc-600 text-xs uppercase tracking-wider">
          <span>© 2024 </span>
          <span className="hidden md:block bg-zinc-300 dark:bg-zinc-800 rounded-full w-1 h-1"></span>
          <span>{"Designed by Billy Bautista"}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-zinc-400 dark:text-zinc-600">
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 ml-4 border border-zinc-200 dark:border-zinc-800 rounded-full w-10 h-10 text-zinc-400 hover:text-black dark:hover:text-white transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
