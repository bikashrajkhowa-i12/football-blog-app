import Navbar from "../Navbar";
import AuthPanel from "../auth/AuthPanel";
import Footer from "../Footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <AuthPanel />
      <main className="flex-1 min-h-screen bg-white px-2 md:px-16 py-10 mt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
