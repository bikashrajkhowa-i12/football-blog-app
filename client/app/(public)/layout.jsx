"use client";

import { useLoader } from "@/contexts/LoaderContext";
import GlobalLoader from "@/components/GlobalLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PublicLayout = ({ children }) => {
  const { loading, prompt } = useLoader();
  return (
    <>
      <GlobalLoader loading={loading} prompt={prompt} />
      <Navbar />
      <main className="flex-1 min-h-screen bg-white px-2 md:px-16 pt-2 pb-10 mt-16">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
