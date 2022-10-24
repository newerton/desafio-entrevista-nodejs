#!/bin/sh

#On error no such file entrypoint.sh, execute in terminal - dos2unix .docker\entrypoint.sh

cd /home/node/app/
if [ ! -f ".env" ]; then
    cp .env.docker .env
fi

npm run typeorm migration:run -- -d ./dist/src/common/config/database.js

node ./dist/src/main.js
