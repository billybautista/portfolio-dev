import { LanguageProvider } from "../context/LanguageContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen mx-auto w-full">
        <div className="bg-background min-h-screen transition-colors duration-400">
          {children}
          <Footer />
        </div>
      </main>
    </LanguageProvider>
  );
}

