import { UserKycDataType } from "@/types/common";
import { api } from "@/utils/api";

export async function getKycByUserApi(params: { userId: string }) {
  const response = await api.post<ApiResponse<UserKycDataType>>(
    "/internal-api/user/kyc-data",
    { ...params },
  );
  if (response.data?.result) {
    return response.data.result;
  }
  return Promise.reject(null);
}

export async function KycApproveApi(params: { userId: string }) {
  const response = await api.post<ApiResponse<UserKycDataType[]>>(
    "/internal-api/user/kyc-data/approve",
    { ...params },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.resolve(null);
}

export async function kycRejectApi(params: { userId: string }) {
  const response = await api.post<ApiResponse<UserKycDataType[]>>(
    "/internal-api/user/kyc-data/reject",
    { ...params },
  );
  if (response.data?.result) {
    return response.data;
  }
  return Promise.resolve(null);
}
