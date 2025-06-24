import { formatNumber } from "@/common/format";
import {
  type HedgeAccountData,
  getHedgeAccountData,
} from "@/services/hedge";
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  LoadingOverlay,
  ScrollArea,
  Space,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCoinBitcoin,
  IconInfoCircle,
  IconRefresh,
  IconTimeline,
} from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";

type Asset = HedgeAccountData["summary"]["assets"][number];
type Position = HedgeAccountData["summary"]["positions"][number];

const HedgeView = () => {
  const [prices, setPrices] = useState<HedgeAccountData["prices"]>({
    BTC: 0,
    ETH: 0,
    SOL: 0,
    AVAX: 0,
  });
  const [summary, setSummary] = useState<HedgeAccountData["summary"]>(
    {
      assets: [],
      positions: [],
      spots: [],
    },
  );
  const [assets, setAssets] = useState<Asset[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    const fetchData = () => {
      getHedgeAccountData().then((data) => {
        setSummary(
          data?.summary || {
            assets: [],
            positions: [],
          },
        );
        setAssets(data?.assets || []);
        setPositions(data?.positions || []);
        if (data?.prices) {
          setPrices(data?.prices);
        }
      });
    };
    fetchData();
    const timer = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(timer);
  }, []);
  if (summary.assets.length === 0) {
    return (
      <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
    );
  }
  return (
    <Box>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Hedge data</Title>
          <Button
            onClick={() => { }}
            title="Refresh"
            disabled={false}
            loading={false}
          >
            <IconRefresh />
          </Button>
        </Flex>
      </Card>
      <Space my={"xl"} />
      <Group justify={"start"} gap={"xl"} wrap={"wrap"}>
        <Group gap={"xs"}>
          <Text fw={700}>BTCUSDT:</Text>
          <Text>{formatNumber(prices.BTC || 0, 2, "-")}</Text>
        </Group>
        <Group gap={"xs"}>
          <Text fw={700}>ETHUSDT:</Text>
          <Text>{formatNumber(prices.ETH || 0, 2, "-")}</Text>
        </Group>
        <Group gap={"xs"}>
          <Text fw={700}>SOLUSDT:</Text>
          <Text>{formatNumber(prices.SOL || 0, 2, "-")}</Text>
        </Group>
        <Group gap={"xs"}>
          <Text fw={700}>AVXUSDT:</Text>
          <Text>{formatNumber(prices.AVAX || 0, 2, "-")}</Text>
        </Group>
      </Group>
      <Space my={"xl"} />
      <Tabs defaultValue="summary">
        <Tabs.List>
          <Tabs.Tab
            fw={700}
            value="summary"
            leftSection={<IconInfoCircle size={16} />}
          >
            Summary
          </Tabs.Tab>
          <Tabs.Tab
            fw={700}
            value="asset"
            leftSection={<IconCoinBitcoin size={16} />}
          >
            Asset
          </Tabs.Tab>
          <Tabs.Tab
            fw={700}
            value="position"
            leftSection={<IconTimeline size={16} />}
          >
            Position
          </Tabs.Tab>
        </Tabs.List>
        <Space my={"xl"} />

        <Tabs.Panel value="summary">
          <ScrollArea h={"65vh"} pr={"md"}>
            <Title order={4}>Assets</Title>
            <Space my={"sm"} />
            <AssetDataTable assets={summary.assets} />
            <Space my={"xl"} />
            <Title order={4}>Futures Positions</Title>
            <Space my={"sm"} />
            <PositionDataTable positions={summary.positions} />
            <Space my={"xl"} />
            <Title order={4}>Spot Positions</Title>
            <Space my={"sm"} />
            <AssetDataTable assets={summary.spots} />
          </ScrollArea>
        </Tabs.Panel>

        <Tabs.Panel value="asset">
          <Space my={"sm"} />
          <ScrollArea h={"65vh"} pr={"md"}>
            <AssetDataTable assets={assets} />
          </ScrollArea>
        </Tabs.Panel>

        <Tabs.Panel value="position">
          <Space my={"sm"} />
          <ScrollArea h={"65vh"}>
            <PositionDataTable positions={positions} />
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

const AssetDataTable = ({ assets }: { assets: Asset[] }) => {
  return (
    <>
      <DataTable
        height={"100%"}
        withTableBorder
        withColumnBorders
        records={assets}
        fetching={false}
        idAccessor={"id"}
        columns={[
          {
            accessor: "name",
            render: ({ name, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>{name}</Text>
                </>
              );
            },
          },
          {
            accessor: "total",
            title: "Total in USD",
            textAlign: "right",
            render: ({ total, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(total || 0, 2, "-")}
                  </Text>
                </>
              );
            },
          },
          {
            accessor: "usdt",
            title: "USDT",
            textAlign: "right",
            render: ({ usdt, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(usdt || 0, 2, "-")}
                  </Text>
                </>
              );
            },
          },
          {
            accessor: "btc",
            title: "BTC",
            textAlign: "right",
            render: ({ btc, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(btc || 0, 4, "-")}
                  </Text>
                </>
              );
            },
          },
          {
            accessor: "eth",
            title: "ETH",
            textAlign: "right",
            render: ({ eth, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(eth || 0, 4, "-")}
                  </Text>
                </>
              );
            },
          },
          {
            accessor: "sol",
            title: "SOL",
            textAlign: "right",
            render: ({ sol, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(sol || 0, 4, "-")}
                  </Text>
                </>
              );
            },
          },
          {
            accessor: "avax",
            title: "AVAX",
            textAlign: "right",
            render: ({ avax, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(avax || 0, 4, "-")}
                  </Text>
                </>
              );
            },
          },
        ]}
      />
    </>
  );
};

const PositionDataTable = ({
  positions,
}: {
  positions: Position[];
}) => {
  return (
    <>
      <DataTable
        height={"100%"}
        withTableBorder
        withColumnBorders
        records={positions}
        fetching={false}
        idAccessor={"id"}
        columns={[
          {
            accessor: "name",
            render: ({ name, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>{name}</Text>
                </>
              );
            },
          },
          {
            accessor: "total",
            title: "Total in USD",
            textAlign: "right",
            render: ({ hold, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(hold.total || 0, 2, "-")}
                  </Text>
                </>
              );
            },
          },
          {
            accessor: "unrealizedPnl",
            title: "Unrealized PnL",
            textAlign: "right",
            render: ({ unrealizedPnl, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(unrealizedPnl.total || 0, 2, "-")}
                  </Text>
                </>
              );
            },
          },
          {
            accessor: "btc",
            title: "BTC/USDT",
            textAlign: "right",
            render: ({ hold, unrealizedPnl, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(hold.btc || 0, 5, "-")}
                  </Text>
                  <UnrealizedPnl
                    bold={bold}
                    unrealizedPnl={unrealizedPnl.btc}
                  />
                </>
              );
            },
          },
          {
            accessor: "eth",
            title: "ETH/USDT",
            textAlign: "right",
            render: ({ hold, unrealizedPnl, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(hold.eth || 0, 4, "-")}
                  </Text>
                  <UnrealizedPnl
                    bold={bold}
                    unrealizedPnl={unrealizedPnl.eth}
                  />
                </>
              );
            },
          },
          {
            accessor: "sol",
            title: "SOL/USDT",
            textAlign: "right",
            render: ({ hold, unrealizedPnl, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(hold.sol || 0, 4, "-")}
                  </Text>
                  <UnrealizedPnl
                    bold={bold}
                    unrealizedPnl={unrealizedPnl.sol}
                  />
                </>
              );
            },
          },
          {
            accessor: "avax",
            title: "AVAX/USDT",
            textAlign: "right",
            render: ({ hold, unrealizedPnl, bold }) => {
              return (
                <>
                  <Text fw={bold ? 700 : 400}>
                    {formatNumber(hold.avax || 0, 4, "-")}
                  </Text>
                  <UnrealizedPnl
                    bold={bold}
                    unrealizedPnl={unrealizedPnl.avax}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
};

const UnrealizedPnl = ({
  bold,
  unrealizedPnl,
}: {
  bold?: boolean;
  unrealizedPnl: number;
}) => {
  return (
    <Text
      c={unrealizedPnl > 0 ? undefined : "#ff0000"}
      fw={bold ? 700 : 400}
      fz="sm"
    >
      {formatNumber(unrealizedPnl || 0, 4, "-")}
    </Text>
  );
};

export default HedgeView;
