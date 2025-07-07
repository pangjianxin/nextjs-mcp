import { AppSidebar } from "@/components/layout/app-sidebar";
import { NavTop } from "@/components/layout/nav-header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth-context";
import { FC } from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};
const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavTop sidebarTrigger={<SidebarTrigger className="ml-2" />}></NavTop>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-2 border">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
