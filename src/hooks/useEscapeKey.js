import { useEffect } from "react";

/**
 * Custom hook to listen for Escape (Esc) key press to close modals/popups.
 * 
 * @param {boolean} isOpen - Whether the popup/modal is currently open.
 * @param {Function} onClose - The close callback function to invoke when Esc is pressed.
 */
export function useEscapeKey(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen || typeof onClose !== "function") return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
}

export default useEscapeKey;
