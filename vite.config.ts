import mdx from '@mdx-js/rollup';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { type ManifestOptions, VitePWA } from 'vite-plugin-pwa';
// import { viteSingleFile } from 'vite-plugin-singlefile';
import 'dotenv/config';

// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest
const manifest: Partial<ManifestOptions> = {
  name: 'wake.lol',
  short_name: 'wake.lol',
  icons: [
    {
      src: '/favicon.svg',
      sizes: 'any',
    },
    {
      src: '/maskable.svg',
      sizes: 'any',
      purpose: 'monochrome maskable',
    },
  ],
  theme_color: '#000000',
  background_color: '#000000',
  display: 'standalone',
  related_applications: [
    {
      platform: 'webapp',
      url: 'https://wake.lol/manifest.webmanifest',
    },
  ],
  prefer_related_applications: true,
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    base: './',
    define: {
      'process.env': {
        SENTRY_DSN: process.env.SENTRY_DSN,
      },
    },
    plugins: [
      mdx(),
      react(),
      // viteSingleFile({
      //   inlinePattern: [
      //     '!favicon.svg',
      //     '!favicon.ico',
      //   ],
      // }),
      VitePWA({
        injectRegister: 'inline',
        registerType: 'autoUpdate',
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
        },
        manifest,
      }),
      // Only include the Sentry Vite plugin for production builds
      // (avoids touching Sentry during local dev).
      ...(isProd && process.env.SENTRY_DSN ? [
        sentryVitePlugin(),
      ] : []),
    ],
    build: {
      sourcemap: true,
    },
  };
});