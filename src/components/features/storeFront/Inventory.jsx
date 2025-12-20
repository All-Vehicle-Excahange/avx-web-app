import VehicleCard from "@/components/ui/const/VehicleCard";

export default function Inventory() {
  const cardData = [
    {
      id: "featured-1",
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
      sponsored: false,
    },
    {
      id: "featured-2",
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
      sponsored: false,
    },
    {
      id: "featured-3",
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
      sponsored: false,
    },
    {
      id: "featured-3",
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
      sponsored: false,
    },
    {
      id: "featured-3",
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
      sponsored: false,
    },
    {
      id: "featured-3",
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
      sponsored: false,
    },
    {
      id: "featured-3",
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
      sponsored: false,
    },
  ];

  return (
    <section className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-6">
      {/* VEHICLE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cardData.map((car) => (
          <VehicleCard key={car.id} data={car} />
        ))}
      </div>
    </section>
  );
}
