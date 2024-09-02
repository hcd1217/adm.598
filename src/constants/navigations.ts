import {
  IconBusinessplan,
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
    icon: IconBusinessplan,
  },
  {
    group: "Main",
    title: "Positions",
    access: () => true,
    route: () => "/positions",
    icon: IconBusinessplan,
  },
  {
    group: "Main",
    title: "Transactions",
    access: () => true,
    route: () => "/transactions",
    icon: IconBusinessplan,
  },
  // {
  //   group: "Main",
  //   title: "Traders",
  //   access: () => true,
  //   route: () => "/traders",
  //   comming: true,
  //   icon: IconLock,
  // },
];
