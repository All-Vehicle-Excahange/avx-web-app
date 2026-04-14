// import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// export default function StatCard({ icon, label, value, trend }) {
//   const isPositive = trend?.startsWith("+");
//   const isNegative = trend?.startsWith("-");

//   return (
//     <div className="flex items-center gap-4 rounded-xl border border-third/30  p-4">
//       {/* Icon */}
//       <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//         {icon}
//       </div>

//       {/* Content */}
//       <div>
//         <p className="text-xs text-third">{label}</p>

//         <p className="text-2xl font-bold">{value}</p>

//         {/* ✅ Trend Line (Small Improved) */}
//         {trend && (
//           <p
//             className={`text-xs mt-1 flex items-center gap-1 font-medium
//               ${isPositive
//                 ? "text-green-500"
//                 : isNegative
//                   ? "text-red-500"
//                   : "text-third"
//               }`}
//           >
//             {isPositive && <ArrowUpRight size={14} />}
//             {isNegative && <ArrowDownRight size={14} />}

//             {trend}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ icon, label, value, trend }) {
  const isPositive = trend?.startsWith("+");
  const isNegative = trend?.startsWith("-");

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-third/30 p-3 sm:p-4 transition hover:border-third/40 min-w-0">
      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Added shrink-0 to prevent icon box from squishing */}
        <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>

        {/* Removed whitespace-nowrap and added min-w-0 */}
        <div className="flex flex-col min-w-0">
          <p className="text-[10px] sm:text-xs font-medium text-third leading-tight break-words">
            {label}
          </p>
          <p className="text-base sm:text-lg font-bold text-primary leading-tight">
            {value}
          </p>
        </div>
      </div>

      {/* Right Section: Trend Badge */}
      {trend && (
        <div className="shrink-0">
          <span
            className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-md
              ${
                isPositive
                  ? "text-emerald-500 bg-emerald-500/10"
                  : isNegative
                    ? "text-rose-500 bg-rose-500/10"
                    : "text-third bg-third/10"
              }`}
          >
            {isPositive && <ArrowUpRight size={12} strokeWidth={3} />}
            {isNegative && <ArrowDownRight size={12} strokeWidth={3} />}
            {trend.split(" ")[0]}
          </span>
        </div>
      )}
    </div>
  );
}
