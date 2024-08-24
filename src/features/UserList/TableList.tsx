import { getUserList } from "@/services/auth";
import { PAGE_SIZE } from "@/types/common";
import { UserPayload } from "@/types/user";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconRefresh, IconSearch, IconX } from "@tabler/icons-react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";

const doSearch = (debouncedQuery: string, fieldName: string) => {
  if (
    debouncedQuery !== "" &&
    !`${fieldName}`
      .toLowerCase()
      .includes(debouncedQuery.trim().toLowerCase())
  ) {
    return false;
  }
  return true;
};

export function UserListFilter() {
  const [records, setRecords] = useState<UserPayload[]>([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<UserPayload>
  >({
    columnAccessor: "depositCode",
    direction: "asc",
  });

  useEffect(() => {
    const data = sortBy(
      records,
      sortStatus.columnAccessor,
    ) as UserPayload[];
    setRecords(
      sortStatus.direction === "desc" ? data.reverse() : data,
    );
  }, [sortStatus, records]);

  const loadRecords = () => {
    getUserList()
      .then((res) => {
        setRecords(res.result);
      })
      .finally(() => setFetching(false));
  };

  const refresh = () => {
    setPage(1);
    setQuery("");
    loadRecords();
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const items = useMemo(() => {
    const _items = [...records].filter(({ email }) =>
      doSearch(debouncedQuery, email as string),
    );
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const t = _items.slice(from, to);
    return t;
  }, [debouncedQuery, records, page]);

  return (
    <Box>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Users list</Title>
          <Button
            onClick={refresh}
            title="Refresh"
            disabled={fetching}
            loading={fetching}
          >
            <IconRefresh />
          </Button>
        </Flex>
      </Card>
      <Space my={"md"} />
      <DataTable
        height={500}
        withTableBorder
        withColumnBorders
        records={items}
        fetching={fetching}
        columns={[
          {
            accessor: "email",
            render: ({ email }) => email,
            sortable: true,
            resizable: true,
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
            resizable: true,
          },
          {
            accessor: "mobile",
            render: ({ mobile }) => mobile,
            sortable: true,
            resizable: true,
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={records.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
    </Box>
  );
}
