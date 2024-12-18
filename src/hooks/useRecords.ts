import logger from "@/helpers/logger";
import { useInfoStore } from "@/store/info.store";
import { PAGE_SIZE } from "@/types/common";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

type FormQuery<T> = T & { userId?: string };
type ResponseType<T> = T & { id: string };

const excludesKey = ["/internal-api/get-all-users"];

export function useRecords<T, P>(
  key: string,
  mt: (
    params: Record<string, string | string[]>,
    cursor: string | null,
    limit: number,
  ) => Promise<ApiResponse<ResponseType<P>[]>>,
  initialValues: FormQuery<T>,
) {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<ResponseType<P>[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [prevCurs, setPrevCurs] = useState<string[]>([]);
  const fn = () => {
    setQuery(Date.now().toString());
    if (excludesKey.includes(key)) {
      // todo: offline
      setPage(1);
    } else {
      setNextCursor(null);
      setPrevCursor(null);
      setCursor(null);
      setPrevCurs([]);
    }
  };

  const form = useForm<FormQuery<T>>({
    mode: "uncontrolled",
    onValuesChange: debounce(fn, 800),
  });

  const { getUserByUId } = useInfoStore();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const { data, isLoading, mutate } = useSWR(
    [key, cursor, form.getValues()],
    ([, cursor, params]) => {
      logger.debug("PARAMS", params);
      if (params.userId) {
        params["userId"] =
          getUserByUId(params.userId)?.id ?? params.userId;
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
      setPrevCurs((v) => v.slice(0, v.length - 1));
    }
  };

  const loadRecords = useCallback(() => {
    mutate();
  }, [mutate]);

  const refresh = () => {
    form.setValues(initialValues);
    setCursor(null);
    loadRecords();
  };

  useEffect(() => {
    if (loaded) {
      return;
    }
    setLoaded(true);
    form.setValues(initialValues);
  }, [form, initialValues, loaded]);

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
