module.exports = (sequelize, dataTypes) => {
	const GoodsSpecification = sequelize.define('goods_specification', {
	  id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
	  goods_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
	  specification_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 }, 
	  value: { type: dataTypes.STRING(50), allowNull: false, defaultValue: '' },
	  pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' }
		}, {
		timestamps: false
		}
	);
	return GoodsSpecification;
};