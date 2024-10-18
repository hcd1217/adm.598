import { Referral } from "@/types/referral";
import { api } from "@/utils/api";

export async function getAllReferrals(
  params: Record<string, string | string[]> = {},
) {
  const timestamp = new Date(params.timestamp as string).getTime();

  const response = await api.post<ApiResponse<Referral[]>>(
    "/internal-api/referrals",
    { timestamp },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
