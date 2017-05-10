var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/mywebsite');
var moment = require('moment');//时间格式化(前后台都可以用的npm包)
var objectIdToTimestamp = require('objectid-to-timestamp');// 根据_id生成时间戳
/*
    mongolass插件系统，语法:
    mongolass.plugin(插件名字,{
    before(方法)
    after(方法)
  })
*/
mongolass.plugin('addCreateAt',{
  // 只要查询所有条件，那么一定会有最终结果
  afterFind:function (results){
    results.forEach(function (item){
      item.created_at =item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss');
    })
    return results
  },
  // 单个查询有可能是null，所以要加if
  afterFindOne:function (result){
    if(result){
      result.created_at =result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss');
    }
    return result
  }
})
// 用户
exports.User = mongolass.model('User',{
  name:{type:'string'},
  password:{type:'string'}
})
exports.User.index({name:1},{unique:true}).exec();

// 分类
exports.Classify = mongolass.model('Classify',{
  classify:{type:'string'}
})
exports.Classify.index({_id:1}).exec();

// 文章
exports.Article = mongolass.model('Article',{
  classify:{type:"string"},
  title:{type:'string'},
  content:{type:'string'},
  contentToMark:{type:'string'}
})
exports.Article.index({_id:1,classify:-1}).exec();
