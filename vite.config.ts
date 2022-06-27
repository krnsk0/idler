import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  esbuild: {
    define: {
      // see https://github.com/evanw/esbuild/issues/2328
      this: 'window',
    },
  },
});
