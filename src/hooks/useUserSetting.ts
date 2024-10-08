import { updateUserApi } from "@/services/auth";
import { useAuthStore } from "@/store/auth.store";
import { success } from "@/utils/notifications";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import * as zod from "zod";

const schema = zod.object({
  nickName: zod.string().min(1),
});

export default function useUserSetting() {
  const user = useAuthStore((state) => state.user);
  const auth = useAuthStore((state) => state.auth);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(schema),
    initialValues: {
      nickName: user?.nickName,
    },
  });

  const onSubmit = form.onSubmit(async (data) => {
    try {
      setSubmitting(true);
      await updateUserApi("NICK_NAME", data);
      success("Success", "Username updated successfully");
      await auth();
    } catch (e) {
      form.setFieldError("nickname", "UserName Update failed");
    } finally {
      setSubmitting(false);
    }
  });

  return {
    form,
    onSubmit,
    submitting,
  };
}
