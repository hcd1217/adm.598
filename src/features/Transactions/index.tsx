import { TransactionType } from "@/common/enums";
import {
  AccountName,
  AccountTypeName,
} from "@/components/AccountInfos";
import NumberFormat from "@/components/NumberFormat";
import { useRecords } from "@/hooks/useRecords";
import { getTransactionsApi } from "@/services/transactions";
import { TransactionPayload } from "@/types/record";
import {
  TRANSACTION_STATUS_COLORS,
  TRANSACTION_TYPE_COLORS,
} from "@/utils/color";
import {
  ActionIcon,
  Box,
  Button,
  Card,
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
  types: string[];
};

export function TransactionsListFilter() {
  const {
    form,
    refresh,
    items,
    isLoading,
    loadNext,
    loadPrev,
    disabledNext,
    disabledPrev,
  } = useRecords<RecordFilterType, TransactionPayload>(
    "/internal-api/get-transactions",
    getTransactionsApi,
    {
      userId: "",
      types: [],
    },
  );

  return (
    <Box style={{ overflow: "hidden" }}>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Transactions list</Title>
          <Button
            onClick={() => refresh()}
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
          <Box>
            <MultiSelect
              w={200}
              label="Type"
              data={keys(TransactionType)}
              key={form.key("types")}
              {...form.getInputProps("types")}
              clearable
            />
          </Box>
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
              sortable: true,
              render: ({ userId }) => <AccountName userId={userId} />,
              resizable: true,
            },
            {
              accessor: "accountId",
              sortable: true,
              render: ({ userId, accountId }) => (
                <AccountTypeName
                  userId={userId}
                  accountId={accountId}
                />
              ),
              resizable: true,
            },
            {
              accessor: "type",
              render: ({ type }) => (
                <>
                  <Button
                    bg={TRANSACTION_TYPE_COLORS[type]}
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
              accessor: "status",
              resizable: true,
              render: ({ status }) => (
                <>
                  <Button
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
              accessor: "amount",
              sortable: true,
              render: ({ amount }) => (
                <>
                  <NumberFormat value={amount} decimalPlaces={4} />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "fee",
              sortable: true,
              render: ({ fee }) => fee,
              resizable: true,
            },
            {
              accessor: "From",
              render: ({ from }) => from,
              sortable: true,
              resizable: true,
            },
            {
              accessor: "to",
              sortable: true,
              render: ({ to }) => to,
              resizable: true,
            },
            {
              accessor: "txId",
              sortable: true,
              render: ({ txId }) => txId,
              resizable: true,
            },
            {
              accessor: "positionId",
              sortable: true,
              render: ({ positionId }) => positionId,
              resizable: true,
            },
            {
              accessor: "toAccountId",
              sortable: true,
              render: ({ toAccountId }) => toAccountId,
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
              accessor: "toAmount",
              sortable: true,
              render: ({ toAmount }) => (
                <>
                  <NumberFormat value={toAmount} decimalPlaces={4} />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "jpyAmount",
              sortable: true,
              render: ({ jpyAmount }) => (
                <>
                  <NumberFormat value={jpyAmount} decimalPlaces={4} />
                </>
              ),
              resizable: true,
            },
            {
              accessor: "memo",
              sortable: true,
              render: ({ memo }) => memo,
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
