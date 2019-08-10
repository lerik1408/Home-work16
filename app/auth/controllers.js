const passport = require('koa-passport');
const jwt = require('jwt-simple');
const config = require('config');
const User = require('./models/user');
const Token = require('./models/token');

exports.signUp = async (ctx) => {
  const { body } = ctx.request;
  const user = new User({
    name: body.name,
    surname: body.surname,
    username: body.username,
    email: body.email,
    password: body.password,
  });
  await user.save();
  ctx.body = {
    registration: true,
  };
};

exports.signIn = async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const сipherToken = jwt.encode(payload, config.get('jwtSecret'));
      const token = new Token({
        token: сipherToken,
      });
      ctx.body = {
        token: сipherToken,
        user: {
          name: user.name,
          surname: user.surname,
          gender: user.gender,
          email: user.email,
          photo: user.photo,
        },
      };
      token.save();
    } else {
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};
exports.profile = async (ctx, next) => {
  // passport.authenticate('jwt', { session: false });
  ctx.body = {
    success: true,
  };
};
exports.test = async (ctx, next) => {
  // console.log(ctx);
  // ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.res.writeHead('Access-Control-Allow-Origin', '*');
  ctx.append('Access-Control-Allow-Origin', '*');
  ctx.body = {
    test: 'Hello',
  };
};
exports.search = async (ctx, next) => {
  const allPeople = await User.find({});
  ctx.append('Access-Control-Allow-Origin', '*');
  ctx.body = {
    allPeople,
  };
};
