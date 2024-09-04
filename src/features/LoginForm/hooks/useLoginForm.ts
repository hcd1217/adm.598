import { useAuthStore } from "@/store/auth.store";
import { error } from "@/utils/notifications";
import { useForm, zodResolver } from "@mantine/form";
import * as zod from "zod";

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

export default function useLoginForm() {
  const login = useAuthStore((state) => state.login);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
      type: 1,
      mfaCode: "",
    },
  });

  const onSubmit = form.onSubmit(async (data) => {
    try {
      await login({
        email: data.email,
        mfaCode: data.mfaCode,
        password: data.password,
        type: data.type,
      });
    } catch (e) {
      // form.setFieldError("password", "Unable to login. Please check your credentials and try again.");
      error(
        "Authentication Failed",
        "Unable to login. Please check your credentials and try again.",
      );
    }
  });

  return {
    form,
    onSubmit,
  };
}
