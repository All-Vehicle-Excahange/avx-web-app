import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

const rows = [
  { feature: "Active Listings", basic: "6", pro: "15", premium: "Unlimited" },
  { feature: "Storefront Customization", basic: "Basic Theme", pro: "Multiple Themes", premium: "Premium Themes + Full Branding" },
  { feature: "Marketplace Visibility", basic: "Standard", pro: "Featured", premium: "Premium Priority" },
  { feature: "Buyer Inquiry Management", basic: "✅", pro: "✅", premium: "✅" },
  { feature: "Customer Reviews", basic: "✅", pro: "✅", premium: "✅" },
  { feature: "Verified Consultant Badge", basic: "—", pro: "✅", premium: "Premium Verified" },
  { feature: "Listing Analytics", basic: "Basic", pro: "Advanced", premium: "Advanced" },
  { feature: "Business Dashboard", basic: "—", pro: "✅", premium: "✅" },
  { feature: "Market Benchmarking", basic: "—", pro: "Category Level", premium: "Category + City Level" },
  { feature: "Category Performance Analysis", basic: "—", pro: "Basic", premium: "Detailed" },
  { feature: "Growth Insights", basic: "—", pro: "—", premium: "✅" },
  { feature: "Boost Campaigns", basic: "—", pro: "✅", premium: "✅" },
  { feature: "Monthly Boost Credits", basic: "—", pro: "200", premium: "500" },
  { feature: "Inspection Discount", basic: "—", pro: "10%", premium: "20%" },
  { feature: "Free Vehicle Inspections", basic: "—", pro: "1 / Month", premium: "3 / Month" },
  { feature: "Priority Support", basic: "—", pro: "✅", premium: "Highest Priority" },
  { feature: "Early Access to Features", basic: "—", pro: "—", premium: "✅" },
];

function PlanComplareTable() {
  const renderCell = (val) => {
    if (val === "✅") {
      return (
        <div className="flex justify-center">
          <FiCheck className="text-emerald-500 text-lg" />
        </div>
      );
    }
    if (val === "❌") {
      return (
        <div className="flex justify-center">
          <FiX className="text-zinc-600 text-lg" />
        </div>
      );
    }
    if (val.startsWith("✅")) {
      const text = val.replace("✅", "").replace(/[()]/g, "").trim();
      return (
        <div className="flex items-center justify-center gap-1.5">
          <FiCheck className="text-emerald-500 text-sm shrink-0" />
          <span className="text-zinc-300 text-xs sm:text-sm font-medium">{text}</span>
        </div>
      );
    }
    if (val.startsWith("❌")) {
      const text = val.replace("❌", "").replace(/[()]/g, "").trim();
      return (
        <div className="flex items-center justify-center gap-1.5">
          <FiX className="text-zinc-600 text-sm shrink-0" />
          <span className="text-zinc-500 text-xs sm:text-sm font-medium">{text}</span>
        </div>
      );
    }
    return <span className="text-zinc-300 text-xs sm:text-sm font-medium">{val}</span>;
  };

  return (
    <section className="relative py-20 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-zinc-500 font-semibold mb-3 block">
            Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-primary mb-3">
            Plan Comparison
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            All plans include a 7-day free trial. Cancel anytime. Prices do not include taxes or duties.
          </p>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto no-scrollbar border border-zinc-800 rounded-2xl bg-transparent">
          <table className="w-full min-w-[700px] border-collapse text-left bg-transparent">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-5 px-6 text-xs font-bold tracking-wider text-zinc-400 uppercase w-[34%]">
                  Feature
                </th>
                <th className="py-5 px-6 text-xs font-bold tracking-wider text-zinc-400 uppercase text-center w-[22%]">
                  Basic
                </th>
                <th className="py-5 px-6 text-xs font-bold tracking-wider text-zinc-400 uppercase text-center w-[22%]">
                  Pro
                </th>
                <th className="py-5 px-6 text-xs font-bold tracking-wider text-zinc-400 uppercase text-center w-[22%]">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.01] transition-colors duration-200"
                >
                  <td className="py-4 px-6 text-xs sm:text-sm font-medium text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderCell(row.basic)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderCell(row.pro)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderCell(row.premium)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PlanComplareTable;
