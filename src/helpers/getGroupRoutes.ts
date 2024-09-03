import { navigation } from "@/constants/navigation";
import { group, listify } from "radash";

export default function getGroupRoutes(
  user: Record<string, unknown>,
) {
  const availableRoutes = navigation.filter((item) => {
    if (!item.access) {
      return true;
    }
    // if (!user) return false;

    return item.access(user?.role);
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
