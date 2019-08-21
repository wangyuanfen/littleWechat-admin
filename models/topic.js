module.exports = (sequelize, dataTypes) => {
	const Topic = sequelize.define('topic', {
		id: { type: dataTypes.INTEGER(10).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
		title: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		content: { type: dataTypes.TEXT },
		avatar: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		item_pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		subtitle: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		topic_category_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		price_info: { type: dataTypes.DECIMAL(10,2).UNSIGNED, allowNull: false, defaultValue: 0.00 },
		read_count: { type: dataTypes.STRING(255), allowNull: false, defaultValue: 0 },
		scene_pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		topic_template_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		topic_tag_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		sort_order: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 100 },
		is_show: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 1 }
		}, {
		timestamps: false
		}
	);
	return Topic;
};