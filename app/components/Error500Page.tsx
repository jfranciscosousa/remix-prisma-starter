import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { Button } from "./ui/button";
import Error404Page from "./Error404Page";

export default function ErrorPage() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  const errorCode = isRouteError ? error.status : 500;
  const message = isRouteError
    ? error.data.message
    : "We're experiencing some technical issues on our end. Please try again later or go back to the previous page.";

  // This is just for dev, if you want to log server errors do it on entry.server.ts
  console.error(error);

  if (errorCode === 404) return <Error404Page />;

  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-8 px-4 text-center md:px-6">
      <h1 className="text-6xl font-bold text-red-600 dark:text-red-400">
        {errorCode}
      </h1>
      <h2 className="text-3xl font-semibold">Oops, something went wrong.</h2>
      <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
        {message}
      </p>

      <Button variant="outline" asChild>
        <Link className="mt-4 block" to="/">
          Go home
        </Link>
      </Button>
    </section>
  );
}
