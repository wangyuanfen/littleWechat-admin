module.exports = (sequelize, dataTypes) => {
	const Category = sequelize.define('category', {
		id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
		name: { type: dataTypes.STRING(90), allowNull: false, defaultValue: '' },
		keywords: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		front_desc: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		parent_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		sort_order: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 50 },
		show_index: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0 },
		is_show: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 1 },
		banner_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		icon_url: { type: dataTypes.STRING(255), allowNull: false },
		img_url: { type: dataTypes.STRING(255), allowNull: false },
		wap_banner_url: { type: dataTypes.STRING(255), allowNull: false },
		level: { type: dataTypes.STRING(255), allowNull: false },
		type: { type: dataTypes.INTEGER(11), allowNull: false, defaultValue: 0 },
		front_name: { type: dataTypes.STRING(255), allowNull: false }
		}, {
		timestamps: false
		}
	);
	return Category;
};