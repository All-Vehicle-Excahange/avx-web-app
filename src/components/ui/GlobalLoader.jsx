export default function GlobalLoader({ isLoading }) {
    return (
        <div
            className={`
        fixed inset-0 z-9999 
        flex items-center justify-center
        bg-black/80 backdrop-blur-md
        transition-opacity duration-300
        ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        >
            {/* Spinner */}
            <div className="loader">
                {/* <div className="h-16 w-16 rounded-full border-4 border-fourth border-t-transparent animate-spin"></div> */}


            </div>
        </div>
    );
}
