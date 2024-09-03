import { PAGE_SIZE } from "@/types/common";
import { OrderPayload } from "@/types/record";
import { api } from "@/utils/api";

export async function getOrdersApi(
  params: unknown = {},
  cursor: unknown = null,
  limit: number = PAGE_SIZE,
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
  if (cursor !== null) {
    formData["cursor"] = cursor;
  }
  window.console.log(params, formData);
  const response = await api.post<ApiResponse<OrderPayload[]>>(
    "/internal-api/get-orders",
    { ...formData, limit },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
