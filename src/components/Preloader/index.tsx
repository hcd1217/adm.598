import { Loader, Stack } from "@mantine/core";

export default function Preloader() {
  return (
    <Stack
      h={"100vh"}
      p={20}
      style={{ overflow: "hidden" }}
      gap={0}
      align="center"
      justify="center"
    >
      <Loader color="primary" type="bars" />
    </Stack>
  );
}
