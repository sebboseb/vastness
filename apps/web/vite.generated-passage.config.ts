import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: {host: '127.0.0.1', port: 5176, strictPort: true, proxy: {'/api/passage': 'http://127.0.0.1:4312'}},
  build: {outDir: 'dist/generated-passage', target: 'es2022', chunkSizeWarningLimit: 2100, rollupOptions: {input: fileURLToPath(new URL('generated-passage.html', import.meta.url))}},
});
