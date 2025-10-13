import { useGetMeQuery } from "@/redux/features/user.api";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error, refetch } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.data) setUser(data?.data);
    else setUser(null);
  }, [data]);

  const login = (userData) => setUser(userData);
  const logOut = () => setUser(null);

  const userInfo = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    refetchUser: refetch,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};
