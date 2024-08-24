import {
  ActionIcon,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import styles from "./styles.module.css";
import { useAuthStore } from "@/store/auth.store";

export default function Header() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      <Stack gap={0} bg={"white"} className={styles.header__wrapper}>
        <Stack
          gap={0}
          bg={"white"}
          className={styles.header__content}
        >
          {/* Header */}
          <Group gap={24} px={32} py={18} wrap="nowrap">
            {/* LEFT SIDE */}

            {/* RIGHT SIDE */}
            <Group
              gap={5}
              ml={"auto"}
              onClick={logout}
              styles={{
                root: {
                  cursor: "pointer",
                },
              }}
            >
              <ActionIcon variant="transparent">
                <IconLogout color="orange" />
              </ActionIcon>
              <Text c={"dimmed"} size="xs">
                Sign Out
              </Text>
            </Group>
          </Group>

          {/* Context Navigation */}
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}
