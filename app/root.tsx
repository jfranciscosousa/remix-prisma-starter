import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { LoaderFunction } from "remix";
import acceptLanguage from "accept-language-parser";
import { LocaleProvider } from "./hooks/useLocale";
import styles from "./styles/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// Load the locale from the Accept-Language header to later
// inject it on the app's context
export const loader: LoaderFunction = async ({ request }) => {
  const languages = acceptLanguage.parse(
    request.headers.get("Accept-Language") as string
  );

  // If somehow the header is empty, return a default locale
  if (languages?.length < 1) return "en-us";

  // If there is no region for this locale, just return the country code
  if (!languages[0].region) return languages[0].code;

  return `${languages[0].code}-${languages[0].region.toLowerCase()}`;
};

export default function App() {
  const locale = useLoaderData();

  return (
    <LocaleProvider locale={locale}>
      <Document>
        <Layout>
          <Outlet />
        </Layout>
      </Document>
    </LocaleProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error("Error", error);

  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
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
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-8 max-w-6xl mx-auto h-screen">{children}</div>;
}
