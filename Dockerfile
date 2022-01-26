FROM node:alpine

RUN apk add --no-cache curl

ARG BuildMode

WORKDIR /usr/app/

COPY package.json yarn.lock ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

RUN yarn install

COPY ./apps ./apps

COPY .env."$BuildMode" .env
ENV NODE_ENV "$BuildMode"

CMD yarn turbo run start
