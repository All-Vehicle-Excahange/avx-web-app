import React, { useState } from "react";
import Image from "next/image";

const SayHello = () => {
  const [activeTab, setActiveTab] = useState("Book a Test Drive");

  const navigation = [
    "Download the Mobile App",
    "Chat With the Seller",
    "Book a Test Drive",
    "Get Your Dream Vehicle",
  ];

  const leftOffset = {
    "Download the Mobile App": "translate-y-0",
    "Chat With the Seller": "-translate-y-6",
    "Book a Test Drive": "-translate-y-12",
    "Get Your Dream Vehicle": "-translate-y-16",
  };

  const rightOffset = {
    "Download the Mobile App": "translate-y-0",
    "Chat With the Seller": "translate-y-6",
    "Book a Test Drive": "translate-y-12",
    "Get Your Dream Vehicle": "translate-y-16",
  };

  const activeIndex = navigation.indexOf(activeTab);

  const stepIcons = {
    "Download the Mobile App": (isActive) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? "text-fourth" : "text-gray-400"}`}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    "Chat With the Seller": (isActive) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? "text-fourth" : "text-gray-400"}`}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    "Book a Test Drive": (isActive) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? "text-fourth" : "text-gray-400"}`}
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 12L7.5 7.5" />
        <path d="M12 12L16.5 7.5" />
        <path d="M12 12V22" />
      </svg>
    ),
    "Get Your Dream Vehicle": (isActive) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? "text-fourth" : "text-gray-400"}`}
      >
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2 11.1 2 11.3 2 11.5V16c0 .6.4 1 1 1h2m10 0h4" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  };

  const stepTexts = {
    "Download the Mobile App": {
      title: "Download",
      subtitle: "the Mobile App",
    },
    "Chat With the Seller": { title: "Chat", subtitle: "With the Seller" },
    "Book a Test Drive": { title: "Book", subtitle: "a Test Drive" },
    "Get Your Dream Vehicle": { title: "Get Your", subtitle: "Dream Vehicle" },
  };

  return (
    <section className="bg-white py-6">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-10 lg:mb-16 gap-6">
          <div className="text-left w-fit shrink-0">
            <h2 className="text-3xl md:text-5xl text-secondary font-extrabold leading-tight">
              Say{" "}
              <span className="text-fourth">
                <span
                  style={{ fontFamily: "var(--secondary)" }}
                  className="relative inline-block text-fourth text-4xl md:text-5xl lg:text-6xl font-bold italic "
                >
                  hello
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
              </span>{" "}
              to the seller
              <br />
              <span className="ml-0">before you buy!</span>
            </h2>
          </div>
        </div>

        {/* Image Composition Section */}
        <div className="relative flex justify-center items-start gap-4 lg:gap-8 pt-16 sm:pt-20 pb-16 sm:pb-20">
          {/* Left Image Wrapper */}
          <div className="flex flex-col items-start gap-12 z-10">
            <div
              className={`relative transform transition-all duration-500 ease-out ${leftOffset[activeTab] || "translate-y-0"}`}
            >
              <Image
                src="/hello1.webp"
                alt="Chat feature preview"
                width={320}
                height={480}
                className="rounded-xl lg:rounded-2xl shadow-2xl lg:shadow-3xl w-[100px] sm:w-[160px] md:w-[220px] lg:w-[290px] aspect-[2/3] object-cover"
              />
              {/* Glassmorphic Card (Chat with the seller) */}
              <div className="absolute left-1/2 -translate-x-[40%] lg:left-0 lg:-translate-x-1/2 bottom-4 sm:bottom-6 w-[95px] sm:w-[160px] md:w-[200px] backdrop-blur-md bg-white/70 border border-white/40 shadow-xl rounded-lg sm:rounded-2xl p-1.5 sm:p-3 transition-all duration-300 z-20">
                <div className="flex items-start gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-2.5 h-2.5 sm:w-4.5 sm:h-4.5"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-extrabold text-[7.5px] sm:text-[10.5px] md:text-xs text-blue-600 uppercase tracking-wider leading-tight">
                      Chat with the seller
                    </h4>
                    <p className="text-[6.5px] sm:text-[8.5px] md:text-[10.5px] text-gray-700 font-medium leading-normal">
                      Ask questions, get details, and clear all your doubts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Image (Mobile Phone View) */}
          <div className="flex shrink-0 relative w-[130px] sm:w-[180px] md:w-[240px] lg:w-[300px] h-[260px] sm:h-[360px] md:h-[480px] lg:h-[550px] top-4 lg:top-8 z-0">
            <Image
              src="/Chatscreensa.webp"
              alt="App screen preview"
              width={375}
              height={656}
              className="
                                     absolute inset-0
                                     rounded-2xl lg:rounded-3xl 
                                     w-full h-auto
                                     animate-fade-slide
                                 "
            />
          </div>

          {/* Right Image Wrapper */}
          <div className="flex flex-col items-start gap-12 pt-12 sm:pt-16 lg:pt-24 z-10">
            <div
              className={`relative transform transition-all duration-500 ease-out ${rightOffset[activeTab] || "translate-y-0"}`}
            >
              <Image
                src="/hello2.webp"
                alt="Chat feature preview"
                width={320}
                height={480}
                className="rounded-xl lg:rounded-2xl w-[100px] sm:w-[160px] md:w-[220px] lg:w-[290px] aspect-[2/3] object-cover"
              />
              {/* Glassmorphic Card (Book a Test Drive) */}
              <div className="absolute left-1/2 -translate-x-[60%] lg:left-[100%] lg:-translate-x-1/2 bottom-1 sm:bottom-2 w-[95px] sm:w-[160px] md:w-[200px] backdrop-blur-md bg-white/70 border border-white/40 shadow-xl rounded-lg sm:rounded-2xl p-1.5 sm:p-3 transition-all duration-300 z-20">
                <div className="flex items-start gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-2.5 h-2.5 sm:w-4.5 sm:h-4.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 12L7.5 7.5" />
                      <path d="M12 12L16.5 7.5" />
                      <path d="M12 12V22" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-extrabold text-[7.5px] sm:text-[10.5px] md:text-xs text-blue-600 uppercase tracking-wider leading-tight">
                      Book a Test Drive
                    </h4>
                    <p className="text-[6.5px] sm:text-[8.5px] md:text-[10.5px] text-gray-700 font-medium leading-normal">
                      Schedule a test drive at your convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Stepper (shows on <1024px) */}
        <div className="lg:hidden flex flex-col items-start w-full px-6 mt-16 gap-8 pb-4">
          {navigation.map((item, index) => {
            const isActive = activeTab === item;
            const isActiveLine = activeIndex > index;
            return (
              <React.Fragment key={item}>
                <button
                  onClick={() => setActiveTab(item)}
                  className="relative flex flex-row items-center gap-4 text-left cursor-pointer transition-all duration-300 group z-10 w-full"
                >
                  {/* Vertical connecting line for mobile stepper */}
                  {index < navigation.length - 1 && (
                    <div
                      className={`absolute border-l-2 border-dashed pointer-events-none transition-all duration-300
                                                ${isActiveLine ? "border-fourth" : "border-gray-300"}`}
                      style={{
                        top: "16px",
                        left: "16px",
                        height: "calc(100% + 32px)",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Step Number Badge */}
                  <div
                    className={`
                                        relative z-10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold
                                        transition-all duration-300 ease-out border-2
                                        ${
                                          isActive
                                            ? "w-8 h-8 bg-fourth text-white border-fourth shadow-lg scale-110 ring-4 ring-fourth/20"
                                            : "w-8 h-8 bg-white text-gray-400 border-gray-300 scale-100 hover:border-gray-400"
                                        }
                                    `}
                  >
                    {index + 1}
                  </div>

                  {/* Icon Box */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl border shrink-0 transition-all duration-300
                      ${
                        activeIndex >= index
                          ? "bg-fourth/5 border-fourth/20"
                          : "bg-gray-50 border-gray-100"
                      }`}
                  >
                    {stepIcons[item] && stepIcons[item](activeIndex >= index)}
                  </div>

                  {/* Text block */}
                  <div className="flex flex-col">
                    <span
                      className={`font-extrabold text-[11px] uppercase tracking-wider transition-all duration-300
                        ${isActive ? "text-fourth" : "text-gray-800/80 group-hover:text-gray-900"}`}
                    >
                      {stepTexts[item]?.title}
                    </span>
                    <span
                      className={`text-[9px] font-semibold transition-all duration-300
                        ${isActive ? "text-gray-700" : "text-gray-400"}`}
                    >
                      {stepTexts[item]?.subtitle}
                    </span>
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Desktop Stepper (shows on >=1024px) */}
        <div className="hidden lg:flex flex-row items-center justify-between w-full max-w-5xl mx-auto px-6 mt-20 pb-4">
          {navigation.map((item, index) => {
            const isActive = activeTab === item;
            const isActiveLine = activeIndex > index;
            return (
              <React.Fragment key={item}>
                <button
                  onClick={() => setActiveTab(item)}
                  className="relative flex flex-row items-center gap-3 text-left cursor-pointer transition-all duration-300 group z-10 shrink-0"
                >
                  {/* Step Number Badge */}
                  <div
                    className={`
                                        relative z-10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold
                                        transition-all duration-300 ease-out border-2
                                        ${
                                          isActive
                                            ? "w-8 h-8 sm:w-9 sm:h-9 bg-fourth text-white border-fourth shadow-lg scale-110 ring-4 ring-fourth/20"
                                            : "w-8 h-8 sm:w-9 sm:h-9 bg-white text-gray-400 border-gray-300 scale-100 hover:border-gray-400"
                                        }
                                    `}
                  >
                    {index + 1}
                  </div>
                  {/* Label */}
                  <span
                    className={`
                                        text-xs font-bold uppercase tracking-wider transition-all duration-300
                                        ${
                                          isActive
                                            ? "text-fourth"
                                            : "text-gray-500 group-hover:text-gray-700"
                                        }
                                    `}
                  >
                    {item}
                  </span>
                </button>
                {index < navigation.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 border-t-2 border-dashed self-center mx-4 transition-all duration-300
                                            ${isActiveLine ? "border-fourth" : "border-gray-300"}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SayHello;
