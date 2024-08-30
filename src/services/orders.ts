import { api } from "@/utils/api";

export async function getOrdersApi() {
  // const results: OrderPayload[] = [...Array(100)].map(() => ({
  //     id: faker.string.uuid(),
  //     depositCode: faker.finance.bitcoinAddress(),
  //     email: faker.internet.exampleEmail(),
  //     mobile: faker.phone.number(),
  // }));

  // const res: ApiResponse<OrderPayload[]> = {
  //     result: results,
  //     data: results,
  //     statusCode: 200,
  //     success: true,
  // };
  // return res
  const response = await api.post<ApiResponse<OrderPayload[]>>("/internal-api/get-orders");
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
