const Router = require('koa-router');
const indexCtr = require('../controllers/index.js');
const goodsCtr = require('../controllers/goods.js');
const topicCtr = require('../controllers/topic.js');
const catalogCtr = require('../controllers/catalog.js');
const authCtr = require('../controllers/auth.js');
const cartCtr = require('../controllers/cart.js');
const searchCtr = require('../controllers/search.js');
const orderCtr = require('../controllers/order.js');
const payCtr = require('../controllers/pay.js');

/**
 * 导出nsp api 相关路由
 * @param app
 */
module.exports = function (app) {
	const router = new Router();
	router.use('/yanxuan/api', yanXuanRouter().routes(), yanXuanRouter().allowedMethods());
	app.use(router.routes());
};

const yanXuanRouter = function () {
  const router = new Router();
  // ========= index ========
  // 获取主页数据
  router.get('/index/index', indexCtr.index);

  // ========= goods ========
  // 商品数量统计
  router.get('/goods/count', goodsCtr.count);
  // 获得商品列表
  router.get('/goods/list', goodsCtr.list);
  // 获得分类数据
  router.get('/goods/category', goodsCtr.category);
  // 获得商品详情
  router.get('/goods/detail', goodsCtr.detail);
  // 商品详情页的关联商品
  router.get('/goods/related', goodsCtr.related);
  
  // ========= topic ========
  // 获取专题列表
  router.get('/topic/list', topicCtr.list);

  // ========= catalog ========
  // 获取分类栏目数据
  router.get('/catalog/index', catalogCtr.index);
  // 分类目录当前分类数据接口
  router.get('/catalog/current', catalogCtr.current);

  // ========= auth ========
  // 登陆验证
  router.post('/auth/loginByWeixin', authCtr.loginByWeixin);

  // ========= cart ========
  // 购物车列表
  router.get('/cart/index', cartCtr.index);
  // 添加商品到购物车
  router.post('/cart/add', cartCtr.add);
  // 更新购物车的商品
  router.post('/cart/update', cartCtr.update);
  // 删除购物车的商品
  router.post('/cart/delete', cartCtr.delete);
  // 选择或取消选择商品
  router.post('/cart/checked', cartCtr.checked);
  // 下单前信息确认
  router.get('/cart/checkout', cartCtr.checkout);
  // 获取购物车商品的总件件数
  router.get('/cart/goodscount', cartCtr.goodscount);

  // ========= order ========
  // 提交订单
  router.post('/order/submit', orderCtr.submit);
  
  // ========= pay ========
  // 获取微信统一下单prepay_id
  router.get('/pay/prepay', payCtr.prepay);

  // ========= search ========
  // 搜索页面数据
  router.get('/search/index', searchCtr.index);
  // 搜索帮助
  router.get('/search/helper', searchCtr.helper);
  // 清除搜结果
  router.post('/search/clearhistory', searchCtr.clearhistory);
  return router;
};