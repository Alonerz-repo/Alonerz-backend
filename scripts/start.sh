#!/bin/bash

sudo cp /home/ubuntu/environments/nest/* /home/ubuntu/nest/config
sudo chmod -R 777 /home/ubuntu/nest

cd /home/ubuntu/nest

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

npm install
npm run start