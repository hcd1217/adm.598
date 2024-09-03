import { useInfoStore } from "@/store/info.store";
import { useMemo } from "react";

type PropsType = {
  userId: string;
  accountId?: string;
};
export function AccountName(props: PropsType) {
  const { getUserById } = useInfoStore();
  const userName = useMemo(() => {
    const info = getUserById(props.userId);
    return (
      info?.depositCode ??
      info?.fullName ??
      info?.email ??
      info?.mobile ??
      info?.id
    );
  }, [props.userId, getUserById]);
  return <div style={{ whiteSpace: "nowrap" }}>{userName}</div>;
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
