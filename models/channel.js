module.exports = (sequelize, dataTypes) => {
	const Channel = sequelize.define('channel', {
		id: { type: dataTypes.INTEGER(5), primaryKey: true, autoIncrement: true},
		name: { type: dataTypes.STRING(45), allowNull: false, defaultValue: '' },
		url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		icon_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		sort_order: { type: dataTypes.INTEGER(4).UNSIGNED, allowNull: false, defaultValue: 10 }
		}, {
		timestamps: false
		}
	);
	return Channel;
};