import { useId, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Cart } from "./Cart";
import { Link, useLocation } from "react-router";
import { Menu } from "./Home/menu/Menu";

import SearchBar from "./navbar-components/SearchBar";
import UserMenu from "./navbar-components/user-menu";
import { Button } from "./ui/button";
import { Heart, SearchIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import Logo from "@/Logo";
// import Logo from "./navbar-components/logo";

// Navigation links array to be used in both desktop and mobile menus

export default function NavbarUi() {
  const { pathname } = useLocation();
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/plants", label: "Plants" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
  ];
  console.log(openSearchBar);
  return (
    <header className="font-roboto sticky top-0 z-[90] border-b bg-white px-4 pb-4 text-black md:px-6">
      <div className="relative flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <Menu />
          </div>
          <div className="hidden items-center md:flex">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>
        {/* Middle area */}
        {/* Search form */}
        <div className="grow">
          <SearchBar
            openSearchBar={openSearchBar}
            setOpenSearchBar={setOpenSearchBar}
          />
        </div>
        {/* Right side */}
        <div className="relative z-[100] flex flex-1 items-center justify-end gap-4">
          {/* User menu */}
          {/* wishlist */}
          <Button
            onClick={() => setOpenSearchBar(!openSearchBar)}
            variant={"outline"}
            className="size-8 rounded-full text-center sm:hidden"
          >
            <SearchIcon className="text-gray-600" />
          </Button>
          <Link to="/wishlist">
            <Button
              variant="outline"
              className="relative size-8 rounded-full text-center"
            >
              <Heart
                className={`relative size-4 text-gray-600 ${wishlist?.length ? "left-0" : "left-1"}`}
              />
              {/* badge */}
              <span
                className={`${wishlist?.length && "absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-800 text-xs text-white"}`}
              >
                {wishlist?.length ? wishlist?.length : ""}
              </span>
            </Button>
          </Link>
          {/* cart */}
          <Cart />
          <UserMenu />
        </div>
      </div>
      {/* Bottom navigation */}
      <div className="border-t py-2 max-md:hidden">
        {/* Navigation menu */}
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  active={pathname === link.href}
                  asChild
                  className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                >
                  <Link to={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
