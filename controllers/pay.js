const {jsonResult} = require('../config/http');
const { 
  order: orderModel,
  user: userModel
} = require('../models');

const prepay = async function (ctx) {
  const orderId = ctx.query.orderId;
  const orderInfo = await orderModel.findOne({where: { id: orderId }});
  if (!orderInfo) {
  	ctx.body = jsonResult(400, null, '订单已取消');
    return;
  }
  if (parseInt(orderInfo.pay_status) !== 0) {
  	ctx.body = jsonResult(400, null, '订单已支付，请不要重复操作');
    return;
  }
  const userInfo = await userModel.findOne({where: { id: orderInfo.user_id}, attributes: ['weixin_openid'], raw: true});
  const openid = userInfo.weixin_openid;
  if (!openid) {
  	ctx.body = jsonResult(400, null, '微信支付失败');
    return;
  }
  ctx.body = jsonResult(400, null, '微信支付失败');
  // const WeixinSerivce = this.service('weixin', 'api');
  // try {
  //   const returnParams = await WeixinSerivce.createUnifiedOrder({
  //     openid: openid,
  //     body: '订单编号：' + orderInfo.order_sn,
  //     out_trade_no: orderInfo.order_sn,
  //     total_fee: parseInt(orderInfo.actual_price * 100),
  //     spbill_create_ip: ''
  //   });
  //   ctx.body = jsonResult(0, returnParams);
  // } catch (err) {
  // 	ctx.body = jsonResult(400, null, '微信支付失败');
  // }
}

module.exports = {
	prepay: prepay
}