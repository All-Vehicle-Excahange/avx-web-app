"use client";

import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";
import { Info } from "lucide-react";

export default function ConsultantGridSection({
  title,
  data,
  i = 3,
  showViewAll = false,
  showIsSponsored = false,
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/consult/premium");
  };

  return (
    <section className="w-full mb-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-start gap-4">
          <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400" />

          <div>
            <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
              {title}
              {showIsSponsored && (
                <div className="flex items-center gap-1 mt-1 text-xs text-third">
                  <span>Sponsored</span>

                  <button
                    type="button"
                    className="w-4 h-4 flex items-center justify-center rounded-full border border-third/40 hover:bg-third/10 transition"
                    aria-label="Sponsored info"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>
              )}
            </h2>
          </div>
        </div>



        {showViewAll && (
          <Button
            onClick={handleClick}
            variant="ghost"
            showIcon={false}
            className="text-sm"
          >
            View all Premium Consultants
          </Button>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
        {data && data.length > 0 ? (
          data.slice(0, i).map((c) => <ConsultantCard key={c.id} {...c} />)
        ) : (
          <p className="text-center text-sm text-third col-span-full">
            No consultants found.
          </p>
        )}
      </div>
    </section>
  );
}
