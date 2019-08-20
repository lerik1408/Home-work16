// module.exports = {
//   port: process.env.PORT,
//   databaseUrl: process.env.DATABASE_URL,
// };
module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.databaseUrl,
  defaultUserPhotoUrl: 'https://www.placecage.com/c/200/300',
  crypto: {
    hash: {
      length: 100,
      iterations: 10000,
    },
  },
  jwtSecret: process.env.jwtSecret,
  aws: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    bucketName: process.env.bucketName,
  },
  sendGrid: {
    apiKey: process.env.apiKey,
  },
};
