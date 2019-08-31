const passport = require('koa-passport');
const jwt = require('jwt-simple');
const config = require('config');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const User = require('../models/user');
const Category = require('../models/category');
const email = require('../utils/sendEmail');

exports.signUp = async (ctx) => {
  const idCatagory = await Category.find({});
  const { body } = ctx.request;
  const user = new User({
    name: body.name,
    surname: body.surname,
    username: body.username,
    email: body.email,
    password: body.password,
    stack: mongoose.Types.ObjectId(idCatagory[0]._id),
  });
  await user.save();
  const html = nunjucks.render('./app/templates/signUp.njk', body);
  await email(
    body.email,
    'fixer@mail.com',
    'Hello',
    html,
  );
  ctx.status = 201;
  ctx.body = {
    registration: user,
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
      ctx.body = {
        token: сipherToken,
        user: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          photo: user.photo,
        },
      };
      user.save();
    } else {
      ctx.body = {
        error: err,
      };
      // ctx.status = 401;
    }
  })(ctx, next);
};

exports.check = async (ctx) => {
  const findItem = await User.find({ email: ctx.request.body.email });
  ctx.body = {
    people: findItem,
  };
};
exports.password = async (ctx) => {
  const { body } = ctx.request;
  const user = await User.findById(body._id);
  user.password = body.password;
  const html = nunjucks.render('./app/templates/recPassword.njk', body);
  await email(
    body.email,
    'fixer@mail.com',
    'Password recovery',
    html,
  );
  user.save();
  ctx.body = {
    password: body.password,
  };
};

exports.sendEmail = async (ctx) => {
  await email(
    'popruzhuk.38@gmail.com',
    'dddd.@example.com',
    'Hello',
    'Text',
    '<p>text</p>',
  );
  ctx.body = {
    send: true,
  };
};
