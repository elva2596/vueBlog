<template lang="html">
  <div class="tags_wrap"  v-loading="loading2"  element-loading-text="加载中">
    <ul class="tags_list">
      <li v-for='(item,index) in items'>
        <a class="tag_btn" :to="`/tags/${item.id}`" @click.prevent="gets(index,item.classify)" :class="{'active':index==selected}">{{item.classify}}</a>
      </li>
    </ul>
    <transition-group name="list" tag="div" >
      
      <article v-for='item in articleLists' v-if='show' :key="item.id" >
        <header>
          <div>
            <router-link :to="{path:`/article/${item.id}`}" class="tags_title" >
            {{item.title}}
          </router-link>
        </div>
        <div>
          <p class="tags_creatAt">{{item.createdAt}}</p>
        </div>
      </header>
      <section v-html="item.contentToMark" class="tags_main" ></section>
      <footer>
          <router-link class="tags_readMore" :to="{path:`/article/${item.id}`}">阅读全文>></router-link>
      </footer>
    </article>
    
    </transition-group>
  </div>
</template>

<script>
import api from '../../api'
import vfoot from './vfooter'
export default {
  name:"Tag",
  data(){
    return {
      items:[],
      articleLists:[],
      selected:9,
      show:true,
      loading2:true,
      list_show:true
    }
  },
  components:{
    vfoot
  },
  methods:{
    gets(index,classify){
      this.$store.dispatch('changeHeadLine',classify)
      this.show = false;
      this.selected = index
      this.getPage(classify)
    },
    getPage(classify){
      api.getArticlesByClassify({classify})
          .then(({data:{code,articleLists}})=>{
           
            if(code==200){
                this.articleLists = articleLists
                setTimeout(()=>{
                    this.show = true;
                },200)

            }
          })
          .catch(err=>{
            alert(err.message)
          })
    }
  },
  mounted(){
    this.$store.dispatch('changeHeadLine','标签')
      // 根据标签名获取文章列表
    api.getNoAuthClass()
      .then(({data:{code,lists}})=>{
        if(code==200){
          setTimeout(()=>{
            this.loading2=false;
            this.items = lists
            this.getPage('Vue')
          },200)
        }

      })
      .catch(err=>{
        alert(err.message);
      })


  }

}
</script>

<style lang="css" scoped>
.list-enter-active,.list-leave-active{
  transition: all .3s
}
.list-enter,.list-leave-active{
  opacity: 0;
}

h2,h4{
  margin:0;
}
p,.tags_main p{
  margin:0;
}
.tags_list{
  margin:0;
  padding:0;
  list-style: none;
  display: flex;
  display:-webkit-flex;
  -webkit-flex-wrap:wrap;
  flex-wrap: wrap;
}
.tags_list li{
  margin:.4rem;
}
.tags_list li a{
  display: block;
  padding: .6rem 1.6rem;
  border:1px solid #d2d2d2;
  border-radius: .6rem;
  color:rgba(0, 0, 0, .8);
  font-size: 1.8rem;
  /*transition渐变*/
   background-color: #f7f7f7;
   transition: all .4s;
   cursor: pointer;
}
.tags_list li a:hover,.tags_list li .active{
    /*transition渐变*/
  background-color: #555555;
    color: #fff;
}
.tags_wrap{
  margin:auto;
  list-style: none;
}
.tags_wrap article{
  padding-bottom: 1rem;
  border-bottom:1px solid #d2d2d2;
}
.tags_title{
  display: block;
  font-size: 3rem;
  font-weight: 400;
  color:#404040;
  padding:1rem 0;
}
.tags_creatAt{
  font-family: "Comic Sans MS", curslve, sans-serif;
  padding:0.6rem 0;
  font-size: 1.8rem;
  color:#7f8c8d;
}
.tags_main{
  font-size: 1.6rem;
  color:#34495e;
  line-height: 1.6em;
  padding:1rem 0;
}
footer{
  text-align: right;
}
.tags_readMore{
  font-size: 2rem;
  color:#919191;
  font-weight: 600;
}
@media screen and (max-width:786px){
  .tags_title{
    font-size: 2.4rem;
  }
  .tags_creatAt{
    font-size: 1.6rem;
  }
  .tags_list li{
    margin:.2rem;
  }
  .tags_list li a{
    font-size: 1.4rem;
  }
}
@media screen and (max-width:480px){
  .tags_main{
    font-size:1.4rem;
  }
  .tags_readMore{
    font-size: 1.8rem;
  }
}
</style>
