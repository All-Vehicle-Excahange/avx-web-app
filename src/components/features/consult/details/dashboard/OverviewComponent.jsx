import {
  Car,
  MessageCircle,
  MessageSquare,
  Eye,
  TrendingUp,
} from "lucide-react";
import StatCard from "./components/StateCard";
import Activity from "./components/Activity";
import Task from "./components/Task";

export default function OverviewComponent() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, Adarsh Auto Consultants
          </h1>
          <div className="flex items-center gap-4 text-sm text-third mt-1">
            <span className="flex items-center gap-1 text-green-400">
              ✓ Verified
            </span>
            <span>📍 City: Ahmedabad</span>
          </div>
        </div>

        <span className="inline-flex items-center px-4 py-1 rounded-full bg-primary text-secondary text-xs font-semibold">
          PREMIUM PARTNER
        </span>
      </div>

      {/* PERFORMANCE */}
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6">
        <h3 className="font-semibold mb-5">
          Performance Snapshot (Last 30 Days)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <StatCard icon={<Car />} label="Vehicles Live" value="28" />
          <StatCard icon={<MessageCircle />} label="Inquiries" value="86" />
          <StatCard icon={<MessageSquare />} label="Chats Started" value="63" />
          <StatCard icon={<Eye />} label="Storefront Visits" value="1,420" />
          <StatCard
            icon={<TrendingUp />}
            label="Featured Impressions"
            value="8,300"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg">Weekly Plan</h3>
            <p className="text-sm text-third">
              Set your business up for success by completing recommended tasks.
            </p>
          </div>

          <button className="rounded-xl border border-third/30 px-4 py-2 text-sm hover:bg-primary/10 transition">
            See full plan
          </button>
        </div>

        {/* PROGRESS */}
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Complete at least 5 tasks to finish this plan.
          </p>
          <div className="w-full h-2 rounded-full bg-third/30 overflow-hidden">
            <div className="h-full bg-primary w-[42%]" />
          </div>
          <p className="text-xs text-third">3 of 7 tasks completed</p>
        </div>

        {/* TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Task label="Publish 5 stories on Instagram" progress="0 / 5" />
          <Task label="Publish one post on Facebook" progress="0 / 1" />
          <Task label="Publish 5 stories on Facebook" progress="0 / 5" />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-3">
        <h3 className="font-semibold">Recent Activity</h3>

        <Activity text="New inquiry on BMW X1" time="5m ago" />
        <Activity text="Vehicle marked sold: Honda City" time="2h ago" />
        <Activity text="Inspection completed: Baleno" time="4h ago" />
        <Activity text="Featured slot impression spike (+18%)" time="6h ago" />
      </div>
    </div>
  );
}
