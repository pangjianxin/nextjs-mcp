import { createClient } from "@hey-api/client-next";
import { auth } from "@/auth";

export const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  auth: async () => {
    const session = await auth();
    return session?.accessToken;
  },
});
