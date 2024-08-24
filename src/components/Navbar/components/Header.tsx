import { UserButton } from "@/components/UserButton";
import { useAuthStore } from "@/store/auth.store";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <UserButton
        username={user?.nickName ?? user?.email}
        email={user?.email}
        avatar={user?.avatar}
      />
    </>
  );
}
