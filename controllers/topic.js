const {jsonResult} = require('../config/http');
const { topic: topicModel } = require('../models');

const list = async function (ctx) {
	let data = await topicModel.findAndCountAll({attributes: ['id', 'title', 'price_info', 'scene_pic_url', 'subtitle']});
	data.data = data.rows;
  ctx.body = jsonResult(0, data);
};

module.exports = {
	list: list
}