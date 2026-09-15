import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';

// Dedicated prototype origin and asset root; M0 builds do not copy generated files.
export default defineConfig({
 publicDir:'m1-prototype-public',
 server:{host:'127.0.0.1',port:5174,strictPort:true},
 build:{target:'es2022',outDir:'../../.runtime/m1-build',emptyOutDir:true,chunkSizeWarningLimit:1600,
  rollupOptions:{input:fileURLToPath(new URL('./m1-prototype.html',import.meta.url))}},
});
