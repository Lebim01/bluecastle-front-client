import NextAuth from "next-auth";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  is_admin: boolean;
  roles: string[];
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    user: UserProfile;
  }

  interface User {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
  }
}
