import Breadcrumbs from "@/components/Breadcrumbs";
import { KycListFilter } from "@/features/KycData";
import { Container, Space } from "@mantine/core";

export default function Page() {
  return (
    <Container fluid>
      <Breadcrumbs title="KYC Pending Requests" />
      <Space my={"md"} />
      <KycListFilter />
    </Container>
  );
}
