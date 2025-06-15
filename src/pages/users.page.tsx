import { UserListFilter } from "@/features/Users";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Space, Container } from "@mantine/core";

export default function Users() {
  return (
    <Container fluid>
      <Breadcrumbs title="Users" />
      <Space my={"md"} />
      <UserListFilter />
    </Container>
  );
}
