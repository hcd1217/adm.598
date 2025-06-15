import { PositionsListFilter } from "@/features/Positions";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Space, Container } from "@mantine/core";

export default function Positions() {
  return (
    <Container fluid>
      <Breadcrumbs title="Positions" />
      <Space my={"md"} />
      <PositionsListFilter />
    </Container>
  );
}
