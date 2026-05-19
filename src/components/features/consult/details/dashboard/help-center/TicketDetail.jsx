import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Paperclip, Send, X, ShieldAlert, BadgeAlert, ArrowLeft, Info } from "lucide-react";
import Button from "@/components/ui/button";

export default function TicketDetail({
  ticket,
  onNavigate,
  onAddReply,
  onCloseTicket
}) {
  const [replyText, setReplyText] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const threadEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on load/new messages
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  if (!ticket) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim() && attachedFiles.length === 0) return;

    const userMessage = {
      sender: "user",
      senderName: "You",
      text: replyText,
      time: "Just now",
      attachments: attachedFiles.length > 0 ? attachedFiles : undefined
    };

    onAddReply(ticket.id, userMessage);
    setReplyText("");
    setAttachedFiles([]);

    // Trigger mock auto-reply after 1.5 seconds to simulate a live agent response!
    setTimeout(() => {
      const mockAgentResponses = [
        "We have received your message and our tech team is looking into the log traces. We will update you as soon as we have a progress report.",
        "Thanks for the update. We have escalated this to our senior billing administrator to verify the ledger entries. Expect a status change within 1 hour.",
        "Understood. Our customer relations manager has been assigned to mediate this inspection mismatch and will reach out to the buyer Raj P. directly. Please stand by.",
        "Your update has been logged. We are checking the server configurations. Thank you for your patience."
      ];

      const randomResponse = mockAgentResponses[Math.floor(Math.random() * mockAgentResponses.length)];

      const adminMessage = {
        sender: "admin",
        senderName: "Reecomm Support",
        text: randomResponse,
        time: "Just now"
      };

      onAddReply(ticket.id, adminMessage);
    }, 1500);
  };

  const handleAttachClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...files.map(f => f.name)]);
    };
    input.click();
  };

  const removeAttachedFile = (idx) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-500";
      case "medium": return "bg-orange-400";
      case "low": return "bg-green-500";
      default: return "bg-third";
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "open": return "bg-orange-500/15 text-orange-400 border border-orange-500/30";
      case "in progress": return "bg-blue-500/15 text-blue-400 border border-blue-500/30";
      case "awaiting reply": return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30";
      case "resolved": return "bg-green-500/15 text-green-400 border border-green-500/30";
      case "closed": return "bg-third/15 text-third border border-third/30";
      default: return "bg-third/10 text-third";
    }
  };

  return (
    <div className="space-y-6 animate-[fadeUp_0.3s_ease-out]">
      {/* Breadcrumbs */}
      <nav className="flex items-center justify-between text-xs text-third">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-fourth transition-colors cursor-pointer"
          >
            Help Center
          </button>
          <ChevronRight size={12} className="text-third/50" />
          <button
            onClick={() => onNavigate("my-tickets")}
            className="hover:text-fourth transition-colors cursor-pointer"
          >
            My Tickets
          </button>
          <ChevronRight size={12} className="text-third/50" />
          <span className="text-primary font-medium">{ticket.id}</span>
        </div>

        <button
          onClick={() => onNavigate("my-tickets")}
          className="flex cursor-pointer  items-center gap-1 text-xs hover:text-primary transition-colors text-third bg-primary/5 border border-third/35 px-3 py-1.5 rounded-lg"
        >
          <ArrowLeft size={12} /> Back to List
        </button>
      </nav>

      {/* Ticket Details Summary Card */}
      <div className="bg-primary/5 border border-third/15 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="text-[10px] text-third/75 font-semibold uppercase tracking-wider">
              {ticket.id} · {ticket.category}
            </div>
            <h2 className="text-lg font-bold text-primary mt-1 leading-tight">{ticket.subject}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusBadge(ticket.status)}`}>
              {ticket.status}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-third">
              <span className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`} />
              <span>{ticket.priority} Priority</span>
            </div>
          </div>
        </div>

        <hr className="border-third/10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-third block mb-1">Created</span>
            <span className="text-primary font-medium">{ticket.createdDate}</span>
          </div>
          <div>
            <span className="text-third block mb-1">Last Updated</span>
            <span className="text-primary font-medium">{ticket.lastUpdated}</span>
          </div>
          <div>
            <span className="text-third block mb-1">Assigned to</span>
            <span className="text-primary font-medium">{ticket.assignedTo}</span>
          </div>
          <div>
            <span className="text-third block mb-1">Related Vehicle</span>
            <span className="text-primary font-medium truncate block max-w-full" title={ticket.relatedVehicle}>
              {ticket.relatedVehicle}
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Status Action / Notice */}
      {ticket.status.toLowerCase() === "resolved" ? (
        <div className="border border-third/15 rounded-2xl p-5 text-center flex flex-col items-center gap-3">
          <BadgeAlert size={28} className="text-green-500" />
          <div>
            <h4 className="text-sm font-semibold text-primary">This ticket has been resolved</h4>
            <p className="text-xs text-third mt-1">
              If you have further questions or if this issue persists, please open a new support ticket.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("create")}
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 cursor-pointer"
          >
            Open New Ticket
          </Button>
        </div>
      ) : (
        <div className="border border-fourth/20 rounded-xl py-3.5 px-4 bg-fourth/10 backdrop-blur-md flex items-center justify-start gap-2.5 text-xs text-fourth font-medium">
          <Info size={14} className="shrink-0" />
          <span>Our admin will contact you regarding this ticket.</span>
        </div>
      )}
    </div>
  );
}
