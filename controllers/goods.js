const db = require('../models');
const Op = db.sequelize.Sequelize.Op;
const {jsonResult} = require('../config/http');
const { getUserId } = require('../service/token');
const {
	attribute: attributeModel, 
	goods: goodsModel,
	goods_gallery: goodsGalleryModel,
	goods_attribute: goodsAttributeModel,
	goods_specification: goodsSpecificationModel,
	specification: specificationModel,
	category: categoryModel,
	search_history: searchHistoryModel,
	goods_issue: goodsIssueModel,
	brand: brandModel,
	comment: commentModel,
	comment_picture: commentPictureModel,
	user: userModel,
	collect: collectModel,
	footprint: footprintModel,
	related_goods: relatedGoodsModel,
	product: ProductModel
} = require('../models');

const count = async function (ctx) {
	let goodsCount = await goodsModel.count({where: {is_delete: 0, is_on_sale: 1}});
  ctx.body = jsonResult(0, {
    goodsCount: goodsCount
  });
};

const list = async function (ctx) {
	const userId = await getUserId(ctx.headers['X-Yanxuan-Token']);
	const categoryId = ctx.query.categoryId;
	const brandId = ctx.query.brandId;
	const keyword = ctx.query.keyword;
	const isNew = ctx.query.isNew;
	const isHot = ctx.query.isHot;
	const page = ctx.query.page ? parseInt(ctx.query.page) : 1;
	const size = ctx.query.size && ctx.query.size !== 'undefined' ? parseInt(ctx.query.size) : 20;
	const offset = ctx.query.page == 1 ? 0 : (ctx.query.page - 1) * ctx.query.size;
	const sort = ctx.query.sort;
	const order = ctx.query.order;

	const whereMap = {};
	if (isNew) whereMap.is_new = isNew;
	if (isHot) whereMap.is_hot = isHot;
	if (brandId) whereMap.brand_id = brandId;
	if (keyword && userId) {
	  whereMap.name = {[Op.like]: `%${keyword}%`};
	  // 添加到搜索历史
	  await searchHistoryModel.create({
	    keyword: keyword,
	    user_id: userId,
	    add_time: parseInt(new Date().getTime() / 1000)
	  });
	}
	// 排序
	let orderMap = [];
	if (sort === 'price') {
	  // 按价格
	  orderMap = [['retail_price', 'order']];
	} else {
	  // 按商品添加时间
	  orderMap = [['id', 'desc']];
	}
	// 筛选的分类
	let filterCategory = [{
	  'id': 0,
	  'name': '全部',
	  'checked': false
	}];
	let categoryIds = await goodsModel.findAll({where: whereMap, attributes: ['category_id'], limit: 10000});
	if (categoryIds) {
		categoryIds = categoryIds.map((item) => {
		  return item.category_id;
		});
	  // 查找二级分类的parent_id
	  let parentIds = await categoryModel.findAll({where: {id: {[Op.in]: categoryIds}}, attributes: ['parent_id'], limit: 10000, raw: true});
		// 一级分类
		parentIds = parentIds.map((value) => {
			return value.parent_id;
		});
	  let parentCategory = await categoryModel.findAll({where: {id: {[Op.in]: parentIds}}, attributes: ['id', 'name'], order: ['sort_order']});
	  if (parentCategory) {
	    filterCategory = filterCategory.concat(parentCategory);
	  }
	}

	// 加入分类条件
	if (categoryId && parseInt(categoryId) > 0) {
		let categoryIdList = await categoryModel.findAll({where: {parent_id: categoryId}, attributes: ['id'], limit: 10000});
    // 默认添加自己
		categoryIdList.push(categoryId);
	  whereMap.category_id = {[Op.in]: categoryIdList};
	}

	// 搜索到的商品
	const goodsData = await goodsModel.findAndCountAll({where: whereMap, attributes: ['id', 'name', 'list_pic_url', 'retail_price'], order: orderMap, limit: size, offset: offset});
	
	filterCategory = filterCategory.map(function(v) {
	  v.checked = (!categoryId && v.id === 0) || v.id === parseInt(categoryId);
	  return v;
	});

  ctx.body = jsonResult(0, {
		goodsList: goodsData.rows,
		filterCategory: filterCategory
	});
};

const category = async function (ctx) {
	const categoryId = ctx.query.id;
  const currentCategory = await categoryModel.findOne({where: {id: categoryId}});
  const parentCategory = await categoryModel.findOne({where: {id: currentCategory.parent_id}});
  const brotherCategory = await categoryModel.findOne({where: {parent_id: currentCategory.parent_id}});

  ctx.body = jsonResult(0, {
    currentCategory: currentCategory,
    parentCategory: parentCategory,
    brotherCategory: brotherCategory
  });
}

