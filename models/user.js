module.exports = (sequelize, dataTypes) => {
	const User = sequelize.define('user', {
		 id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
		 username: { type: dataTypes.STRING(60), allowNull: false, unique: true, defaultValue: '' },
		 password: { type: dataTypes.STRING(32), allowNull: false, defaultValue: '' },
		 gender: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: 0 },
		 birthday: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		 register_time: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		 last_login_time: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
		 last_login_ip: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		 user_level_id: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false, defaultValue: 0 },
		 nickname: { type: dataTypes.STRING(60), allowNull: false },
		 mobile: { type: dataTypes.STRING(20), allowNull: false },
		 register_ip: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		 avatar: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
		 weixin_openid: { type: dataTypes.STRING(50), allowNull: false, defaultValue: '' },
		}, {
		timestamps: false
		}
	);
	return User;
};