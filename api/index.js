/* eslint-disable @typescript-eslint/no-var-requires */

const { createRequestHandler } = require("@remix-run/vercel");

module.exports = createRequestHandler({
  build: require("./build"),
});
