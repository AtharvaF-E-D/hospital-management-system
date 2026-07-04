import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { sidebarMenuConfig } from "@/config/sidebarMenu";
import { Stethoscope, ChevronDown, Search, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

function SidebarItem({ item, isOpen, depth = 0 }) {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  
  const isActive = location.pathname === item.path && !hasChildren;
  const isChildActive = hasChildren && item.children.some((c) => location.pathname === c.path || location.pathname.startsWith(c.path + '/'));

  const [expanded, setExpanded] = useState(isChildActive);
  const Icon = item.icon;

  const handleClick = (e) => {
    if (hasChildren && isOpen) {
      e.preventDefault();
      setExpanded((prev) => !prev);
    }
  };

  return (
    <div>
      <Link
        to={hasChildren && isOpen ? "#" : item.path}
        onClick={handleClick}
        title={!isOpen ? item.label : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors relative group border-l-[3px] border-transparent",
          isActive || isChildActive
            ? "bg-primary-light text-primary border-l-primary"
            : "text-foreground hover:bg-muted hover:text-primary"
        )}
      >
        {Icon && (
          <Icon className={cn("shrink-0", isOpen ? "h-4 w-4" : "h-[18px] w-[18px]", !(isActive || isChildActive) && "text-muted-foreground group-hover:text-primary")} />
        )}
        {isOpen && (
          <>
            <span className="truncate flex-1">{item.label}</span>
            {hasChildren && (
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                  expanded && "rotate-180"
                )}
              />
            )}
          </>
        )}
      </Link>

      {/* Children */}
      {hasChildren && isOpen && (
        <div 
          className={cn(
            "grid transition-all duration-200 ease-in-out",
            expanded ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="ml-4 pl-3 border-l border-border/50 space-y-0.5 py-0.5">
              {item.children.map((child, index) => {
                const isChildItemActive = location.pathname === child.path;
                return (
                  <Link
                    key={index}
                    to={child.path}
                    className={cn(
                      "flex items-center rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors",
                      isChildItemActive
                        ? "bg-primary-light text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    <span className="truncate">{child.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ isOpen }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenu = searchTerm
    ? sidebarMenuConfig.filter(
        (item) =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.children &&
            item.children.some((c) =>
              c.label.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      )
    : sidebarMenuConfig;

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-surface transition-all duration-300 ease-in-out shrink-0 h-screen sticky top-0",
        isOpen ? "w-[250px]" : "w-14"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-center border-b px-3 shrink-0">
        <div className="flex items-center gap-2 font-bold text-primary truncate">
          <Stethoscope className="h-5 w-5 shrink-0" />
          {isOpen && <span className="text-base tracking-tight">EpicHealth</span>}
        </div>
      </div>

      {/* Search */}
      {isOpen && (
        <div className="px-3 pt-3 pb-1 shrink-0">
          <div className="relative">
            <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-7 pl-7 text-xs bg-muted border-transparent focus-visible:ring-1"
            />
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-thin">
        {filteredMenu.map((item) => (
          <SidebarItem key={item.id} item={item} isOpen={isOpen} />
        ))}
      </div>

      {/* Bottom Section */}
      {isOpen && (
        <div className="border-t px-3 py-2 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Recent: Dashboard</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-1">
            <Star className="h-3 w-3" />
            <span>Favorites: Patients</span>
          </div>
        </div>
      )}
    </aside>
  );
}
