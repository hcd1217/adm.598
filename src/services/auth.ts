import {
  AuthenticationPayload,
  updateUserPayloadSchema,
  UserUpdateType,
} from "@/types/common";
import { UserPayload } from "@/types/user";
import { api } from "@/utils/api";
import { faker } from "@faker-js/faker";
import { z } from "zod";

type LoginData = ApiResponse<{
  token: string;
}>;

export async function login(form: TLoginForm) {
  const response = await api.post<LoginData>("/api/login", form);
  return response.data;
}

type RegisterData = ApiResponse<{
  token: string;
}>;

export async function register(form: Record<string, unknown>) {
  const response = await api.post<RegisterData>(
    "/api/register",
    form,
  );
  return response.data.data;
}

export async function identify() {
  const response =
    await api.get<ApiResponse<AuthenticationPayload>>("/api/me");
  if (response.data.result) {
    return response.data.result;
  }
  return Promise.reject(null);
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

export async function getUserList() {
  const users: UserPayload[] = [...Array(100)].map(() => ({
    id: faker.string.uuid(),
    depositCode: faker.finance.bitcoinAddress(),
    email: faker.internet.exampleEmail(),
    mobile: faker.phone.number(),
  }));

  const res: ApiResponse<UserPayload[]> = {
    result: users,
    data: users,
    statusCode: 200,
    success: true,
  };
  return res;
  // const response = await api.get<ApiResponse<UserPayload>>("/api/users");
  // console.log("Indentify", response.data.result);
  // if (response.data.result) {
  //   return response.data.result;
  // }
  // return Promise.reject(null);
}
