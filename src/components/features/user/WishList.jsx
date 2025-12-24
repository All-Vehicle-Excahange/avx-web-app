import ConsultantCard from "@/components/ui/const/ConsultCard";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React from "react";

function Wishlist() {
  const cardData = [
    {
      id: "1",
      title: "BMW 8-2-Door",
      subtitle: "35 D6 Powerful lorem isump",
      year: "2022",
      transmission: "Manual",
      fuel: "Diesel",
      seats: "5",
      drivetrain: "Front Wheel Drive",
      rating: "4.3",
      price: "6,75,998",
      image: "/big_card_car.jpg",
    },
    {
      id: "2",
      title: "Audi A6 Sedan",
      subtitle: "Luxury comfort performance",
      year: "2021",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: "5",
      drivetrain: "All Wheel Drive",
      rating: "4.5",
      price: "5,40,000",
      image: "/big_card_car.jpg",
    },
    {
      id: "3",
      title: "Mercedes C-Class",
      subtitle: "Premium driving experience",
      year: "2020",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: "5",
      drivetrain: "Rear Wheel Drive",
      rating: "4.2",
      price: "4,95,000",
      image: "/big_card_car.jpg",
    },
    {
      id: "4",
      title: "Mercedes C-Class",
      subtitle: "Premium driving experience",
      year: "2020",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: "5",
      drivetrain: "Rear Wheel Drive",
      rating: "4.2",
      price: "4,95,000",
      image: "/big_card_car.jpg",
    },
  ];

  const consultants = [
    {
      id: 1,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png",
      priceRange: "10L - 18L",
      isSponsored: false,
    },
    {
      id: 2,
      name: "Shree Motors",
      location: "Ahmedabad, Gujarat",
      rating: 4.2,
      vehicleCount: 90,
      image: "/cs.png",
      priceRange: "80K - 1.5L",
      isSponsored: true,
    },
    {
      id: 3,
      name: "Prime Auto Hub",
      location: "Mehsana, Gujarat",
      rating: 4.6,
      vehicleCount: 140,
      image: "/cs.png",
      priceRange: "5L - 20L",
      isSponsored: false,
    },
    {
      id: 4,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png",
      priceRange: "10L - 18L",
      isSponsored: false,
    },
  ];

  return (
    <>
      <section className="w-full container rounded-2xl bg-secondary p-6 space-y-12">
        <div>
          <h1 className="text-3xl font-extrabold mb-6">Vehicle Wishlist</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cardData.map((car, index) => (
              <VehicleCard key={`${car.id}-${index}`} data={car} />
            ))}
          </div>
        </div>

        {/* CONSULTANT WISHLIST */}
        <div>
          <h1 className="text-3xl font-extrabold mb-6">Consultant Wishlist</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultants.map((item) => (
              <ConsultantCard
                key={item.id}
                image={item.image}
                name={item.name}
                location={item.location}
                rating={item.rating}
                vehicleCount={item.vehicleCount}
                priceRange={item.priceRange}
                isSponsored={item.isSponsored}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Wishlist;
