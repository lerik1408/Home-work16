const passport = require('koa-passport');
const jwt = require('jwt-simple');
const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/user');
const Category = require('./models/category');
const uploadS3 = require('../utils/uploadS3');
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
    // eslint-disable-next-line no-underscore-dangle
    stack: mongoose.Types.ObjectId(idCatagory[1]._id),
  });
  await user.save();
  ctx.body = {
    registration: user,
  };
};

exports.signIn = async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        email: user.email,
      };
      const сipherToken = jwt.encode(payload, config.get('jwtSecret'));
      // User.findByIdAndUpdate( user._id, { token: 'сipherToken' });
      user.token = сipherToken;
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
      user.save();
    } else {
      ctx.status = 401;
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};
exports.profile = async (ctx) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findById(ctx.state.user._id);
  ctx.body = {
    user,
  };
};
exports.profileUpdate = async (ctx) => {
  const key = Object.keys(ctx.request.body)[0];
  // eslint-disable-next-line no-underscore-dangle
  await User.findByIdAndUpdate(ctx.state.user._id, { [key]: ctx.request.body[key] });
  ctx.body = {
    [key]: ctx.request.body[key],
  };
};
exports.test = async (ctx, next) => {
  ctx();
  next();
};

exports.search = async (ctx) => {
  let allPeople = await User.find({}).populate('stack');
  const id = await ctx.params.id;
  if (id) {
    if (id.split('').length === 24) {
      // id
      allPeople = await User.find({ _id: id }).populate('stack');
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
      }).populate('stack');
    }
  }
  ctx.body = {
    allPeople,
  };
};

exports.updateUserPhoto = async (ctx) => {
  const photo = await uploadS3('user-photo', ctx.request.files.photo);
  // eslint-disable-next-line no-underscore-dangle
  await User.findByIdAndUpdate(ctx.state.user._id, { photo });
  ctx.body = {
    photo,
  };
};

exports.createCategory = async (ctx) => {
  const { body } = ctx.request;
  if (body.category === '' || body.category === undefined || body.category === null) {
    ctx.body = {
      create: false,
    };
  } else {
    const category = new Category({
      name: body.category,
    });
    await category.save();
    ctx.body = {
      create: true,
    };
  }
};
exports.getCategory = async (ctx) => {
  const categorys = await Category.find({});
  ctx.body = {
    categorys,
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
}
// POPULATE
// let a = await User.find({}).populate('stack');
// await console.log(a[2].stack[0].name);
