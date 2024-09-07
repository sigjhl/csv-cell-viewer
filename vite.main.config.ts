import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  build: {
    ssr: true,
    outDir: '.vite/build',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['cjs'],
      fileName: () => 'main.js',
    },
    rollupOptions: {
      external: ['electron'],
      output: {
        entryFileNames: '[name].js',
      },
    },
    emptyOutDir: false,
  },
});