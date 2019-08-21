module.exports = (sequelize, dataTypes) => {
	const Cart = sequelize.define('cart', {
		 id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
		 user_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
		 session_id: { type: dataTypes.STRING(32), allowNull: false, defaultValue: '' },
		 goods_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
		 goods_sn: { type: dataTypes.STRING(60), defaultValue: '' },
		 product_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
		 goods_name: { type: dataTypes.STRING(120), defaultValue: '' },
		 market_price: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, defaultValue: 0.00 },
		 retail_price: { type: dataTypes.DECIMAL(10,2), defaultValue: 0.00 },
		 number: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: false, defaultValue: 0 },
		 goods_specifition_name_value: { type: dataTypes.TEXT },
		 goods_specifition_ids: { type: dataTypes.STRING(60), defaultValue: '' },
		 checked: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 1 },
		 list_pic_url: { type: dataTypes.STRING(255), defaultValue: '' }
		}, {
		timestamps: false
		}
	);
	return Cart;
};