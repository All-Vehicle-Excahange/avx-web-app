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
                <div className="flex flex-col justify-between items-start mb-16">
                    <div className="text-center w-fit">
                        <h2 className="text-3xl md:text-5xl text-secondary font-extrabold leading-tight">
                            Say <span className="text-fourth text-5xl">
                                <span className="relative inline-block text-fourth text-4xl md:text-5xl lg:text-6xl font-extrabold">
                                    hello
                                    <span className="absolute left-0 -bottom-2 h-1.5 w-40 bg-gradient-to-r from-fourth to-transparent" />
                                </span>
                            </span> to the seller
                            <br />
                            <span className="ml-0">before you buy!</span>
                        </h2>
                    </div>
                    <p className="mt-3 text-lg text-secondary">
                        Plan a test drive with seller, negiotiate price,
                        ask questions and more - all within the app.
                    </p>
                </div>

                {/* Mobile Stepper (Hidden on Desktop) */}
                <div className="md:hidden flex flex-col gap-4 w-full px-2 mb-10 items-start">
                    {navigation.map((item, index) => {
                        const isActive = activeTab === item;
                        return (
                            <button
                                key={item}
                                onClick={() => setActiveTab(item)}
                                className="relative flex items-center gap-3 text-left cursor-pointer transition-all duration-300 w-full group"
                            >
                                {/* Vertical connecting line for mobile stepper */}
                                {index < navigation.length - 1 && (
                                    <div
                                        className="absolute border-l-[3px] border-dashed border-gray-300 pointer-events-none"
                                        style={{
                                            top: "50%",
                                            left: "14.5px", // Precisely at the center of the 32px badge (16px - 1.5px border)
                                            height: "calc(100% + 16px)", // Full height + the 16px (gap-4)
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
                                    text-base font-bold
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

                {/* Content */}
                <div className="relative flex justify-center items-start gap-2 md:gap-4">
                    {/* Left Image */}
                    <div className="flex flex-col items-start gap-12">
                        <img
                            src="https://a.hwstatic.com/image/upload/f_auto,h_480,w_320,q_50/v1644506520/pwa/chat/chat-image-1.jpg"
                            alt=""
                            className={`
                            rounded-xl md:rounded-2xl shadow-2xl md:shadow-3xl w-[80px] sm:w-[100px] md:w-[250px] h-auto
                            transform transition-all duration-500 ease-out
                            ${leftOffset[activeTab]}
                        `}
                        />
                    </div>

                    {/* Center Image */}
                    <div className="flex shrink-0 relative w-[130px] sm:w-[150px] md:w-[300px] h-[260px] sm:h-[300px] md:h-[550px] top-4 md:top-8 ">
                        <img
                            key={activeTab}
                            src={images[activeTab]}
                            alt=""
                            className="
                                absolute inset-0
                                rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl
                                w-full h-auto
                                animate-fade-slide
                            "
                        />
                    </div>

                    {/* Right Stepper & Image */}
                    <div className="flex flex-col items-start gap-8 md:gap-12 pt-6 md:pt-16">

                        {/* Desktop Stepper */}
                        <div className="hidden md:flex relative pl-5 flex-col gap-10">
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
                                rounded-xl md:rounded-2xl shadow-2xl md:shadow-3xl w-[80px] sm:w-[100px] md:w-[250px] h-auto
                                transform transition-all duration-500 ease-out
                                ${rightOffset[activeTab]}
                            `}
                        />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default SayHello;
