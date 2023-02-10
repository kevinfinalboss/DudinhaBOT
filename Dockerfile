FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=RUN npm ci --only=production && npm prune --production

COPY . .

EXPOSE 80

CMD [ "npm", "start"]

LABEL maintainer="kevinfinalboss" \
      version="1.0.0" \
      description="DudinhaBOT"