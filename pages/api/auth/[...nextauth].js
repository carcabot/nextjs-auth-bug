import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Google({
      name: "Google",
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      redirectUri: "http://localhost:3000/api/auth/callback/google",
    }),
    Providers.AzureADB2C({
      name: "Microsoft",
      clientId: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      scope: "offline_access User.Read",
      tenantId: process.env.AZURE_TENANT_ID,
    }),
    Providers.Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        return {
          id: 1,
          name: "Fill Murray",
          email: "bill@fillmurray.com",
          image: "https://www.fillmurray.com/64/64",
        };
        const { email, password } = credentials;

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password");
        }

        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/login_check",
            {
              method: "POST",
              body: JSON.stringify({
                username: email,
                password: password,
              }),
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );
          const user = await res.json();
          if (res.ok && user) {
            return user;
            // const userData = await user.json();
            // if (userData && userData.token) {
            //   return userData.token;
            // } else {
            //   throw new Error("Invalid Email or Password");
            // }
          }
          return null;
        } catch (e) {
          throw new Error("Invalid Email or Password");

          console.log("caught error", e);
          const errorMessage = e.response.data.message;
          // Redirecting to the login page with error messsage in the URL
          // throw new Error(errorMessage + "&email=" + credentials.email);
          // throw new Error(e.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    newUser: "/register",
    error: "/login", // Error code passed in query string as ?error=
  },
  session: {
    encrypted: true,
    jwt: true,
  },

  // callbacks: {
    // Getting the JWT token from API response
    // signIn: async (user, account, profile) => {
    //   // return user;
    //   return "/";
    // },
    // Getting the JWT token from API response
    // jwt: async (token, user, account, profile, isNewUser) => {
    //   // Add access_token to the token right after signin
    //   if (account?.accessToken) {
    //     token.accessToken = account.accessToken;
    //   }
    //   return token;
    // },
    // jwt: async (token, user) => {
    //   user &&
    //     ((token.accessToken = user.token),
    //     (token.refreshToken = user.refresh_token));
    //   return Promise.resolve(token);
    // },
    // cookie: {
    //   secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
    // },
    // session: async (session, token) => {
    //   session.accessToken = token.accessToken;
    //   session.refreshToken = token.refreshToken;
    //   return Promise.resolve(session);
    // },
    // redirect: async (url, baseUrl) => {
    //   return baseUrl;
    // },
  // },
};

export default (req, res) => NextAuth(req, res, options);
