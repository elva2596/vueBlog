<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="articleCreate" :model="article" :rules="createRules"  v-loading="listLoading">
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3" >
            <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="article.classify" placeholder="请选择分类">
                <el-option  v-for="item in classifyList" :label="item.classify" :value="item.classify"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
      </el-row>
        <el-row style="margin-top:20px">
          <el-col :span='12'>
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content" >
               <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <!-- 展示区 -->
            <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" v-html="markedToHtml"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 " >
          <el-button type="primary" style="float:right;" size='small' @click="editArticle" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancle" >返回</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import api from '../../api/index'
import marked from 'marked';
import hlj from 'highlight.js'
import  'highlight.js/styles/atom-one-dark.css'
import NProgress from 'NProgress'
export default {
  data(){
    return {
      article:{
        id:'',
        title:'',
        classify:'',
        content:''
      },
      classifyList:[],
      createRules:{
        title:[
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        classify:[
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      load:false,
      btnText:"立即更新",
      listLoading:false
    }
  },
  computed:{
    markedToHtml(){
      marked.setOptions({
        highlight: function (code) {
        return hlj.highlightAuto(code).value;
        }
      });
      // console.log(this.article.content);
      return marked(this.article.content);
    }
  },
  methods:{
    // 更新文章
    editArticle(){
        this.$refs.articleCreate.validate(valid=>{
          if(valid){

            this.$confirm("确认提交吗?","提示",{})
                .then(()=>{
                  NProgress.start()
                  this.load = true;
                    // 换成真实API的时候可以直接提交this.article
                    this.btnText = "更新中"

                    api.editArticle({
                      contentToMark:this.markedToHtml,
                      ...this.article
                    })
                        .then((res)=>{
                            this.btnText="立即更新";
                            this.editLoading = false;

                            if(res.data.code==200){

                                  this.$notify({
                                    title:'成功',
                                    message:'更新成功',
                                    type:'success'
                                  })
                                  NProgress.done()
                                  setTimeout(()=>{
                                    this.$router.push({path:'/admin/articleList'})
                                  },500)
                            }
                        }).catch((err)=>{
                          console.log(err);
                        })
                })
                .catch((error)=>{
                  // 这里数据在换成真实api的时候要替换掉,直接用this.article
                })
          }
        })
    },
    initial(){
      this.listLoading=true
      NProgress.start();
      setTimeout(()=>{
        NProgress.done();
        this.listLoading  =false
        api.getOneArticle({id:this.$route.params.postId})
          .then(({data:{code,oneArticle:{_id,classify,title,content}}})=>{
            if(code==200){
              this.article.id = _id
              this.article.classify = classify
              this.article.title = title
              this.article.content = content
            }
          })
        api.getClassify()
            .then(({data:{code,lists}})=>{
              if(code==200){
                  this.classifyList = lists
              }
            })
      },500)

    },
    // 取消
    cancle(){
      this.$router.push({path:'/admin/articleList'});
    }
  },
  computed:{
    markedToHtml(){
      marked.setOptions({
        highlight: function (code) {
        return hlj.highlightAuto(code).value;
        }
      });
      return marked(this.article.content);
    }
  },
  mounted(){
    this.initial()
  }
}
</script>

<style lang="css">
code {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #23241f;
    inline-height:1.5em;
}
code span{
  /*display: inline-block;*/
  margin:4px 2px
}
p{
  margin:0;
}
</style>
