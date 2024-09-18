import { Dictionaries } from "@/common/types";
import { api } from "@/utils/api";

export async function loadDictionary() {
  try {
    const res = await api.get<ApiResponse<{ dictionaries: Dictionaries }>
    >("/internal-api/language");
    if (res.data.result) {
      return res.data.result.dictionaries;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    throw new Error(
      (err as Error)?.message || "Something went wrong",
    );
  }
}

export async function updateDictionary(params: Dictionaries) {
  try {
    const res = await api.post<ApiResponse<{ dictionaries: Dictionaries }>>(
      "/internal-api/language",
      params,
    );
    if (res.data.result) {
      return res.data.result.dictionaries;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    throw new Error(
      (err as Error)?.message || "Something went wrong",
    );
  }
}
