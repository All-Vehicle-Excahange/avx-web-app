import Banner from "@/components/ui/const/Banner";

export default function SellVehicleBanner() {
  return (
    <>
      <div className="w-full my-12 3xl:max-w-full mx-auto ">
        <div
          className="w-full h-[250px] md:h-[320px] overflow-hidden bg-cover bg-center  relative bg-fourth "

        >
          <Banner
            title="Sell Your Vehicles"
            description="Stop settling for lowball offers. List your car on Reecomm and reach thousands of genuine buyers across Gujarat and Maharashtra — for free."
            buttonText="List your car — it's free"
            navigationPath={"/became-seller"}
          />
        </div>
      </div>
    </>
  );
}
