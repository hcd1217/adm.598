import { TransactionStatus, TransactionType } from "@/common/enums";
import NumberFormat from "@/components/NumberFormat";
import { useRecords } from "@/hooks/useRecords";
import { getTransactionsApi } from "@/services/transactions";
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
import { IconRefresh } from "@tabler/icons-react";
import { keys } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";

export function TransactionsListFilter() {
  const {
    form, data, refresh, items, isLoading, page, setPage, PAGE_SIZE
  } = useRecords<{
    userId: string;
    type: string;
    status: string;
    amount: string;
  }, TransactionPayload>("/internal-api/get-transactions", getTransactionsApi, {
    userId: "",
    type: "",
    status: "",
    amount: "",
  });
  const [sortStatus, setSortStatus] = useState<
  DataTableSortStatus<TransactionPayload>
  >({
    columnAccessor: "depositCode",
    direction: "asc",
  });

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
      <form onSubmit={form.onSubmit(() => { })}>
        <Flex gap={10}>
          <TextInput
            label="UID"
            key={form.key("userId")}
            {...form.getInputProps("userId")}
          />
          <Select
            key={form.key("type")}
            {...form.getInputProps("type")}
            label="Type"
            searchable
            data={keys(TransactionType)}
          ></Select>
          <Select
            label="Status"
            searchable
            data={keys(TransactionStatus)}
            key={form.key("status")}
            {...form.getInputProps("status")}
          />
          <Flex gap={10}>
            <NumberInput
              key={form.key("amount")}
              {...form.getInputProps("amount")}
              label="Amount"
              hideControls
            />
          </Flex>
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
