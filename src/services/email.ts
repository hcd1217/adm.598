import logger from "@/helpers/logger";
import { PAGE_SIZE } from "@/types/common";
import { Email } from "@/types/email";
import { api } from "@/utils/api";

export async function getEmailsApi(
  params: Record<string, string | string[]> = {},
  cursor: string | null = null,
  limit: number = PAGE_SIZE,
) {
  const formData = { ...params };
  if (cursor !== null) {
    formData["cursor"] = cursor;
  }
  const response = await api.post<ApiResponse<Email[]>>(
    "/internal-api/get-emails",
    { ...formData, limit },
  );

  logger.debug("get-email", response);

  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}

export async function deleteEmail(id: string) {
  const res = await api.delete("/internal-api/email", {
    data: { id },
  });
  if (res.data?.result) {
    return res.data;
  }
  return Promise.reject(null);
}
