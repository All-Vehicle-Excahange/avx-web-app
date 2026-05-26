import { getAllHelpTickets, getHelpTicketKpi } from "@/services/helpCenter.service";
import { queryOptions } from "@tanstack/react-query";

export const getAllHelpTicketsQuery = (params) => {
  return queryOptions({
    queryKey: ["help-tickets", params],
    queryFn: async () => {
      const res = await getAllHelpTickets(params);
      return res;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const getHelpTicketKpiQuery = () => {
  return queryOptions({
    queryKey: ["help-tickets-kpi"],
    queryFn: async () => {
      const res = await getHelpTicketKpi();
      return res?.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
