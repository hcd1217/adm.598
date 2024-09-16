import {
  // cspell:disable-next-line
  IconBusinessplan as IconBusinessPlan,
  IconFloatLeft,
  IconGauge,
  IconId,
  IconMail,
  IconSettingsSpark,
  IconUsers,
} from "@tabler/icons-react";
import { v4 } from "uuid";

export const navigation: IAsideNavLink[] = [
  {
    group: "Main",
    title: "Dashboard",
    access: () => true,
    route: () => "/",
    icon: IconGauge,
    id: v4(),
  },
  {
    group: "Main",
    title: "Users",
    access: () => true,
    route: () => "/users",
    icon: IconUsers,
    id: v4(),
  },
  {
    group: "Main",
    title: "Orders",
    access: () => true,
    route: () => "/orders",
    icon: IconBusinessPlan,
    id: v4(),
  },
  {
    group: "Main",
    title: "Positions",
    access: () => true,
    route: () => "/positions",
    icon: IconFloatLeft,
    id: v4(),
  },
  {
    group: "Main",
    title: "Transactions",
    access: () => true,
    route: () => "/transactions",
    icon: IconBusinessPlan,
    id: v4(),
  },
  {
    group: "Main",
    title: "Email",
    access: () => true,
    route: () => "/email",
    icon: IconMail,
    id: v4(),
  },
  {
    group: "Main",
    title: "APP Configs",
    access: () => true,
    route: () => "/app-configs",
    icon: IconSettingsSpark,
    id: "APP_CONFIGS",
  },
  {
    group: "Main",
    title: "KYC Pending Requests",
    access: () => true,
    route: () => "/kyc-data",
    icon: IconId,
    id: "KYC_PENDING",
  },
];
