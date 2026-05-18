import React from "react";
import { CircleDollarSign, Calendar, SlidersHorizontal, Info } from "lucide-react";
import ChipGroup from "@/components/ui/chipGroup";

export default function BudgetStep({
  dailyBudget,
  setDailyBudget,
  maxBid,
  setMaxBid,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  activeDays,
  setActiveDays,
  billing,
}) {
  const isCPI = billing === "CPI";

  const totalBudget = dailyBudget * 30;
  const estClicks = Math.round(totalBudget / maxBid);
  const estImp = Math.round(estClicks * 25);

  const daysItems = [
    { value: "Mon", label: "Mon" },
    { value: "Tue", label: "Tue" },
    { value: "Wed", label: "Wed" },
    { value: "Thu", label: "Thu" },
    { value: "Fri", label: "Fri" },
    { value: "Sat", label: "Sat" },
    { value: "Sun", label: "Sun" },
  ];

  const getBudgetTrackBackground = () => {
    const percent = ((dailyBudget - 100) / (10000 - 100)) * 100;
    return `linear-gradient(
      to right,
      var(--color-fourth) 0%,
      var(--color-fourth) ${percent}%,
      rgba(255, 255, 255, 0.1) ${percent}%,
      rgba(255, 255, 255, 0.1) 100%
    )`;
  };

  const getBidTrackBackground = () => {
    const percent = ((maxBid - 1) / (1000 - 1)) * 100;
    return `linear-gradient(
      to right,
      var(--color-fourth) 0%,
      var(--color-fourth) ${percent}%,
      rgba(255, 255, 255, 0.1) ${percent}%,
      rgba(255, 255, 255, 0.1) 100%
    )`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary">Set your budget & schedule</h3>
        <p className="text-third text-sm mt-1">
          Control how much you spend and when your boost runs.
        </p>
      </div>

      <div className="space-y-5">
        {/* Daily Budget Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-primary">Daily budget</label>
            <span className="text-fourth font-bold text-sm">₹{dailyBudget}</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(Number(e.target.value))}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-fourth"
            style={{ background: getBudgetTrackBackground() }}
          />
          <p className="text-[10px] text-third">
            Maximum spend per day. Your ad pauses automatically when this is reached.
          </p>
        </div>

        {/* Bid Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-primary">
              {isCPI ? "Max CPI bid" : "Max CPC bid"}
            </label>
            <span className="text-fourth font-bold text-sm">₹{maxBid}</span>
          </div>
          <input
            type="range"
            min="1"
            max="1000"
            step="1"
            value={maxBid}
            onChange={(e) => setMaxBid(Number(e.target.value))}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-fourth"
            style={{ background: getBidTrackBackground() }}
          />
          <p className="text-[10px] text-third">
            {isCPI
              ? "The maximum you'll pay per inquiry received. Higher bids = better rank."
              : "The maximum you'll pay per click. Higher bids = better rank."}
          </p>
        </div>

        {/* Campaign Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-third">Start date</span>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-transparent border border-third/30 rounded-xl pl-4 pr-10 py-2.5 text-primary text-xs focus:outline-none focus:border-fourth focus:ring-1 focus:ring-fourth transition-all relative z-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-third z-0">
                <Calendar size={14} />
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-third">End date</span>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent border border-third/30 rounded-xl pl-4 pr-10 py-2.5 text-primary text-xs focus:outline-none focus:border-fourth focus:ring-1 focus:ring-fourth transition-all relative z-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-third z-0">
                <Calendar size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Active Days Multi-select */}
        <div className="space-y-3 pt-3">
          <label className="text-xs font-semibold text-primary block">Active days</label>
          <div className="flex flex-wrap gap-2.5">
            {daysItems.map((day) => {
              const isSelected = activeDays.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      if (activeDays.length > 1) {
                        setActiveDays(activeDays.filter((d) => d !== day.value));
                      }
                    } else {
                      setActiveDays([...activeDays, day.value]);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap flex items-center justify-center ${
                    isSelected
                      ? "bg-primary text-secondary border-third"
                      : "border-third text-primary bg-transparent hover:bg-primary hover:text-secondary"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-third mt-1 block">Your boost will only run on selected days.</p>
        </div>

        {/* Estimated Performance Box */}
        <div className="p-4 rounded-xl border border-third/30 bg-transparent space-y-4">
          <h4 className="text-xs font-semibold text-third">Estimated Performance (30 Days)</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-third uppercase tracking-wider block font-medium">
                {isCPI ? "Est. inquiries" : "Est. clicks"}
              </span>
              <span className="text-lg font-bold text-primary block">
                {estClicks.toLocaleString()}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-third uppercase tracking-wider block font-medium">
                Est. impressions
              </span>
              <span className="text-lg font-bold text-primary block">
                {estImp.toLocaleString()}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-third uppercase tracking-wider block font-medium">
                Total Budget
              </span>
              <span className="text-lg font-bold text-fourth block">
                ₹{totalBudget.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
