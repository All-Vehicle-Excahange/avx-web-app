import React from "react";
import SkeletonBox from "./SkeletonBox";
import StatCardSkeleton from "./StatCardSkeleton";

export default function InspectionSkeleton() {
  return (
    <section className="w-full space-y-10">
      {/* ================= HEADER SKELETON ================= */}
      <div className="flex flex-col lg:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          {/* Title */}
          <SkeletonBox className="h-7 w-64 md:w-80" rounded="rounded-md" />
          {/* Subtitle */}
          <SkeletonBox className="h-4 w-48 md:w-60" rounded="rounded-md" />
        </div>
      </div>

      {/* ================= SNAPSHOT SKELETON ================= */}
      <div className="rounded-xl border border-third/30 bg-primary/5 p-5 space-y-5">
        <SkeletonBox className="h-6 w-56" rounded="rounded-md" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* ================= HOW INSPECTION AFFECTS RANKING (STATIC/SKELETON) ================= */}
      <div className="rounded-xl border border-third/30 p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <SkeletonBox className="h-5 w-5 shrink-0" rounded="rounded-md" />
          <SkeletonBox className="h-5 w-60" rounded="rounded-md" />
        </div>

        <div className="space-y-3 pl-7">
          <SkeletonBox className="h-4 w-48" rounded="rounded-md" />
          <SkeletonBox className="h-4 w-56" rounded="rounded-md" />
          <SkeletonBox className="h-4 w-52" rounded="rounded-md" />
        </div>
      </div>

      {/* ================= VEHICLES REQUIRING ATTENTION SKELETON ================= */}
      <div className="rounded-xl border border-third/30 p-5 space-y-6 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <SkeletonBox className="h-5 w-52" rounded="rounded-md" />
            <SkeletonBox className="h-4 w-40" rounded="rounded-md" />
          </div>
          {/* Urgent Badge */}
          <SkeletonBox className="h-7 w-20" rounded="rounded-full" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-third border-b border-third/30">
              <tr className="whitespace-nowrap">
                <th className="py-3 pr-4"><SkeletonBox className="h-3 w-16" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-12" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-24" rounded="rounded" /></th>
                <th className="text-right"><SkeletonBox className="h-3 w-16 ml-auto" rounded="rounded" /></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-third/20 whitespace-nowrap">
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <SkeletonBox className="w-4 h-4 shrink-0" rounded="rounded-full" />
                      <SkeletonBox className="h-4 w-32" rounded="rounded" />
                    </div>
                  </td>
                  <td className="pr-4">
                    <SkeletonBox className="h-6 w-24" rounded="rounded-full" />
                  </td>
                  <td className="pr-4">
                    <SkeletonBox className="h-4 w-20" rounded="rounded" />
                  </td>
                  <td className="text-right">
                    <SkeletonBox className="h-8 w-24 ml-auto" rounded="rounded-lg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= INSPECTION REQUESTS FROM BUYERS SKELETON ================= */}
      <div className="rounded-xl border border-third/30 p-5 space-y-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-2">
            <SkeletonBox className="h-5 w-60" rounded="rounded-md" />
            <SkeletonBox className="h-4 w-64" rounded="rounded-md" />
          </div>
          {/* Badge */}
          <SkeletonBox className="h-7 w-24" rounded="rounded-full" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-third border-b border-third/30 whitespace-nowrap">
              <tr>
                <th className="py-3 pr-4"><SkeletonBox className="h-3 w-16" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-12" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-12" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-16" rounded="rounded" /></th>
                <th className="text-right"><SkeletonBox className="h-3 w-16 ml-auto" rounded="rounded" /></th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <tr key={i} className="border-b border-third/20">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <SkeletonBox className="w-4 h-4 shrink-0" rounded="rounded-full" />
                      <SkeletonBox className="h-4 w-32" rounded="rounded" />
                    </div>
                  </td>
                  <td className="pr-4">
                    <SkeletonBox className="h-4 w-20" rounded="rounded" />
                  </td>
                  <td className="pr-4">
                    <div className="flex items-center gap-2">
                      <SkeletonBox className="w-4 h-4 shrink-0" rounded="rounded-full" />
                      <SkeletonBox className="h-4 w-24" rounded="rounded" />
                    </div>
                  </td>
                  <td className="pr-4">
                    <SkeletonBox className="h-6 w-24" rounded="rounded-full" />
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-3">
                      <SkeletonBox className="h-8 w-16" rounded="rounded-lg" />
                      <SkeletonBox className="h-8 w-16" rounded="rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= INSPECTION HISTORY SKELETON ================= */}
      <div className="rounded-xl border border-third/30 p-5 space-y-6 shadow-sm">
        {/* Header */}
        <div className="space-y-2">
          <SkeletonBox className="h-5.5 w-44" rounded="rounded-md" />
          <SkeletonBox className="h-4 w-52" rounded="rounded-md" />
        </div>

        {/* Search + Filters Row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <SkeletonBox className="h-11 w-full lg:flex-1" rounded="rounded-xl" />
          <div className="flex gap-3 w-full lg:w-auto">
            <SkeletonBox className="h-11 w-32" rounded="rounded-xl" />
            <SkeletonBox className="h-11 w-36" rounded="rounded-xl" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead className="border-b border-third/30 text-third text-left whitespace-nowrap">
              <tr>
                <th className="py-3 pr-4"><SkeletonBox className="h-3 w-16" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-28" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-28" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-12" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-20" rounded="rounded" /></th>
                <th className="pr-4"><SkeletonBox className="h-3 w-16" rounded="rounded" /></th>
                <th className="text-right"><SkeletonBox className="h-3 w-16 ml-auto" rounded="rounded" /></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-third/20 whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-2">
                      <SkeletonBox className="w-4 h-4 shrink-0" rounded="rounded-full" />
                      <SkeletonBox className="h-4 w-28" rounded="rounded" />
                    </div>
                  </td>
                  <td className="pr-6"><SkeletonBox className="h-4 w-20" rounded="rounded" /></td>
                  <td className="pr-6"><SkeletonBox className="h-4 w-28" rounded="rounded" /></td>
                  <td className="pr-6"><SkeletonBox className="h-4 w-12" rounded="rounded" /></td>
                  <td className="pr-6"><SkeletonBox className="h-6 w-32" rounded="rounded-full" /></td>
                  <td className="pr-6"><SkeletonBox className="h-6 w-20" rounded="rounded-full" /></td>
                  <td className="text-right"><SkeletonBox className="h-4 w-16 ml-auto" rounded="rounded" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= RE-INSPECTION CONTROL PANEL SKELETON ================= */}
      <div className="rounded-xl border border-third/30 p-5 space-y-6 shadow-sm">
        {/* Header */}
        <div className="space-y-2">
          <SkeletonBox className="h-5.5 w-60" rounded="rounded-md" />
          <SkeletonBox className="h-4 w-72" rounded="rounded-md" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <SkeletonBox className="h-5 w-40" rounded="rounded-md" />
              <SkeletonBox className="h-5 w-16" rounded="rounded-md" />
            </div>

            <div className="rounded-xl border border-third/30 bg-yellow-500/5 p-5 space-y-4">
              <div className="flex items-start gap-3">
                <SkeletonBox className="w-6 h-6 shrink-0" rounded="rounded-full" />
                <div className="space-y-2 flex-1">
                  <SkeletonBox className="h-4 w-16" rounded="rounded" />
                  <SkeletonBox className="h-3 w-40" rounded="rounded" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <SkeletonBox className="w-4 h-4 shrink-0" rounded="rounded-full" />
                    <SkeletonBox className="h-3 w-28" rounded="rounded" />
                  </div>
                ))}
              </div>
            </div>

            <SkeletonBox className="h-11 w-full" rounded="rounded-xl" />
          </div>

          {/* Right Side */}
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <SkeletonBox className="h-5 w-52" rounded="rounded-md" />
              <SkeletonBox className="h-5 w-10" rounded="rounded-md" />
            </div>

            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <SkeletonBox className="h-3.5 w-32" rounded="rounded" />
                    <SkeletonBox className="h-3.5 w-10" rounded="rounded" />
                  </div>
                  <SkeletonBox className="h-3 w-full" rounded="rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
