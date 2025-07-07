import PermissionUpdate from "@/components/permission/permission-form";

const UserPermission = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <PermissionUpdate
      providerKey={id}
      providerName="R"
      providerKeyDisplayName="角色权限变更"
    />
  );
};

export default UserPermission;
