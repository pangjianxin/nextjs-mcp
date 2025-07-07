"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Login = () => {
  const session = useSession();
  const router = useRouter();
  const handleSignin = () => {
    router.push(`/account/login`);
  };
  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  if (session.status === "authenticated") {
    return (
      <Button
        onClick={handleSignOut}
        variant={"destructive"}
        className="h-[48px]"
      >
        注销登录
      </Button>
    );
  }

  return (
    <Button onClick={handleSignin} variant={"default"} className="h-[48px]">
      账户登录
    </Button>
  );
};

export default Login;
