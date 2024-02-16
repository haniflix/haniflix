FROM node:21-alpine3.18 AS builder

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional sharp

FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/app

COPY --from=builder /app /usr/app

# EXPOSE 8800

