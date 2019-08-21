module.exports = (sequelize, dataTypes) => {
	const SearchHistory = sequelize.define('search_history', {
	  id: { type: dataTypes.INTEGER(10), allowNull: false, autoIncrement: true, primaryKey: true},
	  keyword: { type: dataTypes.STRING(50), allowNull: false }, 
	  from: { type: dataTypes.STRING(45), allowNull: false, defaultValue: '' }, 
	  add_time: { type: dataTypes.INTEGER(10), allowNull: false, defaultValue: 0 }, 
	  user_id: { type: dataTypes.STRING(45), defaultValue: null }, 
		}, {
		timestamps: false
		}
	);
	return SearchHistory;
};