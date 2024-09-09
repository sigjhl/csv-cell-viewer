import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  build: {
    ssr: true,
    outDir: 'dist-electron',
    lib: {
      entry: path.join(__dirname, 'electron/main.ts'),
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    rollupOptions: {
      external: ['electron'],
    },
    emptyOutDir: true,
  },
});