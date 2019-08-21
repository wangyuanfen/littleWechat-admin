# 简介
Koa搭建小程序服务端后台

基于[NideShop商城](https://github.com/tumobi/nideshop)搭建，原项目用的是ThinkJs，我换成了Koa，使用Sequelize操作数据库

# 运行
配置小程序信息
```
// default config
module.exports = {
  weixin: {
    appid: '', // 小程序 appid
    secret: '', // 小程序密钥
  }
};
```
配置数据库信息
```
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

```
启动
`pm2 start pm2.config.js`

由于用做来提供小程序的服务端，服务还需要支持https。具体部署方法可以参考原作者[在阿里云（CentOS）上部署
](https://www.nideshop.com/documents/nideshop-manual/deployment-centos)

# License
Copyright (c) 2019 wangyuanfen
