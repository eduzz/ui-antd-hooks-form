import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '.',
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: './index.tsx',
      name: '@eduzz/ui-antd-hooks-form',
      formats: ['es'],
      fileName: format => `ui-antd-hooks-form.${format}.js`
    },
    rollupOptions: {
      external: id => !id.startsWith('.') && !path.isAbsolute(id),
      output: {
        preserveModules: true,
        entryFileNames: ({ name: fileName }) => `${fileName}.js`,
        exports: 'named'
      }
    }
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin({ topExecutionPriority: true, relativeCSSInjection: true }),
    dts({ copyDtsFiles: true })
  ]
});
