module.exports = (sequelize, dataTypes) => {
	const Collect = sequelize.define('collect', {
		id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
		user_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
		value_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
		add_time: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		is_attention: { type: dataTypes.TINYINT(1), allowNull: false, defaultValue: 0 },
		type_id: { type: dataTypes.INTEGER(2).UNSIGNED, allowNull: false, defaultValue: 0 },
		}, {
		timestamps: false
		}
	);
	return Collect;
};