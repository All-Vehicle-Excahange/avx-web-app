import Link from "next/link";
import React from "react";

const FooterLink = () => {
  return (
    <footer className="">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 py-10">

          {/* COLUMN 1: BY BUDGET */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">By Budget</h2>
            <div className="flex flex-col gap-2">
              <Link href="/search?budget=0-2" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars under 2 Lakh
              </Link>
              <Link href="/search?budget=0-5" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars under 5 Lakh
              </Link>
              <Link href="/search?budget=0-10" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars under 10 Lakh
              </Link>
              <Link href="/search?budget=0-20" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars under 20 Lakh
              </Link>
              <Link href="/search?budget=50-200" className="text-[12px] text-white/50 hover:text-white transition-all">
                Luxury Cars above 50 Lakh
              </Link>
            </div>
          </div>

          {/* COLUMN 2: BY BRAND */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">By Brand</h2>
            <div className="flex flex-col gap-2">
              <Link href="/search?brand=Maruti%20Suzuki" className="text-[12px] text-white/50 hover:text-white transition-all">
                Maruti Suzuki
              </Link>
              <Link href="/search?brand=Hyundai" className="text-[12px] text-white/50 hover:text-white transition-all">
                Hyundai
              </Link>
              <Link href="/search?brand=Honda" className="text-[12px] text-white/50 hover:text-white transition-all">
                Honda
              </Link>
              <Link href="/search?brand=Tata" className="text-[12px] text-white/50 hover:text-white transition-all">
                Tata
              </Link>
              <Link href="/search?brand=Toyota" className="text-[12px] text-white/50 hover:text-white transition-all">
                Toyota
              </Link>
              <Link href="/search?brand=Mahindra" className="text-[12px] text-white/50 hover:text-white transition-all">
                Mahindra
              </Link>
            </div>
          </div>

          {/* COLUMN 3: BY FUEL & TRANSMISSION */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">By Type</h2>
            <div className="flex flex-col gap-2">
              <Link href="/search?fuelType=Petrol" className="text-[12px] text-white/50 hover:text-white transition-all">
                Petrol Cars
              </Link>
              <Link href="/search?fuelType=Diesel" className="text-[12px] text-white/50 hover:text-white transition-all">
                Diesel Cars
              </Link>
              <Link href="/search?fuelType=CNG" className="text-[12px] text-white/50 hover:text-white transition-all">
                CNG Cars
              </Link>
              <Link href="/search?transmission=Automatic" className="text-[12px] text-white/50 hover:text-white transition-all">
                Automatic Cars
              </Link>
              <Link href="/search?transmission=Manual" className="text-[12px] text-white/50 hover:text-white transition-all">
                Manual Cars
              </Link>
            </div>
          </div>

          {/* COLUMN 4: BY BODY TYPE */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">By Body</h2>
            <div className="flex flex-col gap-2">
              <Link href="/search?bodyType=Hatchback" className="text-[12px] text-white/50 hover:text-white transition-all">
                Hatchback
              </Link>
              <Link href="/search?bodyType=Sedan" className="text-[12px] text-white/50 hover:text-white transition-all">
                Sedan
              </Link>
              <Link href="/search?bodyType=SUV" className="text-[12px] text-white/50 hover:text-white transition-all">
                SUV
              </Link>
              <Link href="/search?bodyType=MUV" className="text-[12px] text-white/50 hover:text-white transition-all">
                MUV
              </Link>
              <Link href="/search?bodyType=Luxury" className="text-[12px] text-white/50 hover:text-white transition-all">
                Luxury
              </Link>
            </div>
          </div>

          {/* COLUMN 5: BY LOCATION */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">By Location</h2>
            <div className="flex flex-col gap-2">
              <Link href="/search?location=Ahmedabad" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars in Ahmedabad
              </Link>
              <Link href="/search?location=Mumbai" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars in Mumbai
              </Link>
              <Link href="/search?location=Delhi" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars in Delhi
              </Link>
              <Link href="/search?location=Bangalore" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars in Bangalore
              </Link>
              <Link href="/search?location=Pune" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars in Pune
              </Link>
            </div>
          </div>

          {/* COLUMN 6: SUPPORT */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Support</h2>
            <div className="flex flex-col gap-2">
              <Link href="/help" className="text-[12px] text-white/50 hover:text-white transition-all">
                FAQs
              </Link>
              <Link href="/terms-and-conditions" className="text-[12px] text-white/50 hover:text-white transition-all">
                Terms & Conditions
              </Link>
              <Link href="/privacy-policy" className="text-[12px] text-white/50 hover:text-white transition-all">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="text-[12px] text-white/50 hover:text-white transition-all">
                Refund Policy
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default FooterLink;
