const User = require('../models/user');
const uploadS3 = require('../utils/uploadS3');

exports.profile = async (ctx) => {
  const user = await User.findById(ctx.state.user._id);
  ctx.body = {
    user,
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
