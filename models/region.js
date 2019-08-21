module.exports = (sequelize, dataTypes) => {
	const Region = sequelize.define('region', {
		 id: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: null, autoIncrement: true, primaryKey: true},
		 parent_id: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: null, defaultValue: 0 },
		 name: { type: dataTypes.STRING(120), allowNull: null, defaultValue: '' },
		 type: { type: dataTypes.TINYINT(1), allowNull: null, defaultValue: '2' },
		 agency_id: { type: dataTypes.SMALLINT(5), allowNull: null, defaultValue: 0 }
		}, {
		timestamps: false
		}
	);
	return Region;
};