import { appConfigSchema } from "@/common/schema";
import { AppConfig } from "@/common/types";
import { api } from "@/utils/api";

export async function getAppConfigs() {
  const response = await api.post<ApiResponse<AppConfig>>(
    "/internal-api/get-configs",
  );
  if (response.data?.result) {
    return response.data.result;
  }
  return Promise.reject(null);
}

export async function updateAppConfigs(config: AppConfig) {
  await api.post<ApiResponse<AppConfig>>(
    "/internal-api/configs",
    appConfigSchema.parse(config),
  );
}
