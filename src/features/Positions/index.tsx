import { OrderSide } from "@/common/enums";
import {
  AccountName,
  AccountTypeName,
  SymbolName,
} from "@/components/AccountInfos";
import NumberFormat from "@/components/NumberFormat";
import { useRecords } from "@/hooks/useRecords";
import { getPositionsApi } from "@/services/positions";
import { PositionPayload } from "@/types/record";
import { TRANSACTION_STATUS_COLORS } from "@/utils/color";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
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
import { DataTable } from "mantine-datatable";

type RecordFilterType = {
  userId: string;
};

export function PositionsListFilter() {
  const {
    form,
    refresh,
    items,
    isLoading,
    loadNext,
    loadPrev,
    disabledNext,
    disabledPrev,
  } = useRecords<RecordFilterType, PositionPayload>(
    "/internal-api/get-positions",
    getPositionsApi,
    {
      userId: "",
    },
  );
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
      <form onSubmit={form.onSubmit(() => {})}>
        <Flex gap={10}>
          <Flex gap={10}>
            <TextInput
              label="UID"
              key={form.key("userId")}
              {...form.getInputProps("userId")}
            />
          </Flex>
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
              accessor: "userId",
              render: ({ userId }) => <AccountName userId={userId} />,
              sortable: true,
              resizable: true,
            },
            {
              accessor: "accountId",
              render: ({ userId, accountId }) => (
                <AccountTypeName
                  userId={userId}
                  accountId={accountId}
                />
              ),
              sortable: true,
              resizable: true,
            },
            {
              accessor: "symbolId",
              render: ({ symbolId }) => (
                <SymbolName symbolId={symbolId} />
              ),
              sortable: true,
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
              accessor: "closedAt",
              sortable: true,
              render: ({ closedAt }) => (
                <>
                  <Text
                    styles={{
                      root: {
                        whiteSpace: "nowrap",
                      },
                    }}
                    fz={14}
                  >
                    {new Date(closedAt).toLocaleString()}
                  </Text>
                </>
              ),
              resizable: true,
            },

            {
              accessor: "leverage",
              render: ({ leverage }) => leverage,
              sortable: true,
              resizable: true,
            },
            {
              accessor: "volume",
              sortable: true,
              render: ({ volume }) => volume,
              resizable: true,
            },
            {
              accessor: "closedVolume",
              sortable: true,
              render: ({ closedVolume }) => (
                <>
                  <NumberFormat
                    value={closedVolume}
                    decimalPlaces={4}
                  />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "averageClosePrice",
              sortable: true,
              render: ({ averageClosePrice }) => averageClosePrice,
              resizable: true,
            },
            {
              accessor: "maxOpenInterest",
              sortable: true,
              render: ({ maxOpenInterest }) => maxOpenInterest,
              resizable: true,
            },

            {
              accessor: "fee",
              sortable: true,
              render: ({ fee }) => fee,
              resizable: true,
            },
            {
              accessor: "entryPrice",
              sortable: true,
              render: ({ entryPrice }) => entryPrice,
              resizable: true,
            },
            {
              accessor: "markPrice",
              sortable: true,
              render: ({ markPrice }) => markPrice,
              resizable: true,
            },
            {
              accessor: "takeProfitPrice",
              sortable: true,
              render: ({ takeProfitPrice }) => takeProfitPrice,
              resizable: true,
            },
            {
              accessor: "stopLossPrice",
              sortable: true,
              render: ({ stopLossPrice }) => stopLossPrice,
              resizable: true,
            },
            {
              accessor: "trailingStop",
              sortable: true,
              render: ({ trailingStop }) => trailingStop,
              resizable: true,
            },
            {
              accessor: "liquidationPrice",
              sortable: true,
              render: ({ liquidationPrice }) => liquidationPrice,
              resizable: true,
            },
            {
              accessor: "margin",
              sortable: true,
              render: ({ margin }) => margin,
              resizable: true,
            },
            {
              accessor: "accumulatedFee",
              sortable: true,
              render: ({ accumulatedFee }) => accumulatedFee,
              resizable: true,
            },
            {
              accessor: "realizedPnl",
              sortable: true,
              render: ({ realizedPnl }) => realizedPnl,
              resizable: true,
            },
            {
              accessor: "isMasterPosition",
              sortable: true,
              render: ({ isMasterPosition }) => (
                <>
                  <Checkbox readOnly checked={isMasterPosition} />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "isCopy",
              sortable: true,
              render: ({ isCopy }) => (
                <>
                  <Checkbox readOnly checked={isCopy} />
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
