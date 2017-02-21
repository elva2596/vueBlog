export function sub(obj,res){
  obj.btnText="提交";
  obj.editLoading = false;

  if(res.data.code==200){
        obj.$notify({
          title:'成功',
          message:'提交成功',
          type:'success'
        })
  }else if(res.data.code==401){
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
  obj.formVisible = false;
  obj.getLists();
}
