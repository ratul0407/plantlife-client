import { useGetMeQuery } from "@/redux/features/user.api";
import { useMemo } from "react";

export const useAuth = () => {
  const { data, isLoading, error, isError } = useGetMeQuery(undefined);

  const user = data?.data || null;

  console.log(data);
  const isAuthenticated = useMemo(() => !!user, [user]); // ✅ fix

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isError,
  };
};
