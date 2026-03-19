import Image from "next/image";
import Button from "@/components/ui/button";
import { useState } from "react";
import DetailsFromPopup from "@/components/features/userSeller/DetailsFromPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";

function Hero() {

    const [open, setOpen] = useState(false);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const [loginPopup, setLoginPopup] = useState(false)
    const [signupPopup, setSignupPopup] = useState(false)

    const handleStartSelling = () => {
        if (!isLoggedIn) {
            setLoginPopup(true);
        } else {
            setOpen(true);
        }
    };

    return (<>
        <section className="flex mt-20 flex-col lg:flex-row w-full h-[84vh]  overflow-hidden">

            {/* Left Column: Content Area */}
            <div className="flex-1 flex flex-col justify-center ">
                <h1 className="text-primary text-5xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight mb-8">
                    Sell Your
                    Vehicle with
                    Verified
                    Buyers
                </h1>

                <p className="text-third text-base lg:text-lg mb-10 max-w-md leading-relaxed">
                    List your car on AVX and connect with serious
                    consultants and buyers through a structured
                    marketplace. <span className="text-primary font-semibold">No commission on sale.</span>
                </p>

                <div>
                    <Button variant="ghost" onClick={handleStartSelling}>                            Start Selling
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* Right Column: Image Area */}
            <div className="flex-1 w-full h-[50vh] lg:h-screen lg:py-6 lg:pr-6 pl-0">
                <div
                    className="relative w-full h-full rounded-t-[2rem] lg:rounded-t-none lg:rounded-3xl overflow-hidden shadow-2xl bg-black">
                    <Image
                        src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                        alt="Luxury Porsche car"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>

        <DetailsFromPopup
            isOpen={open}
            onClose={() => setOpen(false)}
        />
        <LoginPopup
            isOpen={loginPopup}
            onClose={() => setLoginPopup(false)}
            onSignup={() => {
                setLoginPopup(false);
                setSignupPopup(true);
            }}
        />
        <SignupPopup
            isOpen={signupPopup}
            onClose={() => setSignupPopup(false)}
            onLogin={() => {
                setSignupPopup(false);
                setLoginPopup(true);
            }}
        />
    </>);
}

export default Hero;