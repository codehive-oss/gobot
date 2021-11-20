FROM node:16 as builder

WORKDIR /usr/app
COPY package*.json .
RUN yarn install
COPY . .
RUN if [ "$BuildMode" = "production" ]; then yarn build; else yarn clean; fi

FROM node:16 as runner

ARG BuildMode

WORKDIR /usr/app/
COPY package.json ./
RUN if [ "$BuildMode" = "production" ]; then yarn install --production; else yarn install; fi

# TODO: Optmize for production
# COPY --from=builder ./usr/app/dist ./dist
# COPY ./usr/app/assets ./assets

COPY . .

COPY .env."$BuildMode" .env

ENV NODE_ENV "$BuildMode"

EXPOSE 4000

CMD if [ "$BuildMode" = "production" ]; then yarn start; else yarn dev; fi