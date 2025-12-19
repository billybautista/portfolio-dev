import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import Footer from "./components/Footer";
import GSAPProvider from "./components/GSAPProvider";
import Navbar from "./components/Navbar";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Billy Bautista | Software Engineer",
  description:
    "Software engineer crafting elegant digital experiences with modern web technologies.",
};

const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="notranslate"
      translate="no"
    >
      <head>
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${outfit.variable} ${syne.variable} antialiased bg-background text-foreground`}
      >
        <GSAPProvider>
          <Navbar />
          <main className="min-h-screen mx-auto w-full">
            <div className="bg-background min-h-screen transition-colors duration-400">
              {children}
              <Footer />
            </div>
          </main>
        </GSAPProvider>
      </body>
    </html>
  );
}
