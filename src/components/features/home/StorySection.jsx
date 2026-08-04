"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AppDownloadButtons from "@/components/ui/AppDownloadButtons";

// Story Card Component
const StoryCard = ({ story, data }) => {
  const currentStory = story || data;
  return (
    <div className="relative rounded-2xl overflow-hidden h-[450px] group cursor-pointer border border-white/10 shadow-2xl flex-shrink-0 w-[320px] sm:w-[340px]">
      {/* Background Image */}
      <Image
        src={currentStory.image}
        alt={currentStory.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-fourth text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 shadow-lg">
            {currentStory.category}
          </span>
        </div>
        <p className="text-white/95 text-sm md:text-base italic mb-4 leading-relaxed font-medium line-clamp-4">
          &quot;{currentStory.description}&quot;
        </p>
        <div className="pt-4 border-t border-white/20">
          <h3 className="text-xl font-bold text-fourth mb-0.5">
            {currentStory.title}
          </h3>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
            {currentStory.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function StorySection() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handlePlayStoreClick = (e) => {
    e.preventDefault();
    if (isMobile) {
      window.open(
        "https://play.google.com/store/apps/details?id=com.reecomm.vehicle.marketplace&pcampaignid=web_share",
        "_blank"
      );
    } else {
      router.push("/download");
    }
  };

  const handleAppStoreClick = (e) => {
    e.preventDefault();
    if (isMobile) {
      window.open("https://apps.apple.com/in/app/reecomm/id6789502528", "_blank");
    } else {
      router.push("/download");
    }
  };

  // Drag state refs (no re-renders)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const stories = [
    {
      id: 1,
      title: "Karan Mehta",
      description:
        "I was nervous about buying a used car online — but the Reecomm inspection report gave me all the confidence I needed. Bought a 2021 Swift in Ahmedabad, zero surprises.",
      image: "/card1.webp",
      subtitle: "28 · First-time car buyer · Ahmedabad",
      category: "Buyer",
    },
    {
      id: 2,
      title: "Sneha Patil",
      description:
        "A dealer offered me ₹2.5 lakh less than what I got on Reecomm. The platform brought serious buyers directly to me — no spam, no wasted weekends.",
      image: "/card2.webp",
      subtitle: "34 · Sold her Honda City · Pune",
      category: "Seller",
    },
    {
      id: 3,
      title: "Rajesh Desai",
      description:
        "I've been in this business for 12 years but always relied on word of mouth. Reecomm gave my inventory a proper online presence. Inquiries doubled in the first month.",
      image: "/card3.webp",
      subtitle: "46 · Auto consultant · Surat",
      category: "Consultant",
    },
    {
      id: 4,
      title: "Anjali Sharma",
      description:
        "Finding a car that fit my budget and had low mileage felt impossible until I used Reecomm. The filters made it so easy to narrow down my options. I'm now a proud owner of a Baleno!",
      image: "/card4.webp",
      subtitle: "25 · Software Engineer · Mumbai",
      category: "Buyer",
    },
    {
      id: 5,
      title: "Vikram Singh",
      description:
        "Reecomm's valuation tool gave me a realistic price for my car. The verification process was quick, and I sold my Creta within a week of listing. Highly recommended!",
      image: "/card5.webp",
      subtitle: "40 · Business Owner · Jaipur",
      category: "Seller",
    },
    {
      id: 6,
      title: "Amit Shah",
      description:
        "Being a consultant, trust is everything. The detailed inspection reports on Reecomm build immediate trust with buyers, making the closing process much smoother. It's a game-changer for my business.",
      image: "/card6.webp",
      subtitle: "38 · Pro Auto Consultant · Vadodara",
      category: "Consultant",
    },
  ];

  const CARD_WIDTH = 356; // 340px card + 16px gap

  const scrollTo = useCallback((direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "next" ? CARD_WIDTH : -CARD_WIDTH,
      behavior: "smooth",
    });
  }, []);

  // Mouse drag handlers
  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "";
    }
  }, []);

  // Touch drag handlers
  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e) => {
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  return (
    <section className="relative w-full mx-auto bg-primary overflow-hidden">
      {/* Background SVG Watermarks */}
      <Image
        src="/quote.svg"
        alt="Quote Background Top"
        fill
        className="absolute -top-5 -left-5 w-[300px] h-[300px] md:-top-10 md:left-3 md:w-[500px] md:h-[550px] opacity-30 z-0 pointer-events-none filter brightness-95"
      />

      {/* OUTER WHITE CARD */}
      <div className="relative z-10 container">
        <div className="text-center mb-12">
          <h2 className="font-secondary text-4xl md:text-5xl lg:text-6xl font-bold  text-gray-900 leading-tight">
            Read reviews,
            <br />
            buy with <span className="text-fourth">confidence</span>.
          </h2>

          {/* Trustpilot & App Buttons Area */}
          <div className="mt-3 flex flex-col items-center justify-center gap-6 sm:gap-8">
            {/* Rating Section */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                4.2
                <span className="text-xl md:text-2xl text-gray-500 font-bold">
                  /5
                </span>
              </span>
              <span className="hidden sm:block text-gray-300 text-2xl font-light">
                |
              </span>
              <span className="text-gray-600 text-sm md:text-base font-medium mt-1 sm:mt-0">
                Based on <span className="font-bold text-gray-900">5,210</span>{" "}
                reviews
              </span>
            </div>

            {/* App Buttons */}
            <AppDownloadButtons
              variant="dark-outline"
              direction="row"
              className="justify-center w-full sm:px-0 mt-2 sm:mt-0"
              buttonClassName="flex-1 sm:flex-none sm:w-auto min-w-[130px] sm:min-w-[200px]"
            />
          </div>
        </div>

        {/* CONTENT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="lg:col-span-3 flex flex-col items-start lg:mt-[150px]">
            <div className="max-w-xs">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                <span
                  style={{ fontFamily: "var(--secondary)" }}
                  className="relative inline-block text-fourth text-4xl md:text-5xl lg:text-6xl font-bold italic mr-2"
                >
                  What
                  <svg
                    className="absolute left-0 -bottom-1 w-full"
                    viewBox="0 0 200 20"
                    fill="none"
                  >
                    <path
                      d="M5 15 Q 100 5 195 15"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-3xl md:text-4xl font-bold">
                  our customers are saying
                </span>
              </h3>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-9">
            {/* Navigation */}
            <div className="hidden sm:flex justify-end gap-2 mb-4">
              <button
                onClick={() => scrollTo("prev")}
                className="w-12 h-12 cursor-pointer rounded-full bg-fourth border-2 border-third flex items-center justify-center hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300"
              >
                <ArrowLeft size={24} />
              </button>

              <button
                onClick={() => scrollTo("next")}
                className="w-12 h-12 cursor-pointer rounded-full bg-fourth border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            {/* Custom Drag Carousel */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth rounded-2xl"
              style={{
                cursor: "grab",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
            >
              {stories.map((story) => (
                <StoryCard key={story.id} data={story} />
              ))}
            </div>

            {/* Hide scrollbar for webkit */}
            <style>{`
              div[style*="scrollbarWidth: none"]::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

