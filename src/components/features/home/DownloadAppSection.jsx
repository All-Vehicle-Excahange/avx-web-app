import Image from "next/image";

export default function DownloadAppSection() {
  return (
    <div className="w-full pt-36 bg-fourth">
      <div className="w-full 3xl:max-w-screen-2xl mx-auto   overflow-visible flex flex-col md:flex-row relative min-h-[300px]">
        {/* LEFT CONTENT */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center z-10 relative">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 leading-tight">
            AVX App Download For All Vehicle
            <br className="hidden md:block" /> Sell & Buy
          </h2>

          <p className="text-third text-lg mb-8 max-w-lg">
            Unlock exclusive discounts, special offers, and price drops every
            day
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Google Play Button */}
            <button type="button" className="flex items-center justify-center px-6 py-2 text-secondary bg-primary rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300 cursor-pointer">
              <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="25">
                  <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z">
                  </path>
                  <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z">
                  </path>
                  <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z">
                  </path>
                  <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z">
                  </path>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold">
                  GET IT ON
                </div>
                <div className="text-lg font-bold leading-none">
                  Google Play
                </div>
              </div>
            </button>

            {/* App Store Button */}
            <button type="button" className="px-6 py-2 flex items-center justify-center bg-secondary text-primary  border border-primary hover:bg-primary hover:text-secondary transition-all duration-300 rounded-lg cursor-pointer">
              <div className="mr-3">
                <svg viewBox="0 0 384 512" width="23">
                  <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                  </path>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold">
                  Download on the
                </div>
                <div className="text-lg font-bold leading-none">
                  App Store
                </div>
              </div>
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div className="relative md:absolute md:bottom-0 md:right-0 w-full md:w-1/2 lg:w-[45%] flex items-end justify-center md:justify-end h-[300px] md:h-auto overflow-hidden md:overflow-visible z-20">
          {/* Decorative Circle */}
          <div className="absolute md:relative bg-primary h-[340px] w-[340px] md:w-full rounded-t-full bottom-0 md:bottom-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-10"></div>

          {/* Phone Mockup */}
          <div className="absolute z-10 w-[280px] md:w-[350px] lg:w-[400px] md:-mb-12 md:mr-8 lg:mr-18 right-18">
            <Image
              src="/mobile_CTA_sm.png"
              width={100}
              height={100}
              alt="App Screenshot"
              className="w-full relative lg:bottom-12 h-auto object-contain md:bottom-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
