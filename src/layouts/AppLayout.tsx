import Page from "@/components/Page";
import Sidebar from "@/features/Sidebar";
import { Box, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function AppLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Flex
      mih={"100vh"}
      styles={{
        root: {
          overflow: "hidden"
        }
      }}
    >
      <Sidebar />
      <Box
        style={{ overflowX: "hidden", overflowY: "auto" }}
        w={"100%"}
        py={"md"}
        h={"100%"}
      >
        <Page>{children || <Outlet />}</Page>
      </Box>
    </Flex>
  );
}
