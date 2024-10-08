/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { replaceFiles } from '@nx/vite/plugins/rollup-replace-files.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    root: 'apps/app/web',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "apps/app/web/styles.scss";
          `,
        },
      },
    },
    build: {
      emptyOutDir: false,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      include: ['**/*.scss'],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    cacheDir: '../../node_modules/.vite/apps/app',
    server: {
      port: 4200,
      host: 'localhost',
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      react(),
      nxViteTsPaths(),
      replaceFiles([
        {
          replace: 'apps/app/environments/environment.ts',
          with: 'apps/app/environments/environment.prod.ts',
        },
      ]),
    ],
    test: {
      globals: true,
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/app',
        provider: 'v8',
      },
      setupFiles: ['shared/setupTests.ts'],
      cache: {
        dir: '../../node_modules/.vitest/apps/app',
      },
      environment: 'jsdom',
      include: [
        'shared/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        'web/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      ],
      watch: false,
    },
  });
};
