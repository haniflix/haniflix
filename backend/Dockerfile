FROM ghcr.io/puppeteer/puppeteer:latest

# Install additional dependencies
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    python \
    make \
    g++ \
    pkg-config \
    libpng-dev \
    libjpeg-dev \
    libvips \
    libvips-dev

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN yarn install --ignore-engines

# Copy the rest of the application code
COPY . .

# Expose port and start the application
EXPOSE 8800
CMD ["npm", "start"]
