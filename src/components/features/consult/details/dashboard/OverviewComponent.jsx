import {
  Car,
  MessageCircle,
  MessageSquare,
  Eye,
  TrendingUp,
  MapPin,
  BadgeCheck,
  BarChart3,
  Zap,
  ArrowDown,
  Info,
  Tag,
  Calendar,
} from "lucide-react";
import StatCard from "./components/StateCard";
import Activity from "./components/Activity";
import Task from "./components/Task";
import Button from "@/components/ui/button";
import { ShieldCheck, Star } from "lucide-react";
import TopPerformingCard from "./components/TopPerformingCard";

export default function OverviewComponent() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">
            Welcome, Adarsh Auto Consultants
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-third mt-1">
            <span className="flex items-center gap-1 text-green-400 font-medium">
              <BadgeCheck size={16} />
              Verified
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              City: Ahmedabad
            </span>
          </div>
        </div>

        <span className="w-fit inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-secondary text-[10px] md:text-xs font-bold tracking-wider">
          PREMIUM PARTNER
        </span>
      </div>

      {/* PERFORMANCE */}
      <div className="rounded-xl border border-third/30 bg-primary/5 p-6">
        <h3 className="font-semibold mb-5">
          Performance Snapshot (Last 30 Days)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <StatCard
            icon={<Eye />}
            label="Storefront Visits"
            value="1,420"
            trend="+12%"
          />
          <StatCard
            icon={<Car />}
            label="Vehicle Views"
            value="3,820"
            trend="+18%"
          />
          <StatCard
            icon={<MessageCircle />}
            label="Inquiries"
            value="86"
            trend="+11%"
          />
          <StatCard
            icon={<BarChart3 />}
            label="Conversion Rate"
            value="6.1%"
            subValue={true}
            comparison="City Avg: 4.8%"
          />
          <StatCard
            icon={<Zap />}
            label="Featured Impressions"
            value="8,300"
            trend="+22%"
          />
        </div>
      </div>

      {/* PERFORMANCE FUNNEL */}
      <div className="rounded-xl border border-third/30 bg-primary/5 p-6 space-y-8">
        <div className="flex items-center gap-3 text-primary font-bold tracking-wider">
          <BarChart3
            size={20}
            className="text-secondary bg-primary p-1 rounded-md"
          />
          <h3 className="text-sm uppercase italic">Performance Funnel</h3>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-third uppercase tracking-widest">
                Storefront Visits
              </span>
              <span className="text-lg font-bold text-white tracking-tight">
                1,420
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-fourth rounded-full w-full"></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-third uppercase tracking-widest">
                Vehicle Views
              </span>
              <span className="text-lg font-bold text-white tracking-tight">
                3,820
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-fourth rounded-full w-[85%]"></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-third uppercase tracking-widest">
                Inquiries
              </span>
              <span className="text-lg font-bold text-white tracking-tight">
                86
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-fourth rounded-full w-[60%]"></div>
            </div>
          </div>
        </div>

        {/* Insight Box */}
        <div className="bg-white/5 border-l-2 border-orange-500 p-4 rounded-r-lg">
          <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">
            Insight
          </p>
          <p className="text-xs text-white leading-relaxed font-medium">
            Strong traffic but moderate conversion. Improving listing quality
            can increase inquiries.
          </p>
        </div>
      </div>

      {/* RECOMMENDED ACTIONS */}
      <div className="rounded-xl border border-third/30 bg-primary/5 p-6">
        <h3 className="font-semibold mb-5">Recommended Actions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Action 1 */}
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5 space-y-3 transition hover:border-blue-500/40 cursor-pointer">
            <Zap size={18} className="text-blue-500" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-blue-500">
                Boost High-View Listings
              </h4>
              <p className="text-xs text-third leading-relaxed">
                3 vehicles getting views but low inquiries
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-widest pt-2">
              Take Action <span className="text-[14px]">›</span>
            </button>
          </div>

          {/* Action 2 */}
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5 space-y-3 transition hover:border-green-500/40 cursor-pointer">
            <ShieldCheck size={18} className="text-green-500" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-green-500">
                Add AVX Inspection
              </h4>
              <p className="text-xs text-third leading-relaxed">
                2 listings can gain more trust
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-widest pt-2">
              Take Action <span className="text-[14px]">›</span>
            </button>
          </div>

          {/* Action 4 */}
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-5 space-y-3 transition hover:border-yellow-500/40 cursor-pointer">
            <BarChart3 size={18} className="text-yellow-500" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-yellow-500">
                Improve Pricing
              </h4>
              <p className="text-xs text-third leading-relaxed">
                2 listings priced above market range
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-yellow-500 uppercase tracking-widest pt-2">
              Take Action <span className="text-[14px]">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* INVENTORY & INSPECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Status */}
        <div className="rounded-xl border border-third/30 bg-primary/5 p-6 flex flex-col">
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-6">
            Inventory Status
          </h3>

          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-third font-medium">Active Vehicles</span>
              <span className="font-bold text-blue-500 text-base">28</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-third font-medium">Inspected Vehicles</span>
              <span className="font-bold text-green-500 text-base">9</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-third font-medium">Featured Vehicles</span>
              <span className="font-bold text-orange-500 text-base">6</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-third/10 pb-4">
              <span className="text-third font-medium">
                Low Performance Vehicles
              </span>
              <span className="font-bold text-yellow-500 text-base">5</span>
            </div>
          </div>

          <div className="mt-4 bg-white/5 border-l-2 border-green-500 p-3 rounded-r-lg">
            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-0.5">
              Insight
            </p>
            <p className="text-xs text-white leading-relaxed">
              Listings with inspection are performing 30% better.
            </p>
          </div>
        </div>

        {/* Inspection Impact */}
        <div className="rounded-xl border border-third/30 bg-primary/5 p-6 space-y-5 flex flex-col">
          <h3 className="font-semibold text-sm uppercase tracking-wider">
            Inspection Impact
          </h3>

          <div className="space-y-3 flex-1">
            {/* With Inspection */}
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                <BadgeCheck size={14} />
                With Inspection
              </div>
              <ul className="text-xs text-green-200/80 space-y-1.5 pl-5 list-disc">
                <li>+31% inquiries</li>
                <li>Faster conversion</li>
              </ul>
            </div>

            {/* Without Inspection */}
            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                <Info size={14} className="rotate-180" />
                Without Inspection
              </div>
              <ul className="text-xs text-rose-200/80 space-y-1.5 pl-5 list-disc">
                <li>Lower buyer trust</li>
              </ul>
            </div>
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-secondary font-bold text-xs uppercase py-3 rounded-xl tracking-widest mt-2 transition-colors shadow-lg shadow-green-500/10">
            Inspect More Vehicles
          </button>
        </div>
      </div>

      {/* TOP PERFORMING LISTINGS */}
      <div className="rounded-xl border border-third/30 bg-primary/5 p-6 space-y-5">
        <h3 className="font-semibold mb-5">Top Performing Listings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TopPerformingCard
            rank={1}
            vehicle={{
              id: "v1",
              makerName: "BMW",
              modelName: "X1",
              variantName: "sDrive20d xLine",
              price: 4500000,
              totalInquiries: 24,
              listingDate: new Date().toISOString(),
              inspectionStatus: "INSPECTED",
              thumbnailUrl: "/big_card_car.jpg",
            }}
          />
          <TopPerformingCard
            rank={2}
            vehicle={{
              id: "v2",
              makerName: "Honda",
              modelName: "City",
              variantName: "ZX CVT",
              price: 1550000,
              totalInquiries: 18,
              listingDate: new Date(Date.now() - 86400000 * 3).toISOString(),
              inspectionStatus: "NOT_INSPECTED",
              thumbnailUrl: "/big_card_car.jpg",
            }}
          />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-xl border border-third/30 bg-primary/5 p-6 space-y-3">
        <h3 className="font-semibold">Recent Activity</h3>

        <Activity text="New inquiry on BMW X1" time="5m ago" />
        <Activity text="Vehicle marked sold: Honda City" time="2h ago" />
        <Activity text="Inspection completed: Baleno" time="4h ago" />
        <Activity text="Featured slot impression spike (+18%)" time="6h ago" />
      </div>

      {/* PERFORMANCE INSIGHTS */}
      <div className="rounded-xl border border-fourth/30 bg-fourth/5 p-7 space-y-5 transition-colors duration-200 hover:border-fourth/50">
        <h3 className="font-semibold text-lg text-fourth">
          Performance Insights
        </h3>

        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <li className="flex items-start gap-3 text-third">
            <TrendingUp className="text-fourth mt-0.5 shrink-0" size={18} />
            <span>
              <b className="text-white">Featured vehicles</b> perform{" "}
              <b>1.8× better</b> than normal listings.
            </span>
          </li>

          <li className="flex items-start gap-3 text-third">
            <Zap className="text-fourth mt-0.5 shrink-0" size={18} />
            <span>
              <b className="text-white">Fast responses</b> significantly improve
              your marketplace ranking.
            </span>
          </li>

          <li className="flex items-start gap-3 text-third">
            <Calendar className="text-fourth mt-0.5 shrink-0" size={18} />
            <span>
              <b className="text-white">Weekend traffic</b> is <b>23% higher</b>{" "}
              — best time to boost listings.
            </span>
          </li>

          <li className="flex items-start gap-3 text-third">
            <Tag className="text-fourth mt-0.5 shrink-0" size={18} />
            <span>
              <b className="text-white">Competitive pricing</b> improves
              conversions by up to <b>19%</b>.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
