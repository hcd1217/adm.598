import { OrderSide, OrderStatus, OrderType } from "@/common/enums";
import { useRecords } from "@/hooks/useRecords";
import { getOrdersApi } from "@/services/orders";
import { TRANSACTION_STATUS_COLORS } from "@/utils/color";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  MultiSelect,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { keys } from "lodash";
import { DataTable } from "mantine-datatable";

export const doSearch = (
  debouncedQuery: string,
  fieldName: string,
) => {
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

export function OrderListFilter() {
  const {
    sortStatus,
    setSortStatus,
    form,
    data,
    refresh,
    items,
    isLoading,
    page,
    setPage,
    PAGE_SIZE,
  } = useRecords<
    {
      userId: string;
      status: string[];
    },
    OrderPayload
  >("/internal-api/get-orders", getOrdersApi, {
    userId: "",
    status: [],
  });

  return (
    <Box style={{ overflow: "hidden" }}>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Orders list</Title>
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
        <Flex gap={10}>
          <TextInput
            label="UID"
            key={form.key("userId")}
            {...form.getInputProps("userId")}
          />
          <MultiSelect
            label="Order Status"
            key={form.key("status")}
            {...form.getInputProps("status")}
            searchable
            data={keys(OrderStatus)}
            clearable
          ></MultiSelect>
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
              accessor: "type",
              render: ({ type }) => (
                <>
                  <Button
                    fullWidth
                    bg={type === OrderType.LIMIT ? "red" : "orange"}
                    size="xs"
                  >
                    {type}
                  </Button>
                </>
              ),
              sortable: true,
              resizable: true,
            },
            {
              accessor: "userId",
              sortable: true,
              render: ({ userId }) => userId,
              resizable: true,
            },
            {
              accessor: "positionId",
              sortable: true,
              render: ({ positionId }) => positionId,
              resizable: true,
            },
            {
              accessor: "orderId",
              sortable: true,
              render: ({ orderId }) => orderId,
              resizable: true,
            },
            {
              accessor: "symbolId",
              sortable: true,
              render: ({ symbolId }) => symbolId,
              resizable: true,
            },
            {
              accessor: "clientOrderId",
              sortable: true,
              render: ({ clientOrderId }) => clientOrderId,
              resizable: true,
            },
            {
              accessor: "forwardedOrderId",
              sortable: true,
              render: ({ forwardedOrderId }) => forwardedOrderId,
              resizable: true,
            },
            {
              accessor: "binanceOrderId",
              sortable: true,
              render: ({ binanceOrderId }) => binanceOrderId,
              resizable: true,
            },
            {
              accessor: "side",
              sortable: true,
              render: ({ side }) => (
                <>
                  <Button
                    fullWidth
                    bg={
                      side === OrderSide.SELL
                        ? "red"
                        : TRANSACTION_STATUS_COLORS.DONE
                    }
                    size="xs"
                  >
                    {side}
                  </Button>
                </>
              ),
              resizable: true,
            },
            {
              accessor: "postOnly",
              sortable: true,
              render: ({ postOnly }) => (
                <>
                  <Checkbox readOnly checked={postOnly} />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "reduceOnly",
              sortable: true,
              render: ({ reduceOnly }) => (
                <>
                  <Checkbox readOnly checked={reduceOnly} />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "price",
              sortable: true,
              render: ({ price }) => price,
              resizable: true,
            },
            {
              accessor: "avgPrice",
              sortable: true,
              render: ({ avgPrice }) => avgPrice,
              resizable: true,
            },
            {
              accessor: "leverage",
              sortable: true,
              render: ({ leverage }) => leverage,
              resizable: true,
            },

            {
              accessor: "createdAt",
              sortable: true,
              render: ({ createdAt }) => (
                <>
                  <Text
                    styles={{
                      root: {
                        whiteSpace: "nowrap",
                      },
                    }}
                    fz={14}
                  >
                    {new Date(createdAt).toLocaleString()}
                  </Text>
                </>
              ),
              resizable: true,
            },

            {
              accessor: "status",
              resizable: true,
              render: ({ status }) => (
                <>
                  <Button
                    fullWidth
                    bg={TRANSACTION_STATUS_COLORS[status]}
                    size="xs"
                  >
                    {status}
                  </Button>
                </>
              ),
              sortable: true,
            },
            {
              accessor: "volume",
              sortable: true,
              render: ({ volume }) => volume,
              resizable: true,
            },
            {
              accessor: "reduceVolume",
              sortable: true,
              render: ({ reduceVolume }) => reduceVolume,
              resizable: true,
            },
            {
              accessor: "realizedPnl",
              sortable: true,
              render: ({ realizedPnl }) => realizedPnl,
              resizable: true,
            },
            {
              accessor: "filledAt",
              sortable: true,
              render: ({ filledAt }) => filledAt,
              resizable: true,
            },
            {
              accessor: "filled",
              sortable: true,
              render: ({ filled }) => filled,
              resizable: true,
            },
            {
              accessor: "stopLoss",
              sortable: true,
              render: ({ stopLoss }) => stopLoss,
              resizable: true,
            },
            {
              accessor: "takeProfit",
              sortable: true,
              render: ({ takeProfit }) => takeProfit,
              resizable: true,
            },
            {
              accessor: "takeProfitTriggerBy",
              sortable: true,
              render: ({ takeProfitTriggerBy }) =>
                takeProfitTriggerBy,
              resizable: true,
            },
            {
              accessor: "triggerPrice",
              sortable: true,
              render: ({ triggerPrice }) => triggerPrice,
              resizable: true,
            },
            {
              accessor: "triggerBy",
              sortable: true,
              render: ({ triggerBy }) => triggerBy,
              resizable: true,
            },
            {
              accessor: "triggerDirection",
              sortable: true,
              render: ({ triggerDirection }) => triggerDirection,
              resizable: true,
            },
            {
              accessor: "timeInForce",
              sortable: true,
              render: ({ timeInForce }) => timeInForce,
              resizable: true,
            },
            {
              accessor: "stopLossTriggerBy",
              sortable: true,
              render: ({ stopLossTriggerBy }) => stopLossTriggerBy,
              resizable: true,
            },
            {
              accessor: "masterOrderId",
              sortable: true,
              render: ({ masterOrderId }) => masterOrderId,
              resizable: true,
            },
            {
              accessor: "masterAccountId",
              sortable: true,
              render: ({ masterAccountId }) => masterAccountId,
              resizable: true,
            },
            {
              accessor: "isCopy",
              sortable: true,
              render: ({ isCopy }) => (
                <>
                  <Checkbox checked={isCopy} readOnly />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "isMasterOrder",
              sortable: true,
              render: ({ isMasterOrder }) => (
                <>
                  <Checkbox checked={isMasterOrder} readOnly />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "totalFollowers",
              sortable: true,
              render: ({ totalFollowers }) => totalFollowers,
              resizable: true,
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
