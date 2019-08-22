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
  const allPeople = await User.find(query).sort({ ...sort }).populate('stack');
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
