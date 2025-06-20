import Breadcrumbs from "@/components/Breadcrumbs";
import ReferralView from "@/features/Referrals";
import { Space, Container } from "@mantine/core";

export default function Referral() {
  return (
    <Container fluid>
      <Breadcrumbs title="Referrals" />
      <Space my={"md"} />
      <ReferralView />
    </Container>
  );
}
