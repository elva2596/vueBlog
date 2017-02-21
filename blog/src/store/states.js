// 各种Store
export default {
  token:isLoggedIn()||null,
  progress:0,
  headline:''
  // 每次刷新页面或者再次访问的时候都会重新渲染状态,
  // 这里相当于给每次刷新重新设置初始值
}

function isLoggedIn(){
  let token = localStorage.getItem('jwt');
  if(token){
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      // 前端判断token是否过期，如果过期了访问时候会路由到login页面
      if(payload.exp>Date.now()/1000){
        return token;
      }
  }else{
    return false;
  }

}
