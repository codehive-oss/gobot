FROM node:16
ARG BuildMode

WORKDIR /usr/app
COPY package.json ./
# RUN if [ "$BuildMode" = "production" ]; then yarn install --production; else yarn install; fi
RUN yarn install

# TODO: Optimize copy to reduce image size
COPY . .
RUN yarn build

ENV NODE_ENV "$BuildMode"

EXPOSE 3000

# CMD if [ "$BuildMode" = "production" ]; then yarn start; else yarn dev; fi
CMD yarn start 