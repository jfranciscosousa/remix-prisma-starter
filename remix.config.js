/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: [".*"],
  publicPath: "/build/",
  server: process.env.VERCEL_ENV ? "./server.js" : undefined,
  serverBuildPath: process.env.VERCEL_ENV ? "api/index.js" : "build/index.js",
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  tailwind: true,
  future: {
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_routeConvention: true,
  },
};
