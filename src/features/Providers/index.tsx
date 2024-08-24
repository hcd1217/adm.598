import { PropsWithChildren } from "react";

import { theme } from "@/constants/theme";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export default function RootProvider({
  children,
}: PropsWithChildren) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="light"
      withCssVariables
    >
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}
