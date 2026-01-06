import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full">
        <div className="bg-background transition-colors duration-400">
          {children}
          <Footer />
        </div>
      </main>
    </>
  );
}
