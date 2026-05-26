import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  Paperclip,
  Send,
  X,
  ShieldAlert,
  BadgeAlert,
  ArrowLeft,
  Info,
} from "lucide-react";
import Button from "@/components/ui/button";

const isImage = (url) => {
  if (!url) return false;
  const ext = url.split("?")[0].split(".").pop().toLowerCase();
  return ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
};

const isVideo = (url) => {
  if (!url) return false;
  const ext = url.split("?")[0].split(".").pop().toLowerCase();
  return ["mp4", "webm", "ogg", "mov"].includes(ext);
};

export default function TicketDetail({
  ticket,
  onNavigate,
  onAddReply,
  onCloseTicket,
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
      attachments: attachedFiles.length > 0 ? attachedFiles : undefined,
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
        "Your update has been logged. We are checking the server configurations. Thank you for your patience.",
      ];

      const randomResponse =
        mockAgentResponses[
          Math.floor(Math.random() * mockAgentResponses.length)
        ];

      const adminMessage = {
        sender: "admin",
        senderName: "Reecomm Support",
        text: randomResponse,
        time: "Just now",
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
      setAttachedFiles((prev) => [...prev, ...files.map((f) => f.name)]);
    };
    input.click();
  };

  const removeAttachedFile = (idx) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-green-500";
      default:
        return "bg-third";
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-orange-500/15 text-orange-400 border border-orange-500/30";
      case "in progress":
        return "bg-blue-500/15 text-blue-400 border border-blue-500/30";
      case "awaiting reply":
        return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30";
      case "resolved":
        return "bg-green-500/15 text-green-400 border border-green-500/30";
      case "closed":
        return "bg-third/15 text-third border border-third/30";
      default:
        return "bg-third/10 text-third";
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
          <span className="text-primary font-medium">
            {ticket.ticketNumber || ticket.id}
          </span>
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
              {ticket.ticketNumber || ticket.id} · {ticket.category}
            </div>
            <h2 className="text-lg font-bold text-primary mt-1 leading-tight">
              {ticket.subject}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusBadge(ticket.status)}`}
            >
              {ticket.status}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-third">
              <span
                className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`}
              />
              <span>{ticket.priority} Priority</span>
            </div>
          </div>
        </div>

        <hr className="border-third/10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-third block mb-1">Created</span>
            <span className="text-primary font-medium">
              {ticket.createdDate}
            </span>
          </div>
          <div>
            <span className="text-third block mb-1">Vehicle</span>
            <span
              className="text-primary font-medium truncate block max-w-full"
              title={ticket.relatedVehicle}
            >
              {ticket.relatedVehicle && ticket.relatedVehicle !== "None"
                ? ticket.relatedVehicle
                : "—"}
            </span>
          </div>
          <div>
            <span className="text-third block mb-1">Assigned to</span>
            <span className="text-primary font-medium">
              {ticket.assignedTo}
            </span>
          </div>
          <div>
            <span className="text-third block mb-1">Sub-category</span>
            <span
              className="text-primary font-medium truncate block max-w-full"
              title={ticket.subCategory}
            >
              {ticket.subCategory || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Description & Attachments Box */}
      <div className="bg-primary/5 border border-third/15 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-third">
          Description
        </h3>
        <p className="text-sm text-primary leading-relaxed whitespace-pre-line bg-primary/10 border border-primary/20 rounded-xl p-4">
          {ticket.description}
        </p>

        {ticket.attachments && ticket.attachments.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-third">
              Attachments
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ticket.attachments.map((url, idx) => {
                const fileName =
                  url.split("/").pop() || `Attachment-${idx + 1}`;
                const isImg = isImage(url);
                const isVid = isVideo(url);

                if (isImg) {
                  return (
                    <div
                      key={idx}
                      className="relative group border border-third/15 rounded-xl overflow-hidden bg-black/40"
                    >
                      <img
                        src={url}
                        alt={fileName}
                        className="w-full h-40 object-cover hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white bg-primary/80 hover:bg-primary px-3 py-1.5 rounded-lg flex items-center gap-1 w-full justify-center"
                        >
                          <Paperclip size={12} /> View Full Image
                        </a>
                      </div>
                    </div>
                  );
                }

                if (isVid) {
                  return (
                    <div
                      key={idx}
                      className="border border-third/15 rounded-xl overflow-hidden bg-black/40 p-2"
                    >
                      <video
                        src={url}
                        controls
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="p-2 text-center">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-fourth hover:underline truncate block"
                          title={fileName}
                        >
                          {fileName}
                        </a>
                      </div>
                    </div>
                  );
                }

                // Fallback for document files
                return (
                  <div
                    key={idx}
                    className="flex flex-col justify-between border border-third/15 rounded-xl p-4 bg-primary/5 hover:border-fourth/30 transition"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Paperclip size={16} className="text-fourth" />
                      <span
                        className="text-xs font-semibold truncate text-primary"
                        title={fileName}
                      >
                        {fileName}
                      </span>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-xs font-medium bg-primary text-secondary hover:bg-primary/95 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Download File
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Ticket Status Action / Notice */}
      {ticket.status.toLowerCase() === "resolved" ? (
        <div className="border border-third/15 rounded-2xl p-5 text-center flex flex-col items-center gap-3">
          <BadgeAlert size={28} className="text-green-500" />
          <div>
            <h4 className="text-sm font-semibold text-primary">
              This ticket has been resolved
            </h4>
            <p className="text-xs text-third mt-1">
              If you have further questions or if this issue persists, please
              open a new support ticket.
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border border-third/15 rounded-xl py-3.5 px-4 bg-primary/5">
          <div className="flex items-center gap-2.5 text-xs text-fourth font-medium">
            <Info size={14} className="shrink-0" />
            <span>Our admin will contact you regarding this ticket.</span>
          </div>
          <Button
            onClick={() => onCloseTicket(ticket.id)}
            variant="outlineSecondary"
            size="sm"
            className="flex items-center gap-1 cursor-pointer hover:bg-rose-500/20 hover:border-rose-500 hover:text-rose-400"
          >
            Close Ticket
          </Button>
        </div>
      )}
    </div>
  );
}
