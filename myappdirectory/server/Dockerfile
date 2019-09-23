FROM node:10

RUN npm install nodemon -g

WORKDIR /src
ADD package.json package.json
RUN npm install && npm install helmet && npm install cors && npm install express
