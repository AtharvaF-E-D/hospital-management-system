import { createContext, useContext, useState, useEffect } from "react";
import { hasPermission } from "../permissions/roles";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null if not logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking token from local storage
    const storedUser = localStorage.getItem("hospital_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const isDoctor = email.toLowerCase().includes("doctor");
        const isNurse = email.toLowerCase().includes("nurse");
        
        let role = "SUPER_ADMIN";
        if (isDoctor) role = "DOCTOR";
        if (isNurse) role = "NURSE";

        const dummyUser = {
          id: isDoctor ? "doc-1" : isNurse ? "nurse-1" : "1",
          name: isDoctor ? "Dr. Sarah Smith" : isNurse ? "Nurse Emily" : "Admin User",
          email: email,
          role: role,
        };
        setUser(dummyUser);
        localStorage.setItem("hospital_user", JSON.stringify(dummyUser));
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hospital_user");
  };

  const checkPermission = (permission) => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkPermission }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
