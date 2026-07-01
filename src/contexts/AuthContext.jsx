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
        const dummyUser = {
          id: isDoctor ? "doc-1" : "1",
          name: isDoctor ? "Dr. Sarah Smith" : "Dr. John Doe",
          email: email,
          role: isDoctor ? "DOCTOR" : "SUPER_ADMIN", // Defaulting to super admin for demo unless doctor
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
