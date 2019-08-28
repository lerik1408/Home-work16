const mongoose = require('mongoose');
const User = require('../models/user');
const uploadS3 = require('../utils/uploadS3');

exports.profile = async (ctx) => {
  const user = await User.findById(ctx.state.user._id).populate('stack');
  ctx.body = {
    user,
  };
};
exports.updateUserCategory = async (ctx) => {
  const user = await User.findById(ctx.state.user._id);
  user.stack = mongoose.Types.ObjectId(ctx.request.body.id);
  // user.cat = 'awdqweqwe';
  user.save();
  ctx.body = {
    success: true,
  };
};
exports.profileUpdate = async (ctx) => {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  await User.findByIdAndUpdate(body._id, body);
  ctx.body = body;
};
exports.updateUserPhoto = async (ctx) => {
  const photo = await uploadS3('user-photo', ctx.request.files.photo);
  await User.findByIdAndUpdate(ctx.state.user._id, { photo });
  ctx.body = {
    photo,
  };
};
