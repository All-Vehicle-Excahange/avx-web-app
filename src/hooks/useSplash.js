import { useEffect, useState } from "react";

export default function useSplash() {
  const [showSplash, setShowSplash] = useState(false);

  // Check whether splash screen should be displayed
  useEffect(() => {
    const checkSplash = () => {
      // Bypass splash screen for search engine crawlers and performance tools to ensure correct indexing
      if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        const isCrawler =
          /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|lighthouse/i.test(
            navigator.userAgent,
          );
        if (isCrawler) {
          setShowSplash(false);
          return;
        }
      }

      try {
        const hasSeenSplash = localStorage.getItem("splashSeen");
        const sessionSeen = sessionStorage.getItem("splashSession");

        if (hasSeenSplash || sessionSeen) {
          setShowSplash(false);
        } else {
          setShowSplash(true);
        }
      } catch (e) {
        setShowSplash(false);
      }
    };

    checkSplash();
  }, []);

  // Cross-tab splash sync via BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel("splash_channel");

    channel.onmessage = (event) => {
      if (event.data === "SPLASH_DONE") {
        setShowSplash(false);
      }
    };

    return () => channel.close();
  }, []);

  // Complete Splash Screen handler
  const handleSplashComplete = () => {
    try {
      localStorage.setItem("splashSeen", "true");
      sessionStorage.setItem("splashSession", "true");
    } catch (e) {}

    const channel = new BroadcastChannel("splash_channel");
    channel.postMessage("SPLASH_DONE");
    channel.close();

    setShowSplash(false);
  };

  return {
    showSplash,
    handleSplashComplete,
  };
}
