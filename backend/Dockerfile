ARG PPTRUSER_GID=999  # Default value, can be overridden during build

FROM node:21-alpine3.18 AS builder

# Create directories
RUN mkdir -p /usr/movies /usr/app/uploads/avatars

# Change ownership and set permissions for directories
RUN chown -R node:node /usr/app && \
    chmod -R 755 /usr/app /usr/movies /usr/app/uploads/avatars

WORKDIR /app

COPY package*.json ./

# Ensure shadow-utils is available
RUN apk add --no-cache shadow-utils

RUN npm install --include=optional sharp

FROM ghcr.io/puppeteer/puppeteer:latest

# Switch back to the default user provided by the Puppeteer image
USER pptruser

# Add 'node' user to 'pptruser' group (using full path for grpmod)
RUN /usr/bin/grpmod -g ${PPTRUSER_GID} -M node pptruser

# Adjust directory permissions
RUN chmod g+w /usr/app/uploads

# Obtain actual pptruser_gid during build
RUN ACTUAL_PPTRUSER_GID=$(getent group pptruser | awk -F: '{print $3}')

# Update log message with actual group ID
RUN echo "Using pptruser_gid: ${ACTUAL_PPTRUSER_GID}"

WORKDIR /usr/app

COPY --from=builder /app .

# Start the application
CMD ["npm", "start"]
