import { OrderSide } from "@/common/enums";
import NumberFormat from "@/components/NumberFormat";
import { useRecords } from "@/hooks/useRecords";
import { getPositionsApi } from "@/services/positions";
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
import { IconRefresh } from "@tabler/icons-react";
import { keys } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";

export function PositionsListFilter() {

  const [sortStatus, setSortStatus] = useState<
  DataTableSortStatus<PositionPayload>
  >({
    columnAccessor: "depositCode",
    direction: "asc",
  });

  const {
    form, data, refresh, items, isLoading, page, setPage, PAGE_SIZE
  } = useRecords<{
    accountId: string;
    side: string;
  }, PositionPayload>("/internal-api/get-positions", getPositionsApi, {
    accountId: "",
    side: "",
  });
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
      <form onSubmit={form.onSubmit(() => { })}>
        <Flex gap={10}>
          <Flex gap={10}>
            <TextInput
              label="UID"
              key={form.key("accountId")}
              {...form.getInputProps("accountId")}
            />
          </Flex>
          <Select
            key={form.key("side")}
            {...form.getInputProps("side")}
            label="Order Side"
            searchable
            data={keys(OrderSide)}
          ></Select>
        </Flex>
      </form>
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
