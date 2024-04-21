"use client";

import React, { createContext, useState } from "react";

export interface User {
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
