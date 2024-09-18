import {
  loadDictionary,
  updateDictionary,
} from "@/services/language";
import {
  Box,
  Button,
  Card,
  Flex,
  ScrollArea,
  Space,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dictionary } from "@/common/types";

export default function LanguageView() {
  const [filter, setFilter] = useState<string | undefined>("");
  const [jaLanguage, setJaLanguage] = useState<Dictionary[]>([]);
  const [enLanguage, setEnLanguage] = useState<Dictionary[]>([]);

  const form = useForm<Dictionary>({
    initialValues: {
      key: "",
      value: "",
    },
    validate: {
      key: isNotEmpty("Please enter"),
      value: isNotEmpty("Please enter"),
    },
    transformValues,
  });

  // TODO:
  const _fetch = useCallback(async () => {
    const data = await loadDictionary();

    setEnLanguage(
      Object.entries(data.en).map(([key, value]) => ({
        key,
        value: value as string,
      })),
    );
    setJaLanguage(
      Object.entries(data.ja).map(([key, value]) => ({
        key,
        value: value as string,
      })),
    );
  }, []);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  const rows = useMemo(
    () =>
      jaLanguage
        .filter((item) => {
          return filter
            ? item.key.toUpperCase().includes(filter.toUpperCase()) ||
                item.value
                  .toUpperCase()
                  .includes(filter.toUpperCase())
            : item;
        })
        .map(({ key, value }) => (
          <Table.Tr key={key}>
            <Table.Td>{key}</Table.Td>
            <Table.Td>{value}</Table.Td>
          </Table.Tr>
        )),
    [jaLanguage, filter],
  );

  const isKeyPresent = useMemo(() => {
    return jaLanguage.findIndex(
      (item) => item.key === form.values.key,
    );
  }, [form.values.key, jaLanguage]);

  const onSubmit = useCallback(
    async (values: Dictionary) => {
      if (isKeyPresent !== -1) {
        jaLanguage[isKeyPresent] = values;
        enLanguage[isKeyPresent] = values;
      } else {
        jaLanguage.push(values);
        enLanguage.push({ key: values.key, value: values.key });
      }
      const _dictionary = {
        en: enLanguage.reduce((acc, current) => {
          acc[current.key] = current.value;
          return acc;
        }, {}),
        ja: jaLanguage.reduce((acc, current) => {
          acc[current.key] = current.value;
          return acc;
        }, {}),
      };
      await updateDictionary(_dictionary);
    },
    [enLanguage, isKeyPresent, jaLanguage],
  );

  return (
    <Box>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>Dictionary</Title>
        </Flex>
        <Flex gap={10} wrap={"wrap"} justify={"space-between"}>
          <TextInput
            label="Filter"
            placeholder="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Flex gap={10} wrap={"wrap"}>
              <TextInput
                label="English"
                placeholder="English"
                {...form.getInputProps("key")}
              />
              <TextInput
                label="Japanese"
                placeholder="Japanese"
                {...form.getInputProps("value")}
              />
              <Flex direction={"column"}>
                <span>&nbsp;</span>
                <Button type="submit" w={110}>
                  {isKeyPresent === -1 ? "NEW" : "UPDATE"}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
        <Space my={"md"} />
        <Card withBorder>
          <ScrollArea h={"76vh"}>
            <Table>
              <Table.Thead bg={"var(--mantine-color-primary-1)"}>
                <Table.Tr>
                  <Table.Th>English</Table.Th>
                  <Table.Th>Japanese</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      </Card>
    </Box>
  );
}

function transformValues(values: Dictionary) {
  return {
    key: values.key.toString().trim(),
    value: values.value.toString().trim(),
  };
}
