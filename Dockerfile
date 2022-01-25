FROM node:alpine

ARG BuildMode

WORKDIR /usr/app/

COPY package.json ./
COPY app/backend/package.json ./app/backend/
COPY app/frontend/package.json ./app/frontend/

COPY yarn.lock ./
RUN yarn install

COPY app/ ./
COPY tsconfig.base.json ./
COPY tsconfig.json ./

COPY .env."$BuildMode" .env
ENV NODE_ENV "$BuildMode"

CMD yarn turbo run deploy