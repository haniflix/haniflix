FROM node:21-alpine3.18 AS builder

# Create directories
RUN mkdir -p /usr/movies /usr/app/uploads/avatars

# Change ownership and set permissions for directories
RUN chown -R node:node /usr/app && \
    chmod -R 755 /usr/app /usr/movies /usr/app/uploads/avatars

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional sharp

FROM ghcr.io/puppeteer/puppeteer:latest

# Switch back to the default user provided by the Puppeteer image
USER pptruser

# Add 'node' and 'pptruser' users to 'www-data' group
RUN adduser node www-data && adduser pptruser www-data

# Adjust directory permissions
RUN chmod g+w /usr/app/uploads

WORKDIR /usr/app

COPY --from=builder /app .

# Start the application
CMD ["npm", "start"]
