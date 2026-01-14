# Stage 1: Build Angular app
FROM node:20-bullseye AS build

WORKDIR /app

# Копируем package.json и nx.json для кеширования npm install
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY apps/my-city/ ./apps/my-city/
COPY libs/ ./libs/

RUN npm install
RUN npx nx build my-city --prod

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Копируем билд Angular в nginx html
COPY --from=build /app/dist/apps/my-city/browser /usr/share/nginx/html

# Копируем кастомный конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]