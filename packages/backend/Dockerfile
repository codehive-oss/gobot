FROM node:16

ARG BuildMode

WORKDIR /usr/app/
COPY package.json ./
# RUN if [ "$BuildMode" = "production" ]; then yarn install --production; else yarn install; fi
RUN yarn install

COPY . .
RUN yarn build

# TODO: Optmize for production
# COPY --from=builder ./usr/app/dist ./dist
# COPY ./usr/app/assets ./assets

COPY .env."$BuildMode" .env

ENV NODE_ENV "$BuildMode"

EXPOSE 4000

# CMD if [ "$BuildMode" = "production" ]; then yarn start; else yarn dev; fi
CMD yarn start