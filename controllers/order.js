const _ = require('lodash');
const {jsonResult} = require('../config/http');
const { getUserId } = require('../service/token');
const { 
	order: orderModel,
	order_goods: orderGoodsModel,
	address: addressModel,
	cart: cartModel
} = require('../models');

const submit = async function (ctx) {
  const userId = await getUserId(ctx.headers['X-Yanxuan-Token']);
  const reqBody = ctx.request.body;
  // 获取收货地址信息和计算运费
  const addressId = reqBody.addressId;
  const checkedAddress = await addressModel.findOne({where: { id: addressId }});
  if (!checkedAddress) {
		ctx.body = jsonResult(400, null, '请选择收货地址');
		return;
  }
  const freightPrice = 0.00;

  // 获取要购买的商品
  const checkedGoodsList = await cartModel.findAll({where: { user_id: userId, session_id: 1, checked: 1 }, raw: true});
  if (checkedGoodsList.length === 0) {
    ctx.body = jsonResult(400, null, '请选择商品');
    return;
  }

  // 统计商品总价
  let goodsTotalPrice = 0.00;
  for (const cartItem of checkedGoodsList) {
    goodsTotalPrice += cartItem.number * cartItem.retail_price;
  }

  // 订单价格计算
  const orderTotalPrice = goodsTotalPrice + freightPrice; // 订单的总价
  const actualPrice = orderTotalPrice - 0.00; // 减去其它支付的金额后，要实际支付的金额
  // 时间
  const date = new Date();
  const currentTime = parseInt(date.getTime() / 1000);

  const orderInfo = {
    order_sn: date.getFullYear() + _.padStart(date.getMonth(), 2, '0') + _.padStart(date.getDay(), 2, '0') + _.padStart(date.getHours(), 2, '0') + _.padStart(date.getMinutes(), 2, '0') + _.padStart(date.getSeconds(), 2, '0') + _.random(100000, 999999),
    user_id: userId,
    // 收货地址和运费
    consignee: checkedAddress.name,
    mobile: checkedAddress.mobile,
    province: checkedAddress.province_id,
    city: checkedAddress.city_id,
    district: checkedAddress.district_id,
    address: checkedAddress.address,
    freight_price: 0.00,
    // 留言
    postscript: reqBody.postscript,
    add_time: currentTime,
    goods_price: goodsTotalPrice,
    order_price: orderTotalPrice,
    actual_price: actualPrice
  };

  // 开启事务，插入订单信息和订单商品
  const newOrder = await orderModel.create(orderInfo);
  orderInfo.id = newOrder.id;
  if (!newOrder.id) {
    ctx.body = jsonResult(400, null, '订单提交失败');
    return;
  }

  // 统计商品总价
  const orderGoodsData = [];
  for (const goodsItem of checkedGoodsList) {
    orderGoodsData.push({
      order_id: newOrder.id,
      goods_id: goodsItem.goods_id,
      goods_sn: goodsItem.goods_sn,
      product_id: goodsItem.product_id,
      goods_name: goodsItem.goods_name,
      list_pic_url: goodsItem.list_pic_url,
      market_price: goodsItem.market_price,
      retail_price: goodsItem.retail_price,
      number: goodsItem.number,
      goods_specifition_name_value: goodsItem.goods_specifition_name_value,
      goods_specifition_ids: goodsItem.goods_specifition_ids
    });
  }

  await orderGoodsModel.bulkCreate(orderGoodsData);
	await cartModel.destroy({where: {user_id: userId, session_id: 1, checked: 1}});

  ctx.body = jsonResult(0, { 
  	orderInfo: orderInfo 
  });
}

module.exports = {
	submit: submit
}