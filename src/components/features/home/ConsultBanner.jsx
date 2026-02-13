import Banner from "@/components/ui/const/Banner";

export default function ConsultBanner() {
  return (
    <>
      <div className="w-full   3xl:max-w-full mx-auto ">
        <div
          className="w-full h-[250px] md:h-80 overflow-hidden bg-cover bg-center rounded-lg relative bg-fourth"
          
        >
          <Banner
            title="Are you a consultant? List your cars"
            description="Easily showcase your available cars and reach more clients instantly. Manage listings, inquiries, and bookings all in one place."
            buttonText="Become a Consultant"
            navigationPath={"/consult"}
          />
        </div>
      </div>
    </>
  );
}
