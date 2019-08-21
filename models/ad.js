module.exports = (sequelize, dataTypes) => {
	const Ad = sequelize.define('ad', {
		id: { type: dataTypes.SMALLINT(5).UNSIGNED, autoIncrement: true, primaryKey: true},
		ad_position_id: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: false,  defaultValue: 0 },
		media_type: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false,  defaultValue: 0 },
		name: { type: dataTypes.STRING(60), allowNull: false, defaultValue: '' },
		link: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		image_url: { type: dataTypes.TEXT, allowNull: false },
		content: { type: dataTypes.STRING(255),  allowNull: false,defaultValue: '' },
		end_time: { type: dataTypes.INTEGER(11), allowNull: false, defaultValue: 0 },
		enabled: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false, defaultValue: 1 }
		}, {
		timestamps: false
		}
	);
	return Ad;
};