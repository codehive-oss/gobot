FROM node:16

WORKDIR /frontend

COPY package*.json ./

RUN yarn install --production

COPY . .

EXPOSE 3000 

CMD yarn start