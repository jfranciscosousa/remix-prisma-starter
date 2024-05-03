ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV production
ENV SECURE_AUTH_COOKIE true
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl ca-certificates
RUN npm install -g pnpm

WORKDIR /app
ADD package.json pnpm-lock.yaml .npmrc ./

# Install production only deps
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Install all deps
FROM base AS all-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod=false --frozen-lockfile

# Build the app
FROM base as build

COPY --from=all-deps /app/node_modules /app/node_modules

ADD prisma .
RUN pnpm prisma generate

ADD . .
RUN pnpm run build

# Copy only the useful stuff
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/docker-start.sh /app/docker-start.sh
ENTRYPOINT [ "./docker-start.sh" ]
