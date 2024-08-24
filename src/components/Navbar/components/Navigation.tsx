import AsideDivider from "@/components/AsideDivider";
import AsideNavLink from "@/components/AsideNavLink";
import { sidebar } from "@/constants/ui";
import getGroupRoutes from "@/helpers/getGroupRoutes";
import { useAuthStore } from "@/store/auth.store";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useMemo } from "react";

export default function Navigation() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const routes = useMemo(() => getGroupRoutes(user), [user]);
  const withSpacer = (groupIndex: number) =>
    groupIndex === 0 ? 0 : 16;

  return (
    <>
      <Stack
        justify="space-between"
        gap={0}
        maw={sidebar.width}
        h={"100%"}
      >
        {routes.map((routeGroup, groupIdx) => (
          <Stack key={groupIdx} gap={0} mt={withSpacer(groupIdx)}>
            {!!withSpacer(groupIdx) && <AsideDivider mx={8} />}
            <Group px={32} py={16}>
              <Text
                size={"12px"}
                lh={"14px"}
                fw={500}
                c={"dark.3"}
                tt="uppercase"
              >
                {routeGroup.groupName}
              </Text>
            </Group>
            <Stack gap={2}>
              {routeGroup.routes.map((item, idx) => (
                <AsideNavLink item={item} key={idx} />
              ))}
            </Stack>
          </Stack>
        ))}
        <Box p={"md"}>
          <Group
            gap={5}
            mt={"atuo"}
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
        </Box>
      </Stack>
    </>
  );
}
