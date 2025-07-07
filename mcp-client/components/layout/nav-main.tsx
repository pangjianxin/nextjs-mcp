"use client";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { navMain } from "@/lib/menu-config";

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navMain.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={
                    pathname && item.url && pathname === item.url
                      ? "bg-primary/10 text-primary"
                      : ""
                  }
                >
                  {item.icon && (
                    <item.icon
                      className={
                        pathname && item.url && pathname === item.url
                          ? "text-primary"
                          : ""
                      }
                    />
                  )}
                  <span
                    className={`text-sn font-semibold ${
                      pathname && item.url && pathname === item.url
                        ? "text-primary"
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className={
                          pathname && pathname === subItem.url
                            ? "bg-primary/10 text-primary"
                            : ""
                        }
                      >
                        <Link href={subItem.url as string}>
                          <span
                            className={`text-sm ${
                              pathname && pathname === subItem.url
                                ? "text-primary"
                                : ""
                            }`}
                          >
                            {subItem.title}
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
