
FROM node:alpine AS builder

RUN apk update

WORKDIR /usr/app/

RUN npm i -g pnpm
RUN pnpm i -g turbo

COPY . .
RUN turbo prune --docker


FROM node:alpine AS installer

RUN apk update

WORKDIR /usr/app/
RUN npm i -g pnpm

COPY --from=builder /usr/app/out/json/ .
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install

FROM node:alpine AS runner

RUN apk update
RUN apk add --no-cache curl
RUN apk add --no-cache git
RUN apk add --no-cache bash

ARG BuildMode

WORKDIR /usr/app/

COPY --from=installer /usr/app/ .
COPY --from=builder /usr/app/out/full/ .
COPY .gitignore .gitignore

ENV NODE_ENV "$BuildMode"

CMD pnpm turbo run deploy