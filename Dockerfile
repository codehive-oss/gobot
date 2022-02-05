FROM node:alpine

RUN apk add --no-cache curl
RUN apk add --no-cache git
RUN apk add --no-cache bash

RUN npm i -g pnpm

ARG BuildMode

WORKDIR /usr/app/

# TODO: use turbo prune --docker
# https://turborepo.org/docs/reference/command-line-reference#turbo-prune---scopetarget
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

COPY packages/api/package.json ./packages/api/
COPY packages/database/package.json ./packages/database/
COPY packages/discord/package.json ./packages/discord/
COPY packages/environment/package.json ./packages/environment/
COPY packages/logger/package.json ./packages/logger/
COPY packages/config/package.json ./packages/config/

RUN pnpm install

COPY . .

ENV NODE_ENV "$BuildMode"

CMD pnpm turbo run deploy
