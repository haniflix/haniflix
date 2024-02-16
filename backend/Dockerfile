FROM node:21-alpine3.18 AS builder

# Create directories
RUN mkdir -p /usr/movies /usr/app/uploads/avatars

# Change ownership and set permissions for directories (assuming Puppeteer uses 'pptruser')
RUN chown -R node:node /usr/app && \
    chmod -R 755 /usr/app /usr/movies /usr/app/uploads/avatars

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional sharp

FROM ghcr.io/puppeteer/puppeteer:latest

USER node

WORKDIR /usr/app

COPY --from=builder /app .

# Start the application
CMD ["npm", "start"]
