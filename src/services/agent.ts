import { api } from "@/utils/api";

export async function getAllReferrals() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.post<ApiResponse<any[]>>(
    "/internal-api/referrals",
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
