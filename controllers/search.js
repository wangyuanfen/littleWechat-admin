const db = require('../models');
const sequelize = db.sequelize.Sequelize;
const Op = sequelize.Op;
const {jsonResult} = require('../config/http');
const { getUserId } = require('../service/token');
const { 
	keywords: keywordsModel,
	search_history: searchHistoryModel,
} = require('../models');

const index = async function (ctx) {
	const userId = await getUserId(ctx.headers['X-Yanxuan-Token']);
	// 取出输入框默认的关键词
	let defaultKeyword = await keywordsModel.findAll({where: {is_default: 1}, limit: 1});
	// 取出热闹关键词
	let hotKeywordList = await keywordsModel.findAll({attributes: [[sequelize.literal('DISTINCT `keyword`'), 'keyword'], 'is_hot'], limit: 10});
	let historyKeywordList = await searchHistoryModel.findAll({where: {user_id: userId}, attributes: [[sequelize.literal('DISTINCT `keyword`'), 'keyword']], limit: 10});
	historyKeywordList = historyKeywordList.map((item) => {
		return item.keyword;
	});
  ctx.body = jsonResult(0, {
    defaultKeyword: defaultKeyword,
    hotKeywordList: hotKeywordList,
    historyKeywordList: historyKeywordList
  });
};

const helper = async function (ctx) {
  let keyword = ctx.query.keyword;
  let keywords = await keywordsModel.findAll({where: {keyword: {[Op.like]: keyword + '%'}}, attributes: [[sequelize.literal('DISTINCT `keyword`'), 'keyword']], limit: 10});
  keywords = keywords.map((item) => {
		return item.keyword;
	});
  ctx.body = jsonResult(0, keywords);
};

const clearhistory = async function(ctx) {
	let userId = await getUserId(ctx.headers['X-Yanxuan-Token']);
  await searchHistoryModel.destroy({ where: { user_id: userId }});
  ctx.body = jsonResult(0);
};

module.exports = {
	index: index,
	helper: helper,
	clearhistory: clearhistory
}