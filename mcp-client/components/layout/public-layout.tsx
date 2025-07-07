import Link from "next/link";
import { NavTop } from "@/components/layout/nav-header";
import { Footer as NavFooter } from "@/components/layout/nav-footer";
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavTop />
      <main className="flex-1">{children}</main>
      <NavFooter />
    </div>
  );
}

export default PublicLayout;
