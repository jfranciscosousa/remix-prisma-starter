import developmentConfig from "./development";
import productionConfig from "./production";
import testConfig from "./test";

export interface ConfigType {
  secureAuthCookie: boolean;
}

function buildConfig() {
  if (process.env.NODE_ENV === "production") return productionConfig();

  if (process.env.NODE_ENV === "test") return testConfig();

  return developmentConfig();
}

const CONFIG = buildConfig();

export default CONFIG;
