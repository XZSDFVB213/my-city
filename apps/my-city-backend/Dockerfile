FROM node:20-bullseye

WORKDIR /app

COPY dist/apps/my-city-backend ./

COPY package.json package-lock.json ./

RUN npm install --production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "main.js"]