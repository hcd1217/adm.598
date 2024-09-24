import { OrderSide, OrderStatus, OrderType } from "@/common/enums";
import {
  AccountName,
  AccountTypeName,
  SymbolName,
} from "@/components/AccountInfos";
import { useRecords } from "@/hooks/useRecords";
import { getOrdersApi } from "@/services/orders";
import { OrderPayload } from "@/types/record";
import { TRANSACTION_STATUS_COLORS } from "@/utils/color";
import {
  ActionIcon,
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
import {
  IconArrowLeft,
  IconArrowRight,
  IconRefresh,
} from "@tabler/icons-react";
import { keys } from "lodash";
import { DataTable } from "mantine-datatable";

type RecordFilterType = {
  userId: string;
  status: string[];
};

export function OrderListFilter() {
  const {
    form,
    refresh,
    items,
    isLoading,
    loadNext,
    loadPrev,
    disabledNext,
    disabledPrev,
  } = useRecords<RecordFilterType, OrderPayload>(
    "/internal-api/get-orders",
    getOrdersApi,
    {
      userId: "",
      status: [],
    },
  );

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
      <form onSubmit={form.onSubmit(() => { })}>
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
          height={"75vh"}
          withTableBorder
          withColumnBorders
          records={items}
          fetching={isLoading}
          idAccessor={"id"}
          columns={[
            {
              accessor: "user",
              sortable: false,
              render: ({ userId }) => <AccountName userId={userId} />,
              resizable: true,
            },
            {
              accessor: "accountId",
              sortable: false,
              render: ({ userId, accountId }) => (
                <AccountTypeName
                  accountId={accountId}
                  userId={userId}
                />
              ),
              resizable: true,
            },
            {
              accessor: "Master",
              sortable: false,
              render: ({ isMasterOrder }) => (
                <>
                  <Checkbox checked={isMasterOrder} readOnly />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "symbol",
              sortable: false,
              render: ({ symbolId }) => (
                <SymbolName symbolId={symbolId} />
              ),
              resizable: true,
            },
            {
              accessor: "volume",
              sortable: false,
              render: ({ volume }) => volume,
              resizable: true,
            },
            {
              accessor: "filled",
              sortable: false,
              render: ({ filled }) => filled,
              resizable: true,
            },
            {
              accessor: "avgPrice",
              sortable: false,
              render: ({ avgPrice }) => avgPrice,
              resizable: true,
            },
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
              sortable: false,
              resizable: true,
            },
            {
              accessor: "side",
              sortable: false,
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
              sortable: false,
            },
            {
              accessor: "leverage",
              sortable: false,
              render: ({ leverage }) => leverage,
              resizable: true,
            },
            {
              accessor: "orderId",
              sortable: false,
              render: ({ orderId }) => orderId,
              resizable: true,
            },
            {
              accessor: "createdAt",
              sortable: false,
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
              accessor: "filledAt",
              sortable: false,
              render: ({ filledAt }) => filledAt,
              resizable: true,
            },
          ]}
        />
        <Flex py={"xs"} justify={"center"} gap={10}>
          <ActionIcon
            onClick={() => loadPrev()}
            disabled={disabledPrev}
          >
            <IconArrowLeft />
          </ActionIcon>
          <ActionIcon
            onClick={() => loadNext()}
            disabled={disabledNext}
          >
            <IconArrowRight />
          </ActionIcon>
        </Flex>
      </Box>
    </Box>
  );
}
