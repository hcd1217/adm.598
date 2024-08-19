import { ActionIcon, Group, rem, Table, TableData } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";

export default function UserList() {
    const Action = useMemo(() => {
        return (
            <Group gap={0} justify="flex-end">
                <ActionIcon variant="subtle" color="gray">
                  <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red">
                  <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
              </Group>
        )
    }, [])
    const tableData: TableData = {
        head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
        body: [
            [6, 12.011, 'C', 'Carbon', Action],
            [7, 14.007, 'N', 'Nitrogen', Action],
            [39, 88.906, 'Y', 'Yttrium', Action],
            [56, 137.33, 'Ba', 'Barium', Action],
            [58, 140.12, 'Ce', 'Cerium', Action],
        ],
    };
    return (
        <Table data={tableData} />
    )
}
