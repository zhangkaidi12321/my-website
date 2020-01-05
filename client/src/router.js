import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home"
import Topic from './views/Topic'

import Member from './views/Member'
import Login from './components/member/Login'
import Register from './components/member/Register'

import UserCenter from './components/member/UserCenter'

import Post from './components/topic/Post'
import AddPost from './components/topic/AddPost'

import News from './components/news/News'
import AddNews from './components/news/AddNews'

import Blog from './views/Blog'
import Index from './components/blog/Index'
import Documents from './components/blog/Documents'
import Essay from './components/blog/Essay'
import BlogDetail from './components/blog/BlogDetail'

import Music from './components/music/Music'

import VueTest from './views/VuexTest'

Vue.use(Router);

export default new Router({
  mode: 'history', // 去掉路由地址的#
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/member', component: Member, name: 'member', children: [
      { path: 'login', component: Login, name: 'login' },
      { path: 'register', component: Register, name: 'register' },
      { path: 'userCenter', component: UserCenter, name: 'userCenter', meta: { requireAuth: true } }
    ]},
    { path: '/topic/:type', component: Topic, name: 'topic' },
    { path: '/post/:key', component: Post, name: 'post' },
    { path: '/addPost/:id', component: AddPost, name: 'addPost', meta: { requireAuth: true } },
    { path: '/news/:key', component: News, name: 'news' },
    { path: '/addNews', component: AddNews, name: 'addNews' },
    { path: '/blog', components: { blog: Blog }, children: [
      { path: 'index', component: Index, name: 'index' },
      { path: 'documents', component: Documents, name: 'documents' },
      { path: 'essay', component: Essay, name: 'essay' },
      { path: 'detail/:md', component: BlogDetail, name: 'blogDetail' }
    ]},
    { path: '/music/:album', component: Music, name: 'music' },
    { path: '/test', component: VueTest, name: 'vueTest' }
  ]
})