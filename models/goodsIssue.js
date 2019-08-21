module.exports = (sequelize, dataTypes) => {
	const GoodsIssue = sequelize.define('goods_issue', {
		id: { type: dataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
		goods_id: { type: dataTypes.TEXT },
		question: { type: dataTypes.STRING(255), defaultValue: null },
		answer: { type: dataTypes.STRING(45), defaultValue: null }
		}, {
		timestamps: false
		}
	);
	return GoodsIssue;
};