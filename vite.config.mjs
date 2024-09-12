import react from "@vitejs/plugin-react";
import million from "million/compiler";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [million.vite({ auto: true }), react()],
    base: "./",
    server: {
      port: 9911,
    },
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
      ],
    },

    envPrefix: "APP_",
    envDir: "environments",
  };
});
