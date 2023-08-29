import { resolve } from 'node:path';

export default defineNuxtConfig({
  modules: ['@hebilicious/authjs-nuxt', '@element-plus/nuxt', '@unocss/nuxt'],
  css: ['@/assets/scss/main.scss'],
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    google: {
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
      redirectProxyUrl: process.env.NUXT_GOOGLE_REDIRECT_PROXY_URL,
    },
    linkedin: {
      clientId: process.env.NUXT_LINKEDIN_CLIENT_ID,
      clientSecret: process.env.NUXT_LINKEDIN_CLIENT_SECRET,
      redirectProxyUrl: process.env.NUXT_LINKEDIN_REDIRECT_PROXY_URL,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
  authJs: {
    verifyClientOnEveryRequest: true,
    guestRedirectTo: '/',
    authenticatedRedirectTo: '/home',
    baseUrl: 'http://localhost:3000', // should be something like https://www.my-app.com
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
