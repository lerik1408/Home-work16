# How to start

1. Сreate the following config in folder app->config->default.js

```javascript
module.exports = {
  port: 3000,
  databaseUrl: "URL",
  defaultUserPhotoUrl: "URL",
  crypto: {
    hash: {
      length: number,
      iterations: number
    }
  },
  jwtSecret: "string",
  aws: {
    accessKeyId: "KEY",
    secretAccessKey: "KEY",
    bucketName: "bucketName"
  },
  sendGrid: {
    apiKey: "KEY"
  }
};
```

2. Run `nodemon server`

# Documentation

[Docs](https://api-my-fixer.herokuapp.com/docs)

# Done

1. Fix password recovery
2. Fix search user
3. README written
4. Deploy in Heroku
# No done
1. Add photo in docs
# Question
    Add iteration and length to calculate the password hash in the config or hide in the Heroku