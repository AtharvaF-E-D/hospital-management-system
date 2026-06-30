import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Columns3,
  MoreHorizontal,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

/**
 * Enterprise DataTable Component
 *
 * @param {Object} props
 * @param {Array} props.columns - Column definitions [{ key, label, sortable, render, width, align }]
 * @param {Array} props.data - Row data array
 * @param {boolean} props.searchable - Enable search
 * @param {string} props.searchPlaceholder - Search input placeholder
 * @param {boolean} props.selectable - Enable row selection checkboxes
 * @param {Function} props.onSelectionChange - Callback when selection changes
 * @param {Array} props.bulkActions - Bulk action buttons [{ label, icon, onClick, variant }]
 * @param {Function} props.onRowClick - Row click handler
 * @param {number} props.pageSize - Items per page (default 10)
 * @param {Function} props.rowActions - Row action renderer (row) => ReactNode
 * @param {boolean} props.exportable - Show export button
 * @param {string} props.emptyMessage - Message when no data
 */
export default function DataTable({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = "Search...",
  selectable = false,
  onSelectionChange,
  bulkActions = [],
  onRowClick,
  pageSize = 10,
  rowActions,
  exportable = true,
  emptyMessage = "No records found.",
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [visibleCols, setVisibleCols] = useState(
    new Set(columns.map((c) => c.key))
  );

  // Filter
  const filtered = useMemo(() => {
    if (!search) return data;
    const term = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val && String(val).toLowerCase().includes(term);
      })
    );
  }, [data, search, columns]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const compare =
        typeof aVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? compare : -compare;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onSelectionChange?.(Array.from(next));
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const all = new Set(paginated.map((r) => r.id));
      setSelected(all);
      onSelectionChange?.(Array.from(all));
    }
  };

  const toggleColumnVisibility = (key) => {
    setVisibleCols((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const exportCSV = () => {
    const visibleColumns = columns.filter((c) => visibleCols.has(c.key));
    const header = visibleColumns.map((c) => c.label).join(",");
    const rows = sorted.map((row) =>
      visibleColumns.map((c) => `"${row[c.key] ?? ""}"`).join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeColumns = columns.filter((c) => visibleCols.has(c.key));

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          {searchable && (
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="h-8 pl-8 text-xs bg-muted border-transparent focus-visible:ring-1"
              />
            </div>
          )}

          {selected.size > 0 && bulkActions.length > 0 && (
            <div className="flex items-center gap-1 ml-2">
              <span className="text-xs text-muted-foreground">
                {selected.size} selected
              </span>
              {bulkActions.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant || "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => action.onClick(Array.from(selected))}
                >
                  {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Columns3 className="h-3.5 w-3.5 mr-1" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {columns.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.key}
                  checked={visibleCols.has(col.key)}
                  onCheckedChange={() => toggleColumnVisibility(col.key)}
                  className="text-xs"
                >
                  {col.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {exportable && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={exportCSV}
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm relative">
            <thead className="sticky top-0 z-10">
              <tr className="border-b bg-background shadow-sm">
                {selectable && (
                  <th className="w-10 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={
                        paginated.length > 0 &&
                        selected.size === paginated.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-border"
                    />
                  </th>
                )}
                {activeColumns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-3 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap bg-background",
                      col.sortable !== false && "cursor-pointer select-none hover:text-foreground",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center"
                    )}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={() =>
                      col.sortable !== false && handleSort(col.key)
                    }
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (
                        sortDir === "asc" ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )
                      )}
                    </span>
                  </th>
                ))}
                {rowActions && (
                  <th className="w-10 px-3 py-2.5"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      activeColumns.length +
                      (selectable ? 1 : 0) +
                      (rowActions ? 1 : 0)
                    }
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className={cn(
                      "border-b last:border-b-0 transition-colors",
                      onRowClick && "cursor-pointer",
                      selected.has(row.id) ? "bg-primary-light" : "hover:bg-accent"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <td
                        className="w-10 px-3 py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selected.has(row.id)}
                          onChange={() => toggleSelect(row.id)}
                          className="rounded border-border"
                        />
                      </td>
                    )}
                    {activeColumns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-3 py-2 text-[13px]",
                          col.align === "right" && "text-right",
                          col.align === "center" && "text-center"
                        )}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key] ?? "—"}
                      </td>
                    ))}
                    {rowActions && (
                      <td
                        className="w-10 px-3 py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {rowActions(row)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, sorted.length)} of {sorted.length}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs font-medium px-2">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
