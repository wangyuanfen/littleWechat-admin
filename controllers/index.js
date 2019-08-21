const db = require('../models');
const Op = db.sequelize.Sequelize.Op;
const {jsonResult} = require('../config/http');
const { 
  ad: adModel,
  channel: channelModel,
  goods: goodsModel,
  brand: brandModel,
  topic: topicModel,
  category: categoryModel
} = require('../models');

const index = async function (ctx) {
  let banner = await adModel.findAll({where: {ad_position_id: 1}});
  let channel = await channelModel.findAll({order: ['sort_order']});
  let newGoodsList = await goodsModel.findAll({where: {is_new: 1}, limit: 4, attributes: ['id', 'name', 'list_pic_url', 'retail_price']});
  let hotGoodsList = await goodsModel.findAll({where: {is_hot: 1}, limit: 3, attributes: ['id', 'name', 'list_pic_url', 'retail_price', 'goods_brief']});
  let brandList = await brandModel.findAll({where: {is_new: 1}, order: ['new_sort_order'], limit: 4});
  let topicList = await topicModel.findAll({limit: 3});
  let categoryList = await categoryModel.findAll({where: {parent_id: 0, name: {[Op.ne]: '推荐'}}});
  let newCategoryList = [];
  for (let categoryItem of categoryList) {
    let childCategoryIds = await categoryModel.findAll({where: {parent_id: categoryItem.id}, limit: 100, attributes: ['id']});
    childCategoryIds = childCategoryIds.map((item) => {
      return item.id;
    });
    const categoryGoods = await goodsModel.findAll({where: {category_id: {[Op.in]: childCategoryIds}}, limit: 7, attributes: ['id', 'name', 'list_pic_url', 'retail_price']});
    newCategoryList.push({
      id: categoryItem.id,
      name: categoryItem.name,
      goodsList: categoryGoods
    });
  }
  ctx.body = jsonResult(0, {
    banner: banner,
    channel: channel,
    newGoodsList: newGoodsList,
    hotGoodsList: hotGoodsList,
    brandList: brandList,
    topicList: topicList,
    categoryList: newCategoryList
  });
};

module.exports = {
  index: index
}