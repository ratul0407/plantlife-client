import {
  Box,
  Heart,
  LayoutDashboard,
  LogOutIcon,
  ShoppingCart,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authApi, useLogOutMutation } from "@/redux/features/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { Link } from "react-router";
import { role } from "@/constants/role";
import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { logOut: setAuthUser, user: data, isLoading } = useAuth();
  const [logout] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logout(undefined);
    setAuthUser();
    dispatch(authApi.util.resetApiState());
  };

  return (
    <div>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <Avatar>
                <AvatarImage
                  src={data?.picture}
                  referrerPolicy="no-referrer"
                  alt="Profile image"
                />
                <AvatarFallback>{data?.name?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="relative z-[100] max-w-64"
            align="end"
          >
            <DropdownMenuLabel className="flex min-w-0 flex-col">
              <span className="text-foreground truncate text-sm font-medium">
                {data?.name}
              </span>
              <span className="text-muted-foreground truncate text-xs font-normal">
                {data?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {data?.role === role.superAdmin && (
                <>
                  <DropdownMenuItem className="py-0">
                    <Link
                      to="/admin/overview"
                      className="flex h-full w-full items-center gap-2 py-1.5"
                    >
                      <LayoutDashboard
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem className="py-0">
                <Link
                  to="/wishlist"
                  className="flex h-full w-full items-center gap-2 py-1.5"
                >
                  <Heart size={16} className="opacity-60" aria-hidden="true" />
                  <span>Wishlist</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="py-0">
                <Link
                  to="/orders"
                  className="flex h-full w-full items-center gap-2 py-1.5"
                >
                  <Box size={16} className="opacity-60" aria-hidden="true" />
                  <span>Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-0">
                <Link
                  to="/profile"
                  className="flex h-full w-full items-center gap-2 py-1.5"
                >
                  <User size={16} className="opacity-60" aria-hidden="true" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"outline"} disabled={isLoading}>
          <Link to="/login">Log In</Link>
        </Button>
      )}
    </div>
  );
}
