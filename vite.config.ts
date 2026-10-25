import { defineConfig } from 'vite';

export default defineConfig({
  root: 'site',
  base: './',
  appType: 'mpa',
  input: ['index.html', 'grid.html', 'flex.html', 'dock.html', 'algorithms.html', 'heap.html', 'dictionary.html'],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
