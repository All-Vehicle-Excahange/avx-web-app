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