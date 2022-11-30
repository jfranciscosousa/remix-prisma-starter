import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/server-runtime";
import { renderToString } from "react-dom/server";
import { getServerEnvVar } from "./lib/env.server";

if (!getServerEnvVar("SECRET_KEY_BASE")) {
  throw new Error("Please provide a SECRET_KEY_BASE env var!");
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
