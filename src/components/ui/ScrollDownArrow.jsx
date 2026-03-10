import { ChevronDown } from "lucide-react";

/**
 * Floating blue arrow button (bottom-right) that scrolls down
 * by one full viewport height on each click.
 */
export default function ScrollDownArrow() {
    const handleClick = () => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Scroll down"
            className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-blue-600 hover:bg-blue-700
        text-white shadow-lg
        transition-all duration-300
        cursor-pointer
        hover:scale-110
        animate-bounce
      "
        >
            <ChevronDown size={24} />
        </button>
    );
}
