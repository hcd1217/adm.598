import { identify, login } from "@/services/auth";
import { AuthenticationPayload } from "@/types/common";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAuthStore {
  loading: boolean;
  user: null | AuthenticationPayload;
  setUser: (user: AuthenticationPayload | null) => void;
  setLoading: (loading: boolean) => void;
  login: (form: TLoginForm) => Promise<void>;
  auth: () => Promise<void>;
  logout: () => void;
}

const InitialState: Pick<IAuthStore, "loading" | "user"> = {
  loading: false,
  user: null,
};

export const useAuthStore = create<IAuthStore>()(
  devtools(
    (set, get) => ({
      ...InitialState,

      setUser(user) {
        set({ user }, false, "auth:user");
      },
      setLoading(loading) {
        set({ loading }, false, "auth:loading");
      },

      async login(form) {
        const { setLoading, auth } = get();

        setLoading(true);

        try {
          const data = await login(form);
          if (data.result.token) {
            const { token } = data.result;
            localStorage.setItem("token", token);
            await auth();
          }
        } catch (e) {
          if (e instanceof Error) {
            throw e;
          }
          return Promise.reject();
        } finally {
          setLoading(false);
        }
      },
      async auth() {
        const { setLoading, setUser } = get();

        setLoading(true);

        try {
          const user = await identify();
          setUser(user);
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      },
      logout() {
        const { setUser } = get();

        localStorage.removeItem("token");
        setUser(null);
      },
    }),
    { name: "Auth" },
  ),
);
