import { postDeviceInfo } from "@/services/user.service";

export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const getDeviceInfo = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return null;

    let deviceUniqueId = localStorage.getItem("deviceUniqueId");
    if (!deviceUniqueId) {
        deviceUniqueId = generateUUID();
        localStorage.setItem("deviceUniqueId", deviceUniqueId);
    }

    const ua = navigator.userAgent;
    let browserName = "Unknown";
    if (ua.indexOf("Firefox") > -1) browserName = "Firefox";
    else if (ua.indexOf("SamsungBrowser") > -1) browserName = "Samsung Internet";
    else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browserName = "Opera";
    else if (ua.indexOf("Trident") > -1) browserName = "Internet Explorer";
    else if (ua.indexOf("Edge") > -1) browserName = "Edge";
    else if (ua.indexOf("Chrome") > -1) browserName = "Chrome";
    else if (ua.indexOf("Safari") > -1) browserName = "Safari";

    let osName = "Unknown";
    if (ua.indexOf("Win") > -1) osName = "Windows";
    else if (ua.indexOf("Mac") > -1) osName = "MacOS";
    else if (ua.indexOf("Linux") > -1) osName = "Linux";
    else if (ua.indexOf("Android") > -1) osName = "Android";
    else if (ua.indexOf("like Mac") > -1) osName = "iOS";

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    return {
        platform: "WEB",
        manufacturer: null,
        browserName,
        deviceModel: isMobile ? "Mobile" : "Desktop",
        deviceName: `${osName} PC`,
        osName,
        osVersion: "11",
        appVersion: "1.0.0",
        buildNumber: "1",
        deviceUniqueId
    };
};

export const sendDeviceInfo = async (force = false) => {
    if (typeof window === "undefined") return;

    try {
        const hasSent = sessionStorage.getItem("deviceInfoSent");
        if (!force && hasSent) {
            return;
        }

        const deviceInfo = getDeviceInfo();
        if (!deviceInfo) return;

        await postDeviceInfo(deviceInfo);
        sessionStorage.setItem("deviceInfoSent", "true");
    } catch (error) {
        console.error("Failed to send device info:", error);
    }
};