module.exports = (sequelize, dataTypes) => {
	const RelatedGoods = sequelize.define('related_goods', {
	  id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
	  goods_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
	  related_goods_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 }
		}, {
		timestamps: false
		}
	);
	return RelatedGoods;
};