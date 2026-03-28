export const getSellerTierTitle = () => {
    try {
        const tier = localStorage.getItem("sellerTier");

        if (!tier) return null;

        return tier;
    } catch (error) {
        console.error("Error getting seller tier:", error);
        return null;
    }
};


export const formatResponseTime = (minutes) => {
    if (!minutes || minutes <= 0) return "0 min";

    const totalMinutes = Math.floor(minutes);

    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const mins = totalMinutes % 60;

    let result = [];

    if (days) result.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours) result.push(`${hours} hr`);
    if (mins) result.push(`${mins} min`);

    return result.join(" ");
};


export const getResponseStatus = (minutes) => {
    if (!minutes || minutes <= 0) return { label: "No Data", color: "text-gray-500" };

    if (minutes <= 15) {
        return { label: "Good", color: "text-green-600" };
    }

    if (minutes <= 120) { // 2 hours
        return { label: "Medium", color: "text-yellow-600" };
    }

    return { label: "Bad", color: "text-red-600" };
};