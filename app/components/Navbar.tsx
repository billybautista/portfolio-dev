"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
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
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-display text-3xl font-bold text-foreground transition-all duration-300 hover:text-foreground-muted ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50 + 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
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
