import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');

/* deskTop */
const deskTop = _import('deskTop/index')

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');


/* 一、平台服务 */
/* 1、快速提问 */
const quickQuestion = _import('platformService/quickQuestion/customerService');


/* 2、大病求医 */
const seriousill = _import('platformService/seriousill/index');

/* 2.1、管理大病求医 */
const seriousillManagement = _import('platformService/seriousill/management');
const seriousillSureOrder = _import('platformService/seriousill/sureOrder');

/* 3、陪诊申请 */
const accompany = _import('platformService/accompany/index');


/* 4、e小蜜管理 */
const eMistress = _import('platformService/eMistress/index');


/* 5、临时任务 */
const temporaryTask = _import('platformService/temporaryTask/index');


/* 6、电子化病例 */
const electronicCase = _import('platformService/electronicCase/index');


/* 7、意见反馈 */
const feedBack = _import('platformService/feedBack/index');


/* 二、会员管理 */
/* 1、会员列表 */
const memberList = _import('memberManagement/memberList/index');



/* 2、会员群组管理 */
const memberGroupManagement = _import('memberManagement/memberGroupManagement/index');




Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
   { path: '/login', component: Login, hidden: true },
   { path: '/404', component: Err404, hidden: true },
   { path: '/401', component: Err401, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/deskTop',
    icon: 'zonghe',
    hidden: false,
    noDropdown: true,
    children: [{ path: 'deskTop', component: deskTop, name: '我的工作台' }]
  },
  {
    path: '/platformService',
    component: Layout,
    redirect: '/platformService/quickQuestion',
    icon: 'weixin',
    name: '平台服务',
    noDropdown: false,
    children: [
      { path: 'quickQuestion', component: quickQuestion, name: '快速提问'},
      { path: 'seriousill', component: seriousill, name: '大病求医' },
      { path: 'seriousill/management', component: seriousillManagement, name: '管理大病求医', hidden: true},
      { path: 'seriousill/sureOrder', component: seriousillSureOrder, name: '填写确认记录', hidden: true},
      { path: 'accompany', component: accompany, name: '陪诊申请' },
      { path: 'eMistress', component: eMistress, name: 'e小蜜管理' },
      { path: 'temporaryTask', component: temporaryTask, name: '临时任务' },
      { path: 'electronicCase', component: electronicCase, name: '电子化病例' },
      { path: 'feedBack', component: feedBack, name: '意见反馈' }
    ]
  },
  {
    path: '/memberManagement',
    component: Layout,
    redirect: '/memberList',
    icon: 'xinrenzhinan',
    name: '会员管理',
    noDropdown: false,
    children: [
      { path: 'memberList', component: memberList, name: '会员列表' },
      { path: 'memberGroupManagement', component: memberGroupManagement, name: '会员群组管理' }
    ]
  }
]

export const asyncRouterMap = [];


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
