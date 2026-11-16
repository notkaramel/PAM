import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(root, './src'),
      '@components': path.resolve(root, './src/components'),
      '@search': path.resolve(root, './src/search'),
      '@panels': path.resolve(root, './src/panels'),
      '@utility': path.resolve(root, './src/utility'),
    },
  },
  plugins: [tailwindcss(), svelte()],
  build: {
    // Verovio WASM is a single ~8MB module; raise the limit after code-splitting it out.
    chunkSizeWarningLimit: 9000,
    // Vite 8 / Rolldown: codeSplitting replaces deprecated manualChunks.
    // Keep Verovio out of the vendor group so its dynamic import stays lazy
    // (forcing it into a named group pulled the preload helper into a sync path).
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules[\\/](?!verovio(?:[\\/]|$))/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['verovio'],
  },
})
