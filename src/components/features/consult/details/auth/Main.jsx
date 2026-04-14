"use client";

import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

function Main() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const isConsultant = ["CONSULTATION", "CONSULTANT_APPLICANT"].includes(user?.userRole);

  useEffect(() => {
    if (isLoggedIn && isConsultant) {
      router.push("/consult/subscription");
    }
  }, [isLoggedIn, isConsultant, router]);

  if (isLoggedIn && isConsultant) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4 py-8">
      <div className="relative flex w-full max-w-[900px] min-h-[600px] overflow-hidden rounded-2xl shadow-2xl bg-secondary border border-third/30">
        
        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative">
          <Image src="/cs.png" alt="Cars" fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 z-10">
            <h2 className="text-4xl font-bold text-white leading-tight">
              A whole new
              <br />
              world of Cars
            </h2>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-primary/5 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-third/30 flex items-center justify-center text-primary">
            <User />
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-center text-primary">
            Welcome Back
          </h2>
          <p className="text-center text-third text-sm mt-1">
            Sign in to continue your application
          </p>

          {/* TABS */}
          <div className="mt-6 flex rounded-full bg-primary/10 p-1 border border-third/30">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 cursor-pointer rounded-full text-sm font-medium transition ${activeTab === "login" ? "bg-primary text-secondary" : "text-third"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 cursor-pointer rounded-full text-sm font-medium transition ${activeTab === "register"
                ? "bg-primary text-secondary"
                : "text-third"
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* CONTENT */}
          <div className="mt-6">
            {activeTab === "login" ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
