import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { User } from "lucide-react";

function Main() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-lg max-w-md rounded-2xl bg-primary/5 border border-third/30 backdrop-blur-xl p-8">
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
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "login" ? "bg-primary text-secondary" : "text-third"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "register"
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
  );
}

export default Main;
