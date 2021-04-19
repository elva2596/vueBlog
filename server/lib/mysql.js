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
    name: {
        type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
}, {
    modelName: 'User',
    freezeTableName: true,
});

// 分类
const Classify = db.define('Classify', {
    classify: DataTypes.STRING,
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
}, {
    modelName: 'Classify',
    freezeTableName: true,
})

// 文章
const Article = db.define('Article', {
    classify: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    contentToMark: DataTypes.STRING,
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
})

// 模型同步
db.sync();


module.exports = {
    User,
    Classify,
    Article,
}