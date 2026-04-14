import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function ProfileSkeleton() {
  return (
    <section className="w-full space-y-10 animate-pulse">
      {/* HEADER */}
      <div className="space-y-2">
        <SkeletonBox className="h-8 w-64" />
        <SkeletonBox className="h-4 w-96" />
      </div>

      {/* Profile Strength */}
      <div className="w-full lg:w-1/2 rounded-xl border border-third/30 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <SkeletonBox className="h-5 w-40" />
          <SkeletonBox className="h-5 w-24" />
        </div>
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-[90%]" />
          <SkeletonBox className="h-4 w-[80%]" />
        </div>
        <SkeletonBox className="h-8 w-32" />
      </div>

      {/* BUSINESS PROFILE CARD */}
      <div className="rounded-xl border border-third/30 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <SkeletonBox className="h-6 w-40" />
          <SkeletonBox className="h-8 w-32" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <SkeletonBox className="h-3 w-24" />
              <SkeletonBox className="h-5 w-full" />
            </div>
          ))}
        </div>
        <SkeletonBox className="h-12 w-full rounded-xl" />
      </div>

      {/* VERIFICATION STATUS */}
      <div className="rounded-xl border border-third/30 p-6 space-y-4">
        <SkeletonBox className="h-6 w-48" />
        <div className="grid md:grid-cols-2 gap-6">
          <SkeletonBox className="h-24 w-full rounded-xl" />
          <SkeletonBox className="h-24 w-full rounded-xl" />
        </div>
      </div>

      {/* KYC DOCUMENTS */}
      <div className="rounded-xl border border-third/30 p-6 space-y-4">
        <SkeletonBox className="h-6 w-40" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBox key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  );
}
