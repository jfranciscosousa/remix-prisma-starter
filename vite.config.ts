import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  optimizeDeps: { exclude: ["@mapbox/node-pre-gyp"] },
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      serverModuleFormat: "cjs",
    }),
    tsconfigPaths(),
  ],
});
