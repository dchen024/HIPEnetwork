import { resolve } from 'node:path';

export default defineNuxtConfig({
  app: {
    baseURL: 'https://hipe-network.vercel.app/',
  },
  modules: ['@hebilicious/authjs-nuxt', '@element-plus/nuxt', '@unocss/nuxt'],
  css: ['@/assets/scss/main.scss'],
  runtimeConfig: {
    authJs: {
      secret: import.meta.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    google: {
      clientId: import.meta.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.NUXT_GOOGLE_CLIENT_SECRET,
      redirectProxyUrl: import.meta.env.NUXT_GOOGLE_REDIRECT_PROXY_URL,
    },
    linkedin: {
      clientId: import.meta.env.NUXT_LINKEDIN_CLIENT_ID,
      clientSecret: import.meta.env.NUXT_LINKEDIN_CLIENT_SECRET,
      redirectProxyUrl: import.meta.env.NUXT_LINKEDIN_REDIRECT_PROXY_URL,
    },
    huggingface: {
      apiKey: import.meta.env.NUXT_HUGGINGFACE_API_KEY,
    },
    mongodb: {
      uri: import.meta.env.NUXT_MONGODB_URI,
    },
    public: {
      authJs: {
        baseUrl: import.meta.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
  authJs: {
    verifyClientOnEveryRequest: true,
    guestRedirectTo: '/',
    authenticatedRedirectTo: '/home',
    baseUrl: 'https://hipe-network.vercel.app/', // should be something like https://www.my-app.com
  },
  elementPlus: {
    importStyle: 'scss',
  },
  unocss: {
    preflight: true,
    icons: true,
  },
  alias: {
    cookie: resolve(__dirname, 'node_modules/cookie'),
  },
});
