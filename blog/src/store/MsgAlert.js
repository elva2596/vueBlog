import Vue from 'vue'
export default function (message){
  Vue.prototype.$message({
      message,
      type:'error',
      showClose: true
  })
}
