import { Dictionaries } from "@/common/types";
import { api } from "@/utils/api";

export async function loadDictionary() {
  try {
    const result = await api
      .get("/internal-api/language")
      .then(
        (res) => res.data?.result as { dictionaries: Dictionaries },
      );
    if (result) {
      return result.dictionaries;
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
    const result = await api
      .post("/internal-api/language", params)
      .then(
        (res) => res.data?.result as { dictionaries: Dictionaries },
      );
    if (result) {
      return result.dictionaries;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    throw new Error(
      (err as Error)?.message || "Something went wrong",
    );
  }
}
