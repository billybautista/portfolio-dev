"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto px-6 md:px-[60px] w-full h-16 2xl:px-[200px]">
        <div className="flex justify-between items-center bg-transparent px-6 md:px-12 border-zinc-200 dark:border-zinc-800 h-full transition-colors duration-300">
          {/* Minimalist Logo */}
          <div
            className="group flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="font-serif font-bold text-black dark:text-white text-2xl italic tracking-tight transition-colors duration-300">
              bbautista
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="font-medium text-zinc-600 dark:hover:text-white dark:text-zinc-400 text-base transition-colors"
            >
              home
            </Link>
            <Link
              href="#about"
              className="font-medium text-zinc-600 dark:hover:text-white dark:text-zinc-400 text-base transition-colors"
            >
              about
            </Link>
            <Link
              href="#work"
              className="font-medium text-zinc-600 dark:hover:text-white dark:text-zinc-400 text-base transition-colors"
            >
              work
            </Link>

            <div className="flex items-center gap-4 pl-6 border-zinc-200 dark:border-zinc-800 border-l">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Pill CTA Button */}
              <Link
                href="#contact"
                className="bg-black dark:bg-white shadow-sm px-7 py-2.5 rounded-full font-semibold text-white dark:text-black text-sm transition-opacity"
              >
                contact
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden z-50 relative text-zinc-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
