import { useState, useEffect } from "react";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import DetailsFromPopup from "./DetailsFromPopup";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import Link from "next/link";
import { useRouter } from "next/router";
import { getBecameSeller } from "@/services/user.service";

const faqData = [
  {
    q: "Can I edit my listing later?",
    a: "Yes. You can update your listing details, photos, asking price, and description at any time before it is sold. Submit your changes and they go live after a quick platform review.",
  },
  {
    q: "Is inspection mandatory?",
    a: "No. Inspection is optional. However, listings with a Reecomm inspection report receive significantly more qualified buyer inquiries and tend to close faster. It is strongly recommended.",
  },
  {
    q: "How many vehicles can I list?",
    a: "Individual sellers can have 1 active listing at a time. You can sell a maximum of 3 vehicles on Reecomm. Once your active listing is marked as sold, your next slot opens automatically.",
  },
  {
    q: "Can I relist after sale?",
    a: "Yes. Once a listing is marked as sold, your slot resets and you can list your next vehicle immediately. Your identity verification carries over — no need to re-verify.",
  },
  {
    q: "Do I need GST?",
    a: "No. Individual sellers are not required to have GST registration. GST requirements apply only to verified business consultants on the platform, not to individual vehicle sellers.",
  },
];

export default function FAQSection() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [role, setRole] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setRole(parsed?.userRole || null);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error("Failed to read user role in Faq:", err);
        setRole(null);
      }
    }
  }, [isLoggedIn, user]);

  const checkSellerStatusAndProceed = async () => {
    let currentRole = null;
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          currentRole = parsed?.userRole;
        }
      } catch (err) {
        console.error("Failed to parse user role:", err);
      }
    }

    const finalRole = currentRole || user?.userRole;

    if (finalRole === "CONSULTATION") {
      return;
    }

    try {
      setCheckingStatus(true);
      const res = await getBecameSeller();
      const status = res?.data?.verificationStatus;

      if (status === "REJECTED") {
        setSellerData(res?.data || null);
        setOpen(true);
      } else if (
        status === "REQUESTED" ||
        status === "VERIFIED" ||
        status === "REQUEST_CHANGES" ||
        status === "APPROVED" ||
        status === "ACCEPTED"
      ) {
        router.push("/user/details/myprofile");
      } else {
        setSellerData(null);
        setOpen(true);
      }
    } catch (err) {
      setSellerData(null);
      setOpen(true);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleStartSelling = () => {
    if (!isLoggedIn) {
      setLoginPopup(true);
      return;
    }
    checkSellerStatusAndProceed();
  };

  const handleLoginSuccess = () => {
    checkSellerStatusAndProceed();
  };

  const isNormalUser =
    !isLoggedIn ||
    (role !== "CONSULTATION" &&
      role !== "USER_SELLER" &&
      role !== "USER_SELLER_APPLICANT");

  return (
    <>
      <section className="w-full py-16">
        <div className="mx-auto px-6 lg:px-0 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
            {/* LEFT SIDE: STICKY HEADING */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Seller FAQ
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat] mb-10 leading-[1.05]">
                Frequently asked <br />
                <span className="text-fourth/80">questions</span>
              </h2>

              <div className="space-y-8">
                <p className="text-third/50 text-lg font-[Poppins]">
                  {
                    "  Can't find the answer you're looking for? Our consultants are here to help."
                  }
                </p>
                {/* <Link href="/help">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center gap-20 px-7 py-3 bg-primary  text-secondary rounded-full hover:bg-third hover:text-secondary transition-all text-sm font-black tracking-widest uppercase"
                  >
                    Get in touch
                  </Button>
                </Link> */}
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
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-4 text-left group"
                  >
                    <span
                      className={`text-lg font-semibold transition-colors leading-relaxed duration-300 ${openIndex === index ? "text-primary" : "text-third/80 group-hover:text-primary"}`}
                    >
                      {item.q}
                    </span>
                    <div
                      className={`rounded-full p-2 border transition-all duration-300 ${openIndex === index ? "bg-third/30 border-third/20 text-primary" : "bg-primary/5 border-primary/10 text-primary/40"}`}
                    >
                      {openIndex === index ? (
                        <Minus size={20} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </div>
                  </button>

                  <div
                    className={`px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-60 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-third/60 text-lg  leading-relaxed max-w-2xl border-t border-primary/5 pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}

              {/* PRIMARY CTA SECTION: THE DARK STRIP */}
              {isNormalUser && (
                <div className="mt-16 relative overflow-hidden  border border-primary/10 p-4 lg:p-8 rounded-xl shadow-2xl group">
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left">
                      <h3 className="text-primary text-2xl font-semibold font-[Montserrat] mb-3 tracking-tight">
                        Ready to list your vehicle?
                      </h3>
                      <div className="flex items-center justify-center md:justify-start gap-2 opacity-40">
                        <div className="w-1.5 h-1.5 rounded-full bg-fourth animate-pulse" />
                        <span className="text-primary text-[10px] uppercase font-bold tracking-[0.4em]">
                          Identity Verification Required
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleStartSelling}
                      loading={checkingStatus}
                      variant="ghost"
                      className="py-3 bg-primary text-secondary text-sm font-semibold hover:bg-primary hover:scale-105 transition-all rounded-full border-none shadow-2xl flex items-center group/btn"
                    >
                      Continue To KYC
                      <ArrowRight
                        className="ml-3 group-hover/btn:translate-x-1 transition-transform"
                        size={18}
                      />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Popups */}
      <DetailsFromPopup isOpen={open} onClose={() => setOpen(false)} existing={sellerData} />
      <LoginPopup
        isOpen={loginPopup}
        onClose={() => setLoginPopup(false)}
        onSignup={() => {
          setLoginPopup(false);
          setSignupPopup(true);
        }}
        onSuccess={handleLoginSuccess}
      />
      <SignupPopup
        isOpen={signupPopup}
        onClose={() => setSignupPopup(false)}
        onLogin={() => {
          setSignupPopup(false);
          setLoginPopup(true);
        }}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
