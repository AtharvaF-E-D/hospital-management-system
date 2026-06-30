import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PermissionRoute({ requiredPermission }) {
  const { checkPermission } = useAuth();

  if (!checkPermission(requiredPermission)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
