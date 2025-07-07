"use client";
import { type FC, type HTMLAttributes, useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, BarChart2, Users, Contact2 } from "lucide-react";
import { ModeToggle } from "@/components/theme/toggle-mode";
import { motion } from "motion/react";
import Link from "next/link";
import { Brain } from "lucide-react";

interface TopNavProps extends HTMLAttributes<HTMLElement> {
  sidebarTrigger?: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: "仪表板", to: "/" },
  { icon: BarChart2, label: "趋势数据", to: "/" },
  { icon: Users, label: "关于我们", to: "/" },
  { icon: Contact2, label: "联系我们", to: "/" },
];

export const NavTop: FC<TopNavProps> = ({ sidebarTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            AI Genesis
          </span>
        </div>

        {/* 中间：桌面端导航菜单 */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            解决方案
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            关于我们
          </a>
        </div>

        {/* 右侧：主题切换按钮和移动端菜单 */}
        <div className="flex items-center space-x-2">
          <ModeToggle />

          {/* 移动端菜单按钮 */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left mb-6">导航菜单</SheetTitle>
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.to}
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="#"
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>产品</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>解决方案</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>定价</span>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};
