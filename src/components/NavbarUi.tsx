import { useId } from "react";
import { SearchIcon } from "lucide-react";

import Logo from "@/components/navbar-components/logo";
import UserMenu from "@/components/navbar-components/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cart } from "./Cart";
import { Link } from "react-router";
import { Menu } from "./Home/menu/Menu";
import { SearchForm } from "./search-form";
import SearchBar from "./navbar-components/SearchBar";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/plants", label: "All Plants" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NavbarUi() {
  const id = useId();

  return (
    <header className="sticky top-0 z-[90] border-b bg-white px-4 pb-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <Menu />
          </div>
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="relative z-[100] w-36 bg-white p-1 md:hidden"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className="py-1.5"
                        active={link.active}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover> */}
          {/* Logo */}
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
