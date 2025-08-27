import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-white text-md flex justify-center gap-3 px-4 py-2 rounded-lg shadow-lg opacity-70 cursor-pointer
                    hover:opacity-80 hover:bg-gray-300 active:opacity-100 active:bg-gray-300 transition duration-300`}
    >
      <FcGoogle className="text-[22px] mt-[3.6px]" /> Continue with Google
    </button>
  );
};

export default GoogleButton;
