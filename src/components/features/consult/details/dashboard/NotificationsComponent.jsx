import React, { useState, useEffect, useRef } from "react";
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
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getAllNotifications } from "@/services/notification.service";

const NotificationItem = ({ data, onMarkAsRead }) => {
  const isUnread =
    data.read === false || data.unread === true || data.isRead === false;

  return (
    <div
      onClick={() => isUnread && onMarkAsRead(data.id || data._id)}
      className="flex items-start gap-3 px-3 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors relative border-b border-third/10 last:border-0"
    >
      {/* Content */}
      <div className="flex-1 pr-5">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-[13px] font-semibold text-primary leading-snug">
            {data.title || "Notification"}
          </h3>
        </div>
        <p className="text-[12px] text-primary/60 leading-snug mb-1">
          {data.body || data.content || data.message}
        </p>
        <span className="text-[11px] font-medium text-third/60">
          {data.sentAt
            ? new Date(data.sentAt).toLocaleDateString()
            : data.time ||
              new Date(data.createdAt).toLocaleDateString() ||
              "Just now"}
        </span>
      </div>

      {/* Unread Dot */}
      {isUnread && (
        <div className="shrink-0 mt-1.5 w-2 h-2 bg-fourth rounded-full" />
      )}
    </div>
  );
};

export default function NotificationsComponent({
  isOpen,
  onClose,
  unreadCount,
  markAsRead,
  markAllAsRead,
  isConnected,
}) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("ALL");
  const observerRef = useRef(null);

  const {
    data: apiResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notificationsList", filter],
    queryFn: ({ pageParam = 1 }) =>
      getAllNotifications({
        pageNo: pageParam,
        size: 20,
        ...(filter === "UNREAD" ? { isRead: false } : {}),
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage?.pageResponse?.totalPages || 1;
      const nextPage = allPages.length + 1;
      console.log("[Pagination] lastPage:", lastPage);
      console.log(
        "[Pagination] allPages length:",
        allPages.length,
        "totalPages:",
        totalPages,
        "nextPage:",
        nextPage,
      );
      return nextPage <= totalPages ? nextPage : undefined;
    },
    enabled: isOpen,
    initialPageParam: 1,
  });

  const displayNotifications =
    apiResponse?.pages?.flatMap(
      (page) => page?.data?.data || page?.data || [],
    ) || [];

  const containerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current || !containerRef.current) return;

    console.log(
      "[Observer] Initializing observer. hasNextPage:",
      hasNextPage,
      "isFetchingNextPage:",
      isFetchingNextPage,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("[Observer] Intersecting:", entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("[Observer] Triggering fetchNextPage()");
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    observer.observe(observerRef.current);

    return () => {
      console.log("[Observer] Disconnecting observer.");
      observer.disconnect();
    };
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    displayNotifications.length,
  ]);

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
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-auto custom-scrollbar px-4 pt-5 pb-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold text-primary tracking-tight flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-fourth text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <div className="flex gap-1.5">
              <button
                onClick={handleMarkAllAsRead}
                className="w-7 h-7 rounded-md border border-third/30 flex items-center justify-center text-primary hover:bg-white/5 transition-colors"
                title="Mark all as read"
              >
                <MailOpen size={13} />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors ${filter === "ALL" ? "bg-primary text-secondary border-primary" : "border-third/30 text-primary hover:bg-white/5"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("UNREAD")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors ${filter === "UNREAD" ? "bg-primary text-secondary border-primary" : "border-third/30 text-primary hover:bg-white/5"}`}
            >
              Unread
            </button>
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
              {isLoading && displayNotifications.length === 0 ? (
                <div className="text-center text-third/60 text-sm py-10">
                  Loading notifications...
                </div>
              ) : displayNotifications && displayNotifications.length > 0 ? (
                <>
                  {displayNotifications.map((item, index) => (
                    <NotificationItem
                      key={item.id || item._id || index}
                      data={item}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}

                  {/* Intersection Observer Target */}
                  <div ref={observerRef} className="h-4 w-full" />

                  {isFetchingNextPage ? (
                    <div className="text-center text-third/60 text-xs py-4">
                      Loading more...
                    </div>
                  ) : hasNextPage ? (
                    <div className="text-center text-third/60 text-xs py-4">
                      Scroll for more (Debug: hasNextPage={String(hasNextPage)})
                    </div>
                  ) : (
                    <div className="text-center text-third/60 text-xs py-4">
                      No more notifications
                    </div>
                  )}
                </>
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
