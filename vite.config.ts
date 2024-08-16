import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import path from "path";
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      million.vite({ auto: true }),
      react(),
    ],
    base: './',
    server: {
      port: 9910,
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },

    envPrefix: "APP_",
    envDir: "environments"
  };
});
