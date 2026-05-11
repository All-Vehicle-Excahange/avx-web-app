import Banner from "@/components/ui/const/Banner";

export default function ConsultBanner() {
  return (
    <>
      <div className="w-full 3xl:max-w-full mx-auto ">
        <div
          className="w-full h-[280px] md:h-80 overflow-hidden bg-cover bg-center  relative bg-fourth"

        >
          <Banner
            title="Already in the car business? Bring it online."
            description="If you're an auto consultant running your business on calls and WhatsApp, Reecomm gives you a digital storefront — list your inventory, manage inquiries, and reach buyers you'd never find offline."
            buttonText="Become a consultant"
            navigationPath={"/consult"}
          />
        </div>
      </div>
    </>
  );
}
