FROM node:21-alpine3.18 AS builder

# Create directories
RUN mkdir -p /usr/movies /usr/app/uploads/avatars

# Change ownership and set permissions for directories (assuming Puppeteer uses 'pptruser')
RUN chown -R node:node /usr/app /usr/movies /usr/app/uploads/avatars && \
    chmod -R 755 /usr/app /usr/movies /usr/app/uploads/avatars

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional sharp

FROM ghcr.io/puppeteer/puppeteer:latest

# Change ownership and set permissions for directories within Puppeteer image
RUN mkdir -p /usr/app/uploads/avatars && \
    chown -R pptruser:pptruser /usr/app/uploads/avatars && \
    chmod -R 755 /usr/app/uploads/avatars

# Switch back to the default user provided by the Puppeteer image
USER pptruser

WORKDIR /usr/app

COPY --from=builder /app .

# Start the application
CMD ["npm", "start"]
