import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {User,classify} from './users';
let Users = User;
// let Classify = classify
export default {
  bootstrap(){
    let mock = new MockAdapter(axios);
    mock.onGet('/api/article/list').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          code:200,
          classify
        }]);
      }, 500);
    });
  });
  // 带分页获取数据
  mock.onGet('/api/article/lists').reply(config=>{

    let {page} = config.params;
    let total = User.length;
    // 只要传来当前页数就ok


    let UsersList = Users.filter((item,index)=>index<20*page&&index>=20*(page-1));
    return new Promise((resolve,rejected)=>{
      setTimeout(()=>{
        resolve([200, {
          total,
          users:UsersList
          // 将查询到的总条数和信息返回
        }])
      },500)
    })
  });
  // 删除分类
  mock.onPost('/api/classify/remove').reply(config=>{
    let {id} = JSON.parse(config.data);
    // console.log(Users.length);
    Users = Users.filter((item) =>item.id!==id)
    console.log(Users.length);//0
    return new Promise((resolve,rejected)=>{
      setTimeout(()=>{
        resolve([200,{}])
      },500)
    })
  })

  // 新增分类
  mock.onPost('/api/classify/create').reply(config=>{
    let {id,classify} = JSON.parse(config.data);
    Users.push({
      id,
      classify
    })
    return new Promise((resolve,rejected)=>{
      setTimeout(()=>{
        resolve([200,{
          code:200,
          msg:"新增成功"
        }])
      },500)
    })
  })
  // 创建文章
  mock.onPost('/api/article/create').reply(config=>{
    console.log(JSON.parse(config.data));
    Users.push(JSON.parse(config.data))
    return new Promise((resolve,rejected)=>{
      setTimeout(()=>{
        resolve([200,{
          code:200,
          msg:"创建成功"
        }])
      },500)
    })
  })
// 分类编辑
  mock.onPost('/api/classify/edit').reply(config=>{
    let {id,classify}=JSON.parse(config.data);
    Users.filter(item=>{
      if(item.id==id){
        item.classify = classify
      }
    })

    return new Promise((resolve,rejected)=>{
      setTimeout(()=>{
        resolve([200,{
          code:200,
          msg:'编辑成功'
        }],500)
      })
    })
  })
  }
}
