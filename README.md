# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)
- [Fly deployment](https://remix-prisma-starter.fly.dev/)
- [Vercel deployment](https://remix-prisma-starter.vercel.app/)

## Custom things to this repo

- Authentication with cookies
- Backed by Prisma and postgres
- Authorizing resource access
- Locale handling with SSR
- UI components via [shadcnui](https://ui.shadcn.com/)

## Quickstart

Just create a new `remix` project using this template with the following command:

```
npx create-remix@latest --template jfranciscosousa/remix-prisma-starter
```

This will prompt you to add your postgres database details. Make sure to use different databases for development and for testing.

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm install --global vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

You can also deploy this to [Fly](https://fly.io). You just have to run `fly deploy --remote-only`. This template already has a Github action that does that for you, you just need to setup a `FLY_API_TOKEN` for your Github repo.

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm i
```

Afterward, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!


## Testing

This template repo has `playwright` setup with `react-testing-library` utilities. You can see some example tests on the repo itself.

It loads up `.env.test` file config, so it uses a different database and a different dev server port for the E2E tests.

All tests are run in sync by a single worker so we can safely reset the database before each test starts.

Before running `npm run dev test` for the first time, make sure to run these commands:
- `npx playwright install`
- `npx playwright install-deps`