const detail = async function (ctx) {
  const goodsId = ctx.query.id;
  const info = await goodsModel.findOne({where: {'id': goodsId}});
  const gallery = await goodsGalleryModel.findAll({where: {goods_id: goodsId}, limit: 4});
  // 关联
	goodsAttributeModel.belongsTo(attributeModel, {foreignKey: 'attribute_id'});
	attributeModel.hasOne(goodsAttributeModel, {foreignKey: 'id'});

  const attribute = await goodsAttributeModel.findAll({
  	where: {goods_id: goodsId},
  	attributes: ['value'],
  	include: [{
  		model: attributeModel, 
  		attributes: ['name'],
  		required: false
  	  }]
  	}
  );
  const issue = await goodsIssueModel.findAll();
  const brand = await brandModel.findAll({where: {id: info.brand_id}});
  const commentCount = await commentModel.count({where: {value_id: goodsId, type_id: 0}});
  const hotCommentList = await commentModel.findAll({where: {value_id: goodsId, type_id: 0}});
  let commentInfo = {};
  if (hotCommentList.length > 0) {
  	const hotComment = hotCommentList[0];
    const commentUser = await userModel.findAll({where: {id: hotComment.user_id}, attributes: ['nickname', 'username', 'avatar']});
    commentInfo = {
      content: Buffer.from(hotComment.content, 'base64').toString(),
      add_time: new Date(hotComment.add_time * 1000),
      nickname: commentUser.nickname,
      avatar: commentUser.avatar,
      pic_list: await commentPictureModel.findAll({where: {comment_id: hotComment.id}})
    };
  }

  const comment = {
    count: commentCount,
    data: commentInfo
  };
  
  const specificationList = await getSpecificationList(goodsId);
  const productList = await getProductList(goodsId);
  ctx.body = jsonResult(0, {
    info: info,
    gallery: gallery,
    attribute: attribute,
    userHasCollect: false,
    issue: issue,
    comment: comment,
    brand: brand,
    specificationList: specificationList,
    productList: productList
  });
}

const related = async function (ctx) {
  // 大家都在看商品,取出关联表的商品，如果没有则随机取同分类下的商品
  const goodsId = ctx.query.id;
  const relatedGoodsIds = await relatedGoodsModel.findAll({where: {goods_id: goodsId}, attributes: ['related_goods_id']});
  let goodsList = null;
  if (relatedGoodsIds.length === 0) {
    // 查找同分类下的商品
    const goodsCategory = await goodsModel.findOne({where: {id: goodsId}});
    goodsList = await goodsModel.findAll({where: {category_id: goodsCategory.category_id}, attributes: ['id', 'name', 'list_pic_url', 'retail_price'], limit: 8});
  } else {
    goodsList = await goodsModel.findAll({where: {id: {[Op.in]: relatedGoodsIds}}, attributes: ['id', 'name', 'list_pic_url', 'retail_price']});
  }
  ctx.body = jsonResult(0, {
  	goodsList: goodsList
  });
}

const getSpecificationList = async function (goodsId) {
  // 关联
	goodsSpecificationModel.belongsTo(specificationModel, {foreignKey: 'specification_id'});
	specificationModel.hasOne(goodsSpecificationModel, {foreignKey: 'id'});
  // 根据sku商品信息，查找规格值列表
  const specificationRes = await goodsSpecificationModel.findAll({
  	where: {goods_id: goodsId},
  	include: [{
  		model: specificationModel, 
  		attributes: ['name'],
  		required: true
  	  }]
  	}
  );
  const specificationList = [];
  const hasSpecificationList = {};
  // 按规格名称分组
  for (let i = 0; i < specificationRes.length; i++) {
    const specItem = specificationRes[i];
    if (!hasSpecificationList[specItem.specification_id]) {
      specificationList.push({
        specification_id: specItem.specification_id,
        name: specItem.name,
        valueList: [specItem]
      });
      hasSpecificationList[specItem.specification_id] = specItem;
    } else {
      for (let j = 0; j < specificationList.length; j++) {
        if (specificationList[j].specification_id === specItem.specification_id) {
          specificationList[j].valueList.push(specItem);
          break;
        }
      }
    }
  }

  return specificationList;
}

const getProductList = async function (goodsId) {
  const goods = await ProductModel.findAll({where: {goods_id: goodsId}});
  return goods;
}

module.exports = {
	count: count,
	list: list,
	category: category,
	detail: detail,
	related: related
}