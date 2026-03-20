import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/button";
import DetailsFromPopup from "@/components/features/userSeller/DetailsFromPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";

function Hero() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);

  const handleStartSelling = () => {
    if (!isLoggedIn) {
      setLoginPopup(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <section 
        className="relative w-full min-h-100vh flex items-center overflow-hidden pt-24 pb-12"
      >
        {/* Subtle Background Detail (Minimalist Fourth Color) */}

        <div className="mx-auto px-0 lg:px-0 grid lg:grid-cols-12 gap-12 items-center relative z-10 ">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Premium Marketplace</span>
            </div>

            {/* YOUR EXACT TITLE MODEL */}
            <h2
              className="
                text-3xl sm:text-4xl lg:text-5xl
                font-semibold
                leading-[1.05]
                text-primary
                font-[Montserrat]
              "
            >
              Sell Your Vehicle 
              <br />  
              With
              <span className="text-fourth/80"> Verified Buyers</span>
            </h2>

            <p className="mt-8 text-third text-base lg:text-lg max-w-md  leading-relaxed opacity-80 border-l-2 border-primary/5 pl-6">
              List your car on AVX and connect with serious consultants and buyers through a structured marketplace. 
              <span className="text-primary font-bold ml-1">No commission on sale.</span>
            </p>

            <div className="mt-10 group">
              <Button 
                variant="ghost" 
                onClick={handleStartSelling}
                className=" py-3 bg-primary text-secondary text-sm font-black tracking-widest hover:bg-primary hover:-translate-y-1 transition-all duration-300 rounded-none shadow-2xl"
              >
                START SELLING
              </Button>
            </div>
          </div>

          {/* Right Column: Clean Visual */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[550px] aspect-4/3 group">
                
                {/* Decorative Layering for Professional Depth */}
                <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-3 scale-95 group-hover:rotate-0 transition-transform duration-700 border border-primary/10" />
                
                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border border-primary/10 bg-black/40">
                   <Image
                        src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                        alt="Clean Vehicle Resale"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        priority
                    />
                    {/* Dark overlay for text contrast if needed */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating "Status" UI (Professional Touch) */}
                <div className="absolute -bottom-8 -left-8 bg-secondary/80 backdrop-blur-xl border border-primary/10 p-5 rounded-2xl shadow-2xl hidden sm:block">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                        <div>
                            <p className="text-primary/40 text-[10px] uppercase font-bold tracking-widest">Market Status</p>
                            <p className="text-primary text-sm font-bold">LIVE & VERIFIED</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Global Bottom Edge Detail */}
      </section>

      {/* Popups */}
      <DetailsFromPopup isOpen={open} onClose={() => setOpen(false)} />
      <LoginPopup
        isOpen={loginPopup}
        onClose={() => setLoginPopup(false)}
        onSignup={() => { setLoginPopup(false); setSignupPopup(true); }}
      />
      <SignupPopup
        isOpen={signupPopup}
        onClose={() => setSignupPopup(false)}
        onLogin={() => { setSignupPopup(false); setLoginPopup(true); }}
      />
    </>
  );
}

export default Hero;