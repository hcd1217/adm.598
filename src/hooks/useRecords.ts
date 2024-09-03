import logger from "@/helpers/logger";
import { useInfoStore } from "@/store/info.store";
import { PAGE_SIZE } from "@/types/common";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

export function useRecords<T, P>(
  key: string,
  mt: (
    req: unknown,
    cursor: unknown,
    limit: number,
  ) => Promise<ApiResponse<P[]>>,
  initialValues: Record<string, unknown>,
) {
  const [items, setItems] = useState<P[]>([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [prevCurs, setPrevCurs] = useState<string[]>([]);

  const form = useForm<UseFormReturnType<T>>({
    mode: "uncontrolled",
    onValuesChange() {
      setQuery(Date.now().toString());
      if (["/internal-api/get-all-users"].includes(key)) {
        // todo: offline
        setPage(1);
      } else {
        setNextCursor(null);
        setPrevCursor(null);
        setCursor(null);
        setPrevCurs([]);
      }
    },
  });
  const { getUserByUId } = useInfoStore();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const { data, isLoading } = useSWR(
    [key, cursor, form.getValues()],
    ([, cursor, params]) => {
      logger.debug("PARAMS", params);
      if (params.userId) {
        params["userId"] = getUserByUId(params.userId)?.id ?? params.userId;
      }
      return mt(params, cursor, PAGE_SIZE + 1);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onSuccess(data) {
        if (data && data.result) {
          setNextCursor(
            data.result.length === PAGE_SIZE + 1
              ? data.result[PAGE_SIZE]?.id
              : null,
          );
          setItems(data.result.slice(0, PAGE_SIZE));
        }
      },
    },
  );

  const loadNext = () => {
    if (!isLoading && nextCursor) {
      setPrevCurs((v) => [...v, items[0]?.id]);
      setCursor(nextCursor);
    }
  };

  const loadPrev = () => {
    if (!isLoading) {
      setCursor(prevCurs[prevCurs.length - 1]);
      setPrevCurs((v) => {
        return v.slice(0, v.length - 1);
      });
    }
  };

  const loadRecords = useCallback(() => { }, []);

  const refresh = () => {
    form.reset();
    setQuery("");
    loadRecords();
    form.setValues(initialValues);
  };

  useEffect(() => {
    form.setValues(initialValues);
  }, []); // todo: fix issue loop call

  return {
    data,
    refresh,
    isLoading,
    page,
    setPage,
    PAGE_SIZE,
    query,
    setQuery,
    debouncedQuery,
    loadRecords,
    form,
    items,
    loadNext,
    loadPrev,
    disabledPrev: isLoading || !prevCurs.length,
    disabledNext: isLoading || !nextCursor,
    nextCursor,
    prevCursor,
    prevCurs,
  };
}
