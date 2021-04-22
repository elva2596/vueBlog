const { Sequelize , DataTypes } = require('sequelize');
const config = require('../config/db');

const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    pool: config.pool,
    dialect: config.dialect,
    define: config.define,
});

// 用户
const User = db.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    modelName: 'User',
    freezeTableName: true,
});

// 分类
const Classify = db.define('Classify', {
    classify: DataTypes.STRING,
}, {
    modelName: 'Classify',
    freezeTableName: true,
})

// 文章
const Article = db.define('Article', {
    classify: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    contentToMark: DataTypes.STRING
}, {
    modelName: 'Article'
})

// 模型同步,force: true,强制同步
db.sync({
    force: false,
});


module.exports = {
    User,
    Classify,
    Article,
}