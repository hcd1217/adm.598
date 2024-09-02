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

export const TRANSACTION_TYPE_COLORS: Record<
  TRANSACTION_TYPE,
  string
> = {
  COMMISSION_FEE: "#FF5733",
  DEPOSIT: "teal",
  DEPOSIT_COPY_FUND: "#3357FF",
  FIAT_DEPOSIT: "#FF33A1",
  FUNDING_FEE: "#33FFF5",
  LIQUIDATION_CLEARANCE: "#FFEB33",
  REALIZED_PNL: "#8E44AD",
  REFERRAL_KICKBACK: "#2980B9",
  SWAP: "#27AE60",
  TRANSFER_IN: "#F39C12",
  TRANSFER_OUT: "#E74C3C",
  WITHDRAW: "#2C3E50",
  WITHDRAW_COPY_FUND: "#D35400",
};

export const TRANSACTION_STATUS_COLORS: Record<
  TRANSACTION_STATUS,
  string
> = {
  FAILED: "##ff0000",
  DONE: "#27AE60",
  PENDING: "#F39C12",
  PROCESSING: "#3357FF",
};
