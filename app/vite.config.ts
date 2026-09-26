import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';

// WASM handling follows midnightntwrk/example-bboard's UI config.
export default defineConfig({
  base: './',
  build: { target: 'esnext' },
  plugins: [react(), wasm()],
  optimizeDeps: {
    exclude: ['@midnight-ntwrk/onchain-runtime-v3'],
  },
});
