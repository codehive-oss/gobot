FROM node:16

ARG BuildMode

WORKDIR /usr/app/
COPY package.json ./
RUN yarn install

# TODO: Optmize for production
COPY . .
RUN yarn build

COPY .env."$BuildMode" .env
ENV NODE_ENV "$BuildMode"

CMD yarn start