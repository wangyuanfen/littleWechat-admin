const db = require('../models');
const Op = db.sequelize.Sequelize.Op;
const {jsonResult} = require('../config/http');
const { getUserId } = require('../service/token');

const { 
  goods: goodsModel,
  cart: cartModel,
  product: productModel,
  goods_specification: goodsSpecificationModel,
  specification: specificationModel,
  address: addressModel,
  region: regionModel
} = require('../models');

const getCart = async function (ctx) {
  const userId = await getUserId(ctx.headers['X-Yanxuan-Token']);
  let cartList = [];
  if (userId) {
    cartList = await cartModel.findAll({where: {user_id: userId, session_id: 1}});
    if (!cartList) cartList = [];
  }
  // 获取购物车统计信息
  let goodsCount = 0;
  let goodsAmount = 0.00;
  let checkedGoodsCount = 0;
  let checkedGoodsAmount = 0.00;
  for (const cartItem of cartList) {
    goodsCount += cartItem.number;
    goodsAmount += cartItem.number * cartItem.retail_price;
    if (cartItem.checked) {
      checkedGoodsCount += cartItem.number;
      checkedGoodsAmount += cartItem.number * cartItem.retail_price;
    }

    // 查找商品的图片
    let picObj = await goodsModel.findOne({where: {id: cartItem.goods_id}, attributes: ['list_pic_url'], raw: true});
    cartItem.list_pic_url = picObj.list_pic_url;
  }

  return {
    cartList: cartList,
    cartTotal: {
      goodsCount: goodsCount,
      goodsAmount: goodsAmount,
      checkedGoodsCount: checkedGoodsCount,
      checkedGoodsAmount: checkedGoodsAmount
    }
  };
};

const index = async function (ctx) {
  let cartData = await getCart(ctx);
  ctx.body = jsonResult(0, cartData);
};

const addCart = async function (ctx) {
  const userId = await getUserId(ctx.headers['X-Yanxuan-Token']);
  const reqBody = ctx.request.body;
  const goodsId = reqBody.goodsId;
  const productId = reqBody.productId;
  const number = reqBody.number;
  
  // 判断是否登陆
  if (!userId) {
    ctx.body = jsonResult(401, null, '请先登录');
    return;
  }
  // 判断商品是否可以购买
  const goodsInfo = await goodsModel.findOne({where: {id: goodsId}});
  if (!goodsInfo || goodsInfo.is_delete === 1) {
    ctx.body = jsonResult(400, null, '商品已下架');
    return;
  }

  // 取得规格的信息,判断规格库存
  const productInfo = await productModel.findOne({where: {goods_id: goodsId, id: productId}});
  if (!productInfo || productInfo.goods_number < number) {
    ctx.body = jsonResult(400, null, '库存不足');
    return;
  }

  // 判断购物车中是否存在此规格商品
  const cartInfo = await cartModel.findOne({where: {goods_id: goodsId, product_id: productId}});
  if (!cartInfo) {
    // 添加规格名和值
    let goodsSepcifitionValue = [];
    if (productInfo.goods_specification_ids) {
      goodsSepcifitionValue = await goodsSpecificationModel.findAll({
        where: {
          goods_id: goodsId, 
          id: {[Op.in]: productInfo.goods_specification_ids.split('_')}
        },
        attributes: ['value'],
        raw: true
      });
      goodsSepcifitionValue = goodsSepcifitionValue.map((value) => {
        return value.value;
      });
    }
    // 添加到购物车
    const cartData = {
      goods_id: goodsId,
      product_id: productId,
      goods_sn: productInfo.goods_sn,
      goods_name: goodsInfo.name,
      list_pic_url: goodsInfo.list_pic_url,
      number: number,
      session_id: 1,
      user_id: userId,
      retail_price: productInfo.retail_price,
      market_price: productInfo.retail_price,
      goods_specifition_name_value: goodsSepcifitionValue.join(';'),
      goods_specifition_ids: productInfo.goods_specification_ids,
      checked: 1
    };

    await cartModel.create(cartData);
  } else {
    // 如果已经存在购物车中，则数量增加
    if (productInfo.goods_number < (number + cartInfo.number)) {
      ctx.body = jsonResult(400, null, '库存不足');
      return;
    }
    await cartModel.update({'number': number + 1}, {where: {goods_id: goodsId,product_id: productId,id: cartInfo.id}});
  }
  const cartData = await getCart(ctx);
  ctx.body = jsonResult(0, cartData);
}

