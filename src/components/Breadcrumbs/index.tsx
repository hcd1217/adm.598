import {
  Anchor,
  Breadcrumbs as MantineBreadcrumbs,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default function Breadcrumbs(props: { title: string }) {
  return (
    <MantineBreadcrumbs
      separator={<IconChevronRight color="gray" size={14} />}
    >
      <Anchor fz={14} fw={400} href="/">
        Dashboard
      </Anchor>
      <Anchor fz={14} fw={400} c={"primary"}>
        {props.title}
      </Anchor>
    </MantineBreadcrumbs>
  );
}
