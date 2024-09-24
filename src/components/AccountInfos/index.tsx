import { useInfoStore } from "@/store/info.store";
import { useMemo } from "react";

type PropsType = {
  userId: string;
  accountId?: string;
  withContact?: boolean;
};
export function AccountName(props: PropsType) {
  const { getUserById, users } = useInfoStore();
  const [contact, depositCode] = useMemo(() => {
    if (users.length === 0) {
      return ["", "-"];
    }
    const user = getUserById(props.userId);
    if (!user) {
      return ["", "-"];
    }

    return [
      user?.email ?? user?.mobile ?? user?.id,
      user.depositCode,
    ];
  }, [props.userId, getUserById, users]);
  return (
    <div style={{ whiteSpace: "nowrap" }}>
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        {depositCode}
      </span>
      &nbsp;
      {props.withContact ? contact : ""}
    </div>
  );
}

export function AccountTypeName(props: PropsType) {
  const { getAccountUserById, users } = useInfoStore();
  const userName = useMemo(() => {
    if (users.length === 0) {
      return "--";
    }
    const info = getAccountUserById(
      props.userId,
      props.accountId as string,
    );
    return info?.name;
  }, [props.accountId, props.userId, getAccountUserById, users]);
  return <div style={{ whiteSpace: "nowrap" }}>{userName}</div>;
}

type PropsTypeSymbol = {
  symbolId: string;
};
export function SymbolName(props: PropsTypeSymbol) {
  const { getSymbolById, symbols } = useInfoStore();
  const labelName = useMemo(() => {
    if (symbols.length === 0) {
      return "--";
    }
    const info = getSymbolById(props.symbolId);
    return info?.symbol ?? info?.name;
  }, [getSymbolById, props.symbolId, symbols]);
  return <div style={{ whiteSpace: "nowrap" }}>{labelName}</div>;
}
