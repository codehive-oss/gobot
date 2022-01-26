FROM node:alpine

RUN apk add --no-cache curl

ARG BuildMode

WORKDIR /usr/app/

COPY package.json yarn.lock ./
COPY app/backend/package.json ./app/backend/
COPY app/frontend/package.json ./app/frontend/

RUN yarn install

COPY ./app ./app

COPY .env."$BuildMode" .env
ENV NODE_ENV "$BuildMode"

CMD yarn turbo run start
