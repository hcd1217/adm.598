import { OrderSide } from "@/common/enums";
import NumberFormat from "@/components/NumberFormat";
import { getPositionsApi } from "@/services/positions";
import { PAGE_SIZE } from "@/types/common";
import { TRANSACTION_STATUS_COLORS } from "@/utils/color";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
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


export const doSearch = (debouncedQuery: string, fieldName: string) => {
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

export function PositionsListFilter() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 800);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<PositionPayload>
  >({
    columnAccessor: "depositCode",
    direction: "asc",
  });
  const { data, error, isLoading } = useSWR("/internal-api/get-positions", getPositionsApi, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  });

  const loadRecords = useCallback(() => {
    mutate("/internal-api/get-positions");
  }, []);

  const refresh = () => {
    setPage(1);
    setQuery("");
    loadRecords();
  };


  const items = useMemo(() => {
    let _items = [...data?.result ?? []];
    if (debouncedQuery) {
      _items = matchSorter([...data?.result ?? []], debouncedQuery, { keys: ["accountId"] });
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
          <Title order={3}>Positions list</Title>
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
        <Flex gap={10}>
          <TextInput
            value={query}
            label="UID"
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </Flex>
        <Select label="Order Side" searchable data={keys(OrderSide)}></Select>
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
              accessor: "accountId",
              render: ({ accountId }) => (
                <>
                  {accountId}
                </>
              ),
              sortable: true,
              resizable: true
            },
            {
              accessor: "symbolId",
              render: ({ symbolId }) => (
                <>
                  {symbolId}
                </>
              ),
              sortable: true,
              resizable: true
            },
            {
              accessor: "side",
              sortable: true,
              render: ({ side }) => (
                <>
                  <Button fullWidth bg={side === OrderSide.SELL ? "red" : TRANSACTION_STATUS_COLORS.DONE} size="xs">{side}</Button>
                </>
              ),
              resizable: true
            },
            {
              accessor: "createdAt",
              sortable: true,
              render: ({ createdAt }) => <Text
                styles={{
                  root: {
                    whiteSpace: "nowrap"
                  }
                }}
                fz={14}
              >{new Date(createdAt).toLocaleString()}</Text>,
              resizable: true
            },
            {
              accessor: "closedAt",
              sortable: true,
              render: ({ closedAt }) => <Text
                styles={{
                  root: {
                    whiteSpace: "nowrap"
                  }
                }}
                fz={14}
              >{new Date(closedAt).toLocaleString()}</Text>,
              resizable: true
            },


            {
              accessor: "leverage",
              render: ({ leverage }) => leverage,
              sortable: true,
              resizable: true
            },
            {
              accessor: "volume",
              sortable: true,
              render: ({ volume }) => volume,
              resizable: true
            },
            {
              accessor: "closedVolume",
              sortable: true,
              render: ({ closedVolume }) => <>
                <NumberFormat value={closedVolume} decimalPlaces={4} />
              </>,
              resizable: true
            },
            {
              accessor: "averageClosePrice",
              sortable: true,
              render: ({ averageClosePrice }) => averageClosePrice,
              resizable: true
            },
            {
              accessor: "maxOpenInterest",
              sortable: true,
              render: ({ maxOpenInterest }) => maxOpenInterest,
              resizable: true
            },

            {
              accessor: "fee",
              sortable: true,
              render: ({ fee }) => fee,
              resizable: true
            },
            {
              accessor: "entryPrice",
              sortable: true,
              render: ({ entryPrice }) => entryPrice,
              resizable: true
            },
            {
              accessor: "markPrice",
              sortable: true,
              render: ({ markPrice }) => markPrice,
              resizable: true
            },
            {
              accessor: "takeProfitPrice",
              sortable: true,
              render: ({ takeProfitPrice }) => takeProfitPrice,
              resizable: true
            },
            {
              accessor: "stopLossPrice",
              sortable: true,
              render: ({ stopLossPrice }) => stopLossPrice,
              resizable: true
            },
            {
              accessor: "trailingStop",
              sortable: true,
              render: ({ trailingStop }) => trailingStop,
              resizable: true
            },
            {
              accessor: "liquidationPrice",
              sortable: true,
              render: ({ liquidationPrice }) => liquidationPrice,
              resizable: true
            },
            {
              accessor: "margin",
              sortable: true,
              render: ({ margin }) => margin,
              resizable: true
            },
            {
              accessor: "accumulatedFee",
              sortable: true,
              render: ({ accumulatedFee }) => accumulatedFee,
              resizable: true
            },
            {
              accessor: "realizedPnl",
              sortable: true,
              render: ({ realizedPnl }) => realizedPnl,
              resizable: true
            },
            {
              accessor: "isMasterPosition",
              sortable: true,
              render: ({ isMasterPosition }) => <>
                <Checkbox readOnly checked={isMasterPosition} />
              </>,
              resizable: true
            },
            {
              accessor: "isCopy",
              sortable: true,
              render: ({ isCopy }) => <>
                <Checkbox readOnly checked={isCopy} />
              </>,
              resizable: true
            },
            {
              accessor: "totalFollowers",
              sortable: true,
              render: ({ totalFollowers }) => totalFollowers,
              resizable: true
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
