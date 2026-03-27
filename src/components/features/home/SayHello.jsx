import React, { useState } from "react";

const SayHello = () => {
    const [activeTab, setActiveTab] = useState("Book a Test Drive");

    const navigation = [
        "Download the Mobile App",
        "Chat With the Seller",
        "Book a Test Drive",
    ];

    const images = {
        "Download the Mobile App":
            "https://a.hwstatic.com/image/upload/f_auto,h_656,w_375,q_50/v1645433308/pwa/chat/chat-hostel.png",
        "Chat With the Seller":
            "https://a.hwstatic.com/image/upload/f_auto,h_656,w_375,q_50/v1645433308/pwa/chat/chat-city.png",
        "Book a Test Drive":
            "https://a.hwstatic.com/image/upload/f_auto,h_656,w_375,q_50/v1645433308/pwa/chat/chat-direct.png",
    };
    const leftOffset = {
        "Download the Mobile App": "translate-y-0",
        "Chat With the Seller": "-translate-y-6",
        "Book a Test Drive": "-translate-y-12",
    };

    const rightOffset = {
        "Download the Mobile App": "translate-y-0",
        "Chat With the Seller": "translate-y-6",
        "Book a Test Drive": "translate-y-12",
    };

    return (
        <section className="bg-white py-6">
            <div className="container">
                {/* Heading */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-10 lg:mb-16 gap-6">
                    <div className="text-left w-fit shrink-0">
                        <h2 className="text-3xl md:text-5xl text-secondary font-extrabold leading-tight">
                            Say <span className="text-fourth">
                                <span className="relative inline-block text-fourth text-4xl md:text-5xl lg:text-6xl font-extrabold">
                                    hello
                                    <span className="absolute left-0 -bottom-2 h-1.5 w-full bg-gradient-to-r from-fourth to-transparent" />
                                </span>
                            </span> to the seller
                            <br />
                            <span className="ml-0">before you buy!</span>
                        </h2>
                    </div>
                    <p className="max-w-xl text-base md:text-lg text-secondary opacity-80 lg:pt-4">
                        Plan a test drive with seller, negotiate price,
                        ask questions and more - all within the app.
                    </p>
                </div>

                {/* Mobile/Tablet Stepper (Top-set, shows on <1024px) */}
                <div className="lg:hidden flex flex-col sm:flex-row sm:justify-center gap-6 sm:gap-10 w-full px-2 mb-12 items-start sm:items-center">
                    {navigation.map((item, index) => {
                        const isActive = activeTab === item;
                        return (
                            <button
                                key={item}
                                onClick={() => setActiveTab(item)}
                                className="relative flex sm:flex-col items-center gap-4 sm:gap-2 text-left sm:text-center cursor-pointer transition-all duration-300 group"
                            >
                                {/* Horizontal connecting line for tablet stepper */}
                                {index < navigation.length - 1 && (
                                    <div
                                        className="sm:block hidden absolute border-t-[3px] border-dashed border-gray-300 pointer-events-none"
                                        style={{
                                            top: "16px",
                                            left: "calc(50% + 20px)",
                                            width: "calc(100% + 14px)",
                                            zIndex: 0
                                        }}
                                    />
                                )}
                                
                                {/* Vertical connecting line for mobile stepper */}
                                {index < navigation.length - 1 && (
                                    <div
                                        className="sm:hidden absolute border-l-[3px] border-dashed border-gray-300 pointer-events-none"
                                        style={{
                                            top: "16px",
                                            left: "14.5px",
                                            height: "calc(100% + 24px)",
                                            zIndex: 0
                                        }}
                                    />
                                )}

                                {/* Step Number Badge */}
                                <div
                                    className={`
                                    relative z-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold
                                    transition-all duration-300 ease-out border-2
                                    ${isActive
                                            ? "w-8 h-8 bg-fourth text-white border-fourth shadow-md scale-110"
                                            : "w-8 h-8 bg-white text-gray-400 border-gray-300 scale-100"}
                                `}
                                >
                                    {index + 1}
                                </div>
                                {/* Label */}
                                <span
                                    className={`
                                    text-[13px] sm:text-[14px] font-bold uppercase tracking-wider
                                    transition-all duration-300 ease-out max-w-[150px]
                                    ${isActive
                                            ? "text-fourth"
                                            : "text-gray-800/60"}
                                `}
                                >
                                    {item}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Image Composition Section */}
                <div className="relative flex justify-center items-start gap-4 lg:gap-8">
                    <div className="flex flex-col items-start gap-12">
                        <img
                            src="https://a.hwstatic.com/image/upload/f_auto,h_480,w_320,q_50/v1644506520/pwa/chat/chat-image-1.jpg"
                            alt=""
                            className={`
                            rounded-xl lg:rounded-2xl shadow-2xl lg:shadow-3xl w-[80px] sm:w-[130px] md:w-[180px] lg:w-[250px] h-auto
                            transform transition-all duration-500 ease-out
                            ${activeTab === "Download the Mobile App" ? "translate-y-0" : activeTab === "Chat With the Seller" ? "-translate-y-6" : "-translate-y-12"}
                        `}
                        />
                    </div>

                    {/* Center Image (Mobile Phone View) */}
                    <div className="flex shrink-0 relative w-[130px] sm:w-[180px] md:w-[240px] lg:w-[300px] h-[260px] sm:h-[360px] md:h-[480px] lg:h-[550px] top-4 lg:top-8 ">
                        <img
                            key={activeTab}
                            src={images[activeTab]}
                            alt=""
                            className="
                                absolute inset-0
                                rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl
                                w-full h-auto
                                animate-fade-slide
                            "
                        />
                    </div>

                    {/* Right Stepper & Image Group */}
                    <div className="flex flex-col items-start gap-8 lg:gap-12 pt-6 lg:pt-16">

                        {/* Desktop Side Stepper (shows on >=1024px) */}
                        <div className="hidden lg:flex relative pl-5 flex-col gap-10">
                            {navigation.map((item, index) => {
                                const isActive = activeTab === item;

                                return (
                                    <button
                                        key={item}
                                        onClick={() => setActiveTab(item)}
                                        className="relative flex items-center gap-4 text-left cursor-pointer group transition-all duration-300"
                                        style={{ marginLeft: `${index * 2.5}rem` }}
                                    >
                                        {/* L-shaped connecting line for stairs effect */}
                                        {index < navigation.length - 1 && (
                                            <div
                                                className="absolute border-l-[3px] border-b-[3px] border-dashed border-gray-300 rounded-bl-xl pointer-events-none"
                                                style={{
                                                    top: "calc(50% + 14px)",
                                                    left: "14.5px",
                                                    width: "35px",
                                                    height: "calc(100% + 26px)",
                                                    zIndex: 0
                                                }}
                                            />
                                        )}

                                        {/* Step Number Badge */}
                                        <div
                                            className={`
                                            relative z-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold
                                            transition-all duration-300 ease-out border-2
                                            ${isActive
                                                    ? "w-8 h-8 bg-fourth text-white border-fourth shadow-md scale-110"
                                                    : "w-8 h-8 bg-white text-gray-400 border-gray-300 scale-100"}
                                        `}
                                        >
                                            {index + 1}
                                        </div>

                                        {/* Label */}
                                        <span
                                            className={`
                                            text-lg font-bold
                                            transition-all duration-300 ease-out
                                            ${isActive
                                                    ? "text-fourth translate-x-1"
                                                    : "text-gray-800"}
                                        `}
                                        >
                                            {item}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Image */}
                        <img
                            src="https://a.hwstatic.com/image/upload/f_auto,h_480,w_320,q_50/v1644506518/pwa/chat/chat-image-2.jpg"
                            alt=""
                            className={`
                                rounded-xl lg:rounded-2xl shadow-2xl lg:shadow-3xl w-[80px] sm:w-[130px] md:w-[180px] lg:w-[250px] h-auto
                                transform transition-all duration-500 ease-out
                                ${activeTab === "Download the Mobile App" ? "translate-y-0" : activeTab === "Chat With the Seller" ? "translate-y-6" : "translate-y-12"}
                            `}
                        />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default SayHello;
