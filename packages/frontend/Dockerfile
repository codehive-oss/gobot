FROM node:16
ARG BuildMode

WORKDIR /usr/app
COPY package.json ./
RUN yarn install

# TODO: Optimize copy to reduce image size
COPY . .

ENV NODE_ENV "$BuildMode"

CMD yarn build && yarn start