const config = {
  database: '', // 数据库名称
  user: '', // 数据库用户
  password: '', // 数据库密码
  options: {
    host: '', // 连接的 host 地址
    dialect: 'mysql', // 连接到 mysql
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false, // 默认不加时间戳
      freezeTableName: true // 表名默认不加s
    },
    timezone: '+08:00',
    hooks: {
      beforeDefine: function (columns, model) {
        model.tableName = 'yx_' + model.modelName;
      }
    }
  }
}

module.exports = config
