import { TransactionStatus, TransactionType } from "@/common/enums";
import NumberFormat from "@/components/NumberFormat";
import { getTransactionsApi } from "@/services/transactions";
import { PAGE_SIZE } from "@/types/common";
import { TRANSACTION_STATUS_COLORS, TRANSACTION_TYPE_COLORS } from "@/utils/color";
import {
  Box,
  Button,
  Card,
  Flex,
  NumberInput,
  Select,
  Space,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";
import { keys } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { matchSorter } from "match-sorter";
import { useCallback, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";


export function TransitionsListFilter() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<TransactionPayload>
  >({
    columnAccessor: "depositCode",
    direction: "asc",
  });
  const { data, isLoading } = useSWR("/internal-api/get-transactions", getTransactionsApi, {
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
      _items = matchSorter([...data?.result ?? []], debouncedQuery, { keys: ["accountId", "userId", "type", "side"] });
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const t = _items.slice(from, to);
    return t;
  }, [debouncedQuery, data?.result, page]);

  return (
    <Box style={{ overflow: "hidden" }}>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Transactions list</Title>
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
      <Flex gap={10}>
        <TextInput
          value={query}
          label="UID"
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        <Select label="Type" searchable data={keys(TransactionType)}></Select>
        <Select label="Status" searchable data={keys(TransactionStatus)}></Select>
        <Flex gap={10}>
          <NumberInput label="Amount" hideControls />
        </Flex>
      </Flex>
      <Space my={"md"} />
      <Box style={{ overflow: "hidden" }}>
        <DataTable
          height={"80vh"}
          withTableBorder
          withColumnBorders
          records={items}
          fetching={isLoading}
          idAccessor={"id"}
          columns={[
            {
              accessor: "userId",
              sortable: true,
              render: ({ userId }) => userId,
              resizable: true
            },
            {
              accessor: "accountId",
              sortable: true,
              render: ({ accountId }) => accountId,
              resizable: true
            },

            {
              accessor: "type",
              render: ({ type }) => (
                <>
                  <Button bg={TRANSACTION_TYPE_COLORS[type]} size="xs">{type}</Button>
                </>
              ),
              sortable: true,
              resizable: true
            },
            {
              accessor: "txId",
              sortable: true,
              render: ({ txId }) => txId,
              resizable: true
            },
            {
              accessor: "positionId",
              sortable: true,
              render: ({ positionId }) => positionId,
              resizable: true
            },
            {
              accessor: "toAccountId",
              sortable: true,
              render: ({ toAccountId }) => toAccountId,
              resizable: true
            },
            {
              accessor: "tradeId",
              sortable: true,
              render: ({ toAccountId }) => toAccountId,
              resizable: true
            },

            {
              accessor: "createdAt",
              sortable: true,
              render: ({ createdAt }) => <>
                <Text
                  styles={{
                    root: {
                      whiteSpace: "nowrap"
                    }
                  }}
                  fz={14}
                >{new Date(createdAt).toLocaleString()}</Text>
              </>,
              resizable: true
            },

            {
              accessor: "From",
              render: ({ from }) => from,
              sortable: true,
              resizable: true
            },
            {
              accessor: "to",
              sortable: true,
              render: ({ to }) => to,
              resizable: true
            },
            {
              accessor: "amount",
              sortable: true,
              render: ({ amount }) => <>
                <NumberFormat value={amount} decimalPlaces={4} />
              </>,
              resizable: true
            },
            {
              accessor: "toAmount",
              sortable: true,
              render: ({ toAmount }) => <>
                <NumberFormat value={toAmount} decimalPlaces={4} />
              </>,
              resizable: true
            },
            {
              accessor: "jpyAmount",
              sortable: true,
              render: ({ jpyAmount }) => <>
                <NumberFormat value={jpyAmount} decimalPlaces={4} />
              </>,
              resizable: true
            },

            {
              accessor: "fee",
              sortable: true,
              render: ({ fee }) => fee,
              resizable: true
            },
            {
              accessor: "memo",
              sortable: true,
              render: ({ memo }) => memo,
              resizable: true
            },
            {
              accessor: "status",
              resizable: true,
              render: ({ status }) => (
                <>
                  <Button bg={TRANSACTION_STATUS_COLORS[status]} size="xs">{status}</Button>
                </>
              ),
              sortable: true,
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
    </Box>
  );
}
