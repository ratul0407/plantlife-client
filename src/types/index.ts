import { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type TRole =
  | "ADMIN"
  | "SENDER"
  | "RECEIVER"
  | "DELIVERY_PERSONNEL"
  | "SUPER_ADMIN";
