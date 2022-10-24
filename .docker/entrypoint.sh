#!/bin/sh

#On error no such file entrypoint.sh, execute in terminal - dos2unix .docker\entrypoint.sh

cd /home/node/app/
if [ ! -f ".env" ]; then
    cp .env.example .env
fi

npm install

npm run build

node ./dist/src/main.js
