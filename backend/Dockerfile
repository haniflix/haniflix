FROM node:21-alpine3.18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional sharp

FROM ghcr.io/puppeteer/puppeteer:latest

# Create and set permissions for directories
RUN mkdir -p /usr/movies && \
    mkdir -p /usr/app/uploads && \
    chown -R newuser:newuser /usr/movies /usr/app/uploads

# Switch to non-root user
USER newuser

WORKDIR /usr/app

COPY --from=builder /app /usr/app