const updateCart = async function (ctx) {
  const reqBody = ctx.request.body;
  const goodsId = reqBody.goodsId;
  const productId = reqBody.productId; // 新的product_id
  const id = reqBody.id; // cart.id
  const number = parseInt(reqBody.number);

  // 取得规格的信息,判断规格库存
  const productInfo = await productModel.findOne({where: {goods_id: goodsId, id: productId}});
  if (!productInfo || productInfo.goods_number < number) {
    ctx.body = jsonResult(400, null, '库存不足');
    return;
  }

  // 判断是否已经存在product_id购物车商品
  const cartInfo = await cartModel.findOne({where: {id: id}});
  // 只是更新number
  if (cartInfo && cartInfo.product_id === productId) {
    await cartModel.update({number: number},{where: {id: id}});
    const cartData = await getCart(ctx);
    ctx.body = jsonResult(0, cartData);
    return;
  }
  // 如果变化的不是数量而是属性
  const newCartInfo = await cartModel.findOne({where: {goods_id: goodsId, product_id: productId}});
  if (!newCartInfo) {
    // 添加规格名和值
    let goodsSepcifition = [];
    if (productInfo.goods_specification_ids) {
      // 关联
      goodsSpecificationModel.belongsTo(specificationModel, {foreignKey: 'specification_id'});
      specificationModel.hasOne(goodsSpecificationModel, {foreignKey: 'id'});

      goodsSepcifition = await goodsSpecificationModel.findAll({
        where: {
          goods_id: goodsId,
          id: {[Op.in]: productInfo.goods_specification_ids.split('_')}
        },
        include: [{
          model: specificationModel, 
          attributes: ['name'],
          required: true
          }]
        }
      );
    }

    const cartData = {
      number: number,
      goods_specifition_name_value: JSON.stringify(goodsSepcifition),
      goods_specifition_ids: productInfo.goods_specification_ids,
      retail_price: productInfo.retail_price,
      market_price: productInfo.retail_price,
      product_id: productId,
      goods_sn: productInfo.goods_sn
    };
    await cartModel.update(cartData, {where: {id: id}});
  } else {
    // 合并购物车已有的product信息，删除已有的数据
    const newNumber = number + newCartInfo.number;

    if (!productInfo || productInfo.goods_number < newNumber) {
      ctx.body = jsonResult(400, null, '库存不足');
      return;
    }

    await cartModel.destroy({where: {id: newCartInfo.id}});

    const cartData = {
      number: newNumber,
      goods_specifition_name_value: newCartInfo.goods_specifition_name_value,
      goods_specifition_ids: newCartInfo.goods_specification_ids,
      retail_price: productInfo.retail_price,
      market_price: productInfo.retail_price,
      product_id: productId,
      goods_sn: productInfo.goods_sn
    };

    await cartModel.update(cartData, {where: {id: id}});
  }

  const cartData = await getCart(ctx);
  ctx.body = jsonResult(0, cartData);
}

const deleteCart = async function (ctx) {
  let productId = ctx.request.body.productIds;
  if (!productId) {
    ctx.body = jsonResult(0, null, '删除出错');
    return;
  }
  productId = productId.split(',');
  await cartModel.destroy({where: {product_id: {[Op.in]: productId}}});

  const cartData = await getCart(ctx);
  ctx.body = jsonResult(0, cartData);
}

const goodscount = async function (ctx) {
  const cartData = await getCart(ctx);
  ctx.body = jsonResult(0, {
    cartTotal: {
      goodsCount: cartData.cartTotal.goodsCount
    }
  });
}

// 是否选择商品，如果已经选择，则取消选择，批量操作
const checked = async function (ctx) {
  const reqBody = ctx.request.body;
  let productId = reqBody.productIds.toString();
  const isChecked = reqBody.isChecked;

  if (!productId) {
    ctx.body = jsonResult(0, null, '删除出错');
    return;
  }

  productId = productId.split(',');
  await cartModel.update({checked: parseInt(isChecked)}, {where: {product_id: {[Op.in]: productId}}});
  
  const cartData = await getCart(ctx);
  ctx.body = jsonResult(0, cartData);
}

const checkout = async function (ctx) {
  const userId = await getUserId(ctx.headers['X-Yanxuan-Token']);
  const addressId = ctx.query.addressId; // 收货地址id
  // 判断是否登陆
  if (!userId) {
    ctx.body = jsonResult(401, null, '请先登录');
    return;
  }
  // 选择的收货地址
  let checkedAddress = null;
  // 0
  if (addressId) {
    checkedAddress = await addressModel.findOne({where: {is_default: 1, user_id: userId}, raw: true});
  } else {
    checkedAddress = await addressModel.findOne({where: {id: addressId, user_id: userId}, raw: true});
  }

  if (checkedAddress) {
    let provinceName = await regionModel.findOne({where: {id: checkedAddress.province_id}, attributes: ['name'], raw: true});
    let cityName = await regionModel.findOne({where: {id: checkedAddress.city_id}, attributes: ['name'], raw: true});
    let districtName = await regionModel.findOne({where: {id: checkedAddress.district_id}, attributes: ['name'], raw: true});
    checkedAddress.province_name = provinceName.name;
    checkedAddress.city_name = cityName.name;
    checkedAddress.district_name = districtName.name;
    checkedAddress.full_region = checkedAddress.province_name + checkedAddress.city_name + checkedAddress.district_name;
  }

  // 根据收货地址计算运费
  const freightPrice = 0.00;

  // 获取要购买的商品
  const cartData = await getCart(ctx);
  const checkedGoodsList = cartData.cartList.filter(function(v) {
    return v.checked === 1;
  });

  // 计算订单的费用
  const goodsTotalPrice = cartData.cartTotal.checkedGoodsAmount; // 商品总价
  const orderTotalPrice = cartData.cartTotal.checkedGoodsAmount + freightPrice; // 订单的总价
  const actualPrice = orderTotalPrice - 0.00; // 减去其它支付的金额后，要实际支付的金额

  ctx.body = jsonResult(0, {
    checkedAddress: checkedAddress,
    freightPrice: freightPrice,
    checkedGoodsList: checkedGoodsList,
    goodsTotalPrice: goodsTotalPrice,
    orderTotalPrice: orderTotalPrice,
    actualPrice: actualPrice
  });
}

module.exports = {
  index: index,
  add: addCart,
  update: updateCart,
  delete: deleteCart,
  goodscount: goodscount,
  checked: checked,
  checkout: checkout
}