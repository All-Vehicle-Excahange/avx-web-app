"use client";

import Button from "@/components/ui/button";
import {
  Heart,
  Star,
  MapPin,
  Gauge,
  Fuel,
  Settings,
  Car,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function VehicleSummaryRight({ vehicle }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <aside className="relative  text-primary rounded-2xl shadow-xl overflow-hidden border border-third/60">
      <div className="relative z-10 p-6 space-y-5">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-third">
              Register {vehicle?.yearOfMfg || 2025}
            </p>

            <h2 className="text-2xl font-bold leading-tight">
              {vehicle?.makerName || "Tata"}{" "}
              {vehicle?.modelName || "Harrier XZ Plus"}
            </h2>
          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className=" text-primary p-2 rounded-full hover:scale-105 transition cursor-pointer border"
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-primary"
              }`}
            />
          </button>
        </div>

        <div className="border-t border-third/40" />

        {/* DEALER INFO — FIGMA STYLE */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          {/* LEFT CONTENT */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold">
              {vehicle?.dealerName || "Adarsh Auto Consultants"}
            </h3>

            <div className="flex items-center gap-2 text-sm">
              <Star className="text-yellow-400" size={16} />
              <span className="font-medium text-primary">4.2</span>
              <span className="text-third">| 250 Sold Vehicles</span>
            </div>

            <p className="flex items-center gap-2 text-sm text-third">
              <MapPin size={14} />
              AVX Park, Ahmedabad
            </p>

            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium text-primary">
                What’s Included
              </p>

              <ul className="text-sm text-third">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Price Negotiable
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Loan Assistance
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Exchange Accepted
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Test Drive Available
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <div className="shrink-0">
            <Button href={`/store-front/1`} variant="outline" showIcon={true}>
              View Storefront
            </Button>
          </div>
        </div>

        <div className="border-t border-third/40" />

        {/* INQUIRY STATUS */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-third">Current Inquiries</span>
            <span className="font-semibold text-primary">15</span>
          </div>

          <div className="w-full h-2 bg-third/30 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-primary rounded-full" />
          </div>

          <p className="text-sm text-third">High demand – Book soon!</p>
        </div>

        <div className="border-t border-third/40" />

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="ghost"
            size="md"
            showIcon={false}
            className="rounded-full"
          >
            Book NOW
          </Button>

          <Button variant="outline" size="md" showIcon={false}>
            Inquiry Chat
          </Button>
        </div>
      </div>
    </aside>
  );
}
