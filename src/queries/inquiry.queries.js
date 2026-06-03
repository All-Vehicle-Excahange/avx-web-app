import { queryOptions } from "@tanstack/react-query";
import { getInquiries, getMyInquiries } from "@/services/inquiry.service";

export const getInquiriesQuery = (inquiryStatus) => {
  return queryOptions({
    queryKey: ["inquiries", inquiryStatus],
    queryFn: async () => {
      const res = await getInquiries({ inquiryStatus });
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getMyInquiriesQuery = (inquiryStatus) => {
  return queryOptions({
    queryKey: ["my-inquiries", inquiryStatus],
    queryFn: async () => {
      const res = await getMyInquiries({ inquiryStatus });
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getInquiriesInfiniteQuery = (payload) => {
  return {
    queryKey: ["inquiries-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getInquiries({ ...payload, pageNo: pageParam });
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
    staleTime: 10 * 60 * 1000,
  };
};

export const getMyInquiriesInfiniteQuery = (payload) => {
  return {
    queryKey: ["my-inquiries-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getMyInquiries({ ...payload, pageNo: pageParam });
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
    staleTime: 10 * 60 * 1000,
  };
};
