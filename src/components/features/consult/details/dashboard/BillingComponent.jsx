"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";
import {
  Crown,
  Check,
  CreditCard,
  Download,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";

export default function BillingComponent() {
  const [range, setRange] = useState("30");

  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 60 days", value: "60" },
    { label: "Last 90 days", value: "90" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Subscription & Billing</h1>
        <p className="text-third text-sm">Reinforce premium status</p>
      </div>

      {/* PREMIUM PLAN */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-primary/10 backdrop-blur-xl p-8 space-y-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Crown className="text-yellow-300" />
            <div>
              <p className="text-xs uppercase tracking-wider">
                Premium Consultant
              </p>
              <p className="text-lg font-semibold">Annual Subscription</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
            Active
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-xs opacity-70">Plan Value</p>
            <p className="font-semibold">₹9,999 / year</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-xs opacity-70">Next Renewal</p>
            <p className="font-semibold">12 Oct 2024</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs opacity-90">Auto-renewal enabled</span>
          <Button variant="ghost">Manage Subscription</Button>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
        <h2 className="font-semibold">Benefits Active</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-3 rounded-xl border border-third/30 bg-primary/5 p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Featured eligibility</p>
              <p className="text-xs text-third">
                Premium placement in search results
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-third/30 bg-primary/5 p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Storefront boosts</p>
              <p className="text-xs text-third">Enhanced brand visibility</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-third/30 bg-primary/5 p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Advanced analytics</p>
              <p className="text-xs text-third">
                Deep insights into performance
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-third/30 bg-primary/5 p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Priority inquiries</p>
              <p className="text-xs text-third">
                First access to high intent buyers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AVX WALLET */}
      <div className="relative rounded-2xl border border-third/40 bg-linear-to-r from-primary/5 to-secondary/20 p-6 overflow-hidden">
        {/* Status Pill */}
        <div className="absolute top-4 right-4">
          <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium backdrop-blur-md">
            Active
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <CreditCard size={16} />
            AVX Wallet
          </div>

          <p className="text-xs text-third">Available Balance</p>
          <p className="text-3xl font-bold">₹ 3,420.00</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <Button size="md" variant="ghost">
            + Add Money
          </Button>
          <Button size="sm" variant="outlineSecondary">
            Auto-Recharge Settings
          </Button>
        </div>
      </div>

      {/* WALLET USAGE */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
        <div className="flex items-center gap-2 font-semibold">
          <TrendingUp size={16} />
          Wallet Usage (Last 30 Days)
        </div>

        <div className="divide-y divide-third/30 text-sm">
          <div className="flex justify-between py-3">
            <span className="text-third">PPC Campaigns</span>
            <span>₹ 1,820</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-third">Boosts</span>
            <span>₹ 740</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-third">Inspections</span>
            <span>₹ 360</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-third">Refunds / Credits</span>
            <span className="text-green-400">₹ 80</span>
          </div>
        </div>

        <div className="flex justify-between border-t border-third/40 pt-4 font-semibold">
          <span>Total Spent</span>
          <span>₹ 2,840</span>
        </div>
      </div>

      {/* PAYMENT METHOD */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Payment Method</h2>
          <Button variant="outlineSecondary">Update</Button>
        </div>

        <div className="flex items-center gap-4 border border-third/30 rounded-xl p-4">
          <CreditCard />
          <div className="flex-1">
            <p className="text-sm">**** **** **** 4242</p>
            <p className="text-xs text-third">Expires 12/25</p>
          </div>
          <span className="text-xs px-3 py-1 bg-primary/10 rounded-full">
            Primary
          </span>
        </div>
      </div>

      {/* TRANSACTION HISTORY */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <IndianRupee size={16} />
            Transaction History
          </div>

          <div className="flex items-center gap-3">
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
            <thead className="border-b border-third/30 text-third">
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Reference</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-third/20">
              <tr>
                <td className="py-3">12 Oct</td>
                <td>PPC Spend</td>
                <td className="text-primary">BMW X1 Boost</td>
                <td className="text-right">₹120</td>
              </tr>

              <tr>
                <td className="py-3">11 Oct</td>
                <td>Inspection</td>
                <td className="text-primary">AVX-INS-2381</td>
                <td className="text-right">₹360</td>
              </tr>

              <tr>
                <td className="py-3">10 Oct</td>
                <td>Wallet Top-up</td>
                <td className="text-primary">Razorpay</td>
                <td className="text-right text-green-400">+₹2,000</td>
              </tr>

              <tr>
                <td className="py-3">08 Oct</td>
                <td>Refund</td>
                <td className="text-primary">Failed Campaign</td>
                <td className="text-right text-green-400">+₹80</td>
              </tr>

              <tr>
                <td className="py-3">07 Oct</td>
                <td>Boost</td>
                <td className="text-primary">Audi A4 Premium</td>
                <td className="text-right">₹200</td>
              </tr>

              <tr>
                <td className="py-3">05 Oct</td>
                <td>PPC Spend</td>
                <td className="text-primary">Mercedes Campaign</td>
                <td className="text-right">₹450</td>
              </tr>

              <tr>
                <td className="py-3">04 Oct</td>
                <td>Boost</td>
                <td className="text-primary">Tesla Model 3</td>
                <td className="text-right">₹540</td>
              </tr>

              <tr>
                <td className="py-3">03 Oct</td>
                <td>PPC Spend</td>
                <td className="text-primary">Luxury Cars Ad</td>
                <td className="text-right">₹250</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYMENT HISTORY */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
        <h2 className="font-semibold">Payment History</h2>

        <table className="w-full text-sm">
          <thead className="text-third border-b border-third/30">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Plan</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-third/20">
              <td className="py-3">12 Oct 2023</td>
              <td>Annual Premium</td>
              <td>₹9,999</td>
              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                  Paid
                </span>
              </td>
              <td>
                <button className="flex items-center gap-2 text-primary hover:underline">
                  <Download size={14} /> INV-2023-001
                </button>
              </td>
            </tr>

            <tr>
              <td className="py-3">12 Oct 2022</td>
              <td>Annual Premium</td>
              <td>₹9,999</td>
              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                  Paid
                </span>
              </td>
              <td>
                <button className="flex items-center gap-2 text-primary hover:underline">
                  <Download size={14} /> INV-2022-001
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
