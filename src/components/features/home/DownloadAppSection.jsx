import Image from "next/image";
import AppDownloadButtons from "@/components/ui/AppDownloadButtons";

export default function DownloadAppSection() {
  return (
    <div
      className="hidden lg:block w-full aspect-[1710/600] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/app-downlaod-bg.webp')" }}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="container relative z-10">
          {/* LEFT CONTENT */}
          <div className="max-w-2xl flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl text-primary mb-6 leading-[1.15] max-w-[550px]">
              <span className="font-bold">Chat. Track. Manage.</span>
              <br />
              <span className="font-normal block mt-2">
                Everything happens in <br /> the app
              </span>
            </h2>

            <p className="text-primary/80 text-lg mb-8 max-w-lg">
              Connect with sellers, track your inspection report, and <br />   manage
              your listings — all in one place on your phone.
            </p>

            <AppDownloadButtons variant="dark" size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
