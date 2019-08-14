const Koa = require('koa');
// const path = require('path');
const config = require('config');
const Router = require('koa-router');
const body = require('koa-body');
const mongoose = require('mongoose');
const koaSwagger = require('koa2-swagger-ui');
const serve = require('koa-static');
const cors = require('@koa/cors');
const passport = require('./app/libs/passport/index');

mongoose.connect(config.get('databaseUrl'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

passport.initialize();


// mongoose.connect('mongodb+srv://lerik1408:Okf123fu@cluster0-osbtr.gcp.mongodb.net/test?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
// });


const app = new Koa();
const router = new Router({
  prefix: '/api',
});
app.use(serve('docs'));
app.use(
  koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
      url: 'http://localhost:3000/docs.yml', // example path to json
    },
  }),
);
app.use(cors());
app.use(body({
  multipart: true,
}));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    const errors = [];
    Object.keys(err.errors).forEach((key) => {
      if (err.errors[key].kind === 'Number') {
        errors.push(`The cell ${key} must be a number.`);
      } else if (err.errors[key].kind === 'unique') {
        errors.push(`The field ${key} is already taken by this value. Please enter another value`);
      } else {
        errors.push(err.errors[key].message);
      }
    });
    ctx.status = 500;
    ctx.body = {
      error: errors,
    };
  }
});


router.use('/auth', require('./app/auth/router').routes());

app.use(router.routes());
app.listen(config.get('port'));
