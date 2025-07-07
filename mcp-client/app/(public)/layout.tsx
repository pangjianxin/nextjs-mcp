import PublicLayout from "@/components/layout/public-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default Layout;
