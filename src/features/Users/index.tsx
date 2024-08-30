import { getUserListApi } from "@/services/auth";
import { PAGE_SIZE } from "@/types/common";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Space,
  TextInput,
  Title
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconRefresh, IconSearch, IconX } from "@tabler/icons-react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { matchSorter } from "match-sorter";
import { useCallback, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";


export function UserListFilter() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 800);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<UserPayload>
  >({
    columnAccessor: "depositCode",
    direction: "asc",
  });

  const { data, isLoading } = useSWR("/internal-api/get-all-users", getUserListApi, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  });

  const loadRecords = useCallback(() => {
    mutate("/internal-api/get-transactions");
  }, []);

  const refresh = () => {
    setPage(1);
    setQuery("");
    loadRecords();
  };

  const items = useMemo(() => {
    let _items = [...data?.result ?? []];
    if (debouncedQuery) {
      _items = matchSorter([...data?.result ?? []], debouncedQuery, { keys: ["depositCode", "accountId", "userId", "type", "side"] });
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const t = _items.slice(from, to);
    return t;
  }, [debouncedQuery, data?.result, page]);

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

      <Flex gap={10} wrap={"wrap"}>
        <TextInput
          value={query}
          label="UID"
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        <TextInput label="Email" />
        <TextInput label="Mobile" />
      </Flex>
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
            filter: (
              <TextInput
                label="Email"
                description="Show email whose emails include the specified text"
                placeholder="Search email..."
                leftSection={<IconSearch size={16} />}
                rightSection={
                  <ActionIcon
                    size="sm"
                    variant="transparent"
                    c="dimmed"
                    onClick={() => setQuery("")}
                  >
                    <IconX size={14} />
                  </ActionIcon>
                }
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            ),
            filtering: query !== "",
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
            render: ({ fullName }) => (
              <>{fullName}</>
            ),
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
