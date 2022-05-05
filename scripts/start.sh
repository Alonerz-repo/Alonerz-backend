#!/bin/bash

sudo chmod -R 777 /home/ubuntu/nest

# cp -r /home/ubuntu/env /home/ubuntu/nest/config
cd /home/ubuntu/nest

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

npm install && npm run build
npm run start > app.out.log 2> app.err.log < /dev/null &