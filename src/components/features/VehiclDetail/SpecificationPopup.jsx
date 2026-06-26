"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
  Zap,
  Activity,
  Ruler,
  Coffee,
  Music,
  Shield,
  Info,
  Car,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getVehicleSpecificationQuery } from "@/queries/vehicle.queries";

export default function SpecificationPopup({ open, onClose, variantId }) {
  const [activeTab, setActiveTab] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef(null);

  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("engine") || cat.includes("transmission"))
      return <Settings size={16} />;
    if (
      cat.includes("performance") ||
      cat.includes("motor") ||
      cat.includes("battery")
    )
      return <Zap size={16} />;
    if (
      cat.includes("suspension") ||
      cat.includes("brake") ||
      cat.includes("steering") ||
      cat.includes("tyre") ||
      cat.includes("wheel")
    )
      return <Activity size={16} />;
    if (
      cat.includes("dimension") ||
      cat.includes("weight") ||
      cat.includes("capacity")
    )
      return <Ruler size={16} />;
    if (
      cat.includes("comfort") ||
      cat.includes("interior") ||
      cat.includes("seat") ||
      cat.includes("convenience")
    )
      return <Coffee size={16} />;
    if (
      cat.includes("entertainment") ||
      cat.includes("audio") ||
      cat.includes("communication")
    )
      return <Music size={16} />;
    if (cat.includes("safety") || cat.includes("security"))
      return <Shield size={16} />;
    if (cat.includes("exterior")) return <Car size={16} />;
    return <Info size={16} />;
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup (important!)
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClose]);

  const { data, isLoading } = useQuery({
    ...getVehicleSpecificationQuery(variantId),
    enabled: open && !!variantId,
  });

  const specData = data?.specifications || {};
  const categories = Object.keys(specData);

  useEffect(() => {
    if (
      categories.length > 0 &&
      (!activeTab || !categories.includes(activeTab))
    ) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  const isClickingRef = useRef(false);

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabs-container");
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToCategory = (category) => {
    isClickingRef.current = true;
    setActiveTab(category);
    const element = document.getElementById(`spec-category-${category}`);
    if (element) {
      // scroll to the element smoothly
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        isClickingRef.current = false;
      }, 800);
    }
  };

  const handleContentScroll = (e) => {
    if (isClickingRef.current || categories.length === 0) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // If scrolled to the bottom (with a tiny 5px margin of error)
    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5) {
      const lastCategory = categories[categories.length - 1];
      if (activeTab !== lastCategory) {
        setActiveTab(lastCategory);
        const tabElement = document.getElementById(`tab-button-${lastCategory}`);
        if (tabElement) {
          tabElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      }
    }
  };

  useEffect(() => {
    if (!open || categories.length === 0 || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const category = entry.target.id.replace("spec-category-", "");
            setActiveTab(category);

            const tabElement = document.getElementById(
              `tab-button-${category}`,
            );
            if (tabElement) {
              tabElement.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }
          }
        });
      },
      {
        root: document.getElementById("scrollable-spec-content"),
        rootMargin: "-20% 0px -75% 0px",
        threshold: 0,
      },
    );

    categories.forEach((cat) => {
      const el = document.getElementById(`spec-category-${cat}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [open, categories, isLoading]);

  if (!open && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* MODAL */}
      <div
        ref={popupRef}
        className="w-full max-w-5xl h-[75vh] bg-secondary rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-third/30"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
          <h2 className="text-lg font-bold text-primary">
            Vehicle Specifications
          </h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 hover:bg-primary/10 hover:text-primary cursor-pointer bg-primary transition-all duration-300 ease-in-out text-secondary"
          >
            <X size={18} />
          </button>
        </div>

        {/* ARROWS (BELOW CLOSE, ABOVE CHIPS) */}
        <div className="flex justify-end px-5 pb-2 shrink-0">
          <div className="flex items-center gap-1.5 z-10">
            <button
              onClick={() => scrollTabs("left")}
              className="w-7 h-7 flex items-center justify-center bg-secondary rounded-full shadow-md text-primary/70 hover:text-primary border border-third/30 cursor-pointer transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollTabs("right")}
              className="w-7 h-7 flex items-center justify-center bg-secondary rounded-full shadow-md text-primary/70 hover:text-primary border border-third/30 cursor-pointer transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* HORIZONTAL TABS */}
        <div className="border-b border-white/5 shrink-0 flex items-center w-full">
          <div
            id="tabs-container"
            className="flex-1 flex items-center gap-2 px-5 pb-3 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {isLoading ? (
              <div className="text-sm text-primary/60 px-2">
                Loading categories...
              </div>
            ) : categories.length === 0 ? null : (
              categories.map((tab) => (
                <button
                  key={tab}
                  id={`tab-button-${tab}`}
                  onClick={() => scrollToCategory(tab)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab
                      ? "bg-primary text-secondary"
                      : "bg-third/10 text-primary/70 hover:bg-third/20 hover:text-primary"
                  }`}
                >
                  {getCategoryIcon(tab)}
                  {tab}
                </button>
              ))
            )}
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div
          id="scrollable-spec-content"
          className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8"
          onScroll={handleContentScroll}
        >
          {isLoading ? (
            <div className="text-sm text-primary/60 flex items-center justify-center h-full">
              Loading specifications...
            </div>
          ) : categories.length === 0 ? (
            <div className="text-sm text-primary/60 flex items-center justify-center h-full">
              No specifications found
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category}
                id={`spec-category-${category}`}
                className="space-y-4 pt-2"
              >
                <h3 className="text-lg font-bold text-primary pb-2 flex items-center gap-2">
                  <span className="text-primary/70">
                    {getCategoryIcon(category)}
                  </span>
                  {category}
                </h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {Object.entries(specData[category]).map(
                    ([key, value], index) => (
                      <li key={index} className="flex items-start gap-3 pb-3">
                        <span className="flex h-5 w-5 mt-0.5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <Check size={12} className="text-primary/80" />
                        </span>
                        <div className="flex flex-col text-sm text-primary flex-1">
                          <span className="font-semibold text-primary/80">
                            {key}
                          </span>
                          <span className="text-primary mt-0.5">{value}</span>
                        </div>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
