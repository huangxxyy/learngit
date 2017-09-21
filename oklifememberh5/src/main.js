// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
const wx=require('weixin-js-sdk')
import * as filters from './filters'; // 全局vue filter
import MintUI from 'mint-ui'
//import { Button, Cell } from 'mint-ui'
// import 'mint-ui/lib/style.css'

// 在 .babelrc 中配置它：
// {
//   "plugins": ["other-plugin", ["component", [
//   { "libraryName": "mint-ui", "style": true }
// ]]]
// }
// 插件会自动引入相应的 CSS 文件。

import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/index'

import commonUtils from './commonutils/commonUtils'
Vue.config.productionTip = false

Vue.use(MintUI)
//Vue.component(Button.name, Button)
//Vue.component(Cell.name, Cell)


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

//浏览器种类
var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {         //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

import common_router from './router/index_common'
import app_router from './router/index_app'
import wx_router from './router/index_wx'
//判断环境,根据环境挂载cordova、路由及实例化vue
if (browser.versions.mobile) {//判断是否是移动设备打开。
  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //在微信中打开
    console.log(navigator.userAgent+':微信环境')
    window.Browser_Environment_Oklife='wx'
    //添加对应环境路由
    let router=wx_router
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {App}
    })
    window.router = router
  } else if (ua.match(/WeiBo/i) == "weibo") {
    //在新浪微博客户端打开
    console.log('新浪微博客户端环境');
    let router=common_router
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {App}
    })
    window.router = router
  } else if (ua.match(/QQ/i) == "qq") {
    //在QQ空间打开
    console.log('QQ空间环境');
    let router=common_router
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {App}
    })
    window.router = router
  } else if (browser.versions.ios) {
    //是否在IOS浏览器打开
    console.log(navigator.userAgent+':IOS浏览器环境');
    window.Browser_Environment_Oklife='app'
    //动态挂载cordova
    var cordovaScript = document.createElement('script');
    cordovaScript.setAttribute('type', 'text/javascript');
    cordovaScript.setAttribute('src', 'ios/cordova.js');
    document.body.appendChild(cordovaScript);
    document.addEventListener('deviceready', function () {
      //获取用户登录基本信息
      let suceess=(result)=>{
        console.log('获取用户基本信息成功：'+JSON.stringify(result))
        let data=JSON.parse(result)
        let token=data.token==null?'':data.token
        let myInfo=data.myInfo==null?'':data.myInfo
        console.log(token)
        console.log(myInfo)
        console.log(token && myInfo)
        if (token && myInfo) {
          // alert('已经进入处理store')
          store.commit('userinfo/changUserinfo', {
            avatar: myInfo.avatar,
            loginAccount: myInfo.loginAccount,
            nickName: myInfo.nickName,
            provinceName: myInfo.provinceName,
            address: myInfo.address,
            givenName: myInfo.givenName,
            sex: myInfo.sex,
            age: myInfo.age,
            nationalityId: myInfo.nationalityId,
            idCardType: myInfo.idCardType,
            idCard: myInfo.idCard,
            cellPhone: myInfo.cellPhone,
            birthday: myInfo.birthday,
            marriedFlag: myInfo.marriedFlag,
            sin: myInfo.sin
          })
          store.commit('common/changeloginInfo', {
            userId: myInfo.userId,//会员ID
            loginAccount: myInfo.loginAccount,//会员账号
            access_token: token.accessToken,//访问Token
            refresh_token: token.refreshToken,//刷新Token
          })
        }else{
          console.log('app异常，获取不到refresh_token')
          let jump = {
            'nativeType': 'login'
          }
          let Success = () => {}
          let error = () => {}
          cordova.plugins.oklife.skipNative(Success, error, jump)//调用原生插件跳入原生快速咨询页面
          return false
        }
      }
      let error=(errorMsg)=>{
        if('logout'==errorMsg){
          console.log('获取用户基本信息失败：用户未登录')
        }else{
          console.log('获取用户基本信息失败：'+errorMsg)
        }
      }
      let args = {
        'basedata': [
          'myInfo',
          'token'
        ]
      }
       cordova.plugins.oklife.getBaseInfo(suceess,error,args)
      //添加对应环境路由
      let router=app_router
      new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {App}
      })
      window.router = router
    }, false)
  } else if (browser.versions.android) {
    //是否在安卓浏览器打开
    console.log(navigator.userAgent+':安卓浏览器环境');
    window.Browser_Environment_Oklife='app'
    //动态挂载cordova
    var cordovaScript = document.createElement('script');
    cordovaScript.setAttribute('type', 'text/javascript');
    cordovaScript.setAttribute('src', 'android/cordova.js');
    document.body.appendChild(cordovaScript);
    document.addEventListener('deviceready', function () {
      //获取用户登录基本信息
      let suceess=(result)=>{
        console.log('获取用户基本信息成功：'+JSON.stringify(result))
        let data=JSON.parse(result)
        let token=data.token==null?'':data.token
        let myInfo=data.myInfo==null?'':data.myInfo
        console.log(token)
        console.log(myInfo)
        console.log(token && myInfo)
        if (token && myInfo) {
          // console.warn('已经进入处理store')
          store.commit('userinfo/changUserinfo', {
            avatar: myInfo.avatar,
            loginAccount: myInfo.loginAccount,
            nickName: myInfo.nickName,
            provinceName: myInfo.provinceName,
            address: myInfo.address,
            givenName: myInfo.givenName,
            sex: myInfo.sex,
            age: myInfo.age,
            nationalityId: myInfo.nationalityId,
            idCardType: myInfo.idCardType,
            idCard: myInfo.idCard,
            cellPhone: myInfo.cellPhone,
            birthday: myInfo.birthday,
            marriedFlag: myInfo.marriedFlag,
            sin: myInfo.sin
          })
          store.commit('common/changeloginInfo', {
            userId: myInfo.userId,//会员ID
            loginAccount: myInfo.loginAccount,//会员账号
            access_token: token.accessToken,//访问Token
            refresh_token: token.refreshToken,//刷新Token
          })
        }else{
          console.log('app异常，获取不到refresh_token')
          let jump = {
            'nativeType': 'login'
          }
          let Success = () => {}
          let error = () => {}
          cordova.plugins.oklife.skipNative(Success, error, jump)//调用原生插件跳入原生快速咨询页面
          return false
        }
      }
      let error=(errorMsg)=>{
        if('logout'==errorMsg){
          console.log('获取用户基本信息失败：用户未登录')
        }else{
          console.log('获取用户基本信息失败：'+errorMsg)
        }
      }
      let args = {
        'basedata': [
          'myInfo',
          'token'
        ]
      }
      cordova.plugins.oklife.getBaseInfo(suceess,error,args)
      //添加对应环境路由
      let router=app_router
      new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {App}
      })
      window.router = router
    }, false)
  }
} else {
  //否则就是PC浏览器打开
  window.Browser_Environment_Oklife='pc'
  console.log(navigator.userAgent+':PC浏览器环境');
  let router=common_router
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  })
  window.router = router
}



