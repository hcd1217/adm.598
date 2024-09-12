import { Account } from "@/common/types";
import { UserKycDataType } from "./common";

type TRANSACTION_TYPE =
  | "DEPOSIT"
  | "SWAP"
  | "FIAT_DEPOSIT"
  | "WITHDRAW"
  | "TRANSFER_IN"
  | "TRANSFER_OUT"
  | "REALIZED_PNL"
  | "FUNDING_FEE"
  | "DEPOSIT_COPY_FUND"
  | "WITHDRAW_COPY_FUND"
  | "COMMISSION_FEE"
  | "LIQUIDATION_CLEARANCE"
  | "REFERRAL_KICKBACK";
type TRANSACTION_STATUS =
  | "PENDING"
  | "PROCESSING"
  | "DONE"
  | "FAILED";
type UserPayload = {
  id: string;
  depositCode?: string;
  email?: string;
  mobile?: string;

  firstName?: string;
  lastName?: string;
  department?: string;
  birthDate?: string | number;

  bFlag?: boolean;
  fullName?: string;
  isDemo?: boolean;
  accounts?: Account[];
  isPendingKyc?: boolean;
  kycLevel?: number;
  kycData?: UserKycDataType;
};

type PositionPayload = {
  id: string;
  positionId: string;
  userId: string;
  accountId: string;
  symbolId: string;
  side: string;
  leverage: string;
  volume: string;
  closedVolume: string;
  closedAt: string;
  averageClosePrice: string;
  maxOpenInterest: string;
  fee: string;
  entryPrice: string;
  markPrice: string;
  takeProfitPrice: string;
  stopLossPrice: string;
  trailingStop: string;
  liquidationPrice: string;
  margin: string;
  accumulatedFee: string;
  realizedPnl: string;
  isMasterPosition: boolean;
  isCopy: boolean;
  masterPositionId: string;
  masterAccountId: string;
  totalFollowers: string;
  createdAt: string;
  updatedAt: string;
};

type OrderPayload = {
  id: string;
  userId: string;
  accountId: string;
  positionId: string;
  orderId: string;
  symbolId: string;
  clientOrderId: string;
  forwardedOrderId: string;
  binanceOrderId: string;
  side: OrderSide;
  type: OrderType;
  status: TRANSACTION_STATUS;
  postOnly: boolean;
  reduceOnly: boolean;
  price: string;
  avgPrice: string;
  leverage: string;
  volume: string;
  reduceVolume: string;
  filled: string;
  realizedPnl: string;
  filledAt: string;
  takeProfit: string;
  stopLoss: string;
  takeProfitTriggerBy: string;
  stopLossTriggerBy: string;
  triggerPrice: string;
  triggerBy: string;
  triggerDirection: string;
  timeInForce: string;
  masterOrderId: string;
  masterAccountId: string;
  isCopy: boolean;
  isMasterOrder: boolean;
  totalFollowers: string;
  createdAt: string;
  updatedAt: string;
};

type TransactionPayload = {
  id: string;

  accountId: string;
  amount: string;
  assetId: string;
  createdAt: string;
  fee: string;
  from: string;
  to: string;
  jpyAmount: string;
  toAmount: string;
  memo: string;
  positionId: string;
  status: TRANSACTION_STATUS;
  toAccountId: string;
  toAssetId: string;
  tradeId: string;
  txId: string;
  type: TRANSACTION_TYPE;
  updatedAt: string;
  userId: string;
};
