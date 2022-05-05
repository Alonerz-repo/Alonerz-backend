#!/bin/bash

sudo chmod -R 777 /home/ubuntu/nest

sudo cp /home/ubuntu/environments/nest/* /home/ubuntu/nest/config
cd /home/ubuntu/nest

sudo npm install && npm run build
npm run start:prod