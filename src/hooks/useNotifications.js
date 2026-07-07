import { useState, useEffect, useCallback, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/services/notification.service";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const token = useAuthStore((state) => state.token);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!token) {
      setNotifications([]);
      setUnreadCount(0);
      setIsConnected(false);
      return;
    }

    const connectToSSE = async () => {
      abortControllerRef.current = new AbortController();

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const sseUrl = `${apiUrl}/notifications/stream`;

      console.log(`[SSE] Attempting to connect to: ${sseUrl}`);

      try {
        await fetchEventSource(sseUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/event-stream",
          },
          signal: abortControllerRef.current.signal,
          onopen(response) {
            if (
              response.ok &&
              response.headers
                .get("content-type")
                ?.includes("text/event-stream")
            ) {
              console.log("[SSE] Connection successfully established.");
              setIsConnected(true);
              return;
            } else if (
              response.status >= 400 &&
              response.status < 500 &&
              response.status !== 429
            ) {
              throw new Error("Failed to connect to SSE stream");
            }
          },
          onmessage(msg) {
            console.log(`[SSE] Received event: ${msg.event}`, msg.data);
            if (msg.event === "unread_count") {
              const data = JSON.parse(msg.data);
              setUnreadCount(data.count || 0);
            } else if (msg.event === "notification") {
              const newNotification = JSON.parse(msg.data);
              setNotifications((prev) => [newNotification, ...prev]);
            } else if (msg.event === "initial_notifications") {
              const initialNotifications = JSON.parse(msg.data);
              setNotifications(initialNotifications);
            }
          },
          onclose() {
            console.log("[SSE] Connection closed.");
            setIsConnected(false);
          },
          onerror(err) {
            console.error("[SSE] Connection Error:", err);
            setIsConnected(false);
            // Don't retry automatically on 401/403
            if (err?.message === "Failed to connect to SSE stream") {
              throw err;
            }
          },
        });
      } catch (error) {
        console.error("SSE Connection failed:", error);
      }
    };

    connectToSSE();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [token]);

  const handleMarkAsRead = useCallback(async (id) => {
    const res = await markNotificationAsRead(id);
    if (res.success) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    const res = await markAllNotificationsAsRead();
    if (res.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
  };
};
