import {
  // cspell:disable-next-line
  IconBusinessplan as IconBusinessPlan,
  IconFloatLeft,
  IconGauge,
  IconUsers,
} from "@tabler/icons-react";

export const navigation: AsideNavLink[] = [
  {
    group: "Main",
    title: "Dashboard",
    access: () => true,
    route: () => "/",
    icon: IconGauge,
    hidden: true,
  },
  {
    group: "Main",
    title: "Users",
    access: () => true,
    route: () => "/users",
    icon: IconUsers,
  },
  {
    group: "Main",
    title: "Orders",
    access: () => true,
    route: () => "/orders",
    icon: IconBusinessPlan,
  },
  {
    group: "Main",
    title: "Positions",
    access: () => true,
    route: () => "/positions",
    icon: IconFloatLeft,
  },
  {
    group: "Main",
    title: "Transactions",
    access: () => true,
    route: () => "/transactions",
    icon: IconBusinessPlan,
  },
].filter((nav) => !nav.hidden);
