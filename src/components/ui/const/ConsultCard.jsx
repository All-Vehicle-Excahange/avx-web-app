import Image from "next/image";
import Button from "@/components/ui/button";
import { BadgeCheck, Bike, Car, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ConsultantCard(props) {
  const data = props.data || props;
  const username = data.username;
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (!containerRef.current || !data?.services) return;

    const containerWidth = containerRef.current.offsetWidth;
    let totalWidth = 0;
    let count = 0;

    const temp = document.createElement("div");
    temp.style.position = "absolute";
    temp.style.visibility = "hidden";
    temp.style.display = "flex";
    temp.style.gap = "8px";
    document.body.appendChild(temp);

    data.services.forEach((service) => {
      const span = document.createElement("span");
      span.className =
        "text-xs py-1 px-3 rounded-full border whitespace-nowrap font-medium";
      span.innerText = service
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());

      temp.appendChild(span);
      totalWidth += span.offsetWidth + 8;

      if (totalWidth < containerWidth) {
        count++;
      }
    });

    document.body.removeChild(temp);
    setVisibleCount(count);
  }, [data?.services]);

  return (
    <div className="w-[360px] rounded-2xl overflow-hidden border border-third/40 shadow-lg mx-auto flex flex-col">
      {/* COVER IMAGE */}
      <div className="relative h-[168px] w-full">
        <Image
          src={
            data?.image ||
            "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
          }
          alt="cover"
          fill
          className="object-cover p-2 rounded-2xl"
        />
      </div>

      <div className="px-5 pb-5 pt-0 relative flex flex-col flex-1">
        {" "}
        {/* PROFILE LOGO */}
        <div className="absolute">
          <div className="w-16 h-16 rounded-full border-2 border-secondary overflow-hidden bg-primary">
            <Image
              src={data?.logo || "https://i.pravatar.cc/150?img=32"}
              alt="profile"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>
        {/* TITLE */}
        <div className="pl-20">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
            {data?.name || "-"}
            {data?.isSponsored && (
              <BadgeCheck className="w-5 h-5 text-primary" />
            )}
          </h3>

          <p className="text-sm text-third mt-1">{data?.location || "-"}</p>

          <p className="flex items-center gap-1 text-sm text-third">
            <Star size={12} className="mr-1 mb-1" />
            <span>
              {data?.rating ?? 0} • {data?.reviews ?? 0} Reviews
            </span>
          </p>
        </div>
        {/* CATEGORY + PRICE */}
        <div className="flex justify-between mt-4 text-center">
          <div>
            <p className="text-xs text-left text-third">Categories</p>

            <p className="text-sm font-light text-primary/95 flex gap-2">
              {data?.vehicleTypes?.includes("TWO_WHEELER") && (
                <Bike size={20} />
              )}
              {data?.vehicleTypes?.includes("FOUR_WHEELER") && (
                <Car size={20} />
              )}
              {(!data?.vehicleTypes || data.vehicleTypes.length === 0) && "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-left text-third">Price</p>
            <p className="text-sm font-semibold text-primary">
              {data?.priceRange || "-"}
            </p>
          </div>
        </div>
        {/* SERVICES */}
        {/* SERVICES */}
        <div className="pt-4">
          <p className="text-sm font-semibold text-primary mb-3">Services</p>

          <div ref={containerRef} className="flex gap-2 overflow-hidden">
            {data?.services?.length > 0 ? (
              <>
                {data.services.slice(0, visibleCount).map((service, index) => (
                  <span
                    key={index}
                    className="
              text-xs
              py-1
              rounded-full
              border border-third/40
              bg-primary/5
              text-third
              font-medium
              whitespace-nowrap
              px-3
            "
                  >
                    {service
                      .replaceAll("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                ))}

                {visibleCount < data.services.length && (
                  <span
                    className="
              text-xs
              py-1
              font-medium
              whitespace-nowrap
              px-3
            "
                  >
                    +{data.services.length - visibleCount} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-third">-</span>
            )}
          </div>
        </div>
        {/* FOOTER */}
        <div className="flex justify-between items-center gap-3 mt-auto pt-4">
          <p className="text-xs text-third">
            Available Vehicles:{" "}
            <span className="text-primary">{data?.vehicleCount ?? 0}</span>
          </p>

          <Button
            href={`/store-front/${username || "#"}`}
            variant="outline"
            size="sm"
          >
            View StoreFront
          </Button>
        </div>
      </div>
    </div>
  );
}
