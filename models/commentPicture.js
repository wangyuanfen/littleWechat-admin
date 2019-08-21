module.exports = (sequelize, dataTypes) => {
	const CommentPicture = sequelize.define('comment_picture', {
	  id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true},
	  comment_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false,  defaultValue: 0 },
	  pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' },
	  sort_order: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false,  defaultValue: 5 }
		}, {
		timestamps: false
		}
	);
	return CommentPicture;
};