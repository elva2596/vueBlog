var express =require('express');
var router = express.Router();
var api = require('../api');
const moment = require('moment');
var checkToken = require('../middleware/checkToken');
// 创建一篇文章
router.post('/article/create',checkToken,function (req,res,next){
  api.createArticle(req.body)
      .then(()=>{
        res.send({
          code:200,
          message:'发布成功'
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})
// 获取所有文章(带分页获取,需要验证权限)
router.post('/article/lists',checkToken,function (req,res,next){
  let {page,limit}  =req.body
  api.getAllArticles(page,limit)
      .then((result)=>{
        var articleLists = result,
            total = result.length;
         articleLists.forEach((article=>{
            // delete article._id
            delete article.dataValues.content
            delete article.dataValues.contentToMark
       }))
        res.send({
          code:200,
          articleLists,
          total
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})
// 根据classify获取文章列表(前台使用没有权限)
router.post('/article/noAuthArtilcelists',function (req,res,next){

  let {classify}  =req.body
  api.getArticlesByClassify(classify)
      .then((articleLists)=>{
        articleLists.forEach((article=>{
            delete article.content
            // delete article.title
            article.contentToMark = article.contentToMark.match(/<p>([\s\S]*?)<\/p>/g)[0]
       }))
        res.send({
          code:200,
          articleLists
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})
// 获取所有文章(每次返回10个)前台使用
router.post('/article/articleLists',function (req,res,next){
  let {page,limit}  =req.body
  api.getAllArticles(page,limit)
      .then((result)=>{
        var articleLists = result,
            total = result.length,
            totalPage =Math.ceil(total/limit),
            hasNext=totalPage>page?1:0,
            hasPrev=page>1
       articleLists.forEach((article=>{
            delete article.dataValues.content
            article.dataValues.contentToMark = article.dataValues.contentToMark.match(/<p>([\s\S]*?)<\/p>/g)[0]
       }))
      
        res.send({
          code:200,
          articleLists,
          hasNext,
          hasPrev
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})
// 根据postId获取其中一篇文章（有权限）
router.post('/article/onePage',checkToken,function (req,res,next){
  let {id}  =req.body
  api.getOneArticle(id)
      .then((oneArticle)=>{
        if(oneArticle){
          res.send({
            code:200,
            oneArticle
          })
        }else{
          throw new Error('没有找到该文章');
        }
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 根据postId获取其中一篇文章（没有权限）
router.post('/article/noAuth',function (req,res,next){
  let {id}  =req.body
  api.getOneArticle(id)
      .then((oneArticle)=>{
        if(oneArticle){
          res.send({
            code:200,
            oneArticle
          })
        }else{
          throw new Error('没有找到该文章');
        }
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 删除一篇文章
router.post('/article/remove',checkToken,function (req,res,next){
  api.removeOneArticle(req.body.id)
      .then(()=>{
        res.send({
          code:200,
          message:'删除成功'
        })
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
}),
// 编辑文章
router.post('/article/edit',checkToken,function (req,res,next){
  var id = req.body.id;
  var classify = req.body.classify
  var title = req.body.title
  var content = req.body.content
  var contentToMark = req.body.contentToMark
  api.updateArticle(id,{classify,title,content,contentToMark})
  .then(()=>{
      res.send({
        code:200,
        message:'编辑成功'
      })
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})
module.exports = router
