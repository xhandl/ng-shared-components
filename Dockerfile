### STAGE 1: build ###
FROM node:20 AS build

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

## Copy app source
COPY . .

# Build to ouput folder with production configuration
RUN npm run build:prod


### STAGE 2: Run ###
FROM alpine:latest

# Install Nginx HTTP server and essential modules/utilities
RUN apk add --no-cache nginx nginx-mod-http-headers-more

# Copy nginx configs
COPY ./docker/nginx.conf /etc/nginx/

# Copy built app
COPY --from=build /src/dist/ng-shared-components/ /usr/share/nginx/html

# Set permissions for nginx user
RUN chown -R nginx:nginx /etc/nginx /usr/share/nginx/html && \
    chmod -R go-w /etc/nginx /usr/share/nginx/html

# Switch to non-root user
USER nginx

# Start app
CMD ["sh", "-c", "echo App is running...; nginx -g 'daemon off;'"]

EXPOSE 8080
