<template lang="html">
    <div class="wrapper">
      <vhead class="head"></vhead>
        <router-view class="content"></router-view>
      <vfoot class="foot"></vfoot>
    </div>
</template>

<script>
import vhead from './vheader'
import vfoot from './vfooter'
import api from '../../api'
import ls from 'store2'
export default {
  data(){
    return {
      items:[
      ],
      loading2:false
    }
  },
  methods:{
  },
  components:{
    vhead,
    vfoot
  }
}
</script>

<style lang="css" scoped>
    .wrapper{
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -webkit-flex-direction:column;
      height: 100%;

      /*overflow: scroll;*/
    }
    .head,.foot{
      flex:0 0 auto;
    }
    .content{
      width: 80%;
      padding:2rem;
      padding-bottom: 0;
      max-width: 800px;
      flex:1  0 auto;
      background: #fff;
    }
    .fade-enter-active,.fade-leave-active{
      transition: all .3s ;
    }
    .fade-enter{
      transform: translateY(2rem);
      opacity:0;
    }
    .fade-leave-active{
      transform: translateX(2rem);
      opacity:0;
    }
    @media screen and (max-width:480px){
      .content{
        width: 100%;
        padding: 1rem 2rem;
      }
    }
</style>
