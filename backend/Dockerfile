# build environment
FROM node:14.18.1-buster as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./
RUN npm run build

# production environment
FROM node:14.18.1-buster-slim

RUN set -ex \
  && apt-get update \
  && apt-get install -y build-essential make python3 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ARG PORT=80

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production
COPY --from=build /app/build ./build

# for runtime
COPY --from=build /app/knexfile.js ./build

# for migration
COPY ./knexfile.js ./
COPY ./migrations ./migrations
COPY ./seeds ./seeds

# Add docker-compose-wait tool
ENV WAIT_VERSION 2.9.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait ./
RUN chmod +x /app/wait

ENV PORT=$PORT \  
  DB_HOST= \
  DB_PORT= \
  DB_USER= \
  DB_PASSWORD= \
  DB_NAME= 

EXPOSE $PORT
CMD ["node", "./build/src/start.js"]
