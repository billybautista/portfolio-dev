"use client";
import {
  ArrowUp,
  Folder,
  Github,
  Linkedin,
  LucideIcon,
  RefreshCw,
  Send,
  Terminal,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Step = "email" | "name" | "message" | "completed";

interface HistoryItem {
  type: Step;
  prompt: string;
  answer: string;
}

interface SocialLink {
  url: string;
  icon: LucideIcon;
  label: string;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    url: "https://github.com/billybautista",
    icon: Github,
    label: "GitHub",
    hoverColor: "hover:text-[#333] dark:hover:text-white",
  },
  {
    url: "https://linkedin.com/in/billy-bautista",
    icon: Linkedin,
    label: "LinkedIn",
    hoverColor: "hover:text-[#0A66C2]",
  },
];

const Footer = () => {
  const pathname = usePathname();
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
    }
    if (step !== "email") {
      setTimeout(() => setEmailError(false), 0);
    }
  }, [step, hasInteracted]);

  // Auto-resize textarea for message step
  useEffect(() => {
    if (step === "message" && inputRef.current) {
      const textarea = inputRef.current as HTMLTextAreaElement;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(40, textarea.scrollHeight)}px`;
    }
  }, [inputValue, step]);

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
  };

  const handleCancel = () => {
    setStep("email");
    setHistory([]);
    setFormData({ email: "", name: "", message: "" });
    setInputValue("");
    setEmailError(false);
    setHasInteracted(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    if (step === "email" && emailError) {
      setEmailError(false);
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
                  className="mb-4 transition-opacity duration-300 hover:opacity-100"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex w-fit items-center gap-2 py-1 text-sm text-[#DB2777] dark:text-[#FF5FFF]">
                      <Folder size={12} />
                      <span>~/contact/{item.type}</span>
                    </div>
                    <div className="font-medium text-sm text-emerald-600 dark:text-[#00FF00]">
                      {item.prompt}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 wrap-break-word whitespace-pre-wrap text-foreground">
                    {item.answer}
                  </div>
                </div>
              ))}

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
              <div className="p-2">
                <div className="rounded-xl border border-border bg-surface-elevated pb-3 pt-4 px-2 md:px-3">
                  <div className="flex flex-col">
                    {/* Context */}
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <div className="flex w-fit items-center gap-2 rounded border border-border bg-surface px-2 py-1 text-xs opacity-80 text-[#DB2777] dark:text-[#FF5FFF]">
                        <Folder size={12} />
                        <span>~/contact/{step}</span>
                      </div>
                      <div className="font-normal text-foreground text-sm">
                        {step === "email" &&
                          "Could you share your email with me?"}
                        {step === "name" && "Great! And may I know your name?"}
                        {step === "message" &&
                          "Awesome, now tell us how we can assist you today."}
                      </div>
                    </div>

                    {/* Editor */}
                    <div
                      className={`flex w-full flex-col overflow-hidden transition-all ${
                        emailError
                          ? "border-red-500/50 bg-red-500/5 focus-within:border-red-500"
                          : "border-none focus-within:border-border-hover"
                      } ${step === "message" ? "" : "h-[50px]"}`}
                    >
                      <div
                        className={`relative ${step === "message" ? "py-3" : "flex-1 flex items-center"}`}
                      >
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          placeholder={
                            step === "email"
                              ? "john@example.com"
                              : step === "name"
                                ? "John Doe"
                                : "Type your message..."
                          }
                          className={`w-full resize-none bg-transparent text-foreground outline-none border-none placeholder:text-foreground-subtle ${
                            step === "message"
                              ? "min-h-[50px]"
                              : "h-full leading-[50px]"
                          }`}
                          spellCheck={false}
                        />
                      </div>
                    </div>

                    {/* Error */}
                    {emailError && step === "email" && (
                      <div className="mt-2 px-1 font-mono text-xs text-red-500">
                        zsh: invalid email format
                      </div>
                    )}

                    {/* Footer */}
                    <div
                      className={`flex items-center ${step === "message" ? "justify-end" : "justify-between"}`}
                    >
                      {step !== "message" && (
                        <div className="flex w-fit items-center gap-2 rounded-md border border-border bg-surface py-1 px-2 text-[10px] text-foreground-muted">
                          Press{" "}
                          <span className="mx-0.5 rounded bg-border px-1 py-0.5 text-foreground-muted">
                            Enter
                          </span>{" "}
                          to continue
                        </div>
                      )}

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
          <div className="flex gap-3">
            {socialLinks.map(({ url, icon: Icon, label, hoverColor }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-subtle transition-all duration-200 hover:scale-110 hover:border-transparent hover:bg-surface-elevated ${hoverColor}`}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
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
