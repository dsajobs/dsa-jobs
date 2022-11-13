FROM node:lts-slim

WORKDIR /app

COPY package.json* ./

RUN npm config delete proxy

RUN npm config delete https-proxy

RUN npm config set registry="http://registry.npmjs.org/"

RUN npm config set fetch-retry-mintimeout 20000

RUN npm config set fetch-retry-maxtimeout 120000

RUN npm cache clean --force

RUN npm install -g npm@9.1.1

RUN npm install --legacy-peer-deps

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm" , "start"]