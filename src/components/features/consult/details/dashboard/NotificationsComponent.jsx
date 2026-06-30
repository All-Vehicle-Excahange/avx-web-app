import React from "react";
import {
  Settings,
  CheckSquare,
  MessageCircle,
  MessageSquare,
  AlertCircle,
  MailCheck,
  SlidersHorizontal,
  MailOpen,
} from "lucide-react";

const notificationsMock = [
  {
    id: 1,
    title: "New Inquiry Found",
    content: "Someone has inquired about your listing.",
    time: "10 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Profile Update Request Accepted",
    content: "Your profile details have been successfully updated.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 3,
    title: "Inspection Scheduled",
    content: "Your vehicle inspection has been scheduled for tomorrow.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    title: "Ad Expired",
    content: "Your listing for Hyundai i20 has expired.",
    time: "3 days ago",
    unread: false,
  },
];

const NotificationItem = ({ data }) => {
  return (
    <div className="flex items-start gap-3 px-3 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors relative border-b border-third/10 last:border-0">
      {/* Content */}
      <div className="flex-1 pr-5">
        <h3 className="text-[13px] font-semibold text-primary mb-0.5 leading-snug">
          {data.title}
        </h3>
        <p className="text-[12px] text-primary/60 leading-snug mb-1">
          {data.content}
        </p>
        <span className="text-[11px] font-medium text-third/60">
          {data.time}
        </span>
      </div>

      {/* Unread Dot */}
      {data.unread && (
        <div className="shrink-0 mt-1.5 w-2 h-2 bg-fourth rounded-full" />
      )}
    </div>
  );
};

export default function NotificationsComponent({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      )}

      {/* Slide-out panel */}
      <div
        className={`fixed top-16 left-0 md:left-16 h-[calc(100vh-64px)] w-full max-w-sm bg-secondary border-r border-third/30 z-60 shadow-[4px_0_24px_rgba(0,0,0,0.5)] md:rounded-r-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-[150%]"
        }`}
      >
        <div className="w-full h-full overflow-y-auto custom-scrollbar px-4 pt-5 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-lg font-bold text-primary tracking-tight">
              Notifications
            </h1>
            <div className="flex gap-1.5">
              <button className="w-7 h-7 rounded-md border border-third/30 flex items-center justify-center text-primary hover:bg-white/5 transition-colors">
                <SlidersHorizontal size={13} />
              </button>
              <button className="w-7 h-7 rounded-md border border-third/30 flex items-center justify-center text-primary hover:bg-white/5 transition-colors">
                <MailOpen size={13} />
              </button>
              <button className="w-7 h-7 rounded-md border border-third/30 flex items-center justify-center text-primary hover:bg-white/5 transition-colors">
                <Settings size={13} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div>
            <div className="flex flex-col">
              {notificationsMock.map((item) => (
                <NotificationItem key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
