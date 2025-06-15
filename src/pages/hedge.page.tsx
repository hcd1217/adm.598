import HedgeView from "@/features/Hedge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Space, Container } from "@mantine/core";

export default function Referral() {
  return (
    <Container fluid>
      <Breadcrumbs title="Hedge" />
      <Space my={"md"} />
      <HedgeView />
    </Container>
  );
}
