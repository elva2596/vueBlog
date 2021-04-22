const User = require('../lib/mysql').User;
const Classify = require('../lib/mysql').Classify;
const Article = require('../lib/mysql').Article;

module.exports = {
    // 创建用户
    create: function(user) {
        return User.create({
            name: user.name,
            password: user.password,
        });
    },
    getUserByName: function(name) {
        return User.findOne({
            where: { name: name }
        });
    },
    // 创建分类
    createClass: function(data) {
        return Classify.create({
            classify: data.classify,
        })
    },
    // 删除分类
    removeClass: function(classId) {
        return Classify.destroy({
            where: {
                id: classId
            }
        })
    },
    // 编辑分类
    updateClass: function(classId, data) {
        return Classify.update({
            classify: data.classify,
        }, {
            where: {
                id: classId,
            }
        })
    },
    // 查询所有分类
    findAllClass: function() {
        return Classify.findAll();
    },
    // 创建文章
    createArticle: function(params) {
        return Article.create(params)
    },
    // 获取所有文章
    getAllArticles: function(page,limit) {
        if (page&&limit) {
            return Article.findAll({
                limit: limit
            })
        } else return Article.findAll();
    },
    // 根据 classify 获取所有文章
    getArticlesByClassify: function(classify) {
        return Article.findAll({
            where: {
                classify: classify
            }
        })
    },
    getOneArticle: function(postId) {
        return Article.findOne({
            where: {
                id: postId,
            }
        })
    },
    // 删除一篇文章
    removeOneArticle: function(postId) {
        return Article.destroy({
            where: {
                id: postId
            }
        })
    },
    // 编辑一篇文章
    updateArticle: function(id, data) {
        return Article.update({
            classify: data.classify,
            title: data.title,
            content: data.content,
            contentToMark: data.contentToMark
        }, {
            where: {
                id: id,
            }
        })
    }
}