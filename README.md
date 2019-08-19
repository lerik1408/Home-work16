# How to start
1. Сreate the following config in folder app->config->default.js
```javascript
module.exports = {
  port: 3000,
  databaseUrl: 'URL',
  defaultUserPhotoUrl: 'URL',
  crypto: {
    hash: {
      length: number,
      iterations: number,
    },
  },
  jwtSecret: 'string',
  aws: {
    accessKeyId: 'KEY',
    secretAccessKey: 'KEY',
    bucketName: 'bucketName',
  },
  sendGrid: {
    apiKey: 'KEY',
  },
};
```
2. Run `nodemon server`
# Documentation
[Docs](http://localhost:3000/docs)
