FROM node:alpine

RUN apk add --no-cache curl

ARG BuildMode

WORKDIR /usr/app/

COPY package.json yarn.lock ./

COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

COPY packages/api/package.json ./packages/api/
COPY packages/database/package.json ./packages/database/
COPY packages/discord/package.json ./packages/discord/
COPY packages/environment/package.json ./packages/environment/
COPY packages/logger/package.json ./packages/logger/
COPY packages/tsconfig/package.json ./packages/tsconfig/

RUN yarn install

COPY ./apps ./apps
COPY ./packages ./packages

COPY .env."$BuildMode" .env
ENV NODE_ENV "$BuildMode"

CMD yarn turbo run start
