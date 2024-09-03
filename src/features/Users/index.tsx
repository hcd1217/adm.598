import { useRecords } from "@/hooks/useRecords";
import { getUserListApi } from "@/services/auth";
import { UserPayload } from "@/types/record";
import { fuzzySearchMultipleWords } from "@/utils/data";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { keys, values } from "lodash";
import { DataTable } from "mantine-datatable";
import { useMemo } from "react";

type RecordFilterType = {
  depositCode: string;
  email: string;
  mobile: string;
};

export function UserListFilter() {
  const { form, data, refresh, isLoading, setPage, PAGE_SIZE, page } =
    useRecords<RecordFilterType, UserPayload>(
      "/internal-api/get-all-users",
      getUserListApi,
      {
        depositCode: "",
        email: "",
        mobile: "",
      },
    );

  const items = useMemo(() => {
    let _items = [...(data?.result ?? [])];
    const _values = form.getValues();
    _items = fuzzySearchMultipleWords(
      data?.result ?? [],
      keys(_values),
      values(_values) as string[],
    );

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const t = _items.slice(from, to);
    return t;
  }, [data?.result, page, form, PAGE_SIZE]);

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
      <form onSubmit={form.onSubmit(() => {})}>
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
        totalRecords={data?.result.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
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
            render: ({ isDemo }) => (
              <Checkbox checked={isDemo} readOnly />
            ),
          },
          {
            accessor: "bFlag",
            title: "bFlag",
            render: ({ bFlag }) => (
              <Checkbox checked={bFlag} readOnly />
            ),
          },
        ]}
      />
    </Box>
  );
}
