import { api } from "@/utils/api";

type HedgeData = {
  "CCI_TOTAL_ASSETS": string
  "TOTAL_COBO_ASSET": string
  "TOTAL_BINANCE_EQUITY": string
  "fundingFee": string
  "commissionFee": string
};

export async function hedgeData() {
  const response =
    await api.get<ApiResponse<HedgeData>>("/internal-api/XFksNaC38Uu2/hedge-data");
  if (response.data.result) {
    return response.data.result;
  }
  return Promise.reject(null);
}
