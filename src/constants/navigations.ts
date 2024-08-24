import { IconGauge, IconLock, IconUsers } from "@tabler/icons-react";

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
    title: "Traders",
    access: () => true,
    route: () => "/traders",
    comming: true,
    icon: IconLock,
  },
];
