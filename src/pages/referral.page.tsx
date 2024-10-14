import ReferralView from "@/features/Referrals";
import { Anchor, Breadcrumbs, Space, Container } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default function Referral() {
  return (
    <Container fluid>
      <Breadcrumbs
        separator={<IconChevronRight color="gray" size={14} />}
      >
        <Anchor fz={14} fw={400} href="/">
          Dashboard
        </Anchor>
        <Anchor fz={14} fw={400} c={"primary"}>
          Referrals
        </Anchor>
      </Breadcrumbs>
      <Space my={"md"} />
      <ReferralView />
    </Container>
  );
}
