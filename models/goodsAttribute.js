module.exports = (sequelize, dataTypes) => {
	const GoodsAttribute = sequelize.define('goods_attribute', {
	  id: { type: dataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true},
	  goods_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
	  attribute_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
	  value: { type: dataTypes.TEXT, allowNull: false }
		}, {
		timestamps: false
		}
	);
	return GoodsAttribute;
};