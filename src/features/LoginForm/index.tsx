import {
  Button,
  Card,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import useLoginForm from "./hooks/useLoginForm";

import styles from "@/components/Input/input.module.css";

export default function LoginForm() {
  const { form, onSubmit } = useLoginForm();

  return (
    <form onSubmit={onSubmit}>
      <Card
        shadow={"sm"}
        radius={"md"}
        bg={"white"}
        style={{ overflow: "visible" }}
      >
        <Card.Section inheritPadding py={36} px={32}>
          <Group align="center" justify="center">
            <Text size={"26px"} lh={"39px"} c={"dark.9"} fw={"500"}>
              Sign In
            </Text>
          </Group>
        </Card.Section>

        <Card.Section inheritPadding px={32} pb={32}>
          <Stack gap={36}>
            <Stack gap={36} w={372}>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                classNames={{
                  input: styles.input,
                  error: styles["input__error-message"],
                }}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                classNames={{
                  input: styles.input,
                  error: styles["input__error-message"],
                }}
                {...form.getInputProps("password")}
              />
            </Stack>

            <Stack>
              <Button
                type="submit"
                variant="filled"
                radius={"sm"}
                h={40}
                size="14px"
                fullWidth
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Card.Section>
      </Card>
    </form>
  );
}
