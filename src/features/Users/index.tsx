import { useRecords } from "@/hooks/useRecords";
import { getUserListApi } from "@/services/auth";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Space,
  TextInput, Title
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";

export function UserListFilter() {
  const {
    form, data, refresh, items, isLoading, page, setPage, PAGE_SIZE, sortStatus, setSortStatus
  } = useRecords<{
    depositCode: string;
    email: string;
    mobile: string;
  }, UserPayload>("/internal-api/get-all-users", getUserListApi, {
    depositCode: "",
    email: "",
    mobile: "",
  });

  return (
    <Box>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Users list</Title>
          <Button
            onClick={refresh}
            title="Refresh"
            disabled={isLoading}
            loading={isLoading}
          >
            <IconRefresh />
          </Button>
        </Flex>
      </Card>
      <form onSubmit={form.onSubmit(() => { })}>
        <Flex gap={10} wrap={"wrap"}>
          <TextInput
            label="UID"
            key={form.key("depositCode")}
            {...form.getInputProps("depositCode")}
          />
          <TextInput
            label="Email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Mobile"
            key={form.key("mobile")}
            {...form.getInputProps("mobile")}
          />
        </Flex>
      </form>
      <Space my={"md"} />
      <DataTable
        height={"75vh"}
        withTableBorder
        withColumnBorders
        records={items}
        fetching={isLoading}
        columns={[
          {
            accessor: "email",
            render: ({ email }) => email,
            sortable: true,
          },
          {
            accessor: "depositCode",
            sortable: true,
            render: ({ depositCode }) => depositCode,
          },
          {
            accessor: "mobile",
            render: ({ mobile }) => mobile,
            sortable: true,
          },
          {
            accessor: "fullName",
            render: ({ fullName }) => <>{fullName}</>,
          },
          {
            accessor: "isDemo",
            title: "Demo",
            render: ({ isDemo }) => isDemo && <Checkbox />,
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={data?.result.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
    </Box>
  );
}
