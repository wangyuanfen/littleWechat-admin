module.exports = (sequelize, dataTypes) => {
	const Attribute = sequelize.define('attribute', {
		id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
		attribute_category_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false,  defaultValue: 0 },
		name: { type: dataTypes.STRING(60), allowNull: false,  defaultValue: '' },
		input_type: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false,  defaultValue: 1 },
		values: { type: dataTypes.TEXT, allowNull: false },
		sort_order: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false,  defaultValue: 0 }
		}, {
		timestamps: false
		}
	);
	return Attribute;
};