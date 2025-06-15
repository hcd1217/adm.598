import LanguageView from "@/features/LanguageView";
import { useAuthStore } from "@/store/auth.store";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Space, Container } from "@mantine/core";
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
      <Breadcrumbs title="Hedge" />
      <Space my={"md"} />
      <LanguageView />
    </Container>
  );
}
