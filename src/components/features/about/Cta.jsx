import React from "react";
import Link from "next/link";
import { CarFront, Store, Tag, ArrowRight } from "lucide-react";
import Banner from "@/components/ui/const/Banner";

export default function Cta({
  leftHref = "/became-seller",
  leftTag = "For Sellers",
  leftTitle = (
    <>
      Sell Your <br /> Vehicles
    </>
  ),
  leftDesc = "Stop settling for lowball offers. List your car on Reecomm and reach thousands of genuine buyers across all India  — for free.",
  leftBtnText = "List your Vehicle",
  leftBtnTag = "It's free",
  leftIcon: LeftIcon = CarFront,

  rightHref = "/consult",
  rightTag = "For Consultants",
  rightTitle = (
    <>
      Already in the <br /> Vehicle business?
    </>
  ),
  rightDesc = "Reecomm gives you a digital storefront to list your inventory, manage inquiries, and reach buyers you'd never find offline.",
  rightBtnText = "Become a consultant",
  rightIcon: RightIcon = Store,

  mobileTitle = "Already in the car business? Bring it online.",
  mobileDesc = "If you're an auto consultant running your business on calls and WhatsApp, Reecomm gives you a digital storefront — list your inventory, manage inquiries, and reach buyers you'd never find offline.",
  mobileBtnText = "Become a consultant",
}) {
  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden md:block w-full">
        <section className="bg-fourth relative z-10 -mb-6 md:-mb-10 w-full">
          <div className="mx-auto w-full h-auto">
            <div className="flex flex-col md:flex-row overflow-hidden">
              {/* LEFT COLUMN */}
              <Link
                href={leftHref}
                className="
                  group
                  flex-1
                  flex flex-col
                  transition-all duration-500 ease-out
                  hover:bg-white/20
                  hover:flex-[1.3]
                  px-10 py-16 lg:py-20
                  text-center
                  border-b md:border-b-0 md:border-r border-primary/30
                "
              >
                <div className="flex-1">
                  <div className="max-w-lg mx-auto">
                    <div className="flex items-center justify-start gap-10 mb-6">
                      {LeftIcon && (
                        <div className="h-20 w-20 rounded-full border mt-8 border-primary/30 flex items-center justify-center shrink-0">
                          <LeftIcon
                            size={32}
                            className="text-primary"
                            strokeWidth={1.7}
                          />
                        </div>
                      )}

                      <div className="text-left">
                        <p className="text-primary text-md tracking-[0.35em] uppercase font-semibold relative inline-block">
                          {leftTag}
                          <span className="absolute left-0 -bottom-2 h-[2px] w-1/2 bg-linear-to-r from-neutral-100 to-transparent rounded-full"></span>
                        </p>

                        <h3 className="text-2xl sm:text-3xl font-bold font-primary text-primary mt-4">
                          {leftTitle}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 max-w-lg text-base text-left text-primary/80 mx-auto leading-relaxed">
                    {leftDesc}
                  </p>
                </div>

                <div className="mt-10">
                  <div className="max-w-lg mx-auto text-left">
                    <div className="group/btn inline-flex items-center bg-transparent hover:bg-white border border-white/40 hover:border-transparent text-white hover:text-secondary rounded-full p-1.5 pr-6 shadow-xl transition-all duration-300 group-hover:scale-105">
                      <div className="bg-white/10 group-hover/btn:bg-blue-50 p-2.5 rounded-full mr-4 transition-colors duration-300">
                        <Tag
                          size={24}
                          className="text-white group-hover/btn:text-secondary"
                          strokeWidth={2.5}
                        />
                      </div>
                      <span className="font-bold text-lg whitespace-nowrap transition-colors duration-300">
                        {leftBtnText}
                      </span>
                      {leftBtnTag && (
                        <>
                          <div className="mx-5 h-6 w-[1.5px] bg-white/20 group-hover/btn:bg-gray-200 transition-colors duration-300"></div>
                          <span className="text-white/80 group-hover/btn:text-secondary font-semibold whitespace-nowrap transition-colors duration-300">
                            {leftBtnTag}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* RIGHT COLUMN */}
              <Link
                href={rightHref}
                className="
                  group
                  flex-1
                  flex flex-col
                  transition-all duration-500 ease-out
                  hover:bg-white/20
                  hover:flex-[1.3]
                  px-10 py-16 lg:py-20
                  text-center
                "
              >
                <div className="flex-1">
                  <div className="max-w-lg mx-auto">
                    <div className="flex items-center justify-start gap-10 mb-6">
                      {RightIcon && (
                        <div className="h-20 w-20 mt-8 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                          <RightIcon
                            size={32}
                            className="text-primary"
                            strokeWidth={1.7}
                          />
                        </div>
                      )}

                      <div className="text-left">
                        <p className="text-primary text-md tracking-[0.35em] uppercase font-semibold relative inline-block">
                          {rightTag}
                          <span className="absolute left-0 -bottom-2 h-[2px] w-1/2 bg-linear-to-r from-neutral-100 to-transparent rounded-full"></span>
                        </p>

                        <h3 className="text-2xl font-bold font-primary sm:text-3xl text-primary mt-4">
                          {rightTitle}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-base text-primary/80 max-w-lg mx-auto leading-relaxed text-left">
                    {rightDesc}
                  </p>
                </div>

                <div className="mt-10">
                  <div className="max-w-lg mx-auto text-left">
                    <div className="group/btn2 inline-flex items-center bg-transparent hover:bg-white border border-white/40 hover:border-transparent text-white hover:text-secondary rounded-full p-1.5 pr-3 shadow-xl transition-all duration-300 group-hover:scale-105">
                      {RightIcon && (
                        <div className="bg-white/10 group-hover/btn2:bg-blue-50 p-3 rounded-full mr-2 transition-colors duration-300">
                          <RightIcon
                            size={24}
                            className="text-white group-hover/btn2:text-secondary"
                            strokeWidth={2}
                          />
                        </div>
                      )}
                      <span className="font-bold text-lg mr-4 whitespace-nowrap">
                        {rightBtnText}
                      </span>
                      <div className="mx-3 h-6 w-[1.5px] bg-white/20 group-hover/btn2:bg-gray-200 mr-5 transition-colors duration-300"></div>
                      <div className="w-10 h-10 rounded-full border border-white/40 group-hover/btn2:border-secondary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <ArrowRight
                          size={20}
                          className="text-white group-hover/btn2:text-secondary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE VIEW */}
      <div className="block md:hidden w-full">
        <div className="w-full 3xl:max-w-full mx-auto">
          <div className="w-full h-[280px] md:h-80 overflow-hidden bg-cover bg-center relative bg-fourth">
            <Banner
              title={mobileTitle}
              description={mobileDesc}
              buttonText={mobileBtnText}
              navigationPath={rightHref}
            />
          </div>
        </div>
      </div>
    </>
  );
}
