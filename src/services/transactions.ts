import { api } from "@/utils/api";

export async function getTransactionsApi(
  params: Record<string, unknown> = {},
) {
  const formData = { ...params };
  if ((formData.types as unknown[]).length === 0) {
    delete formData["types"];
  }
  const userId =
    formData.userId && (params.userId as string).toString().trim();
  if (!userId) {
    delete formData["userId"];
  }
  window.console.log(params, formData);
  const response = await api.post<ApiResponse<TransactionPayload[]>>(
    "/internal-api/get-transactions",
    { ...formData },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
