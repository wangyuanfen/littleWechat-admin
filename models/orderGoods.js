module.exports = (sequelize, dataTypes) => {
  const OrderGoods = sequelize.define('order_goods', {
    id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    order_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
    goods_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
    goods_name: { type: dataTypes.STRING(120), defaultValue: '' },
    goods_sn: { type: dataTypes.STRING(60), defaultValue: '' },
    product_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: false, defaultValue: 0 },
    number: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: false, defaultValue: 1 },
    market_price: { type: dataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
    retail_price: { type: dataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
    goods_specifition_name_value: { type: dataTypes.TEXT, allowNull: false },
    is_real: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: false, defaultValue: '0'},
    goods_specifition_ids: { type: dataTypes.STRING(60), allowNull: false, defaultValue: '' },
    list_pic_url: { type: dataTypes.STRING(255), allowNull: false, defaultValue: '' }
  }, {
      timestamps: false
  });
  return OrderGoods;
};