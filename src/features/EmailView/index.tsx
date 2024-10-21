import { Box, Button, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconX } from "@tabler/icons-react";
import SendMailForm from "./form";
import MailContainer from "./table";

const EmailView = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Box pos="relative">
      <Button
        onClick={toggle}
        pos={"fixed"}
        m={15}
        h={60}
        w={60}
        bottom={0}
        right={0}
        radius={999}
        ta="center"
      >
        {!opened ? <IconPlus /> : <IconX />}
      </Button>
      <Modal
        opened={opened}
        onClose={toggle}
        size={"xl"}
        withCloseButton={false}
      >
        <SendMailForm
          onSuccess={() => {
            toggle();
            setTimeout(() => location.reload(), 300);
          }}
        />
      </Modal>
      <Flex direction={"column"}>
        <MailContainer />
      </Flex>
    </Box>
  );
};

export default EmailView;
