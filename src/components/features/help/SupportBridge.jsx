// app/components/support/SupportBridge.jsx
"use client";

import { useState, useRef } from "react";
import SupportFlow from "./SupportFlow";
import SupportRequests from "./SupportRequests";

const SEED_TICKETS = [
  {
    id: "TKT-00412", category: "Listing Issue", status: "In Progress", updated: "2 hrs ago",
    subject: "Vehicle price not updating after edit",
    messages: [
      { from: "You", time: "3 days ago", text: "I submitted this request because the price field doesn't save after editing. Please assist.", mine: true },
      { from: "Support", time: "2 days ago", text: "Thank you for reaching out. We've received your request and assigned it to our team. We'll update you shortly.", mine: false },
      { from: "You", time: "2 hrs ago", text: "Any updates on this?", mine: true },
      { from: "Support", time: "1 hr ago", text: "Our team is actively investigating. We expect a fix within 24 hours.", mine: false },
    ],
  },
  {
    id: "TKT-00389", category: "Account Access", status: "Escalated", updated: "Yesterday",
    subject: "Unable to login after password reset",
    messages: [
      { from: "You", time: "5 days ago", text: "After resetting my password, I'm still unable to log in.", mine: true },
      { from: "Support", time: "4 days ago", text: "We're looking into this. Could you confirm the email address linked to your account?", mine: false },
      { from: "You", time: "4 days ago", text: "Sure, it's the email I used to register.", mine: true },
    ],
  },
  {
    id: "TKT-00371", category: "Payment", status: "Resolved", updated: "3 days ago",
    subject: "Double charge on subscription renewal",
    messages: [
      { from: "You", time: "1 week ago", text: "I was charged twice on my renewal. Please refund the extra charge.", mine: true },
      { from: "Support", time: "5 days ago", text: "We've confirmed the duplicate charge and issued a full refund. It should reflect within 3-5 business days.", mine: false },
    ],
  },
  {
    id: "TKT-00355", category: "Verification", status: "Open", updated: "5 days ago",
    subject: "Consultant badge not reflecting new tier",
    messages: [
      { from: "You", time: "5 days ago", text: "My badge still shows the old tier even though I've been upgraded.", mine: true },
    ],
  },
  {
    id: "TKT-00340", category: "Technical", status: "Closed", updated: "2 weeks ago",
    subject: "Dashboard analytics not loading on mobile",
    messages: [
      { from: "You", time: "3 weeks ago", text: "The analytics dashboard shows a blank screen on my phone.", mine: true },
      { from: "Support", time: "2 weeks ago", text: "This was a known bug in the mobile rendering layer. We've deployed a fix — please clear your app cache and try again.", mine: false },
      { from: "You", time: "2 weeks ago", text: "That worked, thanks!", mine: true },
    ],
  },
];

export default function SupportBridge() {
  const [tickets, setTickets] = useState(SEED_TICKETS);
  const [view, setView] = useState("requests"); // "requests" | "flow"

  const handleTicketCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    setTimeout(() => {
      setView("requests");
    }, 1800);
  };

  const handleNewRequest = () => setView("flow");
  const handleBackToRequests = () => setView("requests");

  return (
    <div className="min-h-screen bg-secondary">
      {view === "flow" ? (
        <SupportFlow
          onTicketCreated={handleTicketCreated}
          onBack={handleBackToRequests}
        />
      ) : (
        <SupportRequests
          tickets={tickets}
          setTickets={setTickets}
          onNewRequest={handleNewRequest}
        />
      )}
    </div>
  );
}