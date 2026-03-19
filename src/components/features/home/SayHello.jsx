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
                            Say <span className="text-fourth text-5xl">hello</span> to the seller
                            <br />
                            <span className="ml-0">before you buy!</span>
                        </h2>
                    </div>
                    <p className="mt-3 text-lg text-secondary">
                        Plan a test drive with seller, negiotiate price,
                        ask questions and more - all within the app.
                    </p>
                </div>

                {/* Content */}
                <div className="relative flex justify-center items-start gap-2">
                    <div className="flex flex-col items-start gap-12">
                        <img
                            src="https://a.hwstatic.com/image/upload/f_auto,h_480,w_320,q_50/v1644506520/pwa/chat/chat-image-1.jpg"
                            alt=""
                            className={`
                            rounded-2xl shadow-3xl w-[250px] h-auto
                            transform transition-all duration-500 ease-out
                            ${leftOffset[activeTab]}
                        `}
                        />
                    </div>

                    <div className="hidden md:flex shrink-0 relative w-[300px] h-[550px] top-8 ">
                        <img
                            key={activeTab}
                            src={images[activeTab]}
                            alt=""
                            className="
                                absolute inset-0
                                rounded-3xl shadow-2xl
                                w-[300px] h-auto
                                animate-fade-slide
                            "
                        />
                    </div>

                    <div className="flex flex-col items-start gap-12 pt-16">
                        <div className="relative pl-5 flex flex-col gap-4">
                            {navigation.map((item, index) => {
                                const isActive = activeTab === item;

                                return (
                                    <button
                                        key={item}
                                        onClick={() => setActiveTab(item)}
                                        className="relative flex items-center gap-3 text-left cursor-pointer group transition-all duration-300"
                                        style={{ marginLeft: `${index * 1.5}rem` }}
                                    >
                                        {/* L-shaped connecting line for stairs effect */}
                                        {index < navigation.length - 1 && (
                                            <div
                                                className="absolute border-l-2 border-b-2 border-dashed border-gray-300 rounded-bl-lg pointer-events-none"
                                                style={{
                                                    top: "calc(50% + 6px)", 
                                                    left: "5px",
                                                    width: "calc(1.5rem + 6px)",
                                                    height: "calc(100% + 10px)",
                                                    zIndex: 0
                                                }}
                                            />
                                        )}

                                        {/* Dot */}
                                        <span
                                            className={`
                                            relative z-10 rounded-full shrink-0
                                            transition-all duration-300 ease-out
                                            ${isActive
                                                    ? "w-3 h-3 bg-fourth scale-110"
                                                    : "w-3 h-3 bg-gray-300 scale-100"}
                                        `}
                                        />

                                        {/* Label */}
                                        <span
                                            className={`
                                            text-md font-bold
                                            transition-all duration-300 ease-out
                                            ${isActive
                                                    ? "text-fourth translate-x-1"
                                                    : "text-black"}
                                        `}
                                        >
                                            {item}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <img
                            src="https://a.hwstatic.com/image/upload/f_auto,h_480,w_320,q_50/v1644506518/pwa/chat/chat-image-2.jpg"
                            alt=""
                            className={`
                                rounded-2xl shadow-3xl w-[250px] h-auto
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
