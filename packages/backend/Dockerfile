FROM node:16 as builder

WORKDIR /usr/app
COPY package*.json .
RUN yarn install
COPY . .
RUN yarn build

FROM node:16 as runner

WORKDIR /usr/app
COPY package.json ./
RUN yarn install --production
COPY --from=builder ./usr/app/dist ./dist

COPY ormconfig.json .
COPY .env .

ENV NODE_ENV production

EXPOSE 4000
CMD yarn start