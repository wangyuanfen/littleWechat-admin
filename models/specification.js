module.exports = (sequelize, dataTypes) => {
	const Specification = sequelize.define('specification', {
	  id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
	  name: { type: dataTypes.STRING(60), allowNull: false, defaultValue: '' },
	  sort_order: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false, defaultValue: 0 }
		}, {
		timestamps: false
		}
	);
	return Specification;
};