module.exports = (sequelize, dataTypes) => {
	const Brand = sequelize.define('brand', {
		id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
		name: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		list_pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		simple_desc: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		sort_order: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false, defaultValue: 50},
		is_show: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 1},
		floor_price: { type: dataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0.00},
		app_list_pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		is_new: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0},
		new_pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		new_sort_order: { type: dataTypes.TINYINT(2).UNSIGNED, allowNull: false, defaultValue: 10}
		}, {
		timestamps: false
		}
	);
	return Brand;
};