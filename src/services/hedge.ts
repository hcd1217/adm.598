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
  cciUsers: ApiResponseHedgeDetail & {
    USDT_COPIED: number;
  };
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
      totalFlag?: boolean;
      usdt: number;
      btc: number;
      eth: number;
      sol: number;
      avax: number;
      bold?: boolean;
    }[];
    spots: {
      id: string;
      name: string;
      usdt: number;
      btc: number;
      eth: number;
      sol: number;
      avax: number;
    }[];
  };
  positions: {
    id: string;
    name: string;
    totalFlag?: boolean;
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
    isUserAsset?: boolean;
    totalFlag?: boolean;
    isSpot?: boolean;
    isInUSD?: boolean;
    isUSD?: boolean;
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
  if (!response.data.result) {
    return Promise.reject(null);
  }
  const cciUsers = response.data.result.cciUsers;
  const prices = response.data.result.prices;
  const hedgeAccounts = response.data.result.hedgeAccounts;
  const allHedgeAccounts = hedgeAccounts["all"];
  const cobo = hedgeAccounts["cobo"];

  const cciUserPosition = {
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
  };
  // cspell:words Cryptrade cryptrade05_virtual meteo

  const assets: HedgeAccountData["assets"] = [
    {
      id: uuidV4(),
      isUserAsset: true,
      name: "CCI User (Include KOL) TOTAL ASSETS",
      usdt: cciUsers.USDT,
      btc: cciUsers.BTC,
      eth: cciUsers.ETH,
      sol: cciUsers.SOL,
      avax: cciUsers.AVAX,
    },
    {
      name: "CCI User (Include KOL) TOTAL ASSETS (In USD)",
      isUserAsset: true,
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
      totalFlag: false,
      isInUSD: false,
      usdt: cobo.USDT,
      btc: cobo.BTC,
      eth: cobo.ETH,
      sol: cobo.SOL,
      avax: cobo.AVAX,
    },
    {
      id: uuidV4(),
      name: "COBO ASSETS (In USD)",
      totalFlag: true,
      isInUSD: true,
      total: cobo.total,
      usdt: cobo.USDT * 1,
      btc: cobo.BTC * prices.BTC,
      eth: cobo.ETH * prices.ETH,
      sol: cobo.SOL * prices.SOL,
      avax: cobo.AVAX * prices.AVX,
    },
  ];

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
        btc: (cciUserPosition?.unrealizedPnl?.btc || 0) / prices.BTC,
        eth: (cciUserPosition?.unrealizedPnl?.eth || 0) / prices.ETH,
        sol: (cciUserPosition?.unrealizedPnl?.sol || 0) / prices.SOL,
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
  ];

  _generateDetail(
    "CCI MM (tara)  Read Only",
    "BN (Tara) Hedge sub-account",
  );
  _generateDetail("Meteo Main", "BN (Meteo) Hedge sub-account");
  _generateDetail(
    "Meteo cryptrade05_virtual",
    "BN (Cryptrade05) Hedge sub-account",
  );
  _generateDetail(
    "Meteo virtual",
    "BN (Meteo virtual) Hedge sub-account",
  );

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

  const spotAsset = {
    id: uuidV4(),
    name: "Total Hedge Accounts Spot Assets",
    total: 0,
    usdt: 0,
    btc: 0,
    eth: 0,
    sol: 0,
    avax: 0,
  };

  assets.filter((asset) => asset.isSpot).forEach((asset) => {
    if (asset.isUserAsset) {
      return;
    }
    if (asset.isInUSD) {
      spotAsset.total += asset.total || 0;
      spotAsset.usdt += asset.usdt || 0;
    } else {
      spotAsset.btc += asset.btc || 0;
      spotAsset.eth += asset.eth || 0;
      spotAsset.sol += asset.sol || 0;
      spotAsset.avax += asset.avax || 0;
    }
  });

  assets.forEach((asset) => {
    if (asset.isUserAsset) {
      return;
    }
    if (asset.totalFlag) {
      totalAsset.total += asset.total || 0;
      totalAsset.usdt += asset.usdt || 0;
    }
    if (!asset.isInUSD && !asset.totalFlag) {
      totalAsset.btc += asset.btc || 0;
      // eslint-disable-next-line no-console
      console.log(
        111, asset.name,
        Math.floor(asset.btc),
        Math.floor(totalAsset.btc),
      );
      totalAsset.eth += asset.eth || 0;
      totalAsset.sol += asset.sol || 0;
      totalAsset.avax += asset.avax || 0;
    }
  });
  // eslint-disable-next-line no-console
  // console.log("================================");
  // assets.push(totalAsset);

  const summary: HedgeAccountData["summary"] = {
    spots: [
      spotAsset,
      {
        id: uuidV4(),
        name: "CCI User's Spot Assets",
        total: cciUsers.total - cciUsers.USDT + cciUsers.USDT_COPIED,
        usdt: cciUsers.USDT_COPIED || 0,
        btc: cciUsers.BTC,
        eth: cciUsers.ETH,
        sol: cciUsers.SOL,
        avax: cciUsers.AVAX,
      },
    ],
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
        ...totalAsset,
        id: uuidV4(),
        name: "All Hedge Accounts Assets",
        bold: false,
      },
    ],
  };

  const cciUserAsset = summary.assets[0];
  const allHedgeAccountsAsset = summary.assets[1];
  const allHedgeAccountsPosition = summary.positions[1];
  summary.assets.push({
    id: uuidV4(),
    name: "Asset Difference",
    total:
      (allHedgeAccountsAsset?.total || 0) - (cciUserAsset.total || 0),
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
        allHedgeAccountsPosition.hold.btc - cciUserPosition.hold.btc,
      eth:
        allHedgeAccountsPosition.hold.eth - cciUserPosition.hold.eth,
      sol:
        allHedgeAccountsPosition.hold.sol - cciUserPosition.hold.sol,
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

  function _generateDetail(key: string, name: string) {
    const account = hedgeAccounts[key];
    const accountSpotAssets = account?.detail?.assets?.SPOT;
    const accountCoinMAssets = account?.detail?.assets?.COIN_M;
    const accountUsdsMAssets = account?.detail?.assets?.USDS_M;
    const accountCoinMPositions = account?.detail?.positions?.COIN_M;
    const accountUsdsMPositions = account?.detail?.positions?.USDS_M;
    assets.push(
      ...[
        {
          id: uuidV4(),
          name: `${name} Spot`,
          isSpot: true,
          isInUSD: false,
          totalFlag: false,
          usdt: accountSpotAssets?.USDT || 0,
          btc: accountSpotAssets?.BTC || 0,
          eth: accountSpotAssets?.ETH || 0,
          sol: accountSpotAssets?.SOL || 0,
          avax: accountSpotAssets?.AVX || 0,
        },
        {
          id: uuidV4(),
          name: `${name} Spot (In USD)`,
          total: 0,
          isSpot: true,
          isInUSD: true,
          totalFlag: true,
          usdt: (accountSpotAssets?.USDT || 0) * 1,
          btc: (accountSpotAssets?.BTC || 0) * prices.BTC,
          eth: (accountSpotAssets?.ETH || 0) * prices.ETH,
          sol: (accountSpotAssets?.SOL || 0) * prices.SOL,
          avax: (accountSpotAssets?.AVX || 0) * prices.AVX,
        },
        {
          id: uuidV4(),
          name: `${name} Coin(M)`,
          isSpot: false,
          isInUSD: false,
          totalFlag: false,
          usdt: 0,
          btc: accountCoinMAssets?.BTC || 0,
          eth: accountCoinMAssets?.ETH || 0,
          sol: accountCoinMAssets?.SOL || 0,
          avax: accountCoinMAssets?.AVX || 0,
        },
        {
          id: uuidV4(),
          name: `${name} Coin(M) (In USD)`,
          total: 0,
          usdt: 0,
          isSpot: false,
          isInUSD: true,
          totalFlag: true,
          btc: (accountCoinMAssets?.BTC || 0) * prices.BTC,
          eth: (accountCoinMAssets?.ETH || 0) * prices.ETH,
          sol: (accountCoinMAssets?.SOL || 0) * prices.SOL,
          avax: (accountCoinMAssets?.AVX || 0) * prices.AVX,
        },
        {
          id: uuidV4(),
          name: `${name} USD(S)`,
          usdt: accountUsdsMAssets?.USDT || 0,
          isSpot: false,
          isInUSD: false,
          totalFlag: false,
          btc: 0,
          eth: 0,
          sol: 0,
          avax: 0,
        },
        {
          id: uuidV4(),
          name: `${name} USD(S) (In USD)`,
          isSpot: false,
          isInUSD: true,
          totalFlag: true,
          total: accountUsdsMAssets?.USDT || 0,
          usdt: accountUsdsMAssets?.USDT || 0,
          btc: 0,
          eth: 0,
          sol: 0,
          avax: 0,
        },
      ].map((el) => {
        if (el.totalFlag && el.isInUSD) {
          el.total = el.usdt + el.btc + el.eth + el.sol + el.avax;
        }
        return el;
      }),
    );

    positions.push(
      ...[
        {
          id: uuidV4(),
          name: `${name} Coin(M) Position`,
          hold: {
            btc:
              (accountCoinMPositions?.BTCUSDT_POSITION || 0) /
              prices.BTC,
            eth:
              (accountCoinMPositions?.ETHUSDT_POSITION || 0) /
              prices.ETH,
            sol:
              (accountCoinMPositions?.SOLUSDT_POSITION || 0) /
              prices.SOL,
            avax:
              (accountCoinMPositions?.AVXUSDT_POSITION || 0) /
              prices.AVX,
          },
          unrealizedPnl: {
            btc:
              (accountCoinMPositions?.BTCUSDT_UNREALIZED_PNL || 0) /
              prices.BTC,
            eth:
              (accountCoinMPositions?.ETHUSDT_UNREALIZED_PNL || 0) /
              prices.ETH,
            sol:
              (accountCoinMPositions?.SOLUSDT_UNREALIZED_PNL || 0) /
              prices.SOL,
            avax:
              (accountCoinMPositions?.AVXUSDT_UNREALIZED_PNL || 0) /
              prices.AVX,
          },
        },
        {
          id: uuidV4(),
          name: `${name} Coin(M) Position (In USD)`,
          hold: {
            total: 0,
            btc: accountCoinMPositions?.BTCUSDT_POSITION || 0,
            eth: accountCoinMPositions?.ETHUSDT_POSITION || 0,
            sol: accountCoinMPositions?.SOLUSDT_POSITION || 0,
            avax: accountCoinMPositions?.AVXUSDT_POSITION || 0,
          },
          unrealizedPnl: {
            total: 0,
            btc:
              (accountCoinMPositions?.BTCUSDT_UNREALIZED_PNL || 0) /
              prices.BTC,
            eth:
              (accountCoinMPositions?.ETHUSDT_UNREALIZED_PNL || 0) /
              prices.ETH,
            sol:
              (accountCoinMPositions?.SOLUSDT_UNREALIZED_PNL || 0) /
              prices.SOL,
            avax:
              (accountCoinMPositions?.AVXUSDT_UNREALIZED_PNL || 0) /
              prices.AVX,
          },
        },
        {
          id: uuidV4(),
          name: `${name} USD(S) Position`,
          hold: {
            btc: accountUsdsMPositions?.BTCUSDT_POSITION || 0,
            eth: accountUsdsMPositions?.ETHUSDT_POSITION || 0,
            sol: accountUsdsMPositions?.SOLUSDT_POSITION || 0,
            avax: accountUsdsMPositions?.AVXUSDT_POSITION || 0,
          },
          unrealizedPnl: {
            btc:
              (accountUsdsMPositions?.BTCUSDT_UNREALIZED_PNL || 0) /
              prices.BTC,
            eth:
              (accountUsdsMPositions?.ETHUSDT_UNREALIZED_PNL || 0) /
              prices.ETH,
            sol:
              (accountUsdsMPositions?.SOLUSDT_UNREALIZED_PNL || 0) /
              prices.SOL,
            avax:
              (accountUsdsMPositions?.AVXUSDT_UNREALIZED_PNL || 0) /
              prices.AVX,
          },
        },
        {
          id: uuidV4(),
          name: `${name} USD(S) Position (In USD)`,
          hold: {
            total: 0,
            btc:
              (accountUsdsMPositions?.BTCUSDT_POSITION || 0) *
              prices.BTC,
            eth:
              (accountUsdsMPositions?.ETHUSDT_POSITION || 0) *
              prices.ETH,
            sol:
              (accountUsdsMPositions?.SOLUSDT_POSITION || 0) *
              prices.SOL,
            avax:
              (accountUsdsMPositions?.AVXUSDT_POSITION || 0) *
              prices.AVX,
          },
          unrealizedPnl: {
            total: 0,
            btc: accountUsdsMPositions?.BTCUSDT_UNREALIZED_PNL || 0,
            eth: accountUsdsMPositions?.ETHUSDT_UNREALIZED_PNL || 0,
            sol: accountUsdsMPositions?.SOLUSDT_UNREALIZED_PNL || 0,
            avax: accountUsdsMPositions?.AVXUSDT_UNREALIZED_PNL || 0,
          },
        },
      ]
        .filter((el) => {
          if (
            el.hold.total ||
            el.hold.btc ||
            el.hold.eth ||
            el.hold.sol ||
            el.hold.avax
          ) {
            return true;
          }
          return false;
        })
        .map((el) => {
          if (el.hold.total === 0) {
            el.hold.total =
              el.hold.btc + el.hold.eth + el.hold.sol + el.hold.avax;
            el.unrealizedPnl.total =
              el.unrealizedPnl.btc +
              el.unrealizedPnl.eth +
              el.unrealizedPnl.sol +
              el.unrealizedPnl.avax;
            return { ...el, totalFlag: true };
          }
          return el;
        }),
    );
  }
}
