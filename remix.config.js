// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== "production") require("dotenv").config();

/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/build",
};
