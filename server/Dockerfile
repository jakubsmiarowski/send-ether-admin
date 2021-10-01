FROM node:alpine as base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npx prisma generate
FROM base as production
RUN npm run build
WORKDIR ./dist
EXPOSE 5000
