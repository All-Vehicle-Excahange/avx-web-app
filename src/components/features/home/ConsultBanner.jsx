import Banner from "@/components/ui/const/Banner";

export default function ConsultBanner() {
  return (
    <>
      <div className="w-full my-12  3xl:max-w-screen-2xl mx-auto">
        <div
          className="w-full h-[250px] md:h-[200px] overflow-hidden bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('/banner_que.jpg')",
          }}
        >
          <Banner
            title="Are you a consultant? List your cars"
            description="Easily showcase your available cars and reach more clients instantly. Manage listings, inquiries, and bookings all in one place."
            buttonText="Become a Consultant"
          />
        </div>
      </div>
    </>
  );
}
