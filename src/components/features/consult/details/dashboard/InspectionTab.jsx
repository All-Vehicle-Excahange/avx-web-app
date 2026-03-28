"use client";

import React from "react";

import {
  Car,
  Clock,
  AlertTriangle,
  RefreshCcw,
  Star,
  BadgeCheck,
  TrendingUp,
  CheckCircle2,
  Video,
  Download,
  Search,
  Shield,
  MessageSquare,
  FileText,
  CheckCircle,
} from "lucide-react";
import StatCard from "./components/StateCard";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";

function InspectionTab() {
  const [range, setRange] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("passed");

  const rangeOptions = [
    { label: "All Time", value: "all" },
    { label: "Last 7 Days", value: "7" },
    { label: "Last 30 Days", value: "30" },
  ];

  const statusOptions = [
    { label: "Passed", value: "passed" },
    { label: "Failed", value: "failed" },
    { label: "Pending", value: "pending" },
  ];
  return (
    <section className="w-full space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Inspection Tab — Consultant Panel
          </h1>
          <p className="text-xs md:text-sm text-third">
            Manage vehicle inspections and maintain trust score
          </p>
        </div>

        {/* IQI Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-third/30 bg-secondary w-fit shadow-sm transition-colors duration-200 hover:border-third/40">
          <BadgeCheck size={18} className="text-primary" />
          <p className="text-xs md:text-sm font-medium">
            IQI: <span className="text-primary font-bold">78%</span>
          </p>
          <span className="text-third text-xs md:text-sm">Trust Health</span>
        </div>
      </div>

      {/* ================= SNAPSHOT ================= */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Inspection Performance Snapshot
        </h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <StatCard
            icon={<Car className="text-primary" size={20} />}
            label="Vehicles with Reecomm Inspection"
            value="18"
          />

          <StatCard
            icon={<Clock className="text-orange-400" size={20} />}
            label="Pending Inspections"
            value="4"
          />

          <StatCard
            icon={<AlertTriangle className="text-red-400" size={20} />}
            label="Expired Reports"
            value="6"
          />

          <StatCard
            icon={<RefreshCcw className="text-purple-400" size={20} />}
            label="Re-inspection Requests"
            value="2"
          />

          <StatCard
            icon={<Star className="text-yellow-400" size={20} />}
            label="Inspection Rating Score"
            value="4.6/5"
          />
        </div>
      </div>

      {/* ================= TRUST SCORE BANNER ================= */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-3">

            {/* Circle Progress */}
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <svg className="w-full h-full -rotate-90">
                {/* Background */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-neutral-200"
                  fill="transparent"
                />
                {/* Progress */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={113} // circumference
                  strokeDashoffset={113 - (113 * 82) / 100}
                  strokeLinecap="round"
                  className="text-green-500"
                  fill="transparent"
                />
              </svg>

              {/* Center Text */}
              <span className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs font-semibold text-primary">
                82%
              </span>
            </div>

            {/* Text */}
            <div>
              <p className="font-semibold text-xs md:text-sm leading-tight text-primary">
                Your trust score is{" "}
                <span className="font-bold">82%</span>
              </p>

              <p className="text-[11px] md:text-xs text-third mt-0.5">
                Keep inspections updated to improve ranking
              </p>
            </div>

          </div>
        </div>

        <TrendingUp size={20} className="text-primary shrink-0 transition-transform sm:rotate-0" />
      </div>

      {/* ================= HOW INSPECTION AFFECTS RANKING ================= */}
      <div className="rounded-xl border border-third/30  p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
        <h3 className="font-semibold flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          How inspection affects ranking:
        </h3>

        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            Fresh inspection boosts visibility
          </p>

          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            Higher inspection score increases buyer trust
          </p>

          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            Re-inspection improves conversion
          </p>
        </div>
      </div>

      {/* ================= VEHICLES REQUIRING ATTENTION ================= */}
      <div className="rounded-xl border border-third/30  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Vehicles Requiring Attention
            </h2>
            <p className="text-sm text-third">
              Action required on these vehicles
            </p>
          </div>

          {/* Urgent Badge */}
          <span className="px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold">
            3 Urgent
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="text-left text-third border-b border-third/30">
              <tr className="whitespace-nowrap">
                <th className="py-3 pr-4">Vehicle</th>
                <th className="pr-4">Status</th>
                <th className="pr-4">Last Inspection</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-third/20 whitespace-nowrap">
              {/* Row 1 */}
              <tr>
                <td className="py-4 pr-4 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Tata Harrier
                </td>

                <td className="pr-4">
                  <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[11px] font-medium">
                    Expired (45 days)
                  </span>
                </td>

                <td className="text-third pr-4">12 Jan</td>

                <td className="text-right">
                  <Button variant="ghost" className="px-5 text-xs h-8">
                    Renew Inspection
                  </Button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-primary/5">
                <td className="py-4 pr-4 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  BMW X1
                </td>

                <td className="pr-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[11px] font-medium">
                    Buyer Re-requested
                  </span>
                </td>

                <td className="text-third pr-4">30 days</td>

                <td className="text-right">
                  <Button variant="ghost" className="px-5 text-xs h-8">
                    Approve Re-check
                  </Button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="py-4 pr-4 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Audi A6
                </td>

                <td className="pr-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium">
                    Inspection Scheduled
                  </span>
                </td>

                <td className="text-third pr-4">Tomorrow</td>

                <td className="text-right">
                  <Button variant="ghost" className="px-5 text-xs h-8">
                    View Details
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= INSPECTION REQUESTS FROM BUYERS ================= */}
      <div className="rounded-xl border border-third/30  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          {/* Title */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold leading-tight">
              Inspection Requests From Buyers
            </h2>
            <p className="text-sm text-third">
              Approve or decline buyer-requested inspections
            </p>
          </div>

          {/* Badge */}
          <span className="w-fit px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs sm:text-sm font-semibold">
            1 Pending
          </span>

        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Head */}
            <thead className="text-left text-third border-b border-third/30 whitespace-nowrap">
              <tr>
                <th className="py-3 pr-4">Vehicle</th>
                <th className="pr-4">Buyer</th>
                <th className="pr-4">Type</th>
                <th className="pr-4">Price</th>
                <th className="pr-4">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="whitespace-nowrap">
              <tr className="border-b border-third/20">
                {/* Vehicle */}
                <td className="py-4 pr-4 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Harrier
                </td>

                {/* Buyer */}
                <td className="text-third pr-4">Rahul S.</td>

                {/* Type */}
                <td className="flex items-center gap-2 text-primary font-medium pr-4">
                  <Video size={16} className="text-purple-400" />
                  Video + Report
                </td>

                {/* Price */}
                <td className="font-semibold pr-4">₹1,999</td>

                {/* Status */}
                <td className="pr-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[11px] font-medium">
                    Awaiting approval
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="flex justify-end gap-3 py-4">
                  <Button variant="ghost" className="px-6 text-xs h-8">
                    Accept
                  </Button>

                  <Button variant="outlineSecondary" className="px-6 text-xs h-8">
                    Decline
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Info Process Box */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle size={18} className="text-primary" />
            Inspection Request Process
          </div>

          <ul className="text-sm text-third space-y-1 list-disc pl-6">
            <li>Consultant must approve slot</li>
            <li>AVX inspector will be assigned</li>
            <li>Payment collected before scheduling</li>
          </ul>
        </div>
      </div>

      {/* ================= INSPECTION HISTORY ================= */}
      <div className="rounded-xl border border-third/30  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">Inspection History</h2>
          <p className="text-sm text-third">
            Complete history of all inspections
          </p>
        </div>

        {/* Search + Filters Row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-third"
            />
            <input
              type="text"
              placeholder="Search by vehicle..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-third/30 bg-transparent text-sm outline-none focus:border-primary/50"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 w-full lg:w-auto">
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              placeholder="Status"
              variant="transparent"
            />

            <CustomSelect
              value={range}
              onChange={setRange}
              options={rangeOptions}
              placeholder="Select range"
              variant="transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="border-b border-third/30 text-third text-left whitespace-nowrap">
              <tr>
                <th className="py-3 pr-4">Vehicle</th>
                <th className="pr-4">Inspection Date</th>
                <th className="pr-4">Inspector Name</th>
                <th className="pr-4">Score</th>
                <th className="pr-4">Report Version</th>
                <th className="pr-4">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-third/20 whitespace-nowrap">
              {/* Row 1 */}
              <tr>
                <td className="py-4 pr-6 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Mercedes C-Class
                </td>
                <td className="text-third pr-6">28 Jan 2026</td>
                <td className="text-third pr-6">Amit Verma</td>

                <td className="font-semibold flex items-center gap-2 pr-6">
                  92/100
                  <CheckCircle2 size={16} className="text-green-500" />
                </td>

                <td className="text-third pr-6">v2.1</td>

                <td className="pr-6">
                  <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-[11px] font-medium">
                    Passed
                  </span>
                </td>

                <td className="text-right">
                  <button className="flex items-center gap-2 text-primary hover:underline ml-auto text-xs">
                    <Download size={14} />
                    Download
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="py-4 pr-6 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Honda City
                </td>
                <td className="text-third pr-6">25 Jan 2026</td>
                <td className="text-third pr-6">Priya Shah</td>

                <td className="font-semibold flex items-center gap-2 pr-6">
                  85/100
                  <CheckCircle2 size={16} className="text-orange-400" />
                </td>

                <td className="text-third pr-6">v2.0</td>

                <td className="pr-6">
                  <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-[11px] font-medium">
                    Passed
                  </span>
                </td>

                <td className="text-right">
                  <button className="flex items-center gap-2 text-primary hover:underline ml-auto text-xs">
                    <Download size={14} />
                    Download
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="py-4 pr-6 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Toyota Fortuner
                </td>
                <td className="text-third pr-6">20 Jan 2026</td>
                <td className="text-third pr-6">Rajesh Kumar</td>

                <td className="font-semibold flex items-center gap-2 pr-6">
                  78/100
                  <CheckCircle2 size={16} className="text-orange-400" />
                </td>

                <td className="text-third pr-6">v2.0</td>

                <td className="pr-6">
                  <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-[11px] font-medium">
                    Passed
                  </span>
                </td>

                <td className="text-right">
                  <button className="flex items-center gap-2 text-primary hover:underline ml-auto text-xs">
                    <Download size={14} />
                    Download
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td className="py-4 pr-6 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Hyundai Creta
                </td>
                <td className="text-third pr-6">15 Jan 2026</td>
                <td className="text-third pr-6">Sneha Patil</td>

                <td className="font-semibold flex items-center gap-2 pr-6">
                  88/100
                  <CheckCircle2 size={16} className="text-orange-400" />
                </td>

                <td className="text-third pr-6">v1.9</td>

                <td className="pr-6">
                  <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-[11px] font-medium">
                    Passed
                  </span>
                </td>

                <td className="text-right">
                  <button className="flex items-center gap-2 text-primary hover:underline ml-auto text-xs">
                    <Download size={14} />
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= RE-INSPECTION CONTROL PANEL ================= */}
      <div className="rounded-xl border border-third/30  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">Re-Inspection Control Panel</h2>
          <p className="text-sm text-third">
            Monitor inspection freshness and schedule re-inspections
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-5">
            {/* Freshness Top */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Inspection Freshness</h3>
              <span className="font-bold text-primary">35 Days</span>
            </div>

            {/* Aging Box */}
            <div className="rounded-xl border border-third/30 bg-yellow-500/5 p-5 space-y-4">
              {/* Current Status */}
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-400">Aging</p>
                  <p className="text-sm text-third">
                    Current inspection age:{" "}
                    <span className="font-medium text-primary">35 days</span>
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Fresh (0–30 days)
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  Aging (31–60 days)
                </p>

                <p className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Expired (60+ days)
                </p>
              </div>
            </div>

            {/* Schedule Button */}
            <Button variant="ghost" size="sm" full>
              <RefreshCcw className="mr-4" size={18} />
              Schedule Re-Inspection
            </Button>

            {/* Warning Note */}
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 flex items-center gap-2 text-sm text-yellow-400">
              <AlertTriangle size={18} />
              Vehicles with expired inspections rank{" "}
              <span className="font-semibold">18% lower</span>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-5">
            {/* Score Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Inspection Score Breakdown
              </h3>
              <span className="font-bold text-primary">88/100</span>
            </div>

            {/* Cars Breakdown */}
            <div className="space-y-6">
              {/* BMW */}
              <VehicleScore name="BMW X1" score={92} />

              {/* Audi */}
              <VehicleScore name="Audi A6" score={85} />

              {/* Mercedes */}
              <VehicleScore name="Mercedes C-Class" score={90} />

              {/* Hyundai */}
              <VehicleScore name="Hyundai Creta" score={76} orange />
            </div>

            {/* Insight Box */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 text-sm text-primary">
              Below marketplace average. Consider addressing{" "}
              <span className="font-semibold">low-score vehicles</span> before
              listing.
            </div>
          </div>
        </div>
      </div>


      {/* ================= DISPUTE & ISSUE CENTER ================= */}
      <div className="rounded-xl border border-third/30 p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          {/* Left */}
          <div>
            <h2 className="text-base sm:text-xl font-semibold leading-tight">
              Dispute & Issue Center
            </h2>
            <p className="text-sm text-third">
              Manage buyer disputes and inspection issues
            </p>
          </div>

          {/* Badge */}
          <span className="w-fit px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs sm:text-sm font-semibold">
            1 Open
          </span>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Head */}
            <thead className="border-b border-third/30 text-third text-left whitespace-nowrap">
              <tr>
                <th className="py-3 pr-4">Vehicle</th>
                <th className="pr-4">Buyer</th>
                <th className="pr-4">Issue</th>
                <th className="pr-4">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-third/20 whitespace-nowrap">
              <tr>
                {/* Vehicle */}
                <td className="py-4 pr-6 flex items-center gap-2 font-medium">
                  <Car size={16} className="text-third" />
                  Audi A6
                </td>

                {/* Buyer */}
                <td className="text-third pr-6">Raj P.</td>

                {/* Issue */}
                <td className="flex items-center gap-2 text-third pr-6">
                  <MessageSquare size={16} className="text-third" />
                  Scratch mismatch
                </td>

                {/* Status */}
                <td className="pr-6">
                  <span className="px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-[11px] font-medium">
                    Open
                  </span>
                </td>

                {/* Action */}
                <td className="text-right">
                  <Button variant="ghost" className="px-6 text-xs h-8">
                    Respond
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Info Note */}
        <div className="rounded-xl border border-third/30 bg-primary/5 p-5 flex items-center gap-3 text-sm text-third">
          <Shield size={18} className="text-primary" />
          Quick resolution of disputes reduces fraud and prevents chargebacks.
          Respond within{" "}
          <span className="font-semibold text-primary">24 hours</span> for best
          results.
        </div>
      </div>

      {/* ================= UPGRADE YOUR TRUST VISIBILITY ================= */}
      <div className="rounded-xl border border-third/30  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">
            Upgrade Your Trust Visibility
          </h2>
          <p className="text-sm text-third">
            Premium inspection features to increase buyer confidence and
            conversions
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <PremiumFeatureCard
            icon={<Video size={22} className="text-primary" />}
            title="Inspection Video Walkthrough"
            desc="Complete 360° video documentation"
            tag="+15% trust"
          />

          {/* Feature 2 */}
          <PremiumFeatureCard
            icon={<FileText size={22} className="text-primary" />}
            title="360° Damage Mapping"
            desc="Interactive damage visualization"
            tag="+12% visibility"
          />

          {/* Feature 3 */}
          <PremiumFeatureCard
            icon={<Shield size={22} className="text-primary" />}
            title="Engine Compression Test"
            desc="Detailed engine health report"
            tag="+10% conversion"
          />

          {/* Feature 4 */}
          <PremiumFeatureCard
            icon={<BadgeCheck size={22} className="text-primary" />}
            title="Extended Warranty Badge"
            desc="Premium trust indicator"
            tag="+20% buyer confidence"
          />
        </div>

        {/* Bundle Banner */}
        {/* Bundle Banner */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 sm:px-6 py-4 sm:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Left */}
          <div className="flex items-start gap-3">
            <BadgeCheck size={20} className="text-primary mt-0.5 shrink-0" />

            <div>
              <p className="font-semibold text-sm sm:text-base leading-tight">
                Bundle All Premium Features
              </p>
              <p className="text-xs sm:text-sm text-third mt-0.5">
                Save 25% when you add all premium inspection features
              </p>
            </div>
          </div>

          {/* Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-auto sm:w-auto px-6"
          >
            Get Bundle
          </Button>

        </div>
      </div>
    </section>
  );
}

export default InspectionTab;
function VehicleScore({ name, score, orange }) {
  return (
    <div className="space-y-2 ">
      {/* Top Line */}
      <div className="flex justify-between text-sm font-medium">
        <span>{name}</span>
        <span>{score}/100</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 rounded-full bg-third/20 overflow-hidden">
        <div
          className={`h-full rounded-full ${orange ? "bg-orange-400" : "bg-green-500"
            }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function PremiumFeatureCard({ icon, title, desc, tag }) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-primary/5 p-5 transition-all hover:border-zinc-700">

      {/* Top Row: Icon + Text + Badge */}
      <div className="flex items-start gap-4">

        {/* 1. Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-white border border-zinc-800">
          {icon}
        </div>

        {/* 2. Content (Title & Desc) - flex-1 pushes the badge to the right */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white leading-tight">
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
            {desc}
          </p>
        </div>

        {/* 3. The Badge - shrink-0 prevents it from getting crushed */}
        {tag && (
          <div className="shrink-0">
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-500 border border-emerald-500/20 whitespace-nowrap">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Row: CTA Button */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="w-auto sm:w-auto px-6"
        >
          Add to Inspection
        </Button>
      </div>
    </div>
  );
}