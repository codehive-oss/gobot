FROM node:16
ARG BuildMode

WORKDIR /usr/app
COPY package.json ./
RUN yarn install

# TODO: Optimize copy to reduce image size
COPY . .
RUN yarn build

ENV NODE_ENV "$BuildMode"

CMD yarn start 