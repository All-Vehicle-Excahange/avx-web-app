import React, { useMemo } from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import ConsultantCardSkeleton from "@/components/ui/skeleton/ConsultantCardSkeleton";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getRelatedConsultantsQuery } from "@/queries/vehicle.queries";

export default function ReletedConsualt(props) {
  // ✅ HARD SAFE DEFAULT
  const safeLimit = typeof props.limit === "number" ? props.limit : 4;
  const { push } = useRouter();

  // Build payload dynamically
  const payload = useMemo(() => {
    const p = {};
    if (props.vehicleSummary?.address?.cityId) {
      p.cityId = props.vehicleSummary.address.cityId;
    }
    if (props.vehicleSummary?.address?.stateId) {
      p.stateId = props.vehicleSummary.address.stateId;
    }
    if (props.vehicleOverview?.makerId) {
      p.makerIds = [props.vehicleOverview.makerId];
    }
    if (props.vehicleOverview?.modelId) {
      p.modelIds = [props.vehicleOverview.modelId];
    }
    if (props.vehicleOverview?.vehicleSubType) {
      p.vehicleSubTypes = [props.vehicleOverview.vehicleSubType.toUpperCase()];
    }
    if (props.vehicleOverview?.price) {
      p.minPrice = props.vehicleOverview.price;
      p.maxPrice = props.vehicleOverview.price;
    }
    return p;
  }, [props.vehicleSummary, props.vehicleOverview]);

  const hasOverview =
    props.vehicleOverview && Object.keys(props.vehicleOverview).length > 0;

  const { data: rawConsultants = [], isLoading: loading } = useQuery({
    ...getRelatedConsultantsQuery(payload, safeLimit),
    enabled: hasOverview,
  });

  const consultants = useMemo(() => {
    if (!Array.isArray(rawConsultants) || rawConsultants.length === 0)
      return [];
    return rawConsultants.map((item) => ({
      id: item.id,
      username: item.username,
      name: item.consultationName || "-",
      image: item.bannerUrl || "/cs.webp",
      logo: item.logoUrl || "/cs.webp",
      rating: item.averageRating ?? 0,
      reviews: item.totalReviews ?? 0,
      vehicleCount: item.availableVehicles ?? 0,
      services: item.services || [],
      vehicleTypes: item.vehicleTypes || [],
      location:
        item.address?.city && (item.address?.state || item.address?.country)
          ? `${item.address.city}, ${item.address.state || item.address.country}`
          : "-",
      priceRange:
        item.minVehiclePrice && item.maxVehiclePrice
          ? `${(item.minVehiclePrice / 100000).toFixed(1)}L - ${(item.maxVehiclePrice / 100000).toFixed(1)}L`
          : "-",
      isSponsored: item.isActiveTier || false,
    }));
  }, [rawConsultants]);

  const finalConsultants = consultants;

  const handleViewMore = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();

    // 1. Vehicle Type
    const cat = props.vehicleOverview?.vehicleCategory;
    const vType = props.vehicleOverview?.vehicleType;
    if (
      cat === "TWO_WHEELER" ||
      vType === "Two Wheeler" ||
      vType === "2 Wheeler"
    ) {
      queryParams.set("vehicleType", "2 Wheeler");
    } else if (
      cat === "FOUR_WHEELER" ||
      vType === "Four Wheeler" ||
      vType === "4 Wheeler" ||
      cat === "CAR" ||
      cat === "FOUR_WHEELER "
    ) {
      queryParams.set("vehicleType", "4 Wheeler");
    } else if (props.vehicleOverview) {
      // Safe fallback if category is unknown but we have a valid vehicle
      queryParams.set("vehicleType", "4 Wheeler");
    }

    // 2. City & State (Location)
    if (props.vehicleSummary?.address?.cityId) {
      queryParams.set("cityId", props.vehicleSummary.address.cityId);
    }
    if (props.vehicleSummary?.address?.stateId) {
      queryParams.set("stateId", props.vehicleSummary.address.stateId);
    }
    if (
      props.vehicleSummary?.address?.city &&
      props.vehicleSummary?.address?.state
    ) {
      queryParams.set(
        "location",
        `${props.vehicleSummary.address.city}, ${props.vehicleSummary.address.state}`,
      );
    }

    // 3. Min/Max Price (+/- 20% of main price)
    if (props.vehicleOverview?.price) {
      const minPriceLakhs = Math.max(
        0,
        (props.vehicleOverview.price * 0.8) / 100000,
      ).toFixed(2);
      const maxPriceLakhs = (
        (props.vehicleOverview.price * 1.2) /
        100000
      ).toFixed(2);
      queryParams.set("priceRange", `${minPriceLakhs}L-${maxPriceLakhs}L`);
    }

    push(`/consult/discovery?${queryParams.toString()}`);
  };

  return (
    <div className="w-full py-8">
      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
          Top Picks
          <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
        </p>

        <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
          Top <span className="text-fourth">Auto Consultants</span> Picks For
          You
        </h2>
        <p className="text-third ">
          Explore vehicles from trusted auto consultants — all through their
          digital storefronts on Reecomm.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          [...Array(safeLimit)].map((_, i) => (
            <ConsultantCardSkeleton key={`skel-${i}`} />
          ))
        ) : finalConsultants.length === 0 ? (
          <div className="col-span-full flex justify-center py-16">
            <h3 className="text-lg font-semibold text-primary/40">
              No auto consult found
            </h3>
          </div>
        ) : (
          finalConsultants
            .slice(0, safeLimit)
            .map((consultant) => (
              <ConsultantCard key={consultant.id} {...consultant} />
            ))
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleViewMore} variant="outlineAnimated">
          Explore All
        </Button>
      </div>
    </div>
  );
}
