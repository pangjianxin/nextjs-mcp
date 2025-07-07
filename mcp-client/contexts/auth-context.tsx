"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import type { AuthContextType } from "../types/auth";
import {
  VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto,
  VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto,
} from "@/openapi";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const [user, setUser] =
    useState<VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto | null>(
      null
    );
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  // 获取应用配置数据
  const fetchAppConfiguration = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/app-configuration");
      if (!response.ok) {
        throw new Error("Failed to fetch configuration");
      }

      const config: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto =
        await response.json();

      // 设置用户信息
      if (config.currentUser) {
        setUser(config.currentUser);
      }

      // 设置权限信息
      if (config.auth?.grantedPolicies) {
        setPermissions(config.auth.grantedPolicies);
      }

      setIsConfigLoaded(true);
    } catch (error) {
      console.error("Error fetching app configuration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 当用户登录状态变化时获取配置
  useEffect(() => {
    if (status === "authenticated" && session && !isConfigLoaded) {
      fetchAppConfiguration();
    } else if (status === "unauthenticated") {
      setUser(null);
      setPermissions({});
      setIsConfigLoaded(false);
    }
  }, [status, session, isConfigLoaded]);

  // 检查单个权限
  const hasPermission = (permission: string): boolean => {
    return permissions[permission] === true;
  };

  // 检查是否拥有任意一个权限
  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some((permission) => hasPermission(permission));
  };

  // 检查是否拥有所有权限
  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every((permission) => hasPermission(permission));
  };

  // 登出 - 使用 NextAuth 的 signOut
  const logout = () => {
    window.location.href = "/api/auth/signout";
  };

  const value: AuthContextType = {
    user,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isLoading: isLoading || status === "loading",
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
