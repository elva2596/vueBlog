import Mock from 'mockjs';
const User = [];
const classify = []
for (let i = 0; i < 86; i++) {
  User.push(Mock.mock({
    id: Mock.Random.id(),//标号
    title: Mock.Random.cname(),//标题
    classify: Mock.Random.ctitle(),//所属分类
    date: Mock.Random.datetime(),//发布日期
    content: Mock.Random.title()
  }));

}
for(let i=0;i<5;i++){
  classify.push(Mock.mock({
    id: Mock.Random.id(),//标号
    // title: Mock.Random.cname(),//标题
    classify: Mock.Random.ctitle(),//所属分类
    date: Mock.Random.datetime()//发布日期
  }));
}
export {User,classify}
