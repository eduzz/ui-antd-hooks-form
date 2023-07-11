import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '.',
    sourcemap: true,
    lib: {
      entry: './index.tsx',
      name: '@eduzz/ui-antd-hooks-form',
      formats: ['es'],
      fileName: format => `ui-antd-hooks-form.${format}.js`
    },
    rollupOptions: {
      external: [/node_modules/],
      output: {
        preserveModules: true,
        entryFileNames: ({ name: fileName }) => `${fileName}.js`,
        exports: 'named'
      },
      plugins: [
        {
          name: 'prado',
          transform(code, id) {
            console.log({ id, code });
            return undefined;
          }
        }
      ]
    }
  },
  plugins: [react(), cssInjectedByJsPlugin({ topExecutionPriority: true }), dts({ copyDtsFiles: true })]
});
