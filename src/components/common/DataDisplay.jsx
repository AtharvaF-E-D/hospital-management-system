import { cn } from "@/lib/utils";
import { ResponsiveContainer, LineChart, Line } from "recharts";

export function StatCard({ title, value, change, icon: Icon, trend = "up", className }) {
  return (
    <div className={cn("bg-card border rounded-lg p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between mt-1">
        <div>
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          {change && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                trend === "up"
                  ? "text-success"
                  : "text-danger"
              )}
            >
              {change}
            </p>
          )}
        </div>
        
        <div className="h-10 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.from({ length: 7 }, () => ({ val: Math.random() * 100 }))}>
              <Line 
                type="monotone" 
                dataKey="val" 
                stroke={trend === "up" ? "#16a34a" : "#dc2626"} 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status, className }) {
  const statusConfig = {
    active: { bg: "bg-success/10 text-success", label: "Active" },
    inactive: { bg: "bg-muted text-muted-foreground", label: "Inactive" },
    pending: { bg: "bg-warning/10 text-warning", label: "Pending" },
    completed: { bg: "bg-success/10 text-success", label: "Completed" },
    cancelled: { bg: "bg-danger/10 text-danger", label: "Cancelled" },
    admitted: { bg: "bg-primary/10 text-primary", label: "Admitted" },
    discharged: { bg: "bg-info/10 text-info", label: "Discharged" },
    critical: { bg: "bg-danger/10 text-danger", label: "Critical" },
    stable: { bg: "bg-success/10 text-success", label: "Stable" },
    paid: { bg: "bg-success/10 text-success", label: "Paid" },
    unpaid: { bg: "bg-danger/10 text-danger", label: "Unpaid" },
    approved: { bg: "bg-success/10 text-success", label: "Approved" },
    rejected: { bg: "bg-danger/10 text-danger", label: "Rejected" },
    processing: { bg: "bg-info/10 text-info", label: "Processing" },
    collected: { bg: "bg-primary/10 text-primary", label: "Collected" },
    available: { bg: "bg-success/10 text-success", label: "Available" },
    occupied: { bg: "bg-danger/10 text-danger", label: "Occupied" },
    maintenance: { bg: "bg-warning/10 text-warning", label: "Maintenance" },
  };

  const config = statusConfig[status?.toLowerCase()] || {
    bg: "bg-gray-100 text-gray-800",
    label: status,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
        config.bg,
        className
      )}
    >
      {config.label}
    </span>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-xs text-muted-foreground mt-1 max-w-[300px]">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-8 bg-muted rounded w-1/3" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-6 bg-muted rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
