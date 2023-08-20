FROM node:20-alpine3.17
WORKDIR /app/
COPY ./package*.json ./
RUN npm install -g npm@9.8.1