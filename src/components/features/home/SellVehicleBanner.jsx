import Banner from "@/components/ui/const/Banner";

export default function SellVehicleBanner() {
  return (
    <>
      <div className="w-full my-12 3xl:max-w-full mx-auto ">
        <div
          className="w-full h-[250px] md:h-[320px] overflow-hidden bg-cover bg-center rounded-lg relative bg-[#007bff] "
        
        >
          <Banner
            title="Sell Your Vehicles"
            description="Easily showcase your available cars and reach more clients instantly. Manage listings, inquiries, and bookings all in one place."
            buttonText="Sell Your Vehicles"
          />
        </div>
      </div>
    </>
  );
}
