"use client";

import { verifyTokenAction } from "@/actions/user-actions";
import React, { createContext, useEffect, useState } from "react";

export interface User {
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  id: number | undefined;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initUser = async () => {
      const res: any = await verifyTokenAction();
      setUser(res?.user || null);
      setIsLoading(false);
    };

    initUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
