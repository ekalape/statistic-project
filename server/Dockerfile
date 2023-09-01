FROM node:20-alpine3.17

WORKDIR /wowapi

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

