import { hedgeData } from "@/services/dashboard";
import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconCoinBitcoin,
  IconMoneybag,
  IconReceipt2,
  IconTransform,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "./styles.module.css";

const icons = {
  funding: IconTransform,
  btc: IconCoinBitcoin,
  bag: IconMoneybag,
  users: IconUsers,
  receipt: IconReceipt2,
  coin: IconCoin,
};

type DashBoardRecord = {
  title: string;
  icon: keyof typeof icons;
  value: string;
  diff: number;
};

export function DashBoardView() {
  const [data, setData] = useState<DashBoardRecord[]>([]);
  useEffect(() => {
    hedgeData().then((data) => {
      setData([
        {
          title: "CCI Total Assets",
          icon: "users",
          value: Number(data.CCI_TOTAL_ASSETS || 0).toLocaleString(),
          diff: 0,
        },
        {
          title: "BN Equity",
          icon: "btc",
          value: Number(
            data.TOTAL_BINANCE_EQUITY || 0,
          ).toLocaleString(),
          diff: 0,
        },
        {
          title: "BN Commission this month",
          icon: "btc",
          value: Number(
            data.BINANCE_COMMISSION_THIS_MONTH || 0,
          ).toLocaleString(),
          diff: 0,
        },
        {
          title: "BN Funding fee this month",
          icon: "btc",
          value: Number(
            data.BINANCE_BINANCE_FUNDING_FEE_THIS_MONTH || 0,
          ).toLocaleString(),
          diff: 0,
        },
        {
          title: "Cobo Assets",
          icon: "bag",
          value: Number(data.TOTAL_COBO_ASSET || 0).toLocaleString(),
          diff: 0,
        },
        {
          title: "Commission Fee",
          icon: "receipt",
          value: (-Number(data.commissionFee || 0)).toLocaleString(),
          diff: 0,
        },
        {
          title: "Funding Fee",
          icon: "funding",
          value: (-Number(data.fundingFee || 0)).toLocaleString(),
          diff: 0,
        },
      ]);
    });
  }, []);
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon =
      stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>${stat.value}</Text>
          {stat.diff !== 0 && (
            <Text
              c={stat.diff > 0 ? "teal" : "red"}
              fz="sm"
              fw={500}
              className={classes.diff}
            >
              <span>{stat.diff}%</span>
              <DiffIcon size="1rem" stroke={1.5} />
            </Text>
          )}
        </Group>

        {stat.diff !== 0 && (
          <Text fz="xs" c="dimmed" mt={7}>
            Compared to previous month
          </Text>
        )}
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 1, md: 2 }}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
