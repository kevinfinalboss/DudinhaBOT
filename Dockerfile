FROM node:14-slim
WORKDIR /usr/src/bot


COPY package*.json ./
RUN npm install --only=production

COPY . .


EXPOSE 3000
CMD ["node", "index.js"]

LABEL maintainer="kevinfinalboss" \
      version="1.0.0" \
      description="DudinhaBOT"