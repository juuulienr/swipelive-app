import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8200,
    sourcemap: true,
    fs: {
      strict: true,
      allow: ['.'],
      deny: [
        '**/.env',
        '**/.env.*',
        '**/node_modules/**',
        '**/.git/**',
        '**/.DS_Store',
        '**/package-lock.json',
        '**/yarn.lock',
        '**/pnpm-lock.yaml',
      ],
    },
    host: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
