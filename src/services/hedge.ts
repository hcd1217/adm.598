import { api } from "@/utils/api";
import { v4 as uuidV4 } from "uuid";

const path = "/admin/XFksNaC38Uu2/hedge-data";

type ApiResponseHedgeDetail = {
  total: number;
  USDT: number;
  BTC: number;
  ETH: number;
  SOL: number;
  AVAX: number;
  BTCUSDT_POSITION: number;
  ETHUSDT_POSITION: number;
  SOLUSDT_POSITION: number;
  AVXUSDT_POSITION: number;
  BTCUSDT_UNREALIZED_PNL: number;
  ETHUSDT_UNREALIZED_PNL: number;
  SOLUSDT_UNREALIZED_PNL: number;
  AVXUSDT_UNREALIZED_PNL: number;
  detail: {
    assets: {
      SPOT: {
        USDT: number;
        BTC: number;
        ETH: number;
        SOL: number;
        AVX: number;
      };
      USDS_M: {
        USDT: number;
      };
      COIN_M: {
        BTC: number;
        ETH: number;
        SOL: number;
        AVX: number;
      };
    };
    positions: {
      USDS_M: {
        BTCUSDT_POSITION: number;
        ETHUSDT_POSITION: number;
        SOLUSDT_POSITION: number;
        AVXUSDT_POSITION: number;
        BTCUSDT_UNREALIZED_PNL: number;
        ETHUSDT_UNREALIZED_PNL: number;
        SOLUSDT_UNREALIZED_PNL: number;
        AVXUSDT_UNREALIZED_PNL: number;
      };
      COIN_M: {
        BTCUSDT_POSITION: number;
        ETHUSDT_POSITION: number;
        SOLUSDT_POSITION: number;
        AVXUSDT_POSITION: number;
        BTCUSDT_UNREALIZED_PNL: number;
        ETHUSDT_UNREALIZED_PNL: number;
        SOLUSDT_UNREALIZED_PNL: number;
        AVXUSDT_UNREALIZED_PNL: number;
      };
    };
  };
};

type ApiResponseData = {
  prices: {
    BTC: number;
    ETH: number;
    SOL: number;
    AVX: number;
  };
  cciUsers: ApiResponseHedgeDetail;
  hedgeAccounts: Record<string, ApiResponseHedgeDetail>;
};

export type HedgeAccountData = {
  prices: {
    BTC: number;
    ETH: number;
    SOL: number;
    AVAX: number;
  };
  summary: {
    positions: {
      id: string;
      name: string;
      bold?: boolean;
      hold: {
        total?: number;
        btc: number;
        eth: number;
        sol: number;
        avax: number;
      };
      unrealizedPnl: {
        total?: number;
        btc: number;
        eth: number;
        sol: number;
        avax: number;
      };
    }[];
    assets: {
      id: string;
      name: string;
      total?: number;
      usdt: number;
      btc: number;
      eth: number;
      sol: number;
      avax: number;
      bold?: boolean;
    }[];
  };
  positions: {
    id: string;
    name: string;
    bold?: boolean;
    hold: {
      total?: number;
      btc: number;
      eth: number;
      sol: number;
      avax: number;
    };
    unrealizedPnl: {
      total?: number;
      btc: number;
      eth: number;
      sol: number;
      avax: number;
    };
  }[];
  assets: {
    id: string;
    name: string;
    total?: number;
    usdt: number;
    btc: number;
    eth: number;
    sol: number;
    avax: number;
    bold?: boolean;
  }[];
};

