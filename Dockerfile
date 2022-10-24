FROM node:14.17.6-alpine3.14 as builder
ENV NODE_ENV=development

RUN mkdir -p /home/node/app/node_modules

RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

FROM node:14.17.6-alpine3.14

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm ci

COPY --from=builder /home/node/app/dist ./dist

EXPOSE 3000

CMD [ "tail", "-f" , "/dev/null" ]
