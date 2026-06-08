"use client";

import { useState } from "react";
import SupportFlowModal from "./SupportFlowModal";
import SupportRequests from "./SupportRequests";

export default function SupportBridge() {
  const [view, setView] = useState("requests");

  return (
    <div className="px-2 sm:px-8 lg:px-4">
      <div className="max-w-7xl mx-auto">
        <SupportRequests
          onNewRequest={() => setView("flow")}
        />

        {view === "flow" && (
          <SupportFlowModal onClose={() => setView("requests")} />
        )}
      </div>
    </div>
  );
}
