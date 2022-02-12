FROM node:16-alpine as build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ .

FROM flashspys/nginx-static

CMD [ "npm", "start" ]