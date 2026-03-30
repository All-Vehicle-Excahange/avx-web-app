
import Link from "next/link";
import Image from "next/image";
import React from "react";

const FooterLink = () => {
  return (
    <footer className="">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 py-10">

          {/* COLUMN 1: TOP STORIES (SEO CONTENT) */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white"> Top Stories</h2>

            <div className="flex flex-col gap-2">
              <Link href="/blog/best-cars-under-5-lakh" className="text-[12px] text-white/50 hover:text-white transition-all">
                Best Cars Under 5 Lakh in India
              </Link>

              <Link href="/blog/how-to-sell-car-fast" className="text-[12px] text-white/50 hover:text-white transition-all">
                How to Sell Your Car Fast
              </Link>

              <Link href="/blog/used-car-buying-guide" className="text-[12px] text-white/50 hover:text-white transition-all">
                Complete Used Car Buying Guide
              </Link>

              <Link href="/blog/car-inspection-checklist" className="text-[12px] text-white/50 hover:text-white transition-all">
                Car Inspection Checklist Before Buying
              </Link>

              <Link href="/blog/best-mileage-cars-india" className="text-[12px] text-white/50 hover:text-white transition-all">
                Best Mileage Cars in India
              </Link>
            </div>
          </div>

          {/* COLUMN 2: RECOMMENDED (SEO) */}
          <div className="flex flex-col gap-6">

            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white"> Recommended</h2>

            <div className="flex flex-col gap-2">
              <Link href="/buy-used-cars" className="text-[12px] text-white/50 hover:text-white transition-all">
                Buy Used Cars
              </Link>

              <Link href="/sell-used-car" className="text-[12px] text-white/50 hover:text-white transition-all">
                Sell Your Car
              </Link>

              <Link href="/used-cars-in-india" className="text-[12px] text-white/50 hover:text-white transition-all">
                Used Cars in India
              </Link>

              <Link href="/cars-under-5-lakh" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars Under 5 Lakh
              </Link>

              <Link href="/best-family-cars" className="text-[12px] text-white/50 hover:text-white transition-all">
                Best Family Cars
              </Link>
            </div>
          </div>

          {/* COLUMN 3: SERVICES (SEO OPTIMIZED) */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white"> Services</h2>


            <div className="flex flex-col gap-2">
              <Link href="/sell-used-car" className="text-[12px] text-white/50 hover:text-white transition-all">
                Sell Your Car
              </Link>

              <Link href="/car-inspection-service" className="text-[12px] text-white/50 hover:text-white transition-all">
                Car Inspection Service
              </Link>

              <Link href="/car-valuation" className="text-[12px] text-white/50 hover:text-white transition-all">
                Car Valuation
              </Link>

              <Link href="/rc-transfer-service" className="text-[12px] text-white/50 hover:text-white transition-all">
                RC Transfer Service
              </Link>

              <Link href="/doorstep-car-inspection" className="text-[12px] text-white/50 hover:text-white transition-all">
                Doorstep Inspection
              </Link>
            </div>
          </div>

          {/* COLUMN 4: EXPLORE (SEO OPTIMIZED) */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white"> Explore</h2>

            <div className="flex flex-col gap-2">
              <Link href="/used-cars" className="text-[12px] text-white/50 hover:text-white transition-all">
                All Used Cars
              </Link>

              <Link href="/used-cars-by-brand" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars by Brand
              </Link>

              <Link href="/used-cars-by-budget" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars by Budget
              </Link>

              <Link href="/latest-car-listings" className="text-[12px] text-white/50 hover:text-white transition-all">
                New Arrivals
              </Link>

              <Link href="/car-buying-guide" className="text-[12px] text-white/50 hover:text-white transition-all">
                Car Buying Guide
              </Link>
            </div>
          </div>

          {/* COLUMN 5: POPULAR SEARCHES (SEO BOOST) */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white"> Popular Searches</h2>

            <div className="flex flex-col gap-2">
              <Link href="/used-cars-in-ahmedabad" className="text-[12px] text-white/50 hover:text-white transition-all">
                Used Cars in Ahmedabad
              </Link>

              <Link href="/used-cars-in-delhi" className="text-[12px] text-white/50 hover:text-white transition-all">
                Used Cars in Delhi
              </Link>

              <Link href="/used-cars-in-mumbai" className="text-[12px] text-white/50 hover:text-white transition-all">
                Used Cars in Mumbai
              </Link>

              <Link href="/used-hyundai-cars" className="text-[12px] text-white/50 hover:text-white transition-all">
                Used Hyundai Cars
              </Link>

              <Link href="/used-maruti-cars" className="text-[12px] text-white/50 hover:text-white transition-all">
                Used Maruti Cars
              </Link>

              <Link href="/cars-under-3-lakh" className="text-[12px] text-white/50 hover:text-white transition-all">
                Cars Under 3 Lakh
              </Link>

              <Link href="/automatic-cars" className="text-[12px] text-white/50 hover:text-white transition-all">
                Automatic Cars
              </Link>
            </div>
          </div>

          {/* COLUMN 5: HELP & SUPPORT (SEO + TRUST) */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white"> Help & Support</h2>
            <div className="flex flex-col gap-2">
              <Link href="/faqs" className="text-[12px] text-white/50 hover:text-white transition-all">
                FAQs
              </Link>

              <Link href="/customer-support" className="text-[12px] text-white/50 hover:text-white transition-all">
                Customer Care
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
