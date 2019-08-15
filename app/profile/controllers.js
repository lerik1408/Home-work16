const User = require('../models/user');
const uploadS3 = require('../utils/uploadS3');

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
exports.updateUserPhoto = async (ctx) => {
  const photo = await uploadS3('user-photo', ctx.request.files.photo);
  // eslint-disable-next-line no-underscore-dangle
  await User.findByIdAndUpdate(ctx.state.user._id, { photo });
  ctx.body = {
    photo,
  };
};
