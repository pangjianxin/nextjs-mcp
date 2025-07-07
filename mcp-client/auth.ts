import NextAuth, { CredentialsSignin } from "next-auth";
import { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { passwordSignin } from "@/actions/passwordSignin";
import { jwtDecode } from "jwt-decode";

class InvalidGrant extends CredentialsSignin {
  code = "invalid_grant";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  providers: [
    Credentials({
      id: "credentials",
      name: "用户名密码登录",
      credentials: {
        username: {},
        password: {},
      },

      authorize: async (credentials) => {
        const signinResponse = await passwordSignin(
          credentials.username as string,
          credentials.password as string
        );

        const signinRes = await signinResponse.json();

        if (signinResponse.status === 200) {
          const user = jwtDecode<{
            sub: string;
            preferred_username: string;
            email: string;
            role: string[];
          }>(signinRes.access_token);
          console.log(user.role);
          return {
            id: user.sub,
            name: user.preferred_username,
            email: user.email,
            image: "/images/avatar.jpg",
            accessToken: signinRes.access_token,
            roles: user.role,
          };
        } else {
          throw new InvalidGrant(signinRes.error_description);
        }
      },
    }),
    {
      id: "openiddict", // signIn("my-provider") and will be part of the callback URL
      name: "内置", // optional, used on the default login page as the button text.
      type: "oidc", // or "oauth" for OAuth 2 providers
      issuer: process.env.AUTH_OAUTH_URL, // to infer the .well-known/openid-configuration URL
      clientId: process.env.AUTH_CLIENT_ID, // from the provider's dashboard
      clientSecret: process.env.AUTH_CLIENT_SECRET, // from the provider's dashboard
      authorization: {
        params: {
          scope: process.env.AUTH_SCOPE,
        },
      },
      profile: (profile) => {
        return {
          id: profile.sub as string,
          name: profile.unique_name,
          email: profile.email,
          image: profile.picture,
        } as User;
      },
    },
  ],
  callbacks: {
    async authorized({ request, auth }) {
      return true;
    },
    jwt({ token, trigger, session, account, user }) {
      //只有当trigger为update时，session中才有值
      if (trigger === "update") token.name = session.user.name;
      //只有当trigger为signIn时，才会有account,而根据account的provider的提供者不同，token的存储位置也不一样
      if (trigger === "signIn") {
        if (account?.provider === "openiddict") {
          return { ...token, accessToken: account?.access_token };
        }
        if (account?.provider === "credentials") {
          return { ...token, accessToken: user.accessToken };
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token?.accessToken) session.accessToken = token.accessToken as string;
      return session;
    },
  },
  events: {
    // signIn: (account) => {
    //   console.log("signIn", account);
    // },
    signIn: async (message) => {
      console.log(message);
    },
  },
});
