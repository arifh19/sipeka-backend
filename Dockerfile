FROM node:lts-alpine

RUN mkdir -p /backend
WORKDIR /backend
COPY package*.json ./
COPY . ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]