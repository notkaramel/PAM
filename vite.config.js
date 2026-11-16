import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@search': path.resolve(__dirname, './src/search'),
      '@panels': path.resolve(__dirname, './src/panels'),
      '@utility': path.resolve(__dirname, './src/utility'),
      // Verovio/Emscripten only needs Node's `module` under Node; stub it for the browser.
      module: path.resolve(__dirname, './src/shims/empty-module.js'),
    },
  },
  plugins: [svelte()],
  build: {
    // Verovio WASM (~8MB) dominates the main chunk; raise limit past that known size.
    chunkSizeWarningLimit: 9000,
  },
  optimizeDeps: {
    exclude: ['verovio'],
  },
})
