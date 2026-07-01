import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NurseSidebar from "./NurseSidebar";
import NurseHeader from "./NurseHeader";

export default function NurseLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (!user || user.role !== "NURSE") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <NurseSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NurseHeader />
        <main className="flex-1 overflow-auto custom-scrollbar p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
