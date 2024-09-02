import { TransactionsListFilter } from "@/features/Transactions";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  Space,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default function Page() {
  return (
    <Container fluid>
      <Breadcrumbs
        separator={<IconChevronRight color="gray" size={14} />}
      >
        <Anchor fz={14} fw={400} href="/">
          Dashboard
        </Anchor>
        <Anchor fz={14} fw={400} c={"primary"}>
          Transactions
        </Anchor>
      </Breadcrumbs>
      <Space my={"md"} />
      <Box style={{ overflow: "hidden" }}>
        <TransactionsListFilter />
      </Box>
    </Container>
  );
}
