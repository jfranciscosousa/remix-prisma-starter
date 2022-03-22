import { ConfigType } from ".";

export default function productionConfig(): ConfigType {
  return {
    secureAuthCookie: true,
  };
}
