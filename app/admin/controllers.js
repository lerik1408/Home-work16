const Category = require('../models/category');


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
