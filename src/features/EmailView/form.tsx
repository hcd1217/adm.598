import { api } from "@/utils/api";
import { success } from "@/utils/notifications";
import {
  Box,
  Button,
  Flex,
  InputLabel,
  TextInput,
} from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function SendMailForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    from: "support@CryptoCopyInvest.com",
    to: "",
    subject: "",
    content: `様
お世話になります。


今後ともよろしくお願い致します。
CryptoCopyInvestサポートチーム`,
  });

  return (
    <Box p={10} h="85vh" w="100%">
      <Flex align="center" justify="start" gap={10} mb={10} flex={1}>
        <InputLabel fz={14} fw="bold" w={100} h={10}>
          Your email
        </InputLabel>
        <TextInput
          size="sm"
          value={form.from}
          onChange={(event) =>
            setForm({ ...form, from: event.currentTarget.value })
          }
          placeholder="Enter your email"
          w={500}
        />
      </Flex>
      <Flex align="center" justify="start" gap={10} mb={10}>
        <InputLabel fz={14} fw="bold" w={100}>
          To email
        </InputLabel>
        <TextInput
          size="sm"
          w={500}
          value={form.to}
          onChange={(event) =>
            setForm({ ...form, to: event.currentTarget.value })
          }
          placeholder="Enter customer email"
        />
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        gap={10}
        mb={10}
        w="100%"
      >
        <Flex align="center" justify="start" gap={10} mb={10}>
          <InputLabel fz={14} fw="bold" w={100}>
            Subject
          </InputLabel>
          <TextInput
            size="sm"
            value={form.subject}
            onChange={(event) =>
              setForm({ ...form, subject: event.currentTarget.value })
            }
            placeholder="Subject"
            w={500}
          />
        </Flex>
        <Button
          onClick={() => {
            api.post("/internal-api/email", form).then((res) => {
              if (res.data.code === 0) {
                success("Success", "Email sent successfully");
                setForm({
                  from: "support@CryptoCopyInvest.com",
                  to: "",
                  subject: "",
                  content: `${""}<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>`,
                });
                onSuccess();
              } else {
                alert("Error: " + res.data.message);
              }
            });
          }}
        >
          Send
        </Button>
      </Flex>
      <EmailEditor
        content={form.content}
        onChange={(content) => setForm({ ...form, content })}
      />
    </Box>
  );
}

function EmailEditor({
  content,
  onChange,
}: {
  content?: string;
  onChange?: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate(props) {
      // eslint-disable-next-line react/prop-types
      onChange?.(props.editor.getHTML());
    },
  });

  return (
    <RichTextEditor editor={editor} w="100%" h="65vh">
      <RichTextEditor.Toolbar
        sticky
        stickyOffset={60}
        w="100%"
        display="flex"
        style={{ gap: 10 }}
      >
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content
        style={{
          border: "none",
        }}
      />
    </RichTextEditor>
  );
}
