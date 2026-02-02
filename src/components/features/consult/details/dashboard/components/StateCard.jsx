import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ icon, label, value, trend }) {
  const isPositive = trend?.startsWith("+");
  const isNegative = trend?.startsWith("-");

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-third/30 bg-secondary p-4">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>

      {/* Content */}
      <div>
        <p className="text-xs text-third">{label}</p>

        <p className="text-2xl font-bold">{value}</p>

        {/* ✅ Trend Line (Small Improved) */}
        {trend && (
          <p
            className={`text-xs mt-1 flex items-center gap-1 font-medium
              ${
                isPositive
                  ? "text-green-500"
                  : isNegative
                    ? "text-red-500"
                    : "text-third"
              }`}
          >
            {isPositive && <ArrowUpRight size={14} />}
            {isNegative && <ArrowDownRight size={14} />}

            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
