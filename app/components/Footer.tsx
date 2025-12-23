"use client";
import {
  ArrowUp,
  ChevronDown,
  Folder,
  Github,
  Linkedin,
  RefreshCw,
  Send,
  Terminal,
  Twitter,
} from "lucide-react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
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

  useEffect(() => {
    if (hasInteracted && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.setSelectionRange(0, 0);
        setTimeout(() => setCursorPosition(0), 0);
      }
    }
    if (step !== "email") {
      setTimeout(() => setEmailError(false), 0);
    }
  }, [step, hasInteracted]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (!inputValue.trim()) return;

    const currentAnswer = inputValue.trim();
    let promptText = "";

    if (step === "email") {
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
      promptText = "Great! And may I know your name?";
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
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setCursorPosition(e.target.selectionStart || 0);
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
    if (step !== "message" && e.key === "Enter") {
      e.preventDefault();
      handleNextStep();
      return;
    }

    if (step === "message" && e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleNextStep();
      return;
    }

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
      className="relative section-padding bg-background py-24 transition-colors duration-300"
    >
      {/* Section Header */}
      {pathname === "/" && (
        <div className="mb-16">
          <span className="section-label mb-4 block">Contact</span>
          <h2 className="section-title text-4xl text-foreground md:text-5xl">
            Let&apos;s get in touch
          </h2>
        </div>
      )}

      {/* Terminal Container */}
      {pathname === "/" && (
        <div className="mx-auto mb-24 w-full max-w-4xl">
          <div className="card overflow-hidden font-mono text-sm leading-normal md:text-[15px]">
            {/* Window Title Bar */}
            <div className="flex h-12 items-center justify-between border-b border-border bg-surface-elevated px-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="pointer-events-none absolute left-0 flex w-full items-center justify-center gap-2 text-xs font-medium text-foreground-subtle">
                <Terminal size={14} />
                <span>contact — zsh</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Terminal Content */}
            <div
              className="min-h-[250px] cursor-text p-5 text-foreground selection:bg-accent/20 selection:text-foreground md:p-6"
              onClick={() => {
                if (window.getSelection()?.toString().length === 0) {
                  setHasInteracted(true);
                  inputRef.current?.focus();
                }
              }}
            >
              {/* Login Message */}
              <div className="mb-4 text-foreground-subtle">
                Last login: {currentTime} on console
              </div>

              {/* History */}
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="mb-4 opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  <div className="mb-2 font-medium text-foreground-subtle">
                    # {item.prompt}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex w-fit items-center gap-2 rounded border border-border bg-surface-elevated px-2 py-1 text-xs text-foreground-muted">
                      <Folder size={12} />
                      <span>~/contact/{item.type}</span>
                    </div>
                    <div className="min-w-0 flex-1 wrap-break-word whitespace-pre-wrap text-foreground">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}

              {/* Current Prompt */}
              {step !== "completed" && (
                <div className="mb-3 font-medium text-foreground">
                  # {step === "email" && "Could you share your email with me?"}
                  {step === "name" && "Great! And may I know your name?"}
                  {step === "message" &&
                    "Awesome, now tell us how we can assist you today."}
                </div>
              )}

              {/* Completed */}
              {step === "completed" && (
                <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <div className="mb-2 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <span className="text-sm">✓</span>
                    </div>
                    <span className="font-semibold">
                      Message sent successfully!
                    </span>
                  </div>
                  <div className="pl-9 text-sm text-foreground-subtle">
                    Process exited with code 0. Session closed.
                  </div>
                  <button
                    onClick={handleCancel}
                    className="group mt-6 flex items-center gap-2 pl-9 font-mono text-xs text-foreground-muted transition-colors hover:text-foreground"
                  >
                    <RefreshCw
                      size={12}
                      className="transition-transform duration-500 group-hover:rotate-180"
                    />
                    <span>./start-new-session.sh</span>
                  </button>
                </div>
              )}
            </div>

            {/* Input Area */}
            {step !== "completed" && (
              <div className="border-t border-border bg-surface-elevated p-5 md:p-6">
                <div className="flex flex-col">
                  {/* Context */}
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex w-fit items-center gap-2 rounded border border-border bg-surface px-2 py-1 text-xs text-foreground-muted">
                      <Folder size={12} />
                      <span>~/contact/{step}</span>
                    </div>
                  </div>

                  {/* Editor */}
                  <div
                    className={`flex w-full flex-col overflow-hidden rounded-lg border transition-all ${
                      emailError
                        ? "border-red-500/50 bg-red-500/5 focus-within:border-red-500"
                        : "border-border bg-background focus-within:border-border-hover"
                    } ${step === "message" ? "min-h-[120px]" : "h-[50px]"}`}
                  >
                    <div className="relative flex-1 p-3">
                      <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onSelect={handleSelectionChange}
                        onMouseUp={handleSelectionChange}
                        onKeyUp={handleSelectionChange}
                        className="absolute inset-0 z-10 h-full w-full cursor-text resize-none p-3 opacity-0"
                        spellCheck={false}
                      />
                      <div className="min-h-[24px] whitespace-pre-wrap wrap-break-word leading-relaxed text-foreground">
                        {inputValue.slice(0, cursorPosition)}
                        <span className="ml-px inline-block h-5 w-0.5 animate-pulse bg-accent align-middle" />
                        {inputValue.slice(cursorPosition)}
                      </div>
                      {!inputValue && (
                        <div className="pointer-events-none absolute left-3 top-3 select-none text-foreground-subtle">
                          {step === "email"
                            ? "john@example.com"
                            : step === "name"
                            ? "John Doe"
                            : "Type your message..."}
                        </div>
                      )}
                    </div>

                    {step === "message" && (
                      <div className="flex items-center justify-between border-t border-border px-3 py-2">
                        <div className="flex items-center gap-2">
                          <button className="rounded p-1 text-foreground-subtle transition-colors hover:bg-border hover:text-foreground">
                            <Terminal size={14} />
                          </button>
                        </div>
                        <button className="flex items-center gap-1.5 rounded border border-border px-2 py-1 text-xs text-foreground-muted transition-colors hover:bg-surface">
                          <span>auto</span>
                          <ChevronDown size={10} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Error */}
                  {emailError && step === "email" && (
                    <div className="mt-2 px-1 font-mono text-xs text-red-500">
                      zsh: invalid email format
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between px-1">
                    <div className="select-none font-sans text-[10px] text-foreground-subtle">
                      {step === "message" ? (
                        <>
                          Press{" "}
                          <span className="mx-0.5 rounded bg-border px-1 py-0.5 text-foreground-muted">
                            ⌘ + Enter
                          </span>{" "}
                          to send
                        </>
                      ) : (
                        <>
                          Press{" "}
                          <span className="mx-0.5 rounded bg-border px-1 py-0.5 text-foreground-muted">
                            Enter
                          </span>{" "}
                          to continue
                        </>
                      )}
                    </div>

                    {step === "message" && (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancel}
                          className="rounded px-3 py-1.5 text-xs text-foreground-muted transition-colors hover:bg-border hover:text-foreground"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleNextStep}
                          className="flex items-center gap-1.5 rounded bg-accent px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-accent-hover"
                        >
                          <Send size={12} />
                          <span>Send</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Bottom */}
      <div className="flex flex-col items-center justify-between gap-8 border-t border-border pt-10 md:flex-row">
        <div className="flex flex-col items-center gap-4 text-xs text-foreground-subtle md:flex-row md:gap-6">
          <span>© {new Date().getFullYear()}</span>
          <span className="hidden h-1 w-1 rounded-full bg-border md:block" />
          <span>Designed by Billy Bautista</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a
              href="#"
              className="text-foreground-subtle transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-foreground-subtle transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-foreground-subtle transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-subtle transition-all hover:border-border-hover hover:bg-surface hover:text-foreground"
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
