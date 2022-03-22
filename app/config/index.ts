import developmentConfig from "./development";
import productionConfig from "./production";
import testConfig from "./test";

export interface ConfigType {
  secureAuthCookie: boolean;
}

function buildConfig() {
  if (process.env.NODE_ENV === "development") return developmentConfig();

  if (process.env.NODE_ENV === "test") return testConfig();

  return productionConfig();
}

const CONFIG = buildConfig();

export default CONFIG;
