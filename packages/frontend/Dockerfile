FROM node:16 as builder

WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16 as runner

WORKDIR /usr/app
COPY package.json ./
RUN yarn install --production
COPY --from=builder ./usr/app/.next ./.next

ENV NODE_ENV production

EXPOSE 3000 
CMD yarn start