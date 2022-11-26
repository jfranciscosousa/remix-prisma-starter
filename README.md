# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Custom things to this repo

- Authentication with cookies
- Backed by Prisma and Postgres
- Authorizing resource access
- Locale handling with SSR

## Quickstart

Just create a new `remix` project using this template with the following command:

```
npx create-remix@latest --template jfranciscosousa/remix-prisma-starter
```

This will prompt you to add your Postgres database details. Make sure to use different databases for development and for testing.

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
yarn global add vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
yarn
```

Afterwards, start the Remix development server like so:

```sh
yarn dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

## Testing

This template repo has `playwright` setup with `react-testing-library` utilities. You can see some example tests on the repo itself.

It loads up `.env.test` file config, so it uses a different database and a different dev server port for the E2E tests.

Each testing run drops and resets the database so we can ensure non-flaky tests every time.

Before running `yarn test` for the first time, make sure to run these commands:
- `npx playwright install`
- `npx playwright install-deps`
