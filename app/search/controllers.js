const User = require('../models/user');
const Category = require('../models/category');

exports.profile = async (ctx) => {
  const profile = await User.findById(ctx.params.id).populate('stack');
  ctx.body = {
    profile,
  };
};
exports.people = async (ctx) => {
  const { body } = ctx.request;
  const query = {};
  const sort = {};
  // Category
  if (body.category !== '0') {
    query.stack = body.category;
  }
  // Sort
  if (body.sort !== '0') {
    if (body.sort === '1') {
      sort.dailyRate = 1;
    } else if (body.sort === '2') {
      sort.dailyRate = -1;
    } else if (body.sort === '3') {
      sort.rating = 1;
    } else {
      sort.rating = -1;
    }
  }
  // Name
  if (body.name !== '') {
    query.$or = [{
      name: {
        $regex: body.name,
        $options: 'i',
      },
    }];
  }
  const id = await ctx.params.id;
  const allPeople = await User.find(query).sort({ ...sort }).limit(6).skip((id - 1) * 6).populate('stack');
  const pages = await User.find(query).sort({ ...sort });
  console.log(pages.length);
  ctx.body = {
    allPeople,
    pages: pages.length,
  };
};
exports.getCategory = async (ctx) => {
  const categorys = await Category.find({});
  ctx.body = {
    categorys,
  };
};
