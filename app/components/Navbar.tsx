"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Work", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionElementsRef = useRef<
    Map<string, { element: HTMLElement; ratio: number }>
  >(new Map());

  useEffect(() => {
    // Use Intersection Observer for accurate section detection
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!id) return;

        if (entry.isIntersecting) {
          sectionElementsRef.current.set(id, {
            element: entry.target as HTMLElement,
            ratio: entry.intersectionRatio,
          });
        } else {
          const existing = sectionElementsRef.current.get(id);
          if (existing) {
            sectionElementsRef.current.set(id, {
              ...existing,
              ratio: 0,
            });
          }
        }

        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let activeId = "";

        sectionElementsRef.current.forEach((value, key) => {
          if (value.ratio > maxRatio) {
            maxRatio = value.ratio;
            activeId = key;
          }
        });

        // If no section is significantly visible, check scroll position for home
        if (maxRatio < 0.1 && window.scrollY < 300) {
          setActiveSection("home");
        } else if (activeId) {
          setActiveSection(activeId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    const observeSections = () => {
      navLinks.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Initial setup with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      observeSections();
      // Set initial active section
      if (window.scrollY < 300) {
        setActiveSection("home");
      }
    }, 100);

    // Also handle scroll to top for home section
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-300">
        <div className="section-padding mx-auto w-full">
          <div className="grid h-16 w-full grid-cols-2 items-center lg:grid-cols-3">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="font-display text-xl font-bold tracking-tight text-foreground transition-colors">
                billy<span className="text-foreground-subtle">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center justify-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive =
                  (link.id === "home" && activeSection === "home") ||
                  (link.id !== "home" && activeSection === link.id);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-foreground transition-all duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center justify-end gap-2">
              <LanguageSelector />
              <ThemeToggle />

              {/* CTA Button - Desktop */}
              <Link
                href="#contact"
                className="hidden lg:flex btn-primary items-center gap-2"
              >
                Let&apos;s Talk
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => {
            const isActive =
              (link.id === "home" && activeSection === "home") ||
              (link.id !== "home" && activeSection === link.id);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative font-display text-3xl font-bold transition-all duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                } ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50 + 100}ms` }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-foreground transition-all duration-300" />
                )}
              </Link>
            );
          })}
          <Link
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`btn-primary mt-4 transition-all duration-300 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </>
  );
}
