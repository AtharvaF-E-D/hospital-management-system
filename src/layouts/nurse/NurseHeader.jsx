import { Bell, Search, Menu, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NurseHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden text-slate-500">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center max-w-md w-full relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search patients, meds..." 
            className="pl-9 bg-slate-50 border-slate-200 h-9 w-full rounded-full text-sm focus-visible:ring-rose-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-slate-500 relative hover:bg-slate-50">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-500 relative hover:bg-slate-50">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border border-white" />
        </Button>
        
        <div className="h-6 w-px bg-slate-200 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-50 rounded-full">
              <Avatar className="h-8 w-8 border border-slate-200">
                <AvatarFallback className="bg-rose-100 text-rose-700 font-bold">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'NR'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-sm font-semibold leading-none text-slate-900">{user?.name || "Nurse"}</span>
                <span className="text-xs text-slate-500 mt-1">Ward 3B - Shift 1</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer" onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
