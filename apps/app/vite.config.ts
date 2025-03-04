/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { replaceFiles } from '@nx/vite/plugins/rollup-replace-files.plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    root: './web',
    envDir: '.',
    ssr: {
      noExternal: ['@supabase/supabase-js', 'react-router-dom'],
    },
    resolve: {
      alias: {
        '@shared': path.resolve('./shared'),
      },
    },
    build: {},
    optimizeDeps: {
      include: ['**/*.scss'],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    cacheDir: '../../node_modules/.vite',
    server: {
      port: 4200,
      host: 'localhost',
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      react({
        babel: {
          plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@loadable/babel-plugin',
          ],
        },
      }),
      nxViteTsPaths(),
      replaceFiles([
        {
          replace: 'environments/environment.ts',
          with: 'environments/environment.prod.ts',
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
        dir: '../../node_modules/.vitest',
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
