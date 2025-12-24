import React, { useState } from "react";
import UserVehicleCard from "./UserVehicleCard";

function MyVehicle() {
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
    <section className="w-full container rounded-2xl bg-secondary p-6 space-y-6">
      {/* FILTER */}
      <div className="flex flex-wrap gap-2">
        {vehicleTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-4 py-2 rounded-full border border-third/50 text-sm font-medium transition
              ${
                activeType === type.id
                  ? "bg-primary text-secondary"
                  : "bg-third/10 text-primary hover:bg-third/20"
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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

export default MyVehicle;
