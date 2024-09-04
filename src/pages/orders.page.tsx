import { OrderListFilter } from "@/features/Orders";
import { Anchor, Breadcrumbs, Container, Space } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default function Orders() {
  return (
    <Container fluid>
      <Breadcrumbs
        separator={<IconChevronRight color="gray" size={14} />}
      >
        <Anchor fz={14} fw={400} href="/">
          Dashboard
        </Anchor>
        <Anchor fz={14} fw={400} c={"primary"}>
          Orders
        </Anchor>
      </Breadcrumbs>
      <Space my={"md"} />
      <OrderListFilter />
    </Container>
  );
}
