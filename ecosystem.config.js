'use strict';

module.exports = {
  apps: [
    {
      name: 'worker',
      script: './worker.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
