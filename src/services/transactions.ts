import logger from "@/helpers/logger";
import { PAGE_SIZE } from "@/types/common";
import { TransactionPayload } from "@/types/record";
import { api } from "@/utils/api";

export async function getTransactionsApi(
  params: Record<string, string | string[]> = {},
  cursor: string | null = null,
  limit: number = PAGE_SIZE,
) {
  const formData = { ...params };
  if ((formData.types as string[]).length === 0) {
    delete formData["types"];
  }
  if ((formData.statuses as string[]).length === 0) {
    delete formData["statuses"];
  }
  const userId =
    formData.userId && (params.userId as string).toString().trim();
  if (!userId) {
    delete formData["userId"];
  }
  if (cursor !== null) {
    formData["cursor"] = cursor;
  }
  logger.debug(params, formData);
  const response = await api.post<ApiResponse<TransactionPayload[]>>(
    "/internal-api/get-transactions",
    { ...formData, limit },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
