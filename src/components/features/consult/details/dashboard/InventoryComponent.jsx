"use client";

import { useState } from "react";
import UserVehicleCard from "@/components/features/user/UserVehicleCard";
import StatCard from "./components/StateCard";
import {
  SlidersHorizontal,
  ChevronDown,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import Button from "@/components/ui/button";

export default function InventoryComponent() {
  const cardData = [
    {
      id: "1",
      title: "BMW 8-2-Door",
      year: "2022",
      transmission: "Manual",
      fuel: "Diesel",
      seats: "5",
      rating: "4.3",
      price: "6,75,998",
      image: "/big_card_car.jpg",
      status: "live",
      inquiries: 12,
      chats: 3,
      avxInspected: true,
    },
    {
      id: "2",
      title: "Audi A6 Sedan",
      year: "2021",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: "5",
      rating: "4.5",
      price: "5,40,000",
      image: "/big_card_car.jpg",
      status: "draft",
    },
    {
      id: "3",
      title: "Mercedes C-Class",
      year: "2020",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: "5",
      rating: "4.2",
      price: "4,95,000",
      image: "/big_card_car.jpg",
      status: "sold",
      soldDate: "12 Aug 2025",
    },
    {
      id: "4",
      title: "Range Rover Evoque",
      year: "2022",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: "5",
      rating: "4.6",
      price: "8,95,000",
      image: "/big_card_car.jpg",
      status: "live",
      inquiries: 8,
      chats: 1,
    },
  ];

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "draft", label: "Draft" },
    { id: "live", label: "Live" },
    { id: "sold", label: "Sold" },
  ];

  const [activeType, setActiveType] = useState("all");
  const filtered =
    activeType === "all"
      ? cardData
      : cardData.filter((v) => v.status === activeType);

  return (
    <section className="w-full space-y-8">
      {/* 1️⃣ TITLE + BUTTON */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory Activity</h1>
          <p className="text-third text-sm mt-1">
            Track inventory health & performance
          </p>
        </div>

        <Button className="" variant="ghost" showIcon={false}> 
          <Smartphone className="mr-3" size={16} />
          Add Vehicle
        </Button>
      </div>

      {/* 2️⃣ NOTE */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
        <p className="text-sm">
          📱 <span className="font-semibold">Note:</span> Adding and editing
          vehicles is available on the AVX mobile app. You can view listings and
          mark vehicles as sold here.
        </p>
      </div>

      {/* 3️⃣ TOP PERFORMING VEHICLES */}
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-primary" size={18} />
          <h3 className="font-semibold">Top Performing Vehicles</h3>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-xs">
            Auto-generated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<span className="font-bold text-primary">#1</span>}
            label="BMW X1"
            value="12 inquiries"
          />
          <StatCard
            icon={<span className="font-bold text-primary">#2</span>}
            label="Fortuner"
            value="9 inquiries"
          />
          <StatCard
            icon={<span className="font-bold text-primary">#3</span>}
            label="Honda City"
            value="8 inquiries"
          />
        </div>
      </div>

      {/* 4️⃣ FILTER BAR */}
      <div className="rounded-2xl border border-third/30 bg-secondary p-5 flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-4 py-2 rounded-full border border-third/40 text-sm transition
                ${
                  activeType === type.id
                    ? "bg-primary text-secondary"
                    : "hover:bg-primary/10"
                }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-third/40 hover:bg-primary/10 transition">
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-third/40 hover:bg-primary/10 transition">
            Sort <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* 5️⃣ VEHICLE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((car) => (
          <UserVehicleCard
            key={car.id}
            data={car}
            status={car.status}
            avxInspected={car.avxInspected}
            inquiries={car.inquiries}
            chats={car.chats}
            soldDate={car.soldDate}
          />
        ))}
      </div>
    </section>
  );
}
