import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import acceptLanguage from "accept-language-parser";
import React from "react";
import { ToastsRenderer } from "./hooks/useToast";
import styles from "./root.css";
import { CLIENT_ENV } from "./env";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// Load the locale from the Accept-Language header to later
// inject it on the app's context
function localeFromRequest(request: Request): string {
  const languages = acceptLanguage.parse(
    request.headers.get("Accept-Language") as string
  );

  // If somehow the header is empty, return a default locale
  if (languages?.length < 1) return "en-us";

  // If there is no region for this locale, just return the country code
  if (!languages[0].region) return languages[0].code;

  return `${languages[0].code}-${languages[0].region.toLowerCase()}`;
}

export const loader = async ({ request }: DataFunctionArgs) => {
  return {
    locale: localeFromRequest(request),
    ENV: CLIENT_ENV,
    rootTime: new Date().toISOString(),
  };
};

export type RootLoaderType = Awaited<ReturnType<typeof loader>>;

export function useRootLoaderData(): RootLoaderType {
  return useMatches()[0].data;
}

export default function App() {
  const { ENV } = useLoaderData();

  return (
    <Document>
      <script
        // Set the variables for our `envVars` modules
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)}`,
        }}
      />

      <Outlet />

      <ToastsRenderer />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </Document>
    );
  }

  console.error(error);

  return (
    <Document>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <React.StrictMode>
      <html className="bg-base-100" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </React.StrictMode>
  );
}
