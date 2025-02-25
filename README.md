# react-router-prisma-starter

- [React router docs](https://reactrouter.com/home)
- [Fly deployment](https://react-router-prisma-starter.fly.dev/)

## Custom things to this repo

- SSR
- Authentication with cookies
- Backed by Prisma and postgres
- Authorizing resource access
- Locale handling with SSR
- UI components via [shadcnui](https://ui.shadcn.com/)

## Deployment

You can deploy this to [Fly](https://fly.io). You just have to run `fly deploy --remote-only`. This template already has a Github action that does that for you, you just need to setup a `FLY_API_TOKEN` for your Github repo.

## Development

To run the app locally, make sure your project's local dependencies are installed:

```sh
npm i
```

Afterward, start the development server like so:

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
