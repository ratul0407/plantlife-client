import {
  BoltIcon,
  BookOpenIcon,
  Box,
  Heart,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  ShoppingCart,
  UserPenIcon,
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
import { useGetMeQuery } from "@/redux/features/user.api";
import { authApi, useLogOutMutation } from "@/redux/features/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { Link } from "react-router";
import { BsCart } from "react-icons/bs";
import { Cart } from "../Cart";

export default function UserMenu() {
  const { data } = useGetMeQuery(undefined);
  console.log(data);
  const [logout] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    const res = await logout(undefined);
    console.log(res);
    dispatch(authApi.util.resetApiState());
  };
  return (
    <div>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <Avatar>
                <AvatarImage src="./avatar.jpg" alt="Profile image" />
                <AvatarFallback>{data?.data?.name?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="relative z-[100] max-w-64"
            align="end"
          >
            <DropdownMenuLabel className="flex min-w-0 flex-col">
              <span className="text-foreground truncate text-sm font-medium">
                {data?.data?.name}
              </span>
              <span className="text-muted-foreground truncate text-xs font-normal">
                {data?.data?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/user/wishlist" className="flex items-center gap-2">
                  <Heart size={16} className="opacity-60" aria-hidden="true" />
                  <span>Wishlist</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/user/wishlist" className="flex items-center gap-2">
                  <ShoppingCart
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Cart</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/user/wishlist" className="flex items-center gap-2">
                  <Box size={16} className="opacity-60" aria-hidden="true" />
                  <span>Orders</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <PinIcon size={16} className="opacity-60" aria-hidden="true" />
                <span>Option 4</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPenIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Option 5</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"outline"}>
          <Link to="/login">Log In</Link>
        </Button>
      )}
    </div>
  );
}
