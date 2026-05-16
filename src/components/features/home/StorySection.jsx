import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import CommonSwiper from "@/components/ui/CommonSwiper";
import Image from "next/image";

// Story Card Component (replacing Review Card)
const StoryCard = ({ story }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[450px] group cursor-pointer border border-white/10 shadow-2xl">
      {/* Background Image */}
      <Image
        src={story.image}
        alt={story.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-fourth text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 shadow-lg">
            {story.category}
          </span>
        </div>
        <p className="text-white/95 text-sm md:text-base italic mb-4 leading-relaxed font-medium line-clamp-4">
          &quot;{story.description}&quot;
        </p>
        <div className="pt-4 border-t border-white/20">
          <h3 className="text-xl font-bold text-fourth mb-0.5">{story.title}</h3>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
            {story.subtitle}
          </p>
        </div>
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
      title: "Karan Mehta",
      description: "I was nervous about buying a used car online — but the Reecomm inspection report gave me all the confidence I needed. Bought a 2021 Swift in Ahmedabad, zero surprises.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
      subtitle: "28 · First-time car buyer · Ahmedabad",
      category: "Buyer"
    },
    {
      id: 2,
      title: "Sneha Patil",
      description: "A dealer offered me ₹2.5 lakh less than what I got on Reecomm. The platform brought serious buyers directly to me — no spam, no wasted weekends.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
      subtitle: "34 · Sold her Honda City · Pune",
      category: "Seller"
    },
    {
      id: 3,
      title: "Rajesh Desai",
      description: "I've been in this business for 12 years but always relied on word of mouth. Reecomm gave my inventory a proper online presence. Inquiries doubled in the first month.",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800",
      subtitle: "46 · Auto consultant · Surat",
      category: "Consultant"
    },
    {
      id: 4,
      title: "Anjali Sharma",
      description: "Finding a car that fit my budget and had low mileage felt impossible until I used Reecomm. The filters made it so easy to narrow down my options. I'm now a proud owner of a Baleno!",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
      subtitle: "25 · Software Engineer · Mumbai",
      category: "Buyer"
    },
    {
      id: 5,
      title: "Vikram Singh",
      description: "Reecomm's valuation tool gave me a realistic price for my car. The verification process was quick, and I sold my Creta within a week of listing. Highly recommended!",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
      subtitle: "40 · Business Owner · Jaipur",
      category: "Seller"
    },
    {
      id: 6,
      title: "Amit Shah",
      description: "Being a consultant, trust is everything. The detailed inspection reports on Reecomm build immediate trust with buyers, making the closing process much smoother. It's a game-changer for my business.",
      image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800",
      subtitle: "38 · Pro Auto Consultant · Vadodara",
      category: "Consultant"
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
