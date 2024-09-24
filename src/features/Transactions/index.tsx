import { TransactionStatus, TransactionType } from "@/common/enums";
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
  statuses: string[];
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
      statuses: [],
    },
  );

  return (
    <Flex
      style={{ overflow: "hidden" }}
      direction={"column"}
      h={"93vh"}
    >
      <Box>
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
        <form onSubmit={form.onSubmit(() => { })}>
          <Flex gap={10}>
            <TextInput
              label="UID"
              key={form.key("userId")}
              {...form.getInputProps("userId")}
            />
            <Box>
              <MultiSelect
                maw={300}
                label="Transactions Type"
                data={keys(TransactionType)}
                key={form.key("types")}
                {...form.getInputProps("types")}
                clearable
                searchable
              />
            </Box>
            <Box>
              <MultiSelect
                maw={300}
                label="Transactions Statuses"
                data={keys(TransactionStatus)}
                key={form.key("statuses")}
                {...form.getInputProps("statuses")}
                clearable
                searchable
              />
            </Box>
          </Flex>
        </form>
        <Space my={"md"} />
      </Box>
      <Flex
        direction={"column"}
        style={{ overflow: "hidden" }}
        flex={1}
      >
        <Box flex={1} h={"calc(100% - 200px)"}>
          <DataTable
            withTableBorder
            withColumnBorders
            records={items}
            fetching={isLoading}
            idAccessor={"id"}
            height={"100%"}
            columns={[
              {
                accessor: "userId",
                sortable: false,
                render: ({ userId }) => (
                  <AccountName userId={userId} />
                ),
                resizable: true,
              },
              {
                accessor: "accountId",
                sortable: false,
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
                sortable: false,
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
                sortable: false,
              },
              {
                accessor: "amount",
                sortable: false,
                render: ({ amount }) => (
                  <>
                    <NumberFormat value={amount} decimalPlaces={4} />
                  </>
                ),
                resizable: true,
              },
              {
                accessor: "fee",
                sortable: false,
                render: ({ fee }) => fee,
                resizable: true,
              },
              {
                accessor: "From",
                render: ({ from }) => from,
                sortable: false,
                resizable: true,
              },
              {
                accessor: "to",
                sortable: false,
                render: ({ to }) => to,
                resizable: true,
              },
              {
                accessor: "txId",
                sortable: false,
                render: ({ txId }) => txId,
                resizable: true,
              },
              {
                accessor: "positionId",
                sortable: false,
                render: ({ positionId }) => positionId,
                resizable: true,
              },
              {
                accessor: "toAccountId",
                sortable: false,
                render: ({ toAccountId }) => toAccountId,
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
                accessor: "toAmount",
                sortable: false,
                render: ({ toAmount }) => (
                  <>
                    <NumberFormat
                      value={toAmount}
                      decimalPlaces={4}
                    />
                  </>
                ),
                resizable: true,
              },
              {
                accessor: "jpyAmount",
                sortable: false,
                render: ({ jpyAmount }) => (
                  <>
                    <NumberFormat
                      value={jpyAmount}
                      decimalPlaces={4}
                    />
                  </>
                ),
                resizable: true,
              },
              {
                accessor: "memo",
                sortable: false,
                render: ({ memo }) => memo,
                resizable: true,
              },
            ]}
          />
        </Box>
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
      </Flex>
    </Flex>
  );
}
