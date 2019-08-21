const {jsonResult} = require('../config/http');
const { category: categoryModel } = require('../models');

const index = async function (ctx) {
  const data = await categoryModel.findAll({where: {parent_id: 0}, limit: 10, raw: true});
  let currentCategory = null;
  if (data && data.length > 0) {
    currentCategory = data[0];
  }
  // 获取子分类数据
  if (currentCategory && currentCategory.id) {
    currentCategory.subCategoryList = await categoryModel.findAll({where: {parent_id: currentCategory.id}});
  }
  ctx.body = jsonResult(0, {
    categoryList: data,
    currentCategory: currentCategory
  });
};

const current = async function (ctx) {
  const categoryId = ctx.query.id;
  let currentCategory = null;
  if (categoryId) {
    currentCategory = await categoryModel.findOne({where: {id: categoryId}, raw: true});
  }
  // 获取子分类数据
  if (currentCategory && currentCategory.id) {
    currentCategory.subCategoryList = await categoryModel.findAll({where: {parent_id: currentCategory.id}});
  }
  ctx.body = jsonResult(0, {
    currentCategory: currentCategory
  });
};

module.exports = {
  index: index,
  current: current
}