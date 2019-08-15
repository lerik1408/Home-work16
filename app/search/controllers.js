const User = require('../models/user');
const Category = require('../models/category');


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
exports.getCategory = async (ctx) => {
  const categorys = await Category.find({});
  ctx.body = {
    categorys,
  };
};
