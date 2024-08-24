import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { Link } from "react-router-dom";

type PropType = {
  username?: string;
  email?: string;
  avatar?: string;
};
export function UserButton(props: PropType) {
  return (
    <UnstyledButton
      className={classes.user}
      component={Link}
      to={"/account"}
    >
      <Group>
        <Avatar src={props.avatar} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {props.username}
          </Text>

          <Text c="dimmed" size="xs">
            {props.email}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
