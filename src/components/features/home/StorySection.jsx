import { ArrowLeft, ArrowRight, Quote, TvIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Story Card Component (replacing Review Card)
const StoryCard = ({ story }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[400px] group cursor-pointer">
      {/* Background Image */}
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
        <p className="text-white/90 text-sm">{story.description}</p>
      </div>
    </div>
  );
};

export default function StorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const stories = [
    {
      id: 1,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 7,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 8,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800",
    },
  ];

  // Handle responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(stories.length - slidesPerView, prev + 1),
    );
  };

  return (
    <section className="w-full  mx-auto bg-primary">
      {/* OUTER WHITE CARD */}
      <div className="w-full max-w-[1440px] mx-auto   p-8 md:p-12 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Read reviews,
            <br />
            buy with <span className="text-fourth">confidence</span>.
          </h2>

          {/* Trustpilot Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="text-2xl md:text-3xl font-bold text-gray-900">
              4.2/5
            </span>
            <div className="flex items-center gap-2  px-4 py-2 rounded-lg">
              <button
                type="button"
                className="flex items-center justify-center px-6 py-2 text-primary bg-secondary rounded-lg hover:bg-third/20 hover:text-primary transition-all duration-300 cursor-pointer"
              >
                <div className="mr-3">
                  <svg viewBox="30 336.7 120.9 129.2" width="25">
                    <path
                      fill="#FFD400"
                      d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                    ></path>
                    <path
                      fill="#FF3333"
                      d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                    ></path>
                    <path
                      fill="#48FF48"
                      d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                    ></path>
                    <path
                      fill="#3BCCFF"
                      d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                    ></path>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold">GET IT ON</div>
                  <div className="text-lg font-bold leading-none">
                    Google Play
                  </div>
                </div>
              </button>
            </div>
            <span className="text-gray-600 text-sm md:text-base">
              Based on 5210 reviews
            </span>
          </div>
        </div>

        {/* CONTENT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="lg:col-span-3 flex flex-col items-start lg:mt-[88px]">
            <div className="max-w-xs">
              <div className="mb-2">
                <Quote
                  size={120}
                  strokeWidth={1.5}
                  className="text-gray-200 rotate-180"
                />
              </div>

              <h3 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                What our <span className="text-fourth">customers</span> are saying
              </h3>
            </div>
          </div>

          {/* RIGHT SIDE (STORY CARDS) */}
          <div className="lg:col-span-9 overflow-hidden">
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-14 h-14 rounded-full bg-fourth border-2 border-third flex items-center justify-center hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300 disabled:opacity-30"
              >
                <ArrowLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= stories.length - slidesPerView}
                className="w-14 h-14 rounded-full bg-fourth border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300 disabled:opacity-30"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesPerView + 2)}%)`,
              }}
            >
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / slidesPerView}% - ${((slidesPerView - 1) * 24) / slidesPerView}px)`,
                  }}
                >
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
