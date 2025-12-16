import { MoveLeft, PanelLeftDashed } from "lucide-react";
import Image from "next/image";

const AppleLogo = ({ className }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const GooglePlayLogo = ({ className }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <path
      fill="#fbbd00"
      d="M407 236.4L137.9 36.6C123.6 26.3 103.4 35.8 103.4 53.4v405.2c0 17.6 20.2 27.1 34.5 16.8L407 275.6c11.3-8.3 11.3-30.9 0-39.2z"
    />
    <path
      fill="#ea4335"
      d="M407 236.4L137.9 36.6C123.6 26.3 103.4 35.8 103.4 53.4v405.2c0 17.6 20.2 27.1 34.5 16.8L407 275.6c11.3-8.3 11.3-30.9 0-39.2z"
    />
    <path
      fill="#34a853"
      d="M103.4 53.4v405.2c0 17.6 20.2 27.1 34.5 16.8L407 275.6c11.3-8.3 11.3-30.9 0-39.2L103.4 53.4z"
    />
    <path
      fill="#4285f4"
      d="M137.9 36.6L407 236.4c11.3 8.3 11.3 30.9 0 39.2L137.9 475.4C123.6 485.7 103.4 476.2 103.4 458.6V53.4c0-17.6 20.2-27.1 34.5-16.8z"
    />
    <defs>
      {/* Simplified for single path usage if needed, but keeping full colored structure for accuracy */}
    </defs>
    {/* Re-drawing strictly as the triangular shape for simple use cases */}
    <path
      fill="currentColor"
      d="M32.5 24.3v463.4L376 256 32.5 24.3z"
      style={{ fill: "none" }}
    />{" "}
    {/* Invisible bound */}
    <g>
      <path fill="#2196F3" d="M32.5 24.3l258.1 211.3L347.9 292 32.5 487.7z" />
      <path
        fill="#FFC107"
        d="M449.6 215.9l-101.7 56.4L290.6 235.6 449.6 215.9z"
      />
      <path fill="#4CAF50" d="M347.9 292l-57.3-36.4-258.1-231.3 315.4 267.7z" />
      <path fill="#F44336" d="M32.5 24.3v463.4L347.9 292 32.5 24.3z" />
      {/* Correct composite shape for Play Store */}
      <path
        d="M5.3 4.2C3.1 6.5 2 9.8 2 13.9v484.2c0 4.2 1.1 7.6 3.2 9.8L8.6 512l253.9-253.3L8.6 0 5.3 4.2z"
        fill="#2196F3"
      />
      <path
        d="M262.5 258.7L392.6 388c5.1 5.1 8.3 11.9 8.3 20.3 0 7.8-2.8 14.8-7.2 20.3L262.5 258.7z"
        fill="#34A853"
      />
      <path
        d="M393.7 103.7c4.4 5.5 7.2 12.5 7.2 20.3 0 8.4-3.2 15.2-8.3 20.3L262.5 253.3 8.6 512l18.4 10.4L393.7 103.7z"
        fill="#FCC934"
      />
      <path
        d="M262.5 253.3L8.6 0l22.6 12.8 362.5 206.1-131.2 34.4z"
        fill="#F44336"
      />
    </g>
  </svg>
);

export default function DownloadAppSection() {
  return (
    <div className="w-full py-24  ">
      <div className="w-full bg-secondary overflow-visible flex flex-col md:flex-row relative min-h-[300px]">
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

          <div className="flex flex-col sm:flex-row gap-4 ">
            {/* Google Play Button */}
            <button className="bg-primary rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-third/20 transition-colors cursor-pointer">
              <GooglePlayLogo className="w-8 h-8" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-third uppercase leading-none">
                  Android App On
                </span>
                <span className="text-lg font-bold text-secondary leading-none">
                  Google Play
                </span>
              </div>
            </button>

            {/* App Store Button */}
            <button className="bg-secondary border border-third/40 rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-third/80 transition-colors cursor-pointer">
              <AppleLogo className="w-8 h-8 text-primary" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-third leading-none">
                  Download on the
                </span>
                <span className="text-lg font-bold text-primary leading-none">
                  App Store
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div className="relative md:absolute md:bottom-0 md:right-0 w-full md:w-1/2 lg:w-[45%] flex items-end justify-center md:justify-end h-[300px] md:h-auto overflow-hidden md:overflow-visible z-20">
          {/* Decorative Circle */}
          <div className="absolute md:relative bg-third/30 h-[340px] w-[340px] md:w-full rounded-t-full bottom-0 md:bottom-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-10"></div>

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
