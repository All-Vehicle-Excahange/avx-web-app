import { useState } from "react";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import DetailsFromPopup from "./DetailsFromPopup";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import Link from "next/link";

const faqData = [
    { q: "Can I edit listing later?", a: "Full control is provided via your dashboard. Update pricing, specs, or media anytime." },
    { q: "Is inspection mandatory?", a: "Digital verification is required for all. Physical inspection is optional for 'Gold' status." },
    { q: "How many vehicles can I list?", a: "Individual sellers can list up to 3 active vehicles. Dealerships have unlimited slots." },
    { q: "Can I relist after sale?", a: "Once marked sold, the slot clears immediately for your next vehicle listing." },
    { q: "Do I need GST?", a: "Only required for registered businesses. Private individual sellers do not need GST." },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

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
                className="w-full py-16"
            >
                <div className="mx-auto px-6 lg:px-0 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">

                        {/* LEFT SIDE: STICKY HEADING */}
                        <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Seller FAQ</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat] mb-10 leading-[1.05]">
                                Frequently asked <br />
                                <span className="text-fourth/80">questions</span>
                            </h2>

                            <div className="space-y-8">
                                <p className="text-third/50 text-lg font-[Poppins]">
                                    {"  Can't find the answer you're looking for? Our consultants are here to help."}
                                </p>
                                <Link href="/help">
                                    <Button variant="ghost" className="flex items-center justify-center gap-20 px-7 py-3 bg-primary  text-secondary rounded-full hover:bg-third hover:text-secondary transition-all text-sm font-black tracking-widest uppercase">
                                        Get in touch
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT SIDE: SCROLLING ACCORDIONS */}
                        <div className="lg:w-2/3 w-full space-y-4">
                            {faqData.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-primary/3 border border-primary/5 rounded-[10px] overflow-hidden transition-all duration-500 hover:border-primary/10"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 text-left group"
                                    >
                                        <span className={`text-lg font-semibold transition-colors leading-relaxed duration-300 ${openIndex === index ? 'text-primary' : 'text-third/80 group-hover:text-primary'}`}>
                                            {item.q}
                                        </span>
                                        <div className={`rounded-full p-2 border transition-all duration-300 ${openIndex === index ? 'bg-third/30 border-third/20 text-primary' : 'bg-primary/5 border-primary/10 text-primary/40'}`}>
                                            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                        </div>
                                    </button>

                                    <div className={`px-4 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-60 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-third/60 text-lg  leading-relaxed max-w-2xl border-t border-primary/5 pt-4">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* PRIMARY CTA SECTION: THE DARK STRIP */}
                            <div className="mt-16 relative overflow-hidden bg-black/60 border border-primary/10 p-4 lg:p-8 rounded-xl shadow-2xl group">
                                {/* Subtle Background Glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-fourth/5 blur-[100px] pointer-events-none" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-primary text-3xl font-semibold font-[Montserrat] mb-3 tracking-tight">Ready to list your vehicle?</h3>
                                        <div className="flex items-center justify-center md:justify-start gap-2 opacity-40">
                                            <div className="w-1.5 h-1.5 rounded-full bg-fourth animate-pulse" />
                                            <span className="text-primary text-[10px] uppercase font-bold tracking-[0.4em]">Identity Verification Required</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleStartSelling}
                                        variant="ghost"
                                        className="py-4 bg-primary text-secondary text-sm font-black tracking-[0.2em] hover:bg-primary hover:scale-105 transition-all rounded-full border-none shadow-2xl flex items-center group/btn"
                                    >
                                        CONTINUE TO KYC
                                        <ArrowRight className="ml-3 group-hover/btn:translate-x-1 transition-transform" size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
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