import { TransactionsListFilter } from "@/features/Transactions";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, Space, Container } from "@mantine/core";

export default function Transactions() {
  return (
    <Container fluid>
      <Breadcrumbs title="Transactions" />
      <Space my={"md"} />
      <Box style={{ overflow: "hidden" }}>
        <TransactionsListFilter />
      </Box>
    </Container>
  );
}
