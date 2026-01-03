import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import GSAPProvider from "./components/GSAPProvider";
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
  metadataBase: new URL("https://bbautista.dev"),
  title: "Billy Bautista | Software Engineer",
  description:
    "Software engineer crafting elegant digital experiences with modern web technologies.",
  keywords: [
    "software engineer",
    "web developer",
    "full stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Billy Bautista" }],
  creator: "Billy Bautista",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bbautista.dev",
    title: "Software Engineer",
    description:
      "Software engineer crafting elegant digital experiences with modern web technologies.",
    siteName: "Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineer",
    description:
      "Software engineer crafting elegant digital experiences with modern web technologies.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
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
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}
