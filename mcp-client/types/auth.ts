import { VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto } from "@/openapi";
export type AuthContextType = {
  user: VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto | null;
  permissions: { [key: string]: boolean };
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  isLoading: boolean;
  logout: () => void;
};
