FROM node:7

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 8080

CMD node src/index.js
