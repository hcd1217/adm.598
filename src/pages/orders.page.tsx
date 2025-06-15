import Breadcrumbs from "@/components/Breadcrumbs";
import { OrderListFilter } from "@/features/Orders";
import { Container, Space } from "@mantine/core";

export default function Orders() {
  return (
    <Container fluid>
      <Breadcrumbs title="Orders" />
      <Space my={"md"} />
      <OrderListFilter />
    </Container>
  );
}
