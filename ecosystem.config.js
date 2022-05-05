'use strict';

module.exports = {
  apps: [
    {
      name: 'prod',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
