import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { user, isLoading } = useAuth();
    if (isLoading || !user) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Spinner className="size-10" />
        </div>
      );
    }
    if (!isLoading && !user?.role) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && !isLoading && requiredRole !== user?.role) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
};
