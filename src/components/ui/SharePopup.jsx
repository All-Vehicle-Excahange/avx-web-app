import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  X,
  Check,
} from "lucide-react";

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
    }, 250);
  }, [onClose]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        triggerClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") triggerClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
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
      icon: Facebook,
      bgClass: "bg-[#1877F2]",
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      bgClass: "bg-[#25D366]",
      onClick: () => window.open(`https://wa.me/?text=${shareText}`, "_blank"),
    },
    {
      label: "Instagram",
      icon: Instagram,
      bgClass: "bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
      onClick: () => {
        navigator.clipboard.writeText(finalShareUrl);
        window.open("https://www.instagram.com/", "_blank");
      }
    },
    {
      label: "Email",
      icon: Mail,
      bgClass: "bg-gray-500",
      onClick: () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
          `${title}\n\n${finalShareUrl}`
        )}`;
      },
    }
  ];

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4 pb-0 sm:pb-0"
      onClick={triggerClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[500px] overflow-hidden rounded-t-3xl sm:rounded-2xl border border-third/10 bg-[#212121] shadow-2xl p-6"
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium text-white">Share</h3>
          <button
            onClick={triggerClose}
            className="cursor-pointer rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Share Icons */}
        <div className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          {shareItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer border-none bg-transparent"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full text-white ${item.bgClass} transition-transform duration-300 group-hover:scale-105 shadow-lg`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-[13px] font-medium text-white/90">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Copy Link Box */}
        <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-1 pl-4">
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide mr-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className="text-sm text-white/90 font-medium">
              {finalShareUrl}
            </span>
          </div>
          <button
            onClick={handleCopyLink}
            className="shrink-0 cursor-pointer rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors border-none"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}