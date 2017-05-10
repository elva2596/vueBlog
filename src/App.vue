<template lang="html">
  <div id="app" v-cloak>
      <router-view></router-view>
</div>
</template>


<script>
// import NProgress from 'nprogress'//页面顶部进度条
// import 'nprogress/nprogress.css'
// NProgress.configure({ showSpinner: false });
import {mapState} from 'vuex'
export default {
  components:{

  },
  methods:{
  },
  computed:mapState(['progress']),
  // watch:{
  //   progress(val){
  //     if(val==0){
  //       NProgress.start();
  //     }else if(val==100){
  //       NProgress.done();
  //     }else{
  //       NProgress.set(val/100)
  //       // NProgress.start();
  //     }
  //   }
  // },
  mounted(){
  }
}
</script>

<style lang="css">

  #app{
    height: 100%;
  }
</style>
