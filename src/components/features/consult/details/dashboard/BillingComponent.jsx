"use client";

import React from "react";
import Button from "@/components/ui/button";
import { Crown, Check, CreditCard, Download } from "lucide-react";

export default function BillingComponent() {
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
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs">
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
