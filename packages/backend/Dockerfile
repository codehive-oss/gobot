FROM node:16 as builder

WORKDIR /backend
COPY package.json ./
COPY tsconfig.json ./
RUN yarn install
COPY . .
RUN yarn global add typescript
RUN tsc


FROM node:16 as runner

WORKDIR /backend
COPY package.json ./
RUN yarn install --production
COPY --from=builder dist .
EXPOSE 4000
CMD yarn start