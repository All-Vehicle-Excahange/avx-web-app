import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const cls = (...a) => a.filter(Boolean).join(" ");

export default function DynamicTable({
  columns = [],
  data = [],
  isLoading = false,
  minWidth = "min-w-full",
  emptyStateProps = {},
  paginationProps = null,
  onRowClick = null,
}) {
  const {
    icon: EmptyIcon = Search,
    title: emptyTitle = "No results found",
    subtitle: emptySubtitle = "Try adjusting your filters.",
    action: EmptyAction = null,
  } = emptyStateProps;

  const getPageWindow = () => {
    if (!paginationProps || paginationProps.totalPages <= 1) return [1];
    const { currentPage, totalPages } = paginationProps;
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages.length > 0 ? pages : [1];
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 overflow-hidden bg-[#0f1117]/90 shadow-2xl">
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className={cls(minWidth, "w-full text-left border-collapse")}>
          <thead className="sticky top-0 z-10 bg-fourth h-[46px]">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key || i}
                  className={cls(
                    "py-2.5 px-4 text-[13px] font-semibold text-white tracking-wide whitespace-nowrap capitalize",
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left"
                  )}
                  style={{ width: col.width }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-white/5">
                    {columns.map((col, j) => (
                      <td
                        key={j}
                        className={cls(
                          "px-4 py-3 whitespace-nowrap",
                          col.align === "center"
                            ? "text-center"
                            : col.align === "right"
                            ? "text-right"
                            : "text-left"
                        )}
                      >
                        <div className="h-5 bg-white/10 rounded animate-pulse w-3/4 mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="border-b border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={col.key || colIndex}
                      onClick={() =>
                        colIndex === 0 && onRowClick && onRowClick(row)
                      }
                      className={cls(
                        "py-3.5 px-4 align-middle text-[14px] text-third whitespace-nowrap",
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                          ? "text-right"
                          : "text-left",
                        colIndex === 0 &&
                          onRowClick &&
                          "cursor-pointer hover:text-fourth transition-colors"
                      )}
                    >
                      {col.render
                        ? col.render(row[col.key], row, index)
                        : row[col.key] || "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-third">
                    <div className="mb-3">
                      <EmptyIcon className="w-8 h-8 text-third/50" />
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {emptyTitle}
                    </div>
                    <div className="mt-1 text-xs text-third/70">
                      {emptySubtitle}
                    </div>
                    {EmptyAction && <div className="mt-4">{EmptyAction}</div>}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {paginationProps && paginationProps.totalPages > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-3 border-t border-white/10 bg-[#12151e] mt-auto sticky left-0 right-0">
          {/* Left: Showing info and Per page selector */}
          <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4 flex-wrap">
            <div className="text-xs sm:text-sm text-third whitespace-nowrap">
              Showing <b className="text-primary font-bold">{data?.length || 0}</b> of{" "}
              <b className="text-primary font-bold">{paginationProps.totalElements}</b>
            </div>

            {paginationProps.pageSize !== undefined &&
              paginationProps.onPageSizeChange && (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm text-third whitespace-nowrap">
                    Per page
                  </span>
                  <div className="relative inline-block">
                    <select
                      disabled={isLoading || !data || data.length === 0}
                      value={paginationProps.pageSize}
                      onChange={(e) =>
                        paginationProps.onPageSizeChange(Number(e.target.value))
                      }
                      className="appearance-none border text-primary border-white/20 rounded-md px-2.5 py-1 pr-7 text-xs sm:text-sm font-medium focus:outline-none focus:border-fourth disabled:opacity-50 bg-[#181818] cursor-pointer"
                    >
                      <option value={10} className="bg-[#181818] text-white">
                        10
                      </option>
                      <option value={20} className="bg-[#181818] text-white">
                        20
                      </option>
                      <option value={50} className="bg-[#181818] text-white">
                        50
                      </option>
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-third">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              )}
          </div>

          {/* Right: Page navigation buttons */}
          <div className="flex items-center justify-end gap-1.5 ml-auto sm:ml-0 shrink-0">
            <button
              type="button"
              onClick={() =>
                paginationProps.onPageChange(
                  Math.max(1, paginationProps.currentPage - 1)
                )
              }
              disabled={paginationProps.currentPage <= 1 || isLoading}
              className={`w-8 h-8 border flex justify-center items-center rounded-md transition-all shrink-0 ${
                paginationProps.currentPage <= 1 || isLoading
                  ? "border-white/10 text-white/30 cursor-not-allowed"
                  : "border-white/20 text-primary hover:bg-white/10 hover:border-white/40 cursor-pointer"
              }`}
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5 shrink-0">
              {getPageWindow().map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => paginationProps.onPageChange(p)}
                  disabled={isLoading}
                  className={`w-8 h-8 border rounded-md text-xs sm:text-sm font-medium transition-all shrink-0 ${
                    p === paginationProps.currentPage
                      ? "bg-fourth text-white border-fourth shadow-sm"
                      : "border-white/20 text-primary hover:bg-white/10 hover:border-white/40 cursor-pointer disabled:cursor-not-allowed"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                paginationProps.onPageChange(
                  Math.min(
                    paginationProps.totalPages,
                    paginationProps.currentPage + 1
                  )
                )
              }
              disabled={
                paginationProps.currentPage >= paginationProps.totalPages ||
                isLoading
              }
              className={`w-8 h-8 border flex justify-center items-center rounded-md transition-all shrink-0 ${
                paginationProps.currentPage >= paginationProps.totalPages ||
                isLoading
                  ? "border-white/10 text-white/30 cursor-not-allowed"
                  : "border-white/20 text-primary hover:bg-white/10 hover:border-white/40 cursor-pointer"
              }`}
              aria-label="Next Page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
