/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildPath: process.env.VERCEL_ENV ? "api/index.js" : "build/index.js",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.VERCEL_ENV ? "./server.js" : undefined,
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
  future: {
    unstable_tailwind: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_routeConvention: true,
  },
};
