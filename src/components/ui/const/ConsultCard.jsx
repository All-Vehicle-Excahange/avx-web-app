import Image from "next/image";
import Button from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";

export default function ConsultantCard() {
  return (
    <div className="w-[360px] rounded-2xl overflow-hidden border border-third/40  shadow-lg mx-auto">
      {/* ✅ Cover Image */}
      <div className="relative h-[150px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
          alt="cover"
          fill
          className="object-cover"
        />
      </div>

      {/* ✅ Profile Section */}
      <div className="px-5 pb-5 pt-0 relative">
        {/* ✅ Avatar (Only this overlaps image) */}
        <div className="absolute -top-8 left-5">
          <div className="w-16 h-16 rounded-full border-4 border-secondary overflow-hidden bg-primary">
            <Image
              src="https://i.pravatar.cc/150?img=32"
              alt="profile"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>

        {/* ✅ Title Content (Now stays below image) */}
        <div className="pl-20">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
         Adarsh Consultants
            {/* <BadgeCheck className="w-5 h-5 text-primary" /> */}
          </h3>

          <p className="text-sm text-third mt-1">Chhapi, Gujarat</p>
          <p className="text-sm text-third">4.5 • Reviews</p>
        </div>

        {/* ✅ Categories + Vehicles + Price Row (Same Line) */}
        <div className="flex justify-between mt-4 text-center">
          <div>
            <p className="text-xs text-third">Categories</p>
            <p className="text-sm font-semibold text-primary">Not available</p>
          </div>

          <div>
            <p className="text-xs text-third">Available Vehicles</p>
            <p className="text-sm font-semibold text-primary">116</p>
          </div>

          <div>
            <p className="text-xs text-third">Price</p>
            <p className="text-sm font-semibold text-primary">1L - 2L</p>
          </div>
        </div>

        {/* ✅ Services Chips (3 Per Row) */}
        <div className="mt-6 border-t border-third/30 pt-4">
          <p className="text-sm font-semibold text-primary mb-3">Services</p>

          <div className="grid grid-cols-3 gap-2">
            {[
              "Test Drive",
              "Financing",
              "Warranty",
              "Exchange",
              "Insurance",
              "Support",
            ].map((service, index) => (
              <span
                key={index}
                className="
            text-xs
            px-3 py-1
            rounded-full
            border border-third/40
            bg-primary/5
            text-third
            text-center
            font-medium
          "
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* ✅ Buttons */}
        <div className="flex justify-end  gap-3 mt-6">
          <Button variant="outline" size="sm" >
            View StoreFront
          </Button>
        </div>
      </div>
    </div>
  );
}
