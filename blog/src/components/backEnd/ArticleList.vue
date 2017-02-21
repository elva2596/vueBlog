<template lang="html">
  <el-row>
    <el-row  style="padding:10px 15px;background:#fff">
      <el-col :span="24">
        <el-button size="small" type="primary" @click="createArticle">创建文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24' >
          <el-table
             style='width:100%' align="center" :data="articleLists"  v-loading="listLoading" element-loading-text="拼命加载中">
              <el-table-column type='index' width="60" ></el-table-column>
              <el-table-column   prop="created_at" min-width="200" label="创建时间" ></el-table-column>
              <el-table-column  prop="classify" min-width="150" label="所属分类" ></el-table-column>
              <el-table-column  prop="title" min-width="180" label="文章标题" ></el-table-column>
              <el-table-column  min-width="180" label="操作" >
                <template scope='scope'>
                  <!--这里点击查看进入具体页面但是路径中必须带有admin,这时具体页面里会出现评论的删除选项  -->
                  <el-button size="small" @click="read(scope.row._id)">查看</el-button>
                  <el-button size="small" type='primary' @click="editArticle(scope.row._id)">编辑</el-button>
                  <el-button size="small" type='danger' @click="remove(scope.row._id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <!-- 表格结束 -->
    <el-row>
      <el-col :span="24" class="page">
          <el-pagination layout="prev,pager,next" @current-change="handle" :total="total" :page-size="limit" style="float:right"></el-pagination>
      </el-col>
    </el-row>
    <!-- 分页结束 -->
  </el-row>
</template>

<script>
import axios from 'axios'
import api from '../../api'
import NProgress from 'nprogress'
export default {
    data(){
      return {
        articleLists:[],
        total:0,
        page:1,
        limit:10,
        listLoading:false,
        msg:'hello',
        formTitle:'',
        formVisible:false,
        classifyInf:{
          id:0,
          classify:''
        },
        formRule:{
          classify:[
            {required:true,message:'请输入分类名称',trigger:'blur'}
          ]
        },
        flag:true,
        editLoading:false,
        btnText:'提交'
      }
    },
    methods:{
      handle(val){
        this.page = val;
        this.getLists()
      },
      getLists(){
        this.listLoading = true
        NProgress.start()
        api.getArticleList({
          page:this.page,
          limit:this.limit
        })
        .then(({data:{articleLists,total}})=>{
            setTimeout(()=>{
              this.listLoading =false
              NProgress.done()
              this.articleLists =articleLists;
              this.total =total;
            },500)
        })
      },
      read(id){
        this.$router.push({path:`/article/${id}`})
      },
      remove(id){
        this.$confirm('确认要删除吗?','提醒',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'waring'
        })
        .then(()=>{
          this.listLoading = true;
          NProgress.start();
          api.removeOneArticle({id})
              .then(()=>{
                this.listLoading = false
                NProgress.done()
                this.$notify({
                  title:'成功',
                  message:"删除成功",
                  type:'success'
                })
                this.getLists()
              })
        }).catch((err) => {
          console.log(err);
        })

      },
      // 跳转到编辑界面，进行新建
      createArticle(){
          this.$router.push({path:'/admin/articleCreate'});
      },
      //跳转到编辑界面，进行更新
      editArticle(id){
        // 通过this.$route.params来获取数据
          this.$router.push({path:`/admin/articleEdit/${id}`});
      }

    },
      mounted(){
        this.getLists();
      }
}
</script>

<style lang="css">
  .page{
    padding:10px;
    background:#fff;
  }
</style>
