import { UserListFilter } from "@/features/Users";
import { Anchor, Breadcrumbs, Container, Space } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default function Users() {
  return (
    <Container fluid>
      <Breadcrumbs
        separator={<IconChevronRight color="gray" size={14} />}
      >
        <Anchor fz={14} fw={400} href="/">
          Dashboard
        </Anchor>
        <Anchor fz={14} fw={400} c={"primary"}>
          Users
        </Anchor>
      </Breadcrumbs>
      <Space my={"md"} />
      <UserListFilter />
    </Container>
  );
}
