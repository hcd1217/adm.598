import { api } from "@/utils/api";

export async function getOrdersApi(
  params: Record<string, unknown> = {},
) {
  const formData = { ...params };
  if ((formData.status as unknown[]).length === 0) {
    delete formData["status"];
  }
  const userId =
    formData.userId && (params.userId as string).toString().trim();
  if (!userId) {
    delete formData["userId"];
  }
  window.console.log(params, formData);
  const response = await api.post<ApiResponse<OrderPayload[]>>(
    "/internal-api/get-orders",
    { ...formData },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
