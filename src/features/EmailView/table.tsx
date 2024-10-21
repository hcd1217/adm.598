import { useRecords } from "@/hooks/useRecords";
import { deleteEmail, getEmailsApi } from "@/services/email";
import { Email } from "@/types/email";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Checkbox,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconTrash,
} from "@tabler/icons-react";
import { useCallback, useState } from "react";
import styles from "./styles.module.css";

export default function MailContainer() {
  const {
    items,
    disabledNext,
    loadNext,
    disabledPrev,
    loadPrev,
    loadRecords: reload,
  } = useRecords<unknown, Email>(
    "/internal-api/get-emails",
    getEmailsApi,
    {},
  );
  const [selectedMail, setSelectedMail] = useState<Email | undefined>(
    undefined,
  );
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(
    new Set(),
  );

  const handleSelect = (id: string) => {
    setSelectedEmails((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const handleDeleteSelected = useCallback(async () => {
    await Promise.all(
      Array.from(selectedEmails).map((id) => deleteEmail(id)),
    );
    setSelectedEmails(new Set());
  }, [selectedEmails]);

  return (
    <Flex align="flex" h={"96vh"} gap={20}>
      <Paper
        shadow="xs"
        withBorder
        style={{ borderRadius: "8px", width: 400 }}
        h={"96%"}
      >
        <Flex justify={"end"} pt="sm" pr="sm">
          <Anchor
            onClick={() =>
              handleDeleteSelected().then(() => reload())
            }
            className={styles.btn_icon}
          >
            <IconTrash color="red" stroke={1.5} size={20} />
          </Anchor>
        </Flex>
        <ScrollArea h={"94%"} p="md" pt={0}>
          <Stack gap="xs">
            {items.map((mail) => (
              <Paper
                p="sm"
                shadow="none"
                radius="md"
                key={mail.id}
                className={styles.item}
                data-active={
                  selectedMail
                    ? mail.id === selectedMail.id || undefined
                    : undefined
                }
                onClick={() => setSelectedMail(mail)}
              >
                <EmailItem
                  {...mail}
                  isSelected={selectedEmails.has(mail.id)}
                  onSelect={() => handleSelect(mail.id)}
                />
              </Paper>
            ))}
          </Stack>
        </ScrollArea>

        <Flex py={"xs"} justify={"center"} gap={10}>
          <ActionIcon
            onClick={() => loadPrev()}
            disabled={disabledPrev}
          >
            <IconArrowLeft />
          </ActionIcon>
          <ActionIcon
            onClick={() => loadNext()}
            disabled={disabledNext}
          >
            <IconArrowRight />
          </ActionIcon>
        </Flex>
      </Paper>

      {selectedMail && (
        <Paper
          withBorder
          p="md"
          shadow="xs"
          style={{ borderRadius: "8px" }}
          h={"96%"}
          flex={1}
        >
          <ScrollArea h={"100%"} px="md">
            <EmailContent {...selectedMail} />
          </ScrollArea>
        </Paper>
      )}
    </Flex>
  );
}

function EmailItem({
  id,
  to,
  sendAt,
  subject,
  isSelected,
  onSelect,
}: {
  id: string;
  to: string;
  sendAt: number;
  subject: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <Flex align={"center"} gap={16} w={"100%"}>
      <Checkbox checked={isSelected} onChange={() => onSelect(id)} />
      <Box w={"100%"}>
        <Flex justify={"end"}>
          <Text size="xs" c="dimmed">
            {new Date(sendAt).toLocaleString()}
          </Text>
        </Flex>
        <Flex align={"center"} gap={10}>
          <Avatar size="md" radius="xl" color="blue">
            {to[0]}
          </Avatar>
          <Text w={200}>{to}</Text>
        </Flex>
        <Group align="flex-start" pt={10}>
          <Text size="xs" c="dimmed" truncate>
            {subject}
          </Text>
        </Group>
      </Box>
    </Flex>
  );
}

function EmailContent({
  to,
  sendAt,
  subject,
  content,
}: {
  to: string;
  sendAt: number;
  subject: string;
  content: string;
}) {
  return (
    <Box>
      <Group align="center" mb="md">
        <Avatar size="md" radius="xl" color="blue">
          {to[0]}
        </Avatar>
        <Stack gap={0}>
          <Text w={500}>{to}</Text>
        </Stack>
        <Text size="xs" c="dimmed" ml="auto">
          {new Date(sendAt).toLocaleString()}
        </Text>
      </Group>
      <Text mb="md" fw={700}>
        {subject}
      </Text>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
}
