# Build the React/Vite application.
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the production build with nginx.
FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/entrypoint.sh /docker-entrypoint.d/40-smart-ubuhinzi-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/40-smart-ubuhinzi-runtime-config.sh
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80