module.exports = (sequelize, dataTypes) => {
	const Order = sequelize.define('order', {
    id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: null, autoIncrement: true, primaryKey: true},
    order_sn: { type: dataTypes.STRING(20), allowNull: null, defaultValue: '' },
    user_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: null, defaultValue: 0 },
    order_status: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: null, defaultValue: 0 },
    shipping_status: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: null, defaultValue: 0 },
    pay_status: { type: dataTypes.TINYINT(1).UNSIGNED, allowNull: null, defaultValue: 0 },
    consignee: { type: dataTypes.STRING(60), allowNull: null, defaultValue: '' },
    country: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: null, defaultValue: 0 },
    province: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: null, defaultValue: 0 },
    city: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: null, defaultValue: 0 },
    district: { type: dataTypes.SMALLINT(5).UNSIGNED, allowNull: null, defaultValue: 0 },
    address: { type: dataTypes.STRING(255), allowNull: null, defaultValue: '' },
    mobile: { type: dataTypes.STRING(60), allowNull: null, defaultValue: '' },
    postscript: { type: dataTypes.STRING(255), allowNull: null, defaultValue: '' },
    shipping_fee: { type: dataTypes.DECIMAL(10,2), allowNull: null, defaultValue: 0.00 },
    pay_name: { type: dataTypes.STRING(120), allowNull: null, defaultValue: '' },
    pay_id: { type: dataTypes.TINYINT(3), allowNull: null, defaultValue: 0 },
    actual_price: { type: dataTypes.DECIMAL(10,2), allowNull: null, defaultValue: 0.00 },
    integral: { type: dataTypes.INTEGER(10).UNSIGNED, allowNull: null, defaultValue: 0 },
    integral_money: { type: dataTypes.DECIMAL(10,2), allowNull: null, defaultValue: 0.00 },
    order_price: { type: dataTypes.DECIMAL(10,2), allowNull: null, defaultValue: 0.00 },
    goods_price: { type: dataTypes.DECIMAL(10,2), allowNull: null, defaultValue: 0.00 },
    add_time: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: null, defaultValue: 0 },
    confirm_time: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: null, defaultValue: 0 },
    pay_time: { type: dataTypes.INTEGER(11).UNSIGNED, allowNull: null, defaultValue: 0 },
    freight_price: { type: dataTypes.INTEGER(10).UNSIGNED, allowNull: null, defaultValue: 0 },
    coupon_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: null, defaultValue: 0 },
    parent_id: { type: dataTypes.MEDIUMINT(8).UNSIGNED, allowNull: null, defaultValue: 0 },
    coupon_price: { type: dataTypes.DECIMAL(10,2), allowNull: null, defaultValue: 0.00 },
    callback_status: { type: dataTypes.ENUM('true','false'), defaultValue: 'true' }
	}, {
	timestamps: false
	}
	);
	return Order;
};