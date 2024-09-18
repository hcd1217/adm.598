import LanguageView from "@/features/LanguageView";
import { useAuthStore } from "@/store/auth.store";
import { Anchor, Breadcrumbs, Container, Space } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Mail() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Container fluid>
      <Breadcrumbs
        separator={<IconChevronRight color="gray" size={14} />}
      >
        <Anchor fz={14} fw={400} href="/">
          Dashboard
        </Anchor>
        <Anchor fz={14} fw={400} c={"primary"}>
          Language
        </Anchor>
      </Breadcrumbs>
      <Space my={"md"} />
      <LanguageView />
    </Container>
  );
}
