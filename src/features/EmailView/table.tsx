import { useRecords } from "@/hooks/useRecords";
import { getEmailsApi } from "@/services/email";
import { EmailPayload } from "@/types/email";
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import styles from "./styles.module.css";

export default function MailContainer() {
  // TODO: fix type
  const { items, disabledNext, loadNext, disabledPrev, loadPrev } =
    useRecords<undefined, EmailPayload>(
      "/internal-api/get-emails",
      getEmailsApi,
      undefined,
    );
  const [selectedMail, setSelectedMail] =
    useState<EmailPayload>(undefined);
  return (
    <Flex align="flex" h={"96vh"} gap={20}>
      <Paper
        shadow="xs"
        withBorder
        style={{ borderRadius: "8px", width: 400 }}
        h={"96%"}
      >
        <ScrollArea h={"100%"} p="md">
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
                <EmailItem {...mail} />
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
  to,
  sendAt,
  subject,
}: {
  to: string;
  sendAt: number;
  subject: string;
}) {
  return (
    <>
      <Avatar size="md" radius="xl" color="blue">
        {to[0]}
      </Avatar>
      <Group align="flex-start">
        <Stack gap={0} style={{ flex: 1 }}>
          <Text w={200}>{to}</Text>
          <Text size="xs" c="dimmed" truncate>
            {subject}
          </Text>
        </Stack>
        <Text size="xs" c="dimmed">
          {new Date(sendAt).toLocaleString()}
        </Text>
      </Group>
    </>
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
