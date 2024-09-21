import "@total-typescript/ts-reset";
import "@total-typescript/ts-reset/dom";

declare module "@remix-run/node" {
  // or cloudflare, deno, etc.
  interface Future {
    unstable_singleFetch: true;
  }
}
