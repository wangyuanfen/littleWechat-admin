module.exports = (sequelize, dataTypes) => {
	const Footprint = sequelize.define('footprint', {
	  id: { type: dataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true},
	  user_id: { type: dataTypes.INTEGER(11), allowNull: false, defaultValue: 0 },
	  goods_id: { type: dataTypes.INTEGER(11), allowNull: false, defaultValue: 0 },
	  add_time: { type: dataTypes.INTEGER(11), allowNull: false, defaultValue: 0 }
		}, {
		timestamps: false
		}
	);
	return Footprint;
};