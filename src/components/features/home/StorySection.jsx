import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import CommonSwiper from "@/components/ui/CommonSwiper";

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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  return (
    <section className="relative w-full mx-auto bg-primary overflow-hidden">
      {/* Background SVG Watermarks */}
      <img
        src="/quote.svg"
        alt="Quote Background Top"
        className="absolute -top-5 -left-5 w-[300px] h-[300px] md:-top-10 md:left-3 md:w-[500px] md:h-[550px] opacity-30 z-0 pointer-events-none filter brightness-95"
      />
      {/* <img
        src="/quote-1.svg"
        alt="Quote Background Bottom"
        className="absolute -bottom-5 -right-5 w-[300px] h-[300px] md:-bottom-30 md:right-3 md:w-[500px] md:h-[550px] opacity-30 rotate-180 z-0 pointer-events-none filter brightness-95"
      /> */}

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
                4.2<span className="text-xl md:text-2xl text-gray-500 font-bold">/5</span>
              </span>
              <span className="hidden sm:block text-gray-300 text-2xl font-light">|</span>
              <span className="text-gray-600 text-sm md:text-base font-medium mt-1 sm:mt-0">
                Based on <span className="font-bold text-gray-900">5,210</span> reviews
              </span>
            </div>

            {/* App Buttons */}
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full sm:px-0 mt-2 sm:mt-0">

              {/* Google Play Button */}
              <button type="button" className="flex-1 sm:flex-none sm:w-auto min-w-[130px] sm:min-w-[200px] flex items-center justify-center px-2 sm:px-3 py-2 sm:py-2 bg-secondary text-primary rounded-lg border border-gray-600 hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300 cursor-pointer group/btn">
                <div className="mr-2 sm:mr-3 transition-transform duration-300 ">
                  <svg viewBox="30 336.7 120.9 129.2" className="w-[18px] sm:w-[24px]">
                    <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path>
                    <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path>
                    <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path>
                    <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-300 group-hover/btn:text-secondary/80 transition-colors whitespace-nowrap">
                    Get it on
                  </div>
                  <div className="text-[14px] sm:text-lg font-semibold leading-none tracking-tight whitespace-nowrap">
                    Google Play
                  </div>
                </div>
              </button>

              {/* App Store Button */}
              <button type="button" className="flex-1 sm:flex-none sm:w-auto min-w-[130px] sm:min-w-[200px] flex items-center justify-center px-2 sm:px-3 py-2 sm:py-2 bg-secondary text-primary rounded-lg border border-gray-600 hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300 cursor-pointer group/btn">
                <div className="mr-2 sm:mr-3 transition-transform">
                  <svg viewBox="0 0 384 512" className="w-[16px] sm:w-[22px]">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-300 group-hover/btn:text-secondary/80 transition-colors whitespace-nowrap">
                    Download on
                  </div>
                  <div className="text-[14px] sm:text-lg font-semibold leading-none tracking-tight whitespace-nowrap">
                    App Store
                  </div>
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* CONTENT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="lg:col-span-3 flex flex-col items-start lg:mt-[150px]">
            <div className="max-w-xs">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                <span style={{ fontFamily: "var(--secondary)" }} className="relative inline-block text-fourth text-4xl md:text-5xl lg:text-6xl font-bold italic mr-2">
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
          <div className="lg:col-span-9 overflow-hidden">
            {/* Navigation */}
            <div className="flex justify-end gap-2 mb-4">
              <button
                ref={prevRef}
                className="w-12 h-12  cursor-pointer rounded-full bg-fourth border-2 border-third flex items-center justify-center hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300"
              >
                <ArrowLeft size={24} />
              </button>

              <button
                ref={nextRef}
                className="w-12 h-12 cursor-pointer rounded-full bg-fourth border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-primary hover:text-secondary transition-all duration-300"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            {/* Swiper */}
            <CommonSwiper
              data={stories}
              CardComponent={({ data }) => <StoryCard story={data} />}
              prevRef={prevRef}
              nextRef={nextRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
