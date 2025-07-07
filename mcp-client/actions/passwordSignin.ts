"use server";

export async function passwordSignin(username: string, password: string) {
  const response = await fetch(
    `${process.env.AUTH_CREDENTIALS_OAUTH_URL}/connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: process.env.AUTH_CLIENT_ID || "",
        client_secret: process.env.AUTH_CLIENT_SECRET || "",
        username: username,
        password: password,
        scope: process.env.AUTH_SCOPE || "",
      }),
    }
  );

  return response;
}
