import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "cashier";

interface AuthContextType {
  role: UserRole | null;
  username: string | null;
  login: (username: string, password: string) => boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  isAdmin: boolean;
  isCashier: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, { password: string; role: UserRole }> = {
  admin: { password: "admin123", role: "admin" },
  cashier: { password: "cashier123", role: "cashier" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const login = (uname: string, pwd: string): boolean => {
    const user = DEMO_USERS[uname.toLowerCase()];
    if (user && user.password === pwd) {
      setRole(user.role);
      setUsername(uname.toLowerCase());
      return true;
    }
    return false;
  };

  const loginAs = (r: UserRole) => {
    setRole(r);
    setUsername(r);
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ role, username, login, loginAs, logout, isAdmin: role === "admin", isCashier: role === "cashier" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
