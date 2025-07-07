import UpdateUser from "@/components/identity/users/update";
import {
  userGet,
  userGetRoles,
  userGetAssignableRoles,
} from "@/openapi/sdk.gen";
import { client } from "@/openapi-client";
import { ErrorPage } from "@/components/sections/error-page";

const UserUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: user, error: userError } = await userGet({
    client: client,
    path: { id: id },
  });
  const { data: userRoles, error: userRolesError } = await userGetRoles({
    client: client,
    path: { id: id },
  });

  const { data: assignableRoles, error: assignableRolesError } =
    await userGetAssignableRoles({
      client: client,
    });

  if (userError) {
    return <ErrorPage errorResponse={userError} />;
  }

  if (userRolesError) {
    return <ErrorPage errorResponse={userRolesError} />;
  }

  if (assignableRolesError) {
    return <ErrorPage errorResponse={assignableRolesError} />;
  }

  return (
    <UpdateUser
      user={user}
      userAssignableRoles={assignableRoles}
      userRoles={userRoles}
    ></UpdateUser>
  );
};

export default UserUpdatePage;
