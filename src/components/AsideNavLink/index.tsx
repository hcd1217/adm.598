import { useAuthStore } from "@/store/auth.store";
import { Badge, Box, Group, Text } from "@mantine/core";
import {
  NavLink as RouterNavLink,
  useParams,
} from "react-router-dom";
import styles from "./styles.module.css";

export default function AsideNavLink({
  item,
}: {
  item: IAsideNavLink;
}) {
  const params = useParams();
  const user = useAuthStore((state) => state.user);

  return (
    <RouterNavLink
      to={item.route(user, params)}
      end={item.exact}
      style={{ pointerEvents: item.coming ? "none" : "auto" }}
    >
      {({ isActive }) => (
        <Group
          wrap={"nowrap"}
          gap={12}
          className={styles["aside-link__wrapper"]}
          data-active={isActive}
          data-coming={item.coming}
        >
          <item.icon
            width={24}
            height={24}
            className={styles["aside-link__icon"]}
          />
          <Box className={styles["aside-link__label"]}>
            {item.title}{" "}
            <span style={{fontSize: "14px"}}>
              {item.coming && "(Coming soon)"}
            </span>
            {parseInt(item.badge as string) > 0 && (
              <Badge>{item.badge}</Badge>
            )}
          </Box>
        </Group>
      )}
    </RouterNavLink>
  );
}
