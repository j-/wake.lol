import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
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
    viteSingleFile({
      inlinePattern: [
        '!favicon.svg',
        '!favicon.ico',
      ],
    }),
  ],
});
