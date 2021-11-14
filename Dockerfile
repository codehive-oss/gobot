FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn", "backend", "start"]