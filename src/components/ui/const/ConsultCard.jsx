import Image from "next/image";
import Button from "@/components/ui/button";
import {BadgeCheck, Bike, Car, Star} from "lucide-react";

export default function ConsultantCard({ data, id }) {
  return (
    <div className="w-[360px] rounded-2xl overflow-hidden border border-third/40  shadow-lg mx-auto">
      <div className="relative h-[168px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
          alt="cover"
          fill
          className="object-cover p-2 rounded-2xl"
        />
      </div>

      <div className="px-5 pb-5 pt-0 relative">
        <div className="absolute">
          <div className="w-16 h-16 rounded-full border-2 border-secondary overflow-hidden bg-primary">
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
          <p className="flex items-center gap-1 text-sm text-third">
            <Star size={12} className="mr-1 mb-1" />
            <span>4.5 • Reviews</span>
          </p>
        </div>


        <div className="flex justify-between mt-4 text-center">
          <div>
            <p className="text-xs text-left text-third">Categories</p>
            {/*<p className="text-sm font-light text-primary/95">Two Wheelers, Four Wheelers</p>*/}
            <p className="text-sm font-light text-primary/95"><Bike  size={20}/>  </p>

          </div>
          <div>
            <p className="text-xs text-left text-third">Price</p>
            <p className="text-sm font-semibold text-primary">1L - 2L</p>
          </div>
        </div>

        {/*  Services Chips (4 Per Row) */}
        <div className="  pt-4">
          <p className="text-sm font-semibold text-primary mb-3">Services</p>

          <div className="grid grid-cols-4 gap-2">
            {[
              "Test Drive",
              "Financing",
              "Warranty",
              "Exchange",
            ].map((service, index) => (
              <span
                key={index}
                className="
            text-xs
             py-1
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

        {/*  Buttons */}
        <div className="flex justify-between items-center gap-3 mt-4">

          <p className="text-xs text-third">Available Vehicles: <span className="text-primary">116</span> </p>
          {/*<p className="text-sm font-semibold text-primary">116</p>*/}
          <Button href={`/store-front/${id}`} variant="outline" size="sm">
            View StoreFront
          </Button>
        </div>


      </div>
    </div>
  );
}
