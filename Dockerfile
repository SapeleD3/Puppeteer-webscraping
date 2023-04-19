# Filename: Dockerfile

FROM node:slim

# Install Puppeteer dependencies
RUN apt-get update && \
    apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*

# Set environment variable for Puppeteer to use Chromium installed in the container
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# FROM public.ecr.aws/lambda/nodejs:14.2022.09.09.11
# Create working directory
WORKDIR /usr/src/app

# Copy package.json
COPY . ./

# Install NPM dependencies for function
RUN npm install && npm run build

# Expose app
EXPOSE 8080

# Run app
CMD ["node", "dist/main.js"]