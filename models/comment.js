module.exports = (sequelize, dataTypes) => {
	const Comment = sequelize.define('comment', {
	  id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
	  type_id: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false,  defaultValue: 0 },
	  value_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false,  defaultValue: 0 },
	  content: { type: dataTypes.STRING(6550) ,allowNull: false },
	  add_time: { type: dataTypes.BIGINT(12).UNSIGNED, allowNull: false,  defaultValue: 0 },
	  status: { type: dataTypes.TINYINT(3).UNSIGNED, allowNull: false,  defaultValue: 0 },
	  user_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false,  defaultValue: 0 },
	  new_content: { type: dataTypes.STRING(6550) ,allowNull: false, defaultValue: '' }
		}, {
		timestamps: false
		}
	);
	return Comment;
};