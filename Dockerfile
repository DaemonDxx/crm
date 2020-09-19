FROM node:14.11.0-alpine

WORKDIR /usr/src/backend

COPY ./ ./

RUN npm install

EXPOSE 3001

ENTRYPOINT npm run start:dev
