"use client";
import React, { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  auth: User | undefined;
  setAuth: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<AuthContextProps>({
  auth: undefined,
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<User | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
