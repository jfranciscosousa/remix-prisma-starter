import { Link } from "@remix-run/react";
import { Button } from "./ui/button";

export default function Error404Page() {
  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-8 px-4 text-center md:px-6">
      <h1 className="text-6xl font-bold text-red-600 dark:text-red-400">404</h1>
      <h2 className="text-3xl font-semibold">Oops, page not found.</h2>
      <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
        We couldn&apos;t find the page you are looking for, make sure you typed
        in the correct URL.
      </p>

      <Button variant="outline" asChild>
        <Link className="mt-4 block" to="/">
          Go home
        </Link>
      </Button>
    </section>
  );
}
