import { useEffect, useId, useRef, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Cart } from "../features/cart/components/Cart";
import { Link, useLocation } from "react-router";
import { Menu } from "./Home/menu/Menu";

import SearchBar from "./navbar-components/SearchBar";
import UserMenu from "./navbar-components/user-menu";
import { Button } from "./ui/button";
import { Heart, SearchIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import Logo from "@/Logo";
import { useThrottledCallback } from "use-debounce";
import Marquee from "./navbar-components/Marquee";
// import Logo from "./navbar-components/logo";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/plants", label: "Plants" },
  { href: "/about", label: "About" },
];
export default function Navbar() {
  const [show, setShow] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const { pathname } = useLocation();
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const openCloseNavbar = useThrottledCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", openCloseNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", openCloseNavbar);
    };
  }, [lastScrollY]);

  const headerRef = useRef(null);

  return (
    <>
      <header
        ref={headerRef}
        className={`font-roboto sticky top-0 z-[20] border-b bg-white text-black transition-all duration-200 ${show ? "translate-y-0" : "-translate-y-full"} `}
      >
        <Marquee />
        <div className="px-4 pb-4 md:px-6">
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
            <div className="relative z-[100] flex max-w-screen flex-1 items-center justify-end gap-4">
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
                  className="relative size-10 rounded-full text-center"
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
        </div>
      </header>
      {!show && (
        <div className="fixed top-0 z-50 flex w-full items-center justify-between border-t bg-white px-8 py-4 shadow-sm max-md:hidden">
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
          <div className="grow">
            <SearchBar
              openSearchBar={openSearchBar}
              setOpenSearchBar={setOpenSearchBar}
            />
          </div>
          <div className="flex items-center gap-4">
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
      )}
    </>
  );
}
