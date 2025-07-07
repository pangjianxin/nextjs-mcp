"use client";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FC } from "react";
import { signOut, useSession } from "next-auth/react";
import Login from "@/components/sections/login";

const NavUser: FC = () => {
  const session = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };
  if (session.status !== "authenticated") {
    return <Login />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="/images/file.svg"
                  alt={session.data?.user?.name ?? "CRE"}
                />
                <AvatarFallback className="rounded-lg">CRE</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session.data?.user?.name}
                </span>
                <span className="truncate text-xs">
                  {session.data?.user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage
                    src="/images/logo.svg"
                    alt={session.data?.user?.name ?? "CRE"}
                  />
                  <AvatarFallback className="rounded-lg">CRE</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session.data?.user?.name}
                  </span>
                  <span className="truncate text-xs">
                    {session.data?.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant={"link"}>
                <Link href="/profile" className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  账户管理
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button onClick={handleSignOut} variant={"link"}>
                <LogOut className="h-4 w-4" />
                注销登录
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
