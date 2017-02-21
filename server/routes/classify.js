var express =  require('express');
var router  = express.Router();
var api = require('../api');
var checkToken = require('../middleware/checkToken');
// 创建分类
router.post('/classify/create',checkToken,function (req,res,next){
  api.createClass(req.body)
      .then(({result:{ok,n}})=>{
        if(ok&&n>1){
          res.send({
            code:200,
            message:'创建成功'
          })
        }else{
          throw new Error('创建失败');
        }
      })
      .catch(err=>{
        res.send({
          code:-200,
          message:err.toString()
        })
      })
})
// 删除分类
router.post('/classify/remove',checkToken,function (req,res,next){
  api.removeClass(req.body.id)
  .then(({result:{ok,n}})=>{
    // 使用es6解构
    if(ok&&n>0){
      // 已经删除了数据库中存在的项
      res.send({
        code:200,
        message:'删除成功'
      })
    }else{
      // 删除不存在的项
    throw new Error('该分类不存在')
    }
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})

// 编辑分类
router.post('/classify/edit',checkToken,function (req,res,next){

  var id = req.body.id;
  var classify = req.body.classify
  api.updateClass(id,{classify:classify})
  .then(({result:{ok,n}})=>{
    if(ok&&n>0){
      res.send({
        code:200,
        message:'编辑成功'
      })
    }else{
      throw new Error('编辑失败');
    }
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})

// 获取所有分类
router.get('/classify/lists',checkToken,function (req,res,next){
  api.findAllClass()
  .then((lists)=>{
    res.send({
      code:200,
      lists
    })
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})
// 无权限获取分类给前台使用
router.get('/classify/noAuth',function (req,res,next){
  api.findAllClass()
  .then((lists)=>{
    res.send({
      code:200,
      lists
    })
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})

module.exports = router;
