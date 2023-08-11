FROM node:18-alpine

USER node
WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3005

CMD ["yarn", "start"]
