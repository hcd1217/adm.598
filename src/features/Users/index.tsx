import { formatCurrency } from "@/common/format";
import { useRecords } from "@/hooks/useRecords";
import { useInfoStore } from "@/store/info.store";
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
  const {
    items: _t,
    form,
    refresh,
    setPage,
    PAGE_SIZE,
    page,
  } = useRecords<RecordFilterType, UserPayload>(
    "/internal-api/get-all-users",
    async () => {
      return {
        data: [],
        result: [],
        statusCode: 200,
        success: true,
      };
    },
    {
      depositCode: "",
      email: "",
      mobile: "",
      userId: "",
    },
  );

  const users = useInfoStore((state) => state.users);
  const isLoading = useInfoStore((state) => state.loading);

  const items = useMemo(() => {
    let _items = [...(users ?? [])];
    const _values = form.getValues();
    _items = fuzzySearchMultipleWords(
      users ?? [],
      keys(_values),
      values(_values) as string[],
    ) as typeof _t;

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const results = _items.slice(from, to);
    return { results, items: _items };
  }, [page, form, PAGE_SIZE, users]);

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
        records={items.results}
        fetching={isLoading}
        totalRecords={items.items.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        columns={[
          {
            accessor: "email",
            render: ({ email, fullName }) => (
              <div>
                {email}
                <br />
                {fullName || "-"}
              </div>
            ),
            sortable: false,
          },
          {
            accessor: "depositCode",
            title: "Code",
            sortable: false,
            render: ({ depositCode }) => depositCode,
          },
          {
            accessor: "kycLevel",
            title: "KYC Level",
            sortable: false,
          },
          {
            accessor: "balance",
            title: "Balances",
            render: ({ balance }) => {
              const value = formatCurrency(
                parseFloat(balance ?? "0"),
              );
              return (
                <>
                  {value === "0" || value === "$0.00" ? "-" : value}
                </>
              );
            },
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
