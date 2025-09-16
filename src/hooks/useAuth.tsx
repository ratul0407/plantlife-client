import { useGetMeQuery } from "@/redux/features/user.api";
import { useMemo } from "react";

export const useAuth = () => {
  const { data, isLoading, error, isError } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // If your API returns { data: { user: {...} } }
  const user = data?.user || null;

  const isAuthenticated = useMemo(() => !!user, [user]); // ✅ fix

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isError,
  };
};
