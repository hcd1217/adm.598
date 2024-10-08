import logger from "@/helpers/logger";
import { PAGE_SIZE } from "@/types/common";
import { PositionPayload } from "@/types/record";
import { api } from "@/utils/api";

export async function getPositionsApi(
  params: Record<string, string | string[]> = {},
  cursor: string | null = null,
  limit: number = PAGE_SIZE,
) {
  logger.debug("CURSOR", cursor);
  const formData = { ...params };
  const userId =
    formData.userId && (params.userId as string).toString().trim();
  if (!userId) {
    delete formData["userId"];
  }
  if (cursor !== null) {
    formData["cursor"] = cursor;
  }
  const response = await api.post<ApiResponse<PositionPayload[]>>(
    "/internal-api/get-positions",
    { ...formData, limit },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
