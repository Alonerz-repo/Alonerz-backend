'use strict';

module.exports = {
  apps: [
    {
      name: 'prod',
      script: './dist/main.js', // pm2로 실행될 파일 경로
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
