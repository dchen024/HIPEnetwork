import GoogleProvider from '@auth/core/providers/google';
import LinkedInProvider from '@auth/core/providers/linkedin';
import type { AuthConfig } from '@auth/core/types';
import { NuxtAuthHandler } from '#auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '~/server/mongodb';

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig();

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: runtimeConfig.google.clientId,
      clientSecret: runtimeConfig.google.clientSecret,
      redirectProxyUrl: runtimeConfig.google.redirectProxyUrl,
    }),
    LinkedInProvider({
      clientId: runtimeConfig.linkedin.clientId,
      clientSecret: runtimeConfig.linkedin.clientSecret,
      redirectProxyUrl: runtimeConfig.linkedin.redirectProxyUrl,
    }),
  ],
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
