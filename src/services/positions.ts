import { api } from "@/utils/api";

export async function getPositionsApi(
  params: Record<string, unknown> = {},
) {
  const formData = { ...params };
  const userId =
    formData.userId && (params.userId as string).toString().trim();
  if (!userId) {
    delete formData["userId"];
  }
  const response = await api.post<ApiResponse<PositionPayload[]>>(
    "/internal-api/get-positions",
    { ...formData },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
