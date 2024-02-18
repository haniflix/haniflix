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

# Switch back to the default user provided by the Puppeteer image
USER pptruser

# Create dedicated upload user
RUN useradd -M uploaduser

# Change ownership and set permissions for upload directory
RUN chown uploaduser:uploaduser /usr/app/uploads
RUN chmod 770 /usr/app/uploads

WORKDIR /usr/app

COPY --from=builder /app .

# Start the application
CMD ["npm", "start"]
