import { useInfoStore } from "@/store/info.store";
import { useMemo } from "react";

type PropsType = {
  userId: string;
  accountId?: string;
  withContact?: boolean;
};
export function AccountName(props: PropsType) {
  const { getUserById } = useInfoStore();
  const [contact, depositCode] = useMemo(() => {
    const user = getUserById(props.userId);
    if (!user) {
      return ["", "-"];
    }

    return [
      user?.email ?? user?.mobile ?? user?.id,
      user.depositCode,
    ];
  }, [props.userId, getUserById]);
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
  const { getAccountUserById } = useInfoStore();
  const userName = useMemo(() => {
    const info = getAccountUserById(
      props.userId,
      props.accountId as string,
    );
    return info?.name;
  }, [props.accountId, props.userId, getAccountUserById]);
  return <div style={{ whiteSpace: "nowrap" }}>{userName}</div>;
}

type PropsTypeSymbol = {
  symbolId: string;
};
export function SymbolName(props: PropsTypeSymbol) {
  const { getSymbolById } = useInfoStore();
  const labelName = useMemo(() => {
    const info = getSymbolById(props.symbolId);
    return info?.symbol ?? info?.name;
  }, [getSymbolById, props.symbolId]);
  return <div style={{ whiteSpace: "nowrap" }}>{labelName}</div>;
}
