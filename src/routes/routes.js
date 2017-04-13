import Reg from '../components/backEnd/Reg';
import Login from '../components/backEnd/Login';
import Admin from '../components/backEnd/Admin';
import ArticleCreate from '../components/backEnd/ArticleCreate'
import ArticleList from '../components/backEnd/ArticleList'
import ArticleEdit from '../components/backEnd/ArticleEdit'
import ClassList from '../components/backEnd/ClassList'
import Home from '../components/fronted/Home';
import Front from '../components/fronted/Front';
import About from '../components/fronted/About';
import Tags from '../components/fronted/Tags';
import Article from '../components/fronted/Article';
import NotFound from '../components/NotFound'
export default [

    {
        path: '/reg',
        component: Reg,
        meta: { auth: false },
        hidden: true
    },
    {
        path: '/',
        component: Front, //这是文章页
        hidden: true,
        children: [
            { path: '', redirect: 'home', meta: { auth: false } },
            { path: 'home', component: Home, meta: { auth: false } },
            { path: 'about', component: About, meta: { auth: false } },
            { path: 'tags', component: Tags, meta: { auth: false } },
            { path: 'article/:id', component: Article, meta: { auth: false, scrollToTop: true } },
        ]
    },
    {
        path: '/login',
        component: Login,
        hidden: true
    },
    {
        // 后台路由
        path: '/admin',
        component: Admin,
        name: '管理面板',
        iconCls: 'el-icon-message',
        children: [{
                // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
                path: '',
                hidden: true,
                redirect: { name: '文章管理' }
            },
            {
                // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
                path: 'articleList',
                component: ArticleList,
                name: '文章管理'
            },
            {
                // 创建文章单独一个组件
                path: 'articleCreate',
                component: ArticleCreate,
                name: '创建文章',
                hidden: true
            },
            {
                path: 'articleEdit/:postId',
                component: ArticleEdit,
                hidden: true,
                name: "编辑文章"
            },
            {
                path: 'classList',
                component: ClassList,
                name: '分类管理'
                    // 创建分类直接在分类列表里面出现弹层
            }
        ]
    },
    {
        path: '*',
        component: NotFound,
        hidden: true
    }
    //

    // {path:'/404',component:NotFound}
]