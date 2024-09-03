import { Account, SymbolConfig } from "@/common/types";
import { getSymbolsListApi, getUserListApi } from "@/services/auth";
import { UserPayload } from "@/types/record";
import memoizeOne from "memoize-one";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const findUser = memoizeOne((users: UserPayload[], userId) => {
  return users.find((u) => u.id === userId);
});

const findUserByUid = memoizeOne((users: UserPayload[], uid) => {
  return users.find((u) => u.depositCode === uid);
});
const findAccount = memoizeOne(
  (users: UserPayload[], userId, accountId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      return user.accounts?.find((i) => i.id === accountId);
    }
    return undefined;
  },
);

const findSymbol = memoizeOne((users: SymbolConfig[], userId) => {
  return users.find((u) => u.id === userId);
});

interface IUsersStore {
  loading: boolean;
  fetchUsers: () => Promise<void>;
  fetchSymbols: () => Promise<void>;
  setUsers: (users: UserPayload[]) => void;
  setLoading: (loading: boolean) => void;
  getUserById: (userId: string) => undefined | UserPayload;
  getUserByUId: (userId: string) => undefined | UserPayload;
  getAccountUserById: (
    userId: string,
    accountId: string,
  ) => undefined | Account;
  getSymbolById: (symbolId: string) => undefined | SymbolConfig;
  users: UserPayload[];
  symbols: SymbolConfig[];
}

const InitialState: Pick<
  IUsersStore,
  "loading" | "users" | "symbols"
> = {
  loading: false,
  users: [],
  symbols: [],
};

export const useInfoStore = create<IUsersStore>()(
  devtools(
    (set, get) => ({
      ...InitialState,
      async fetchUsers() {
        const { setLoading, setUsers } = get();
        setLoading(true);
        getUserListApi()
          .then((res) => {
            if (res.result) {
              setUsers(res.result);
            }
          })
          .finally(() => setLoading(false));
      },
      setUsers(users) {
        set({ users }, false, "users:users");
      },
      setLoading(loading) {
        set({ loading }, false, "users:loading");
      },

      async fetchSymbols() {
        getSymbolsListApi().then((res) => {
          set({ symbols: res.result.symbols }, false);
        });
      },
      getUserById(userId) {
        const { users } = get();
        return findUser(users, userId);
      },
      getUserByUId(userId) {
        const { users } = get();
        return findUserByUid(users, userId);
      },
      getSymbolById(symbolId) {
        const { symbols } = get();
        return findSymbol(symbols, symbolId);
      },
      getAccountUserById(userId, accountId) {
        const { users } = get();
        return findAccount(users, userId, accountId);
      },
    }),
    { name: "Users" },
  ),
);
