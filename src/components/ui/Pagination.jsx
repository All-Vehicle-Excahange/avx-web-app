import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    return (
        <div className="col-span-full flex justify-center mt-6">
            <div className="flex items-center gap-4 bg-transparent border border-white/20 rounded-full px-1 py-1 shadow-lg">

                {/* Previous */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`flex items-center cursor-pointer justify-center w-10 h-10 rounded-full transition-all duration-200 border
            ${currentPage <= 1
                            ? "bg-transparent text-gray-500 border-gray-600 cursor-not-allowed"
                            : "bg-transparent text-white border-white/30 hover:bg-white hover:text-black"
                        }`}
                    aria-label="Previous page"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Page Info */}
                <span className="text-white font-medium text-sm sm:text-base min-w-[80px] text-center">
                    {currentPage} of {totalPages}
                </span>

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`flex items-center cursor-pointer justify-center w-10 h-10 rounded-full transition-all duration-200 border
            ${currentPage >= totalPages
                            ? "bg-black text-gray-500 border-gray-600 cursor-not-allowed"
                            : "bg-white text-black border-white hover:bg-transparent hover:text-white hover:border-white/30"
                        }`}
                    aria-label="Next page"
                >
                    <ChevronRight size={18} />
                </button>

            </div>
        </div>
    );
}
