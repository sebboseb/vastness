import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: {host: '127.0.0.1', port: 5175, strictPort: true, proxy: {'/api/intent': 'http://127.0.0.1:4311'}},
  build: {outDir: 'dist/intention-generation', target: 'es2022', chunkSizeWarningLimit: 2100, rollupOptions: {input: fileURLToPath(new URL('intention-generation.html', import.meta.url))}},
});
