import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <ShieldX className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="text-6xl font-bold tracking-tighter text-muted-foreground/30">403</h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Access Denied</h2>
      <p className="mt-2 text-muted-foreground text-sm max-w-[500px]">
        You don't have permission to access this page. Contact your administrator if you believe this is an error.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
