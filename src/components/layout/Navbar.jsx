"use client";
import { Menu, Search } from "lucide-react";
import Button from "../ui/button";

export default function Navbar({ heroMode = false, scrolled = false }) {
  return (
    <nav
      className={`
        w-full transition-all duration-300
        ${
          heroMode
            ? scrolled
              ? "bg-white text-black shadow-xl backdrop-blur-lg h-16"
              : "bg-primary text-secondary h-24"
            : "bg-primary text-secondary h-16"
        }
      `}
    >
      <div className="w-full px-8 mx-auto h-full flex items-center justify-between ">
        {/* LEFT */}
        <div className="flex items-center h-10 px-4  gap-3 bg-secondary text-primary">
          <Menu className="w-5 h-5" />
          <span className="font-black italic">AVX</span>
        </div>

        {heroMode && (
          <div className="hidden md:flex flex-1 justify-center">
            <div
              className={`relative flex items-center h-12 w-[520px] rounded-full px-6 transition-all duration-300
              ${
                scrolled
                  ? "bg-secondary/10  border border-gray-200"
                  : "bg-secondary/5 backdrop-blur-lg border border-white/20"
              }
            `}
            >
              <Search
                className={`w-4 h-4 mr-3 ${scrolled ? "text-gray-600" : "text-third"}`}
              />

              <input
                type="text"
                placeholder="Search destination"
                className={`w-full bg-transparent placeholder:text-sm focus:outline-none
                ${scrolled ? "text-black placeholder:text-gray-400" : "text-white placeholder:text-third"}
                `}
              />

              <div
                className={`ml-auto p-2 rounded-full transition
                ${scrolled ? "bg-primary text-secondary" : "bg-white/20 text-secondary"}
                `}
              >
                <Search size={14} />
              </div>
            </div>
          </div>
        )}

        {/* RIGHT CTA */}
        <Button size="sm">Sell Your Vehicle</Button>
      </div>
    </nav>
  );
}
