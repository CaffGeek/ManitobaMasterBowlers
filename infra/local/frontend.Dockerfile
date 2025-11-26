FROM node:20-alpine

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/. .

EXPOSE 4200

CMD ["npm", "start"]
