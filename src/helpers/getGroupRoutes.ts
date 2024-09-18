import { navigation } from "@/constants/navigation";
import { group, listify } from "radash";

export default function getGroupRoutes(
  user: Record<string, unknown>,
  badges?: Record<string, string | number>,
) {
  const availableRoutes = navigation
    .map((item) => ({
      ...item,
      badge: badges?.[item.id as string],
    }))
    .filter((item) => {
      if (!item.access) {
        return true;
      }
      // if (!user) return false;

      return item.access(user?.isAdmin ? "ADMIN" : "UNKNOWN");
    });

  const routesByGroup = group(
    availableRoutes,
    (item) => item.group || "personal",
  );

  return listify(routesByGroup, (key, item) => ({
    groupName: key,
    routes: item!,
  }));
}
