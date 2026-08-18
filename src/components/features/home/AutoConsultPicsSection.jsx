"use client";

import React from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import ConsultantCardSkeleton from "@/components/ui/skeleton/ConsultantCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getHomeFeedConsultQuery } from "@/queries/user.queries";

export default function AutoConsultPicsSection(props) {
  // ✅ HARD SAFE DEFAULT
  const safeLimit = typeof props.limit === "number" ? props.limit : 4;

  const queryPayload = {
    pageNo: 1,
    size: safeLimit,
  };

  const { data: consultants = [], isLoading } = useQuery(
    getHomeFeedConsultQuery(queryPayload)
  );

  // ✅ FINAL DATA SOURCE
  const finalConsultants = consultants;

  if (!isLoading && (!Array.isArray(finalConsultants) || finalConsultants.length === 0)) {
    return null;
  }

  return (
    <div className="w-full py-8">
      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
          Top Picks
          <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
        </p>

        <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
          Top <span className="text-fourth">Auto Consultants</span> Picks For You
        </h2>
        <p className="text-third w-4xl">
          Explore vehicles from trusted auto consultants — all through their digital storefronts on Reecomm.
        </p>
      </div>

      {isLoading && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(safeLimit)].map((_, i) => (
            <ConsultantCardSkeleton key={`skel-${i}`} />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {finalConsultants.length === 0 ? (
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
      )}

      {finalConsultants.length >= 4 && (
        <div className="mt-8 flex justify-end">
          <Button href="/consult/discovery" variant="outlineAnimated">
            Explore All
          </Button>
        </div>
      )}
    </div>
  );
}
