const passport = require('koa-passport');
const jwt = require('jwt-simple');
const config = require('config');
const User = require('./models/user');
// const Token = require('./models/token');

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
  ctx.append('Access-Control-Allow-Origin', '*');
  // let body = JSON.parse(ctx.request.body);
  // let body = ctx.request.body;
  // ctx.request.body=JSON.parse(ctx.request.body);
  console.log(ctx.request.body);
  await passport.authenticate('local', (err, user) => {
    if (user) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const сipherToken = jwt.encode(payload, config.get('jwtSecret'));
      console.log(user.token);
      // User.findByIdAndUpdate('user._id', { token: 'сipherToken' });
      user.token = сipherToken;
      ctx.body = {
        token: сipherToken,
        user: {
          name: user.name,
          surname: user.surname,
          gender: user.gender,
          email: user.email,
          photo: user.photo,
          token: user.token,
        },
      };
      user.save();
    } else {
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};
exports.profile = async (ctx, next) => {
  ctx.body = {
    success: true,
  };
};
exports.test = async (ctx, next) => {
  const body = ctx.request.body;
  console.log(body);
  ctx.append('Access-Control-Allow-Origin', '*');
  ctx.body = {
    test: 'Hello',
  };
};

exports.search = async (ctx, next) => {
  let allPeople = await User.find({});
  ctx.append('Access-Control-Allow-Origin', '*');
  const id = await ctx.params.id;
  if (id) {
    if (id.split('').length === 24) {
      // id
      allPeople = await User.find({ _id: id });
    } else {
      // name
      allPeople = await User.find({
        $or: [
          {
            name: {
              $regex: id,
              $options: 'i',
            },
          },
        ],
      });
    }
  }
  ctx.body = {
    allPeople,
  };
};
