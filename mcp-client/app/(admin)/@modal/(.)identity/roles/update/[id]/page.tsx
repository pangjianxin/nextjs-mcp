import UpdateRole from "@/components/identity/roles/update";
import { ErrorPage } from "@/components/sections/error-page";
import { client } from "@/openapi-client";
import { roleGet } from "@/openapi/sdk.gen";

const RoleUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: role, error: roleError } = await roleGet({
    client: client,
    path: { id: id },
  });

  if (roleError) {
    return <ErrorPage errorResponse={roleError} />;
  }
  return <UpdateRole role={role}></UpdateRole>;
};

export default RoleUpdatePage;
