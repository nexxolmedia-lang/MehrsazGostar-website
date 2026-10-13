import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `vite build --mode offline` produces dist-offline/index.html: a single self-contained file
// (scripts, styles, fonts and images inlined) that opens directly from disk via file://.
export default defineConfig(({ mode }) => {
  const offline = mode === 'offline';
  return {
    plugins: offline ? [react(), viteSingleFile()] : [react()],
    base: offline ? './' : '/',
    build: offline ? { outDir: 'dist-offline', emptyOutDir: true } : undefined,
    server: { port: 5173 },
    preview: { port: 4173 },
  };
});
