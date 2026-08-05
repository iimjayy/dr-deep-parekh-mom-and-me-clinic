import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    // Honour an injected PORT so several previews can run side by side.
    port: Number(process.env.PORT) || 3000,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Keep the vendor runtime in its own long-lived chunk.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
