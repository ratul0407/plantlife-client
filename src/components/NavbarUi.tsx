import { useId } from "react";
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

// Navigation links array to be used in both desktop and mobile menus

export default function NavbarUi() {
  const { pathname } = useLocation();
  console.log(pathname);
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/plants", label: "All Plants" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="font-roboto sticky top-0 z-[90] border-b bg-white px-4 pb-4 text-black md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <Menu />
          </div>
          <div className="flex items-center">
            <h3 className="font-metal text-4xl">
              <Link to="/">PlantLife</Link>
            </h3>
          </div>
        </div>
        {/* Middle area */}
        <div className="grow">
          {/* Search form */}
          <SearchBar />
        </div>
        {/* Right side */}
        <div className="relative z-[100] flex flex-1 items-center justify-end gap-4">
          {/* User menu */}
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
