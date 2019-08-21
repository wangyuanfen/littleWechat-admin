const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const db = require('./models');
const routes = require('./routes');

app.use(bodyParser());

// 启动路由
routes(app);

app.listen(3000, () => {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log('sequelize connect success')
      console.log('sever listen on http://127.0.0.1:3000')
    })
    .catch(err => {
      console.log(err)
    })
});