import { KycListFilter } from "@/features/KycData";
import { Anchor, Breadcrumbs, Container, Space } from "@mantine/core";
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
          KYC Pending Requests
        </Anchor>
      </Breadcrumbs>
      <Space my={"md"} />
      <KycListFilter />
    </Container>
  );
}
