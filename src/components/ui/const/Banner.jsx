import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Button from "../button";
import { useRouter } from "next/router";

export default function Banner({ title, description, buttonText, navigationPath }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/consult");
  };

  return (
    // Height and layout classes removed/adjusted to fit parent
    <div className="relative w-full h-full 3xl:max-w-screen-2xl mx-auto flex items-center">
      {/* Dark Overlay for text readability - Kept here to ensure text pops */}
      {/* <div className="absolute inset-0 bg-black/60" /> */}

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        <Button href={`${navigationPath}`} onClick={handleClick} variant="ghost">{buttonText}</Button>
      </div>
    </div>
  );
}
