import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-8xl font-bold tracking-tighter text-muted-foreground/30">404</h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground text-sm max-w-[500px]">
        The page you are looking for doesn't exist or you don't have permission to view it.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
