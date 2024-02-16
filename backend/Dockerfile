FROM node:21-alpine3.18 AS builder

# Create and set permissions for directories (without relying on specific users)
RUN mkdir -p /usr/movies /usr/app/uploads && \
    chmod 775 /usr/movies /usr/app/uploads

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional sharp

FROM ghcr.io/puppeteer/puppeteer:latest

# Switch to non-root user
USER newuser

WORKDIR /usr/app

COPY --from=builder /app /usr/app
