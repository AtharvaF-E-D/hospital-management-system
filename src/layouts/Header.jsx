import { Bell, Search, Menu, Moon, Sun, User, Hospital, Building2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar, sidebarOpen }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Theme toggle placeholder
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b bg-surface px-4 shadow-sm shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
          <Menu className="h-4 w-4" />
        </Button>

        <div className="hidden md:flex items-center relative w-64">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Global Search... (Ctrl+K)" 
            className="w-full bg-background shadow-none h-8 pl-8 pr-3 rounded-md text-sm border-transparent focus-visible:ring-1 focus-visible:bg-surface"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Selectors Context */}
        <div className="hidden lg:flex items-center gap-3 mr-4 text-xs font-medium border-r pr-4">
          <div className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer">
            <Hospital className="h-3.5 w-3.5" />
            <span>Main Hospital</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer">
            <Building2 className="h-3.5 w-3.5" />
            <span>Downtown Branch</span>
          </div>
          <Badge variant="secondary" className="text-[10px] h-5">FY 25-26</Badge>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTheme}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <div className="relative">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "Dr. John Doe"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "john.doe@epichealth.com"}
                </p>
                <Badge className="mt-2 w-max bg-primary/20 text-primary hover:bg-primary/30">{user?.role || "Super Admin"}</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
