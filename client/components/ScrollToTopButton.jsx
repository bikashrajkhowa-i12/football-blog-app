import { Button } from "./ui/button";

const ScrollToTopButton = () => {
  return (
    <div className="flex justify-end">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="sticky rounded-full text-white bg-black/25 hover:bg-black/30 py-1 px-3 cursor-pointer transition duration-400"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default ScrollToTopButton;
