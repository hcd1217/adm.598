import { Dictionaries } from "@/common/types";
import {
  loadDictionary,
  updateDictionary,
} from "@/services/language";
import { failed as error, success, warn } from "@/utils/toast";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  ScrollArea,
  Space,
  Table,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import {
  IconCheck,
  IconCloudUp,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import { cloneDeep, isEqual } from "lodash";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidV4 } from "uuid";
import styles from "./index.module.css";

type Dictionary = {
  id: string;
  key: string;
  en: string;
  ja: string;
};

export default function LanguageView() {
  const [filter, setFilter] = useState<string | undefined>("");
  const [metaData, setMetaData] = useState<Dictionary[]>([]);
  const [data, setData] = useState<Dictionary[]>([]);
  const [updateData, setUpdateData] = useState<Dictionary[]>([]);
  const [editRow, setEditRow] = useState<Dictionary | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const _fetch = useCallback(async () => {
    setLoading(true);
    try {
      const _data = await loadDictionary();
      const _mergedData = Object.keys(_data.en).map((key) => ({
        id: uuidV4(),
        key: key,
        en: _data.en[key] || "",
        ja: _data.ja[key] || "",
      }));

      setMetaData(cloneDeep(_mergedData));
      setData(cloneDeep(_mergedData));
      setUpdateData(cloneDeep(_mergedData));
    } catch (e) {
      error("Failed to load dictionary", "Failed to load dictionary");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  const onUpdateCell = useCallback(
    (id: string, lang: "key" | "en" | "ja", newValue: string) => {
      setUpdateData((prevData) => {
        const indexToUpdate = prevData.findIndex(
          (item) => item.id === id,
        );
        if (indexToUpdate === -1) {
          return prevData;
        }
        const updatedItem = {
          ...prevData[indexToUpdate],
          [lang]: newValue,
        };
        return [
          ...prevData.slice(0, indexToUpdate),
          updatedItem,
          ...prevData.slice(indexToUpdate + 1),
        ];
      });
    },
    [],
  );

  const onSaveRow = useCallback(() => {
    if (!editRow) {
      return;
    }
    const { id } = editRow;
    const updatedRow = updateData.find((item) => item.id === id);

    if (!updatedRow) {
      return;
    }

    setData((prevData) =>
      prevData.map((item) => (item.id === id ? updatedRow : item)),
    );

    setUpdateData((prevData) =>
      prevData.map((item) => (item.id === id ? updatedRow : item)),
    );

    setEditRow(undefined);
  }, [editRow, updateData]);

  const onCancel = useCallback(() => {
    if (!editRow) {
      return;
    }

    const { id, en, ja } = editRow;

    if (!en && !ja) {
      setData((prev) => prev.filter(({ id: i }) => i !== id));
      setUpdateData((prev) => prev.filter(({ id: i }) => i !== id));
    }

    setEditRow(undefined);
  }, [editRow]);

  const onSave = useCallback(async () => {
    if (!isEqual(metaData, data)) {
      const _dictionary: Dictionaries = { en: {}, ja: {} };

      data?.forEach(({ key, en, ja }) => {
        if (!key) {
          return;
        }
        _dictionary.en[key] = en;
        _dictionary.ja[key] = ja;
      });

      setLoading(true); // Set loading to true
      try {
        await updateDictionary(_dictionary);
        await _fetch();
        success("Update language", "Update language successfully");
      } catch (e) {
        error("Update language", "Update language fail");
      } finally {
        setLoading(false);
      }
    } else {
      warn(
        "Update language",
        "No changes detected, nothing to save.",
      );
    }
  }, [_fetch, data, metaData]);

  const addNewRow = useCallback(() => {
    const newRow = { id: uuidV4(), key: "New key", en: "", ja: "" };

    const newData = [newRow, ...updateData];

    setUpdateData(newData);
    setData(newData);
    setEditRow(newRow);
    setFilter("");
  }, [updateData]);

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
          {!isEqual(metaData, data) && (
            <Button
              onClick={onSave}
              bg={"var(--mantine-color-teal-6)"}
            >
              <IconCloudUp size={20} />
              <Box ml={10}>Save</Box>
            </Button>
          )}
        </Flex>
        <Space my={"sm"} />
        <Card withBorder pb={0}>
          <ScrollArea h={"74vh"}>
            <Table className={styles.table}>
              <Table.Thead bg={"var(--mantine-color-primary-1)"}>
                <Header />
              </Table.Thead>
              <Table.Tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  <Rows
                    data={data}
                    filter={filter}
                    editRow={editRow}
                    onUpdateCell={onUpdateCell}
                    onSaveRow={onSaveRow}
                    onCancel={onCancel}
                    setEditRow={setEditRow}
                  />
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>
          <Flex justify={"end"} className={styles.border}>
            <Button onClick={addNewRow} variant="subtle">
              Add New +
            </Button>
          </Flex>
        </Card>
      </Card>
    </Box>
  );
}

interface CellProps {
  editMode: boolean;
  value: string;
  onSave: (newValue: string) => void;
}

const Cell = memo(
  function Cell({ editMode, value, onSave }: CellProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBlur = useCallback(() => {
      if (inputRef.current && inputRef.current.value !== value) {
        onSave(inputRef.current.value.trim());
      }
    }, [value, onSave]);

    return editMode ? (
      <Box>{value}</Box>
    ) : (
      <TextInput
        defaultValue={value}
        ref={inputRef}
        onBlur={handleBlur}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.editMode === nextProps.editMode,
);

interface RowsProps {
  data: Dictionary[];
  filter?: string;
  editRow?: Dictionary;
  onUpdateCell: (
    id: string,
    lang: "key" | "en" | "ja",
    newValue: string,
  ) => void;
  onSaveRow: () => void;
  onCancel: () => void;
  setEditRow: (row: Dictionary | undefined) => void;
}

const Rows = ({
  data,
  filter,
  editRow,
  onUpdateCell,
  onSaveRow,
  onCancel,
  setEditRow,
}: RowsProps) => {
  return _filterByKeyword(data, filter).map(({ id, key, en, ja }) => (
    <Table.Tr key={id}>
      <Table.Td>
        <Cell
          editMode={editRow?.id !== id}
          value={key}
          onSave={(newValue) => onUpdateCell(id, "key", newValue)}
        />
      </Table.Td>
      <Table.Td>
        <Cell
          editMode={editRow?.id !== id}
          value={en}
          onSave={(newValue) => {
            onUpdateCell(id, "en", newValue);
          }}
        />
      </Table.Td>
      <Table.Td>
        <Cell
          editMode={editRow?.id !== id}
          value={ja}
          onSave={(newValue) => {
            onUpdateCell(id, "ja", newValue);
          }}
        />
      </Table.Td>
      <Table.Td w={50}>
        {editRow?.id === id ? (
          <Flex gap={5}>
            <ActionIcon onClick={onSaveRow} variant="subtle">
              <IconCheck color="green" />
            </ActionIcon>
            <ActionIcon onClick={onCancel} variant="subtle">
              <IconX color="red" />
            </ActionIcon>
          </Flex>
        ) : (
          <ActionIcon
            onClick={() => setEditRow({ id, key, en, ja })}
            variant="subtle"
          >
            <IconEdit />
          </ActionIcon>
        )}
      </Table.Td>
    </Table.Tr>
  ));
};

const Header = () => {
  return (
    <Table.Tr>
      <Table.Th>Key</Table.Th>
      <Table.Th>English</Table.Th>
      <Table.Th>Japanese</Table.Th>
      <Table.Th>&nbsp;</Table.Th>
    </Table.Tr>
  );
};

function _filterByKeyword(data: Dictionary[], keyword?: string) {
  return data.filter((item) => {
    const searchStr = keyword?.toLowerCase();
    return (
      item.key.toLowerCase().includes(searchStr || "") ||
      item.en.toLowerCase().includes(searchStr || "") ||
      item.ja.toLowerCase().includes(searchStr || "")
    );
  });
}
