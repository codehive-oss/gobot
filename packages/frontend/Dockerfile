FROM node:16 as builder
ARG BuildMode

WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .

RUN yarn build

FROM node:16 as runner
ARG BuildMode

WORKDIR /usr/app
COPY package.json ./
RUN if [ "$BuildMode" = "production" ]; then yarn install --production; else yarn install; fi

# TODO: Optimize copy to reduce image size
COPY --from=builder ./usr/app/.next ./.next

ENV NODE_ENV "$BuildMode"

EXPOSE 3000

# CMD if [ "$BuildMode" = "production" ]; then yarn start; else yarn dev; fi
CMD yarn start 