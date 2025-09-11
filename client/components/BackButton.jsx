import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="top-0 left-0 flex gap-2 text-base text-gray-500 mb-8 cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLeft /> Back
    </div>
  );
};

export default BackButton;
