FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["sh", "-c", "npm start"]
