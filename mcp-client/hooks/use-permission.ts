"use client";

import { useAuth } from "@/contexts/auth-context";

// 权限检查 Hook
export function usePermission() {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}

// 特定权限 Hook
export function useHasPermission(permission: string) {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}

// 多权限检查 Hook
export function useHasAnyPermission(permissions: string[]) {
  const { hasAnyPermission } = useAuth();
  return hasAnyPermission(permissions);
}

export function useHasAllPermissions(permissions: string[]) {
  const { hasAllPermissions } = useAuth();
  return hasAllPermissions(permissions);
}
