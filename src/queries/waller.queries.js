import { queryOptions } from "@tanstack/react-query";
import { getWallerBalance, getPaymentHistory } from "@/services/waller.service";

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

export const getPaymentHistoryInfiniteQuery = (payload) => {
  return {
    queryKey: ["payment-history-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getPaymentHistory({ ...payload, pageNo: pageParam });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages =
        lastPage.pagination?.totalPages ||
        lastPage.pageResponse?.totalPages ||
        1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
  };
};
