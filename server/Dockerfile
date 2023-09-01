FROM node:20-alpine3.17

WORKDIR /wowapi

COPY package*.json ./
COPY prisma ./prisma

RUN npm install && npm cache clean --force

RUN npx prisma generate

COPY . .

