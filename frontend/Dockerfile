# build environment
FROM node:14.18.1-buster as build
WORKDIR /app

ARG API_URL=http://localhost:3001/api
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

ENV API_URL=$API_URL
RUN npm run build

# production environment
FROM nginx:latest

COPY --from=build /app/build/ /usr/share/nginx/html

EXPOSE 80
