import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Bell,
  Search,
  Menu,
  MessageSquare,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DoctorHeader({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [notifications] = useState([
    { id: 1, text: "New lab result for John Doe", time: "5m ago", unread: true },
    { id: 2, text: "Upcoming consultation in 15 mins", time: "10m ago", unread: true },
    { id: 3, text: "Patient message received", time: "1h ago", unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu size={20} />
        </Button>

        {/* Global Search */}
        <div className="hidden md:flex relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search patients, appointments, ICD codes..." 
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-teal-500 h-9"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Quick Actions */}
        <div className="hidden lg:flex items-center gap-2 mr-2">
          <Button variant="outline" size="sm" className="h-8 border-teal-200 text-teal-700 hover:bg-teal-50">
            + New Note
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-teal-200 text-teal-700 hover:bg-teal-50">
            + Rx
          </Button>
        </div>

        {/* Messages */}
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
          <MessageSquare size={20} />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-normal flex justify-between items-center">
              <span className="font-semibold">Notifications</span>
              <span className="text-xs text-teal-600 cursor-pointer">Mark all read</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    {notification.unread && <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />}
                    <span className={`text-sm ${notification.unread ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                      {notification.text}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 pl-4">{notification.time}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-teal-600 font-medium cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
              <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
                <span className="font-semibold text-sm text-teal-700">
                  {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'DR'}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || 'Doctor'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'doctor@epichealth.com'}
                </p>
                <div className="mt-2 text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full w-fit">
                  Cardiology Dept
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
