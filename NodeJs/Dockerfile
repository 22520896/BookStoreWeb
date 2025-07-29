FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN chmod +x entrypoint.sh

EXPOSE 8083

CMD ["./entrypoint.sh"]
