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
    <div className="flex items-center justify-between rounded-xl border border-third/30 p-4 hover:shadow-sm transition">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>

        <div>
          <p className="text-xs text-third">{label}</p>
          <p className="text-xl font-semibold text-primary">{value}</p>
        </div>
      </div>

      {/* Right (Trend) */}
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs font-medium
          ${isPositive
              ? "text-neutral-900"
              : isNegative
                ? "text-neutral-500"
                : "text-neutral-400"
            }`}
        >
          {isPositive && <ArrowUpRight size={14} />}
          {isNegative && <ArrowDownRight size={14} />}
          {trend}
        </div>
      )}
    </div>
  );
}