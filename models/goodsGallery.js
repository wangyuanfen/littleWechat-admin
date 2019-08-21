module.exports = (sequelize, dataTypes) => {
	const GoodsGallery = sequelize.define('goods_gallery', {
	  id: { type: dataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true},
	  goods_id: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0 },
	  img_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' }, 
	  img_desc: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' }, 
	  sort_order: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 5 }
		}, {
		timestamps: false
		}
	);
	return GoodsGallery;
};