<template lang="html">
  <el-row>
    <el-row  style="padding:10px 15px;background:#fff">
      <el-col :span="24">
        <el-button size="small" type="primary" @click="addClass">添加分类</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24' >
          <el-table
             style='width:100%' align="center" :data="lists"  v-loading="listLoading" element-loading-text="拼命加载中">
              <el-table-column type='index' width="60" ></el-table-column>
              <el-table-column   prop="created_at" min-width="180" label="创建时间" ></el-table-column>
              <!-- <el-table-column  prop="classify" min-width="100" label="所属分类" ></el-table-column> -->
              <el-table-column  prop="classify" min-width="180" label="分类名称" ></el-table-column>
              <el-table-column  min-width="200" label="操作" >
                <template scope='scope'>
                  <!--这里点击查看进入具体页面但是路径中必须带有admin,这时具体页面里会出现评论的删除选项  -->
                  <el-button size="small" type='primary' @click="editClass(scope.row)">编辑</el-button>
                  <el-button size="small" type='danger' @click="remove(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <!-- 表格结束 -->
    <el-row>
        <el-col :span="24">
          <el-dialog :title="formTitle" v-model="formVisible">
            <el-form :model="classifyInf" label-width="120px" ref="classifyInf" :rules="formRule">
                <el-form-item label="分类名称" prop="classify">
                  <el-input v-model='classifyInf.classify' auto-complete='off'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="editSubmit" :loading="editLoading" >{{btnText}}</el-button>
            </div>
          </el-dialog>
          <!-- 弹窗结束 -->
        </el-col>
    </el-row>
  </el-row>
</template>

<script>
import axios from 'axios'
import api from '../../api'
import NProgress from 'nprogress'
import {sub} from '../../assets/js/commen'
export default {
    data(){
      return {
        lists:[],
        listLoading:false,
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
        editLoading:false,
        btnText:'提交'
      }
    },
    methods:{
      // 获取分类列表
      getLists(){
        this.listLoading = true
        NProgress.start()
        api.getClassify()
            .then((result)=>{
              setTimeout(()=>{
                this.listLoading =false
                this.lists = result.data.lists;
                NProgress.done()
              },500)
        })
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
          api.removeClassifyList({id})
              .then(({data:{code,message}})=>{
                this.listLoading = false
                NProgress.done()
                // 这里需要优化
                if(code==200){
                  this.$notify({
                    title:'成功',
                    message,
                    type:'success'
                  })
                }else if(code==401){
                    this.$notify({
                    title:'失败',
                    message,
                    type:'error'
                  })
                   setTimeout(()=>{
                      this.$router.replace({path:'/login'})
                  },500)
                  return false//阻止继续执行
                  // 需要优化
                }
                this.getLists()
              }).catch(err=>{
                  // 这里可以跳转到错误页面
              })
        }).catch((err) => {
        })

      },
      // 显示创建分类弹窗
      addClass(){
        this.formVisible=true;
        this.formTitle = '新增';
        this.classifyInf.classify='';
      },
      // 显示编辑分类弹窗
      editClass(row){
        this.formVisible=true;
        this.formTitle = '编辑';
        this.classifyInf.classify = row.classify
        this.classifyInf.id = row.id
      },
      editSubmit(){
        this.$refs.classifyInf.validate(valid=>{
          if(valid){
            this.$confirm('确认提交吗？',"提示",{})
                .then(()=>{
                    this.btnText = "提交中"
                    this.editLoading=true
                    NProgress.start()
                    // 新增分类
                    if(this.formTitle=='新增'){
                      // 这里又是一个异步提交
                      api.addClassify({
                        classify:this.classifyInf.classify
                      })
                      .then((res)=>{
                          NProgress.done();
                          sub(this,res)
                      })
                    }
                    else{
                      // 编辑
                        api.editClassfy({
                          id:this.classifyInf.id,
                          classify:this.classifyInf.classify
                        })
                        .then((res)=>{
                          NProgress.done();
                          sub(this,res)
                        })
                    }

                })
                .catch(err=>{
                    //
                })
          }
        })
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
