module.exports = (sequelize, dataTypes) => {
	const Goods = sequelize.define('goods', {
		id: { type: dataTypes.INTEGER(11).UNSIGNED, primaryKey: true},
		category_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0},
		goods_sn: { type: dataTypes.STRING(60), allowNull: false, defaultValue: ''},
		name: { type: dataTypes.STRING(120), allowNull: false, defaultValue: ''},
		brand_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0},
		goods_number: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0},
		keywords: { type: dataTypes.STRING(255), allowNull: false, defaultValue: ''},
		goods_brief: { type: dataTypes.STRING(255), allowNull: false, defaultValue: ''},
		goods_desc: { type: dataTypes.TEXT },
		is_on_sale: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 1},
		add_time: { type: dataTypes.INTEGER(10).UNSIGNED, allowNull: false, defaultValue: 0},
		sort_order: { type: dataTypes.SMALLINT(4).UNSIGNED, allowNull: false, defaultValue: 100},
		is_delete: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0},
		attribute_category: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0},
		counter_price: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, defaultValue: 0.00 },
		extra_price: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, defaultValue: 0.00 },
		is_new: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0},
		goods_unit: { type: dataTypes.STRING(45), allowNull: false, },
		primary_pic_url: { type: dataTypes.STRING(255), allowNull: false, },
		list_pic_url: { type: dataTypes.STRING(255), allowNull: false, },
		retail_price: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, defaultValue: 0.00 },
		sell_volume: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		primary_product_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		unit_price: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, defaultValue: 0.00 },
		promotion_desc: { type: dataTypes.STRING(255), allowNull: false,},
		promotion_tag: { type: dataTypes.STRING(45), allowNull: false,},
		app_exclusive_price: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, },
		is_app_exclusive: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, },
		is_limited: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false,},
		is_hot: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0},
		}, {
		timestamps: false
		}
	);
	return Goods;
};