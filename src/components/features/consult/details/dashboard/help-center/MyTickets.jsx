import React from "react";
import { Plus, Eye, Ticket } from "lucide-react";
import Button from "@/components/ui/button";
import Pagination from "@/components/ui/Pagination";

export default function MyTickets({
  tickets,
  onNavigate,
  onSelectTicket,
  currentPage,
  totalPages,
  onPageChange,
  activeFilter,
  setActiveFilter,
  totalCount,
  isLoading,
}) {
  const filters = ["All", "Open", "Resolved"];

  // Helper for priority dot color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-green-500";
      default:
        return "bg-third";
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-orange-500/15 text-orange-400 border border-orange-500/30";
      case "in progress":
        return "bg-blue-500/15 text-blue-400 border border-blue-500/30";
      case "awaiting reply":
        return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30";
      case "resolved":
        return "bg-green-500/15 text-green-400 border border-green-500/30";
      case "closed":
        return "bg-third/15 text-third border border-third/30";
      default:
        return "bg-third/10 text-third";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="h-8 bg-white/10 rounded-lg w-48" />
            <div className="h-4 bg-white/5 rounded-lg w-64" />
          </div>
          <div className="h-10 bg-white/10 rounded-lg w-32" />
        </div>

        {/* Filter Chips Skeleton */}
        <div className="flex gap-2 pb-2 border-b border-third/10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-white/10 rounded-full w-20" />
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="border border-third/15 rounded-2xl overflow-hidden bg-primary/5">
          <div className="p-4 border-b border-third/15 h-12 flex justify-between">
            <div className="h-4 bg-white/10 rounded w-16" />
            <div className="h-4 bg-white/10 rounded w-48" />
            <div className="h-4 bg-white/10 rounded w-20" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 border-b border-third/10 last:border-0"
            >
              <div className="flex gap-4 items-center">
                <div className="h-4 bg-white/10 rounded w-16" />
                <div className="h-4 bg-white/10 rounded w-48" />
              </div>
              <div className="h-8 bg-white/10 rounded-lg w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeUp_0.3s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            My Tickets
          </h1>
          <p className="text-third text-sm mt-1">
            Track your active and resolved support requests
          </p>
        </div>
        <Button
          onClick={() => onNavigate("create")}
          variant="ghost"
          className="flex cursor-pointer items-center gap-2 w-full sm:w-auto"
        >
          <Plus size={16} /> New Ticket
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar border-b border-third/10">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                onPageChange(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                isActive
                  ? "bg-primary border-primary text-secondary"
                  : "bg-primary/5 border-third/15 text-third hover:border-third/30"
              }`}
            >
              {filter} {isActive ? `(${totalCount})` : ""}
            </button>
          );
        })}
      </div>

      {/* Tickets List */}
      {tickets.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto border border-third/15 rounded-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-third/15 text-third font-medium">
                  <th className="p-4 text-xs tracking-wider uppercase">
                    Ticket ID
                  </th>
                  <th className="p-4 text-xs tracking-wider uppercase">
                    Subject
                  </th>
                  <th className="p-4 text-xs tracking-wider uppercase">
                    Category
                  </th>
                  <th className="p-4 text-xs tracking-wider uppercase">
                    Priority
                  </th>
                  <th className="p-4 text-xs tracking-wider uppercase">
                    Status
                  </th>
                  <th className="p-4 text-xs tracking-wider uppercase">
                    Vehicle
                  </th>
                  <th className="p-4 text-xs tracking-wider uppercase text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-third/10">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="transition-colors hover:bg-white/2"
                  >
                    <td
                      className="p-4 font-bold text-fourth max-w-[120px] truncate"
                      title={ticket.ticketNumber || ticket.id}
                    >
                      {ticket.ticketNumber || ticket.id}
                    </td>
                    <td
                      className="p-4 text-primary font-medium max-w-[220px] truncate"
                      title={ticket.subject}
                    >
                      {ticket.subject}
                    </td>
                    <td className="p-4 text-third">{ticket.category}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${getPriorityColor(ticket.priority)}`}
                        />
                        <span className="text-xs">{ticket.priority}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td
                      className="p-4 text-third max-w-[150px] truncate"
                      title={ticket.relatedVehicle}
                    >
                      {ticket.relatedVehicle && ticket.relatedVehicle !== "None"
                        ? ticket.relatedVehicle
                        : "—"}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          onSelectTicket(ticket.id);
                          onNavigate("detail");
                        }}
                        className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold bg-primary text-secondary hover:bg-primary/90 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => {
                  onSelectTicket(ticket.id);
                  onNavigate("detail");
                }}
                className="bg-primary/5 border border-third/15 rounded-xl p-4 space-y-3 hover:border-fourth/40 active:bg-primary/10 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-fourth max-w-[150px] truncate">
                    {ticket.ticketNumber || ticket.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusBadge(ticket.status)}`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <h3 className="font-semibold text-primary line-clamp-1">
                  {ticket.subject}
                </h3>
                <div className="flex justify-between items-center text-xs text-third">
                  <span>{ticket.category}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`}
                    />
                    <span>{ticket.priority}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-third/10 text-xs">
                  <span
                    className="text-third/60 truncate max-w-[70%]"
                    title={ticket.relatedVehicle}
                  >
                    {ticket.relatedVehicle && ticket.relatedVehicle !== "None"
                      ? ticket.relatedVehicle
                      : "—"}
                  </span>
                  <span className="text-fourth font-semibold flex items-center gap-1">
                    Details <Eye size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="border border-third/15 rounded-2xl p-12 text-center bg-primary/5">
          <Ticket size={36} className="text-third/65 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-primary">
            No tickets found
          </h3>
          <p className="text-sm text-third/80 mt-1">
            There are no support tickets matching this filter.
          </p>
          <Button
            onClick={() => onNavigate("create")}
            variant="ghost"
            size="sm"
            className="mt-4 inline-flex items-center gap-2"
          >
            <Plus className="mr-2" size={14} /> Create a Ticket
          </Button>
        </div>
      )}
    </div>
  );
}
