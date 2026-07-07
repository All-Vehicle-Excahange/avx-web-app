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
import { useNotifications } from "@/hooks/useNotifications";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllNotifications } from "@/services/notification.service";

const NotificationItem = ({ data, onMarkAsRead }) => {
  const isUnread = data.read === false || data.unread === true || data.isRead === false;
  
  return (
    <div 
      onClick={() => isUnread && onMarkAsRead(data.id || data._id)}
      className="flex items-start gap-3 px-3 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors relative border-b border-third/10 last:border-0"
    >
      {/* Content */}
      <div className="flex-1 pr-5">
        <h3 className="text-[13px] font-semibold text-primary mb-0.5 leading-snug">
          {data.title || "Notification"}
        </h3>
        <p className="text-[12px] text-primary/60 leading-snug mb-1">
          {data.body || data.content || data.message}
        </p>
        <span className="text-[11px] font-medium text-third/60">
          {data.sentAt ? new Date(data.sentAt).toLocaleDateString() : data.time || new Date(data.createdAt).toLocaleDateString() || "Just now"}
        </span>
      </div>

      {/* Unread Dot */}
      {isUnread && (
        <div className="shrink-0 mt-1.5 w-2 h-2 bg-fourth rounded-full" />
      )}
    </div>
  );
};

export default function NotificationsComponent({ isOpen, onClose }) {
  const { unreadCount, markAsRead, markAllAsRead, isConnected } = useNotifications();
  const queryClient = useQueryClient();

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["notificationsList"],
    queryFn: getAllNotifications,
    enabled: isOpen,
  });

  const displayNotifications = apiResponse?.data || apiResponse || [];

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    queryClient.invalidateQueries(["notificationsList"]);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    queryClient.invalidateQueries(["notificationsList"]);
  };

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
            <h1 className="text-lg font-bold text-primary tracking-tight flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-fourth text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <div className="flex gap-1.5">
              <button className="w-7 h-7 rounded-md border border-third/30 flex items-center justify-center text-primary hover:bg-white/5 transition-colors" title="Settings">
                <SlidersHorizontal size={13} />
              </button>
              <button 
                onClick={handleMarkAllAsRead}
                className="w-7 h-7 rounded-md border border-third/30 flex items-center justify-center text-primary hover:bg-white/5 transition-colors" 
                title="Mark all as read"
              >
                <MailOpen size={13} />
              </button>
              <button className="w-7 h-7 rounded-md border border-third/30 flex items-center justify-center text-primary hover:bg-white/5 transition-colors" title="More Options">
                <Settings size={13} />
              </button>
            </div>
          </div>

          {/* Connection Status */}
          {!isConnected && (
             <div className="text-xs text-third/60 mb-3 px-1 text-center">
                Connecting to live updates...
             </div>
          )}

          {/* Notifications List */}
          <div>
            <div className="flex flex-col">
              {isLoading ? (
                <div className="text-center text-third/60 text-sm py-10">
                  Loading notifications...
                </div>
              ) : displayNotifications && displayNotifications.length > 0 ? (
                displayNotifications.map((item, index) => (
                  <NotificationItem 
                    key={item.id || item._id || index} 
                    data={item} 
                    onMarkAsRead={handleMarkAsRead}
                  />
                ))
              ) : (
                <div className="text-center text-third/60 text-sm py-10">
                  No notifications yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