export async function getHedgeAccountData(): Promise<HedgeAccountData> {
  const response = await api.get<ApiResponse<ApiResponseData>>(path);
  if (response.data.result) {
    const cciUsers = response.data.result.cciUsers;
    const prices = response.data.result.prices;
    const hedgeAccounts = response.data.result.hedgeAccounts;
    const allHedgeAccounts = hedgeAccounts["all"];
    const cobo = hedgeAccounts["cobo"];
    const tara = hedgeAccounts["CCI MM (tara)  Read Only"];
    const taraSpotAssets = tara?.detail?.assets?.SPOT;
    const taraCoinMAssets = tara?.detail?.assets?.COIN_M;
    const taraUsdsMAssets = tara?.detail?.assets?.USDS_M;
    const taraCoinMPositions = tara?.detail?.positions?.COIN_M;
    const taraUsdsMPositions = tara?.detail?.positions?.USDS_M;
    // cspell:words Cryptrade cryptrade05_virtual meteo
    const meteo = hedgeAccounts["Meteo cryptrade05_virtual"];
    const meteoSpotAssets = meteo?.detail?.assets?.SPOT;
    const meteoCoinMAssets = meteo?.detail?.assets?.COIN_M;
    const meteoUsdsMAssets = meteo?.detail?.assets?.USDS_M;

    const summary: HedgeAccountData["summary"] = {
      positions: [
        {
          id: "1",
          name: "CCI User's Position (In USD)",
          hold: {
            total: 0,
            btc: cciUsers?.BTCUSDT_POSITION || 0,
            eth: cciUsers?.ETHUSDT_POSITION || 0,
            sol: cciUsers?.SOLUSDT_POSITION || 0,
            avax: cciUsers?.AVXUSDT_POSITION || 0,
          },
          unrealizedPnl: {
            total: 0,
            btc: cciUsers?.BTCUSDT_UNREALIZED_PNL || 0,
            eth: cciUsers?.ETHUSDT_UNREALIZED_PNL || 0,
            sol: cciUsers?.SOLUSDT_UNREALIZED_PNL || 0,
            avax: cciUsers?.AVXUSDT_UNREALIZED_PNL || 0,
          },
        },
        {
          id: "2",
          name: "All Hedge Accounts Position (In USD)",
          hold: {
            total: 0,
            btc: allHedgeAccounts?.BTCUSDT_POSITION || 0,
            eth: allHedgeAccounts?.ETHUSDT_POSITION || 0,
            sol: allHedgeAccounts?.SOLUSDT_POSITION || 0,
            avax: allHedgeAccounts?.AVXUSDT_POSITION || 0,
          },
          unrealizedPnl: {
            total: 0,
            btc: allHedgeAccounts?.BTCUSDT_UNREALIZED_PNL || 0,
            eth: allHedgeAccounts?.ETHUSDT_UNREALIZED_PNL || 0,
            sol: allHedgeAccounts?.SOLUSDT_UNREALIZED_PNL || 0,
            avax: allHedgeAccounts?.AVXUSDT_UNREALIZED_PNL || 0,
          },
        },
      ],
      assets: [
        {
          id: uuidV4(),
          name: "CCI User (Include KOL) TOTAL ASSETS",
          total: cciUsers.total,
          usdt: cciUsers.USDT,
          btc: cciUsers.BTC,
          eth: cciUsers.ETH,
          sol: cciUsers.SOL,
          avax: cciUsers.AVAX,
        },
        {
          id: uuidV4(),
          name: "All Hedge Accounts Assets",
          total: allHedgeAccounts?.total || 0,
          usdt: allHedgeAccounts?.USDT || 0,
          btc: allHedgeAccounts?.BTC || 0,
          eth: allHedgeAccounts?.ETH || 0,
          sol: allHedgeAccounts?.SOL || 0,
          avax: allHedgeAccounts?.AVAX || 0,
        },
      ],
    };

    const cciUserAsset = summary.assets[0];
    const cciUserPosition = summary.positions[0];
    const allHedgeAccountsAsset = summary.assets[1];
    const allHedgeAccountsPosition = summary.positions[1];
    summary.assets.push({
      id: uuidV4(),
      name: "Asset Difference",
      total:
        (allHedgeAccountsAsset?.total || 0) -
        (cciUserAsset.total || 0),
      usdt: allHedgeAccountsAsset.usdt - cciUserAsset.usdt,
      btc: allHedgeAccountsAsset.btc - cciUserAsset.btc,
      eth: allHedgeAccountsAsset.eth - cciUserAsset.eth,
      sol: allHedgeAccountsAsset.sol - cciUserAsset.sol,
      avax: allHedgeAccountsAsset.avax - cciUserAsset.avax,
      bold: true,
    });

    summary.positions.push({
      id: "3",
      name: "Futures Position Difference (In USD)",
      bold: true,
      hold: {
        total:
          (allHedgeAccountsPosition.hold.total || 0) -
          (cciUserPosition.hold.total || 0),
        btc:
          allHedgeAccountsPosition.hold.btc -
          cciUserPosition.hold.btc,
        eth:
          allHedgeAccountsPosition.hold.eth -
          cciUserPosition.hold.eth,
        sol:
          allHedgeAccountsPosition.hold.sol -
          cciUserPosition.hold.sol,
        avax:
          allHedgeAccountsPosition.hold.avax -
          cciUserPosition.hold.avax,
      },
      unrealizedPnl: {
        total:
          (allHedgeAccountsPosition.unrealizedPnl.total || 0) -
          (cciUserPosition.unrealizedPnl.total || 0),
        btc:
          allHedgeAccountsPosition.unrealizedPnl.btc -
          cciUserPosition.unrealizedPnl.btc,
        eth:
          allHedgeAccountsPosition.unrealizedPnl.eth -
          cciUserPosition.unrealizedPnl.eth,
        sol:
          allHedgeAccountsPosition.unrealizedPnl.sol -
          cciUserPosition.unrealizedPnl.sol,
        avax:
          allHedgeAccountsPosition.unrealizedPnl.avax -
          cciUserPosition.unrealizedPnl.avax,
      },
    });

    summary.positions.forEach((position) => {
      position.hold.total =
        position.hold.btc +
        position.hold.eth +
        position.hold.sol +
        position.hold.avax;
      position.unrealizedPnl.total =
        position.unrealizedPnl.btc +
        position.unrealizedPnl.eth +
        position.unrealizedPnl.sol +
        position.unrealizedPnl.avax;
    });

    const assets: HedgeAccountData["assets"] = [
      {
        id: uuidV4(),
        name: "CCI User (Include KOL) TOTAL ASSETS",
        usdt: cciUsers.USDT,
        btc: cciUsers.BTC,
        eth: cciUsers.ETH,
        sol: cciUsers.SOL,
        avax: cciUsers.AVAX,
      },
      {
        name: "CCI User (Include KOL) TOTAL ASSETS (In USD)",
        id: uuidV4(),
        total: cciUsers.total,
        usdt: cciUsers.USDT * 1,
        btc: cciUsers.BTC * prices.BTC,
        eth: cciUsers.ETH * prices.ETH,
        sol: cciUsers.SOL * prices.SOL,
        avax: cciUsers.AVAX * prices.AVX,
      },
      {
        id: uuidV4(),
        name: "COBO ASSETS",
        usdt: cobo.USDT,
        btc: cobo.BTC,
        eth: cobo.ETH,
        sol: cobo.SOL,
        avax: cobo.AVAX,
      },
      {
        id: uuidV4(),
        name: "COBO ASSETS (In USD)",
        total: cobo.total,
        usdt: cobo.USDT * 1,
        btc: cobo.BTC * prices.BTC,
        eth: cobo.ETH * prices.ETH,
        sol: cobo.SOL * prices.SOL,
        avax: cobo.AVAX * prices.AVX,
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account Spot",
        usdt: taraSpotAssets?.USDT || 0,
        btc: taraSpotAssets?.BTC || 0,
        eth: taraSpotAssets?.ETH || 0,
        sol: taraSpotAssets?.SOL || 0,
        avax: taraSpotAssets?.AVX || 0,
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account Spot (In USD)",
        total: 0,
        usdt: (taraSpotAssets?.USDT || 0) * 1,
        btc: (taraSpotAssets?.BTC || 0) * prices.BTC,
        eth: (taraSpotAssets?.ETH || 0) * prices.ETH,
        sol: (taraSpotAssets?.SOL || 0) * prices.SOL,
        avax: (taraSpotAssets?.AVX || 0) * prices.AVX,
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account Coin(M)",
        usdt: 0,
        btc: taraCoinMAssets?.BTC || 0,
        eth: taraCoinMAssets?.ETH || 0,
        sol: taraCoinMAssets?.SOL || 0,
        avax: taraCoinMAssets?.AVX || 0,
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account Coin(M) (In USD)",
        total: 0,
        usdt: 0,
        btc: (taraCoinMAssets?.BTC || 0) * prices.BTC,
        eth: (taraCoinMAssets?.ETH || 0) * prices.ETH,
        sol: (taraCoinMAssets?.SOL || 0) * prices.SOL,
        avax: (taraCoinMAssets?.AVX || 0) * prices.AVX,
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account USD(S)",
        usdt: taraUsdsMAssets?.USDT || 0,
        btc: 0,
        eth: 0,
        sol: 0,
        avax: 0,
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account USD(S) (In USD)",
        total: taraUsdsMAssets?.USDT || 0,
        usdt: taraUsdsMAssets?.USDT || 0,
        btc: 0,
        eth: 0,
        sol: 0,
        avax: 0,
      },
      // xxx
      {
        id: uuidV4(),
        name: "Binance (Cryptrade05) Hedge sub-account Spot",
        usdt: meteoSpotAssets?.USDT || 0,
        btc: meteoSpotAssets?.BTC || 0,
        eth: meteoSpotAssets?.ETH || 0,
        sol: meteoSpotAssets?.SOL || 0,
        avax: meteoSpotAssets?.AVX || 0,
      },
      {
        id: uuidV4(),
        name: "Binance (Cryptrade05) Hedge sub-account Spot (In USD)",
        total: 0,
        usdt: (meteoSpotAssets?.USDT || 0) * 1,
        btc: (meteoSpotAssets?.BTC || 0) * prices.BTC,
        eth: (meteoSpotAssets?.ETH || 0) * prices.ETH,
        sol: (meteoSpotAssets?.SOL || 0) * prices.SOL,
        avax: (meteoSpotAssets?.AVX || 0) * prices.AVX,
      },
      {
        id: uuidV4(),
        name: "Binance (Cryptrade05) Hedge sub-account Coin(M)",
        usdt: 0,
        btc: meteoCoinMAssets?.BTC || 0,
        eth: meteoCoinMAssets?.ETH || 0,
        sol: meteoCoinMAssets?.SOL || 0,
        avax: meteoCoinMAssets?.AVX || 0,
      },
      {
        id: uuidV4(),
        name: "Binance (Cryptrade05) Hedge sub-account Coin(M) (In USD)",
        total: 0,
        usdt: 0,
        btc: (meteoCoinMAssets?.BTC || 0) * prices.BTC,
        eth: (meteoCoinMAssets?.ETH || 0) * prices.ETH,
        sol: (meteoCoinMAssets?.SOL || 0) * prices.SOL,
        avax: (meteoCoinMAssets?.AVX || 0) * prices.AVX,
      },
      {
        id: uuidV4(),
        name: "Binance (Cryptrade05) Hedge sub-account USD(S)",
        usdt: meteoUsdsMAssets?.USDT || 0,
        btc: 0,
        eth: 0,
        sol: 0,
        avax: 0,
      },
      {
        id: uuidV4(),
        name: "Binance (Cryptrade05) Hedge sub-account USD(S) (In USD)",
        total: meteoUsdsMAssets?.USDT || 0,
        usdt: meteoUsdsMAssets?.USDT || 0,
        btc: 0,
        eth: 0,
        sol: 0,
        avax: 0,
      },
    ];

    assets.forEach((asset) => {
      if ("total" in asset && asset.total === 0) {
        asset.total =
          asset.usdt + asset.btc + asset.eth + asset.sol + asset.avax;
      }
    });

    const totalAsset = {
      id: uuidV4(),
      bold: true,
      name: "Total Hedge Accounts Assets",
      total: 0,
      usdt: 0,
      btc: 0,
      eth: 0,
      sol: 0,
      avax: 0,
    };
    assets.forEach((asset) => {
      if (!asset.name.includes("Binance")) {
        return;
      }
      totalAsset.total += asset.total || 0;
      if (asset.name.includes("(In USD)")) {
        return;
      }
      totalAsset.usdt += asset.usdt || 0;
      totalAsset.btc += asset.btc || 0;
      totalAsset.eth += asset.eth || 0;
      totalAsset.sol += asset.sol || 0;
      totalAsset.avax += asset.avax || 0;
    });
    assets.push(totalAsset);

    const positions: HedgeAccountData["positions"] = [
      {
        id: uuidV4(),
        name: "CCI User Position",
        hold: {
          btc: (cciUserPosition?.hold?.btc || 0) / prices.BTC,
          eth: (cciUserPosition?.hold?.eth || 0) / prices.ETH,
          sol: (cciUserPosition?.hold?.sol || 0) / prices.SOL,
          avax: (cciUserPosition?.hold?.avax || 0) / prices.AVX,
        },
        unrealizedPnl: {
          btc:
            (cciUserPosition?.unrealizedPnl?.btc || 0) / prices.BTC,
          eth:
            (cciUserPosition?.unrealizedPnl?.eth || 0) / prices.ETH,
          sol:
            (cciUserPosition?.unrealizedPnl?.sol || 0) / prices.SOL,
          avax:
            (cciUserPosition?.unrealizedPnl?.avax || 0) / prices.AVX,
        },
      },
      {
        id: uuidV4(),
        name: "CCI User Position (In USD)",
        hold: {
          total: cciUserPosition?.hold?.total || 0,
          btc: cciUserPosition?.hold?.btc || 0,
          eth: cciUserPosition?.hold?.eth || 0,
          sol: cciUserPosition?.hold?.sol || 0,
          avax: cciUserPosition?.hold?.avax || 0,
        },
        unrealizedPnl: {
          total: cciUserPosition?.unrealizedPnl?.total || 0,
          btc: cciUserPosition?.unrealizedPnl?.btc || 0,
          eth: cciUserPosition?.unrealizedPnl?.eth || 0,
          sol: cciUserPosition?.unrealizedPnl?.sol || 0,
          avax: cciUserPosition?.unrealizedPnl?.avax || 0,
        },
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account Coin(M) Position",
        hold: {
          btc:
            (taraCoinMPositions?.BTCUSDT_POSITION || 0) / prices.BTC,
          eth:
            (taraCoinMPositions?.ETHUSDT_POSITION || 0) / prices.ETH,
          sol:
            (taraCoinMPositions?.SOLUSDT_POSITION || 0) / prices.SOL,
          avax:
            (taraCoinMPositions?.AVXUSDT_POSITION || 0) / prices.AVX,
        },
        unrealizedPnl: {
          btc:
            (taraCoinMPositions?.BTCUSDT_UNREALIZED_PNL || 0) /
            prices.BTC,
          eth:
            (taraCoinMPositions?.ETHUSDT_UNREALIZED_PNL || 0) /
            prices.ETH,
          sol:
            (taraCoinMPositions?.SOLUSDT_UNREALIZED_PNL || 0) /
            prices.SOL,
          avax:
            (taraCoinMPositions?.AVXUSDT_UNREALIZED_PNL || 0) /
            prices.AVX,
        },
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account Coin(M) Position (In USD)",
        hold: {
          total: 0,
          btc: taraCoinMPositions?.BTCUSDT_POSITION || 0,
          eth: taraCoinMPositions?.ETHUSDT_POSITION || 0,
          sol: taraCoinMPositions?.SOLUSDT_POSITION || 0,
          avax: taraCoinMPositions?.AVXUSDT_POSITION || 0,
        },
        unrealizedPnl: {
          total: 0,
          btc:
            (taraCoinMPositions?.BTCUSDT_UNREALIZED_PNL || 0) /
            prices.BTC,
          eth:
            (taraCoinMPositions?.ETHUSDT_UNREALIZED_PNL || 0) /
            prices.ETH,
          sol:
            (taraCoinMPositions?.SOLUSDT_UNREALIZED_PNL || 0) /
            prices.SOL,
          avax:
            (taraCoinMPositions?.AVXUSDT_UNREALIZED_PNL || 0) /
            prices.AVX,
        },
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account USD(S)",
        hold: {
          btc: taraUsdsMPositions?.BTCUSDT_POSITION || 0,
          eth: taraUsdsMPositions?.ETHUSDT_POSITION || 0,
          sol: taraUsdsMPositions?.SOLUSDT_POSITION || 0,
          avax: taraUsdsMPositions?.AVXUSDT_POSITION || 0,
        },
        unrealizedPnl: {
          btc:
            (taraUsdsMPositions?.BTCUSDT_UNREALIZED_PNL || 0) /
            prices.BTC,
          eth:
            (taraUsdsMPositions?.ETHUSDT_UNREALIZED_PNL || 0) /
            prices.ETH,
          sol:
            (taraUsdsMPositions?.SOLUSDT_UNREALIZED_PNL || 0) /
            prices.SOL,
          avax:
            (taraUsdsMPositions?.AVXUSDT_UNREALIZED_PNL || 0) /
            prices.AVX,
        },
      },
      {
        id: uuidV4(),
        name: "Binance (Tara) Hedge sub-account USD(S) (In USD)",
        hold: {
          total: 0,
          btc:
            (taraUsdsMPositions?.BTCUSDT_POSITION || 0) * prices.BTC,
          eth:
            (taraUsdsMPositions?.ETHUSDT_POSITION || 0) * prices.ETH,
          sol:
            (taraUsdsMPositions?.SOLUSDT_POSITION || 0) * prices.SOL,
          avax:
            (taraUsdsMPositions?.AVXUSDT_POSITION || 0) * prices.AVX,
        },
        unrealizedPnl: {
          total: 0,
          btc: taraUsdsMPositions?.BTCUSDT_UNREALIZED_PNL || 0,
          eth: taraUsdsMPositions?.ETHUSDT_UNREALIZED_PNL || 0,
          sol: taraUsdsMPositions?.SOLUSDT_UNREALIZED_PNL || 0,
          avax: taraUsdsMPositions?.AVXUSDT_UNREALIZED_PNL || 0,
        },
      },
    ];

    positions.forEach((position) => {
      if ("total" in position.hold && position.hold.total === 0) {
        position.hold.total =
          position.hold.btc +
          position.hold.eth +
          position.hold.sol +
          position.hold.avax;
      }
      if (
        "total" in position.unrealizedPnl &&
        position.unrealizedPnl.total === 0
      ) {
        position.unrealizedPnl.total =
          position.unrealizedPnl.btc +
          position.unrealizedPnl.eth +
          position.unrealizedPnl.sol +
          position.unrealizedPnl.avax;
      }
    });

    return {
      assets,
      positions,
      prices: {
        BTC: prices?.BTC || 0,
        ETH: prices?.ETH || 0,
        SOL: prices?.SOL || 0,
        AVAX: prices?.AVX || 0,
      },
      summary,
    };
  }
  return Promise.reject(null);
}
