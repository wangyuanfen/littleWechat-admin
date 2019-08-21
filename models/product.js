module.exports = (sequelize, dataTypes) => {
	const Product = sequelize.define('product', {
		 id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
		 goods_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
		 goods_specification_ids: { type: dataTypes.STRING(50), allowNull: false, defaultValue: 0 },
		 goods_sn: { type: dataTypes.STRING(60), defaultValue: '' },
		 goods_number: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
		 retail_price: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, defaultValue: 0.00 },
		}, {
		timestamps: false
		}
	);
	return Product;
};