"use client";
import { type FC, type HTMLAttributes } from "react";
import type React from "react";
import { ModeToggle } from "@/components/theme/toggle-mode";
import { motion } from "motion/react";
import { Brain, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopNavProps extends HTMLAttributes<HTMLElement> {
  sidebarTrigger?: React.ReactNode;
}

export const NavTop: FC<TopNavProps> = ({ sidebarTrigger }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 w-full z-50 h-[64px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* 左侧：Logo 和 Sidebar Trigger */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="shrink-0">{sidebarTrigger}</div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            因企制宜，智启新程
          </span>
        </div>

        {/* 右侧：主题切换按钮和移动端菜单 */}

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className={cn("w-9 px-0")}>
            <MessageCircle className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
          <Button variant="ghost" size="sm" className={cn("w-9 px-0")}>
            <Settings className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
};
