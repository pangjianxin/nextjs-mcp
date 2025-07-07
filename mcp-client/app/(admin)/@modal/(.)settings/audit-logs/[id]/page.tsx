import AuditLogDetail from "@/components/settings/audit-logs/detail";
import { auditLogGet } from "@/openapi";

const AuditLogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: auditLog } = await auditLogGet({ path: { id } });

  return <AuditLogDetail auditLog={auditLog!} />;
};

export default AuditLogPage;
