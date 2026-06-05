import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-icon.png', 'icon-light-32x32.png', 'icon-dark-32x32.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/fonts\.googleapis\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https?:\/\/fonts\.gstatic\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https?:\/\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'lycan-warden-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      manifest: {
        name: 'Lycan Warden - Werewolf Moderator',
        short_name: 'Lycan Warden',
        description: 'Premium offline-first PWA for Werewolf game moderation. Guide night phases, manage roles, and track victory conditions.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: '/',
        categories: ['games', 'entertainment', 'tools'],
        display_override: ['standalone', 'window-controls-overlay'],
        edge_side_panel: {},
        handle_links: 'preferred',
        launch_handler: {
          client_mode: 'focus-existing',
        },
        screenshots: [],
        shortcuts: [
          {
            name: 'New Game',
            short_name: 'New',
            description: 'Start a new Werewolf game',
            url: '/new-game',
            icons: [{ src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' }],
          },
          {
            name: 'Continue',
            short_name: 'Resume',
            description: 'Continue your last game',
            url: '/continue',
            icons: [{ src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' }],
          },
        ],
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
          {
            src: '/icon-light-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/icon-dark-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/apple-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/apple-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@/components', replacement: path.resolve(__dirname, './components') },
      { find: '@/hooks', replacement: path.resolve(__dirname, './hooks') },
      { find: '@/lib', replacement: path.resolve(__dirname, './lib') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          ui: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
})
