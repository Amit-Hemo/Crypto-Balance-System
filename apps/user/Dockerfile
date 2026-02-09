# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.13.0

FROM node:${NODE_VERSION}-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build user
RUN npm run build:db:user

FROM node:${NODE_VERSION}-alpine AS production
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV}
USER node
WORKDIR /usr/src/app
COPY --from=development /usr/src/app/package.json .
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/dist-db ./dist-db
COPY apps/user/entrypoint.sh .

EXPOSE 3003

CMD ./entrypoint.sh
