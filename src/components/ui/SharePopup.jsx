import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Copy, Check } from "lucide-react";
import useEscapeKey from "@/hooks/useEscapeKey";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

export default function SharePopup({
  isOpen,
  onClose,
  shareUrl = "",
  title = "Check this out",
}) {
  const popupRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const finalShareUrl = useMemo(() => {
    if (shareUrl?.trim()) return shareUrl;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [shareUrl]);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, 150);
  }, [onClose]);

  useEscapeKey(isOpen, triggerClose);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        triggerClose();
      }
    };

    const preventScroll = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen, triggerClose]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setCopied(false);
    }
  }

  if (!isOpen && !isClosing) return null;

  const encodedUrl = encodeURIComponent(finalShareUrl);
  const encodedTitle = encodeURIComponent(title);
  const shareText = encodeURIComponent(`${title} ${finalShareUrl}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(finalShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const shareItems = [
    {
      label: "Facebook",
      icon: (
        <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#1877F2] shadow-sm">
          <FaFacebookF className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </div>
      ),
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      label: "WhatsApp",
      icon: (
        <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] shadow-sm">
          <FaWhatsapp className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
        </div>
      ),
      onClick: () => window.open(`https://wa.me/?text=${shareText}`, "_blank"),
    },
    {
      label: "Instagram",
      icon: (
        <div
          className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full shadow-sm"
          style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
        >
          <FaInstagram className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
        </div>
      ),
      onClick: () => {
        navigator.clipboard.writeText(finalShareUrl);
        window.open("https://www.instagram.com/", "_blank");
      }
    },
    {
      label: "Gmail",
      icon: (
        <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white shadow-sm overflow-hidden">
          <img src="/social-icons/gmail.png" alt="Gmail" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
        </div>
      ),
      onClick: () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
          `${title}\n\n${finalShareUrl}`
        )}`;
      },
    }
  ];

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-0 sm:px-4 pb-0 sm:pb-0 overscroll-contain"
      onClick={triggerClose}
      onWheel={(e) => {
        if (!popupRef.current || !popupRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (!popupRef.current || !popupRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.15s ease-in forwards"
          : "modalBackdropIn 0.15s ease-out",
      }}
    >
      <div
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[360px] overflow-hidden rounded-t-xl sm:rounded-xl border border-white/10 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] p-5 sm:p-6 font-secondary"
        style={{
          animation: isClosing
            ? "modalCardOut 0.15s ease-in forwards"
            : "modalCardIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white tracking-tight">Share</h3>
          <button
            onClick={triggerClose}
            className="cursor-pointer rounded-full p-2 bg-white/5 text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Share Icons */}
        <div className="flex overflow-x-auto gap-5 sm:gap-5 pb-5 pt-1 scrollbar-hide px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          {shareItems.map((item, index) => {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer border-none bg-transparent"
              >
                <div className="transition-all duration-200 group-hover:scale-105 group-active:scale-95">
                  {item.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-white/60 transition-colors duration-200 group-hover:text-white mt-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Copy Link Box */}
        <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-1 pl-4 transition-colors hover:border-white/20">
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide mr-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className="text-xs text-white/80 font-medium">
              {finalShareUrl}
            </span>
          </div>
          <button
            onClick={handleCopyLink}
            aria-label="Copy link"
            className={`shrink-0 cursor-pointer rounded-lg p-2.5 transition-all duration-300 border-none flex items-center justify-center ${copied
              ? "bg-fourth text-white"
              : "bg-white text-black hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}