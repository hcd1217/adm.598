import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@/types/record";

export default class Color {
  private hex: string;

  constructor(hex: string) {
    this.hex = hex;
  }

  static fromRgb(r: number, g: number, b: number) {
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    return new Color(hex);
  }

  static from(string: string) {
    return new Color(string);
  }

  toRgb(alpha = 1) {
    const hex = this.hex.substring(1);
    const rgb = parseInt(hex, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  static random() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

// prettier-ignore
export const TRANSACTION_TYPE_COLORS: Record<TRANSACTION_TYPE, string> = {
  COMMISSION_FEE: "#FF5733",
  DEPOSIT: "#087f5b",
  DEPOSIT_COPY_FUND: "#1864ab",
  FIAT_DEPOSIT: "#862e9c",
  FUNDING_FEE: "#e36414",
  LIQUIDATION_CLEARANCE: "#8c0e23",
  REALIZED_PNL: "#8E44AD",
  REFERRAL_KICKBACK: "#2980B9",
  SWAP: "#27AE60",
  TRANSFER_IN: "#F39C12",
  TRANSFER_OUT: "#E74C3C",
  WITHDRAW: "#2C3E50",
  WITHDRAW_COPY_FUND: "#3bc9db",
};

// prettier-ignore
export const TRANSACTION_STATUS_COLORS: Record<TRANSACTION_STATUS, string> = {
  FAILED: "#d62c20",
  DONE: "#27AE60",
  PENDING: "#F39C12",
  PROCESSING: "#3357FF",
};

export const KYC_STATUS_COLORS: Record<
"lv1" | "lv2" | "lv3",
string
> = {
  lv1: "#d62c20",
  lv2: "#27AE60",
  lv3: "#F39C12",
};
