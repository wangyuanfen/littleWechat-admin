module.exports = (sequelize, dataTypes) => {
	const Address = sequelize.define('address', {
		 id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: null, autoIncrement: true, primaryKey: true},
		 name: { type: dataTypes.STRING(50), allowNull: null, defaultValue: '' },
		 user_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: null, defaultValue: 0 },
		 country_id: { type: dataTypes.SMALLINT(5), allowNull: null, defaultValue: 0 },
		 province_id: { type: dataTypes.SMALLINT(5), allowNull: null, defaultValue: 0 },
		 city_id: { type: dataTypes.SMALLINT(5), allowNull: null, defaultValue: 0 },
		 district_id: { type: dataTypes.SMALLINT(5), allowNull: null, defaultValue: 0 },
		 address: { type: dataTypes.STRING(120), allowNull: null, defaultValue: '' },
		 mobile: { type: dataTypes.STRING(60), allowNull: null, defaultValue: '' },
		 is_default: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: null, defaultValue: 0 }
		}, {
		timestamps: false
		}
	);
	return Address;
};