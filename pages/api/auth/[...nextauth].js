import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        return {
          id: 1,
          name: "Fill Murray",
          email: "bill@fillmurray.com",
          image: "https://www.fillmurray.com/64/64",
        };
      },
    }),
  ],

  session: {
    encrypted: true,
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
