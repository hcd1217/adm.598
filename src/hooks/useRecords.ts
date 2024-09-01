import { PAGE_SIZE } from "@/types/common";
import { fuzzySearchMultipleWords } from "@/utils/data";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { keys, values } from "lodash";
import { DataTableSortStatus } from "mantine-datatable";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

export function useRecords<T, P>(key: string, mt: () => Promise<ApiResponse<P[]>>, initialValues: any) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<P>>({
    columnAccessor: "depositCode",
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const { data, isLoading } = useSWR(key, mt, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const loadRecords = useCallback(() => {
    mutate(key);
  }, []);

  const refresh = () => {
    setPage(1);
    setQuery("");
    loadRecords();
    form.reset();

  };
  const form = useForm<UseFormReturnType<T>>({
    mode: "uncontrolled",
    onValuesChange() {
      setQuery(Date.now().toString());
      setPage(1);
    },
  });
  useEffect(() => {
    form.setValues(initialValues);
  }, []);

  const items = useMemo(() => {
    let _items = [...data?.result ?? []];
    if (debouncedQuery) {
      const _values = form.getValues();
      _items = fuzzySearchMultipleWords(data?.result ?? [], keys(_values), values(_values) as any[]);
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const t = _items.slice(from, to);
    return t;
  }, [debouncedQuery, data?.result, page, form]);

  return {
    data,
    refresh,
    isLoading,
    sortStatus, setSortStatus,
    page, setPage, PAGE_SIZE, query, setQuery, debouncedQuery, loadRecords, form, items
  };
}
