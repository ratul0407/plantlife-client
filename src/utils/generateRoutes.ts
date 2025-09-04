import { ISidebarItems } from "@/types";

export const generateRoute = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    })),
  );
};
