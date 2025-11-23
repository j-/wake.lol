import mdx from '@mdx-js/rollup';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
// import { viteSingleFile } from 'vite-plugin-singlefile';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
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
      manifest: {
        name: 'wake.lol',
        short_name: 'wake.lol',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
          },
        ],
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        related_applications: [
          {
            platform: 'webapp',
            url: 'https://wake.lol/manifest.webmanifest',
          },
        ],
        prefer_related_applications: true,
      },
    }),
    sentryVitePlugin({
      org: "j-hj",
      project: "wake-lol",
    }),
  ],
  build: {
    sourcemap: true,
  },
});