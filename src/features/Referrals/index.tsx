import { formatCurrency } from "@/common/format";
import { useRecords } from "@/hooks/useRecords";
import { getAllReferrals } from "@/services/agent";
import { Box, Button, Card, Flex, Space, Title } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";

const ReferralView = () => {
  const {
    items,
    data,
    refresh,
    isLoading,
    setPage,
    PAGE_SIZE,
    page,
  } = useRecords("/internal-api/referrals", getAllReferrals, {});

  return (
    <Box>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Referral list</Title>
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

      <Space my={"md"} />
      <DataTable
        height={"75vh"}
        withTableBorder
        withColumnBorders
        records={items}
        fetching={isLoading}
        totalRecords={data?.result.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        columns={[
          {
            accessor: "contact",
            render: ({ contact }) => contact,
            sortable: false,
          },
          {
            accessor: "depositCode",
            sortable: false,
            render: ({ depositCode }) => depositCode,
          },
          {
            accessor: "totalRebate",
            render: ({ totalRebate }) => formatCurrency(totalRebate),
            sortable: true,
          },
          {
            accessor: "totalFee",
            render: ({ fee }) => <>{formatCurrency(fee)}</>,
            sortable: true,
          },
          {
            accessor: "totalUser",
            render: ({ totalUser }) => <>{totalUser}</>,
            sortable: true,
          },
        ]}
      />
    </Box>
  );
};

export default ReferralView;
