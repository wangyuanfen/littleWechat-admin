module.exports = (sequelize, dataTypes) => {
	const Keywords = sequelize.define('keywords', {
	  id: { type: dataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true},
	  keyword: { type: dataTypes.STRING(90), allowNull: false, defaultValue: '' }, 
	  is_hot: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0 }, 
	  is_default: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0 }, 
	  is_show: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 1 }, 
	  sort_order: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 100 }, 
	  scheme_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' }, 
	  type: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 }
		}, {
		timestamps: false
		}
	);
	return Keywords;
};