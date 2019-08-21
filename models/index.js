const fs = require('fs');
const path = require('path');
const dbConfig = require('../config/db');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  dbConfig.options
)

let db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

db.sequelize = sequelize;
module.exports = db;
