import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings2,
  UserCog,
} from "lucide-react";

export const teams = [
  {
    name: "企智顾问管理端",
    logo: GalleryVerticalEnd,
    plan: "Enterprise plan",
  },
];
export const navMain = [
  {
    title: "仪表盘",
    url: "#",
    icon: LayoutDashboard,
    isActive: false,
    items: [
      {
        title: "网站首页",
        url: "/",
      },
    ],
  },
  {
    title: "智能应用",
    url: "#",
    icon: Bot,
    isActive: true,
    items: [
      {
        title: "智能对话",
        type: "data",
        url: "/chat",
      },
      {
        title: "智能助理",
        type: "data",
        url: "/agent",
      },
    ],
  },
  {
    title: "身份认证管理",
    url: "#",
    icon: UserCog,
    isActive: false,
    items: [
      {
        title: "用户信息",
        url: "/identity/users",
      },
      {
        title: "角色信息",
        url: "/identity/roles",
      },
    ],
  },
  {
    title: "系统管理",
    url: "#",
    icon: Settings2,
    isActive: false,
    items: [
      {
        title: "审计日志",
        url: "/settings/audit-logs",
      },
    ],
  },
];
export const projects = [
  {
    name: "登录/注销",
    url: "/login",
    icon: Frame,
  },
];
