"use client";
import React, { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  auth: User; //
  setAuth: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextProps>({
  auth: {},
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<User>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
