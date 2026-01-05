import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { LanguageProvider } from "../context/LanguageContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="mx-auto w-full">
        <div className="bg-background transition-colors duration-400">
          {children}
          <Footer />
        </div>
      </main>
    </LanguageProvider>
  );
}
