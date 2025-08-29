import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-white px-2 md:px-16 py-10 mt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
