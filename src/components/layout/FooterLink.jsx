import Link from "next/link";
import React from "react";

const FooterLink = () => {
  return (
    <footer className="">
      <div className="container">
        {/* ROW 1: CAR SEARCH & SUPPORT */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 py-10">
          {/* COLUMN 1: BY BUDGET */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              By Budget
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/search/buy-used-cars-under-2-lakhs"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars under 2 Lakh
              </Link>
              <Link
                href="/search/buy-used-cars-under-5-lakhs"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars under 5 Lakh
              </Link>
              <Link
                href="/search/buy-used-cars-under-10-lakhs"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars under 10 Lakh
              </Link>
              <Link
                href="/search/buy-used-cars-under-20-lakhs"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars under 20 Lakh
              </Link>
              <Link
                href="/search/buy-used-cars-above-50-lakhs"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Luxury Cars above 50 Lakh
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-under-30k"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers under 30k
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-under-50k"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers under 50k
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-under-80k"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers under 80k
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-under-1-lakh"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers under 1 Lakh
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-under-1.5-lakh"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers under 1.5 Lakh
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-under-2-lakh"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers under 2 Lakh
              </Link>
            </div>
          </div>

          {/* COLUMN 2: BY BRAND */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              By Brand
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/search/buy-used-maruti-suzuki-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Maruti Suzuki
              </Link>
              <Link
                href="/search/buy-used-hyundai-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Hyundai
              </Link>
              <Link
                href="/search/buy-used-honda-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Honda
              </Link>
              <Link
                href="/search/buy-used-tata-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Tata
              </Link>
              <Link
                href="/search/buy-used-toyota-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Toyota
              </Link>
              <Link
                href="/search/buy-used-mahindra-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Mahindra
              </Link>

              <Link
                href="/search/buy-used-hero-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Hero
              </Link>
              <Link
                href="/search/buy-used-tvs-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                TVS
              </Link>
              <Link
                href="/search/buy-used-bajaj-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Bajaj
              </Link>
              <Link
                href="/search/buy-used-royal-enfield-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Royal Enfield
              </Link>
              <Link
                href="/search/buy-used-yamaha-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Yamaha
              </Link>
              <Link
                href="/search/buy-used-ola-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                OLA
              </Link>
            </div>
          </div>

          {/* COLUMN 3: BY FUEL & TRANSMISSION */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              By Type
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/search/buy-used-petrol-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Petrol Cars
              </Link>
              <Link
                href="/search/buy-used-diesel-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Diesel Cars
              </Link>
              <Link
                href="/search/buy-used-cng-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                CNG Cars
              </Link>
              <Link
                href="/search/buy-used-automatic-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Automatic Cars
              </Link>
              <Link
                href="/search/buy-used-manual-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Manual Cars
              </Link>

              <Link
                href="/search/buy-used-electric-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Electric Two Wheelers
              </Link>
              <Link
                href="/search/buy-used-petrol-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Petrol Two Wheelers
              </Link>
              <Link
                href="/search/buy-used-cng-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                CNG Two Wheelers
              </Link>
              <Link
                href="/search/buy-used-automatic-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Automatic Two Wheelers
              </Link>
              <Link
                href="/search/buy-used-manual-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Manual Two Wheelers
              </Link>
            </div>
          </div>

          {/* COLUMN 4: BY BODY TYPE */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              By Body
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/search/buy-used-hatchback-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Hatchback
              </Link>
              <Link
                href="/search/buy-used-sedan-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Sedan
              </Link>
              <Link
                href="/search/buy-used-suv-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                SUV
              </Link>
              <Link
                href="/search/buy-used-muv-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                MUV
              </Link>
              <Link
                href="/search/buy-used-luxury-cars"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Luxury
              </Link>
              <Link
                href="/search/buy-used-scooter-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Scooters
              </Link>
              <Link
                href="/search/buy-used-commuter-bikes-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Commuter Bikes
              </Link>
              <Link
                href="/search/buy-used-sports-bikes-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Sports Bikes
              </Link>
              <Link
                href="/search/buy-used-cruiser-retro-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cruiser & Retro
              </Link>
              <Link
                href="/search/buy-used-adventure-touring-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Adventure & Touring
              </Link>
              <Link
                href="/search/buy-used-electric-2w-two-wheelers"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Electric 2W
              </Link>
            </div>
          </div>

          {/* COLUMN 5: BY LOCATION */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              By Location
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/search/buy-used-cars-ahmedabad"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars in Ahmedabad
              </Link>
              <Link
                href="/search/buy-used-cars-mumbai"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars in Mumbai
              </Link>
              <Link
                href="/search/buy-used-cars-delhi"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars in Delhi
              </Link>
              <Link
                href="/search/buy-used-cars-bangalore"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars in Bangalore
              </Link>
              <Link
                href="/search/buy-used-cars-pune"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Cars in Pune
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-ahmedabad"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers in Ahmedabad
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-mumbai"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers in Mumbai
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-delhi"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers in Delhi
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-bangalore"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers in Bangalore
              </Link>
              <Link
                href="/search/buy-used-two-wheelers-pune"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Two Wheelers in Pune
              </Link>
            </div>
          </div>

          {/* COLUMN 6: SUPPORT */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Support
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/help"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                FAQs
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="/refund-policy"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="border-t border-white/10" />

        {/* ROW 2: CONSULTATION SEARCH */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 py-10">
          {/* COLUMN 1: CONSULT BY BUDGET */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Consult By Budget
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/consult/discovery?priceRange=0-2L"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Under 2 Lakh
              </Link>
              <Link
                href="/consult/discovery?priceRange=0-5L"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Under 5 Lakh
              </Link>
              <Link
                href="/consult/discovery?priceRange=0-10L"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Under 10 Lakh
              </Link>
              <Link
                href="/consult/discovery?priceRange=0-20L"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Under 20 Lakh
              </Link>
              <Link
                href="/consult/discovery?priceRange=50L-200L"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Above 50 Lakh
              </Link>
            </div>
          </div>

          {/* COLUMN 2: CONSULT BY BRAND */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Consult By Brand
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/consult/discovery?makerIds=21"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Maruti Suzuki
              </Link>
              <Link
                href="/consult/discovery?makerIds=15"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Hyundai
              </Link>
              <Link
                href="/consult/discovery?makerIds=14"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Honda
              </Link>
              <Link
                href="/consult/discovery?makerIds=34"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Tata
              </Link>
              <Link
                href="/consult/discovery?makerIds=35"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Toyota
              </Link>
              <Link
                href="/consult/discovery?makerIds=20"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Mahindra
              </Link>
            </div>
          </div>

          {/* COLUMN 3: CONSULT BY BODY */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Consult By Body
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/consult/discovery?vehicleSubTypes=HATCHBACK"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Hatchback
              </Link>
              <Link
                href="/consult/discovery?vehicleSubTypes=SEDAN"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Sedan
              </Link>
              <Link
                href="/consult/discovery?vehicleSubTypes=SUV"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                SUV
              </Link>
              <Link
                href="/consult/discovery?vehicleSubTypes=MUV"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                MUV
              </Link>
              <Link
                href="/consult/discovery?vehicleSubTypes=LUXURY"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Luxury
              </Link>
            </div>
          </div>

          {/* COLUMN 4: CONSULT BY SERVICE */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Consult By Service
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/consult/discovery?service=BUY"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Buy
              </Link>
              <Link
                href="/consult/discovery?service=SELL"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Sell
              </Link>
              <Link
                href="/consult/discovery?service=EXCHANGE"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Exchange
              </Link>
              <Link
                href="/consult/discovery?service=FINANCE"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Finance
              </Link>
              <Link
                href="/consult/discovery?service=OTHER"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Other
              </Link>
            </div>
          </div>

          {/* COLUMN 5: CONSULT BY LOCATION */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Consult By Location
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/consult/discovery?location=Ahmedabad"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Ahmedabad
              </Link>
              <Link
                href="/consult/discovery?location=Mumbai"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Mumbai
              </Link>
              <Link
                href="/consult/discovery?location=Delhi"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Delhi
              </Link>
              <Link
                href="/consult/discovery?location=Bangalore"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Bangalore
              </Link>
              <Link
                href="/consult/discovery?location=Pune"
                className="text-[12px] text-white/60 hover:text-white transition-all"
              >
                Pune
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLink;
