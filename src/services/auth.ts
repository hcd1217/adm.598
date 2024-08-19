import { AuthenticationPayload, updateUserPayloadSchema, UserUpdateType } from '@/types/common';
import { api } from '@/utils/api';
import { z } from 'zod';

type LoginData = ApiResponse<{
  token: string
}>;

export async function login(form: TLoginForm) {
  const response = await api.post<LoginData>(`/api/login`, form);
  console.log("LG", response.data.result)
  return response.data;
}

type RegisterData = ApiResponse<{
  token: string;
}>;

export async function register(form: any) {
  const response = await api.post<RegisterData>(`/api/register`, form);
  return response.data.data;
}


export async function identify() {
  const response = await api.get<ApiResponse<AuthenticationPayload>>(`/api/me`);
  console.log("Indentify", response.data.result)
  if (response.data.result) {
    return response.data.result
  }
  return Promise.reject(null)
}

type UserUpdatePayload = z.infer<typeof updateUserPayloadSchema>;
export function updateUserApi(
  type: `${UserUpdateType}`,
  payload: Omit<UserUpdatePayload, "type">,
) {
  return api.post("/api/me/update", {
    type,
    ...payload,
  });
}
