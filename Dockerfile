FROM node:12.6.0-alpine

ARG ANGULAR_ENVIRONMENT

RUN npm install -g angular-http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run "$ANGULAR_ENVIRONMENT"

CMD angular-http-server --path dist/projeto-tis

EXPOSE 8080
