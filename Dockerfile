FROM node:14.17.6-alpine3.14
ENV NODE_ENV=development

RUN mkdir -p /home/node/app/node_modules

RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "tail", "-f" , "/dev/null" ]
