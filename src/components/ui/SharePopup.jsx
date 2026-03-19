import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Link2,
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
  const [instagramCopied, setInstagramCopied] = useState(false);
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

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      setInstagramCopied(false);
    }
  }, [isOpen]);

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

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(finalShareUrl);
      setInstagramCopied(true);
      setTimeout(() => setInstagramCopied(false), 2000);
      window.open("https://www.instagram.com/", "_blank");
    } catch (error) {
      console.error("Instagram copy failed:", error);
    }
  };

  const shareItems = [
    {
      label: "Email",
      icon: Mail,
      onClick: () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
          `${title}\n\n${finalShareUrl}`
        )}`;
      },
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      onClick: () => window.open(`https://wa.me/?text=${shareText}`, "_blank"),
    },
    {
      label: instagramCopied ? "Link copied for Instagram" : "Instagram",
      icon: Instagram,
      onClick: handleInstagramShare,
    },
    {
      label: "Facebook",
      icon: Facebook,
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      label: copied ? "Copied" : "Copy Link",
      icon: copied ? Check : Link2,
      onClick: handleCopyLink,
    },
  ];

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
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
        className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-third/30 bg-secondary shadow-2xl"
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        <div className="flex items-center justify-between border-b border-third/20 px-4 py-3">
          <h3 className="text-base font-semibold text-primary">Share</h3>
          <button
            onClick={triggerClose}
            className="cursor-pointer rounded-full p-1 text-primary/80 transition hover:bg-primary/10 hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-1">
          {shareItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={item.onClick}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left transition hover:bg-fourth/20"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="text-sm font-medium text-primary">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}