import { queryOptions } from "@tanstack/react-query";
import { getWallerBalance } from "@/services/waller.service";

export const getWalletBalanceQuery = () => {
  return queryOptions({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      const res = await getWallerBalance();
      return res?.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes stale time
  });
};
