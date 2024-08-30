import { api } from "@/utils/api";

export async function getPositionsApi() {
  // const results: PositionPayload[] = [...Array(100)].map(() => ({
  //     id: faker.string.uuid(),
  //     depositCode: faker.finance.bitcoinAddress(),
  //     email: faker.internet.exampleEmail(),
  //     mobile: faker.phone.number(),
  // }));

  // const res: ApiResponse<PositionPayload[]> = {
  //     result: results,
  //     data: results,
  //     statusCode: 200,
  //     success: true,
  // };
  // return res
  const response = await api.post<ApiResponse<PositionPayload[]>>("/internal-api/get-positions");
  if (response.data?.result) {
    return response.data;
  }
  return Promise.reject(null);
}
