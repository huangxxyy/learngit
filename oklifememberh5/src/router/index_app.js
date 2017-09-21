import Vue from 'vue'
import Router from 'vue-router'
import { Indicator } from 'mint-ui'
import store from '../store/index'
import commonUtils from '../../src/commonutils/commonUtils'
import pluginByApp from '../commonutils/pluginByApp'
//按需加载组件
// const Hello = resolve => {
//   // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point（代码分割点）
//   require.ensure(['@/components/Hello'], () => {
//     resolve(require('@/components/Hello'))
//   })
// };
//还有另一种代码分块的语法，使用 AMD 风格的 require，于是就更简单了：
// const Hi = resolve => require(['@/components/hi'], resolve);

Vue.use(Router)
const router = new Router({
  routes: [
    //完善个人资料
    {
      path: '/completeList',
      name: 'completeList',
      component: resolve => require (['@/views/user/completeList'], resolve),
      children: [
        {
          path: 'completeInfo/:id',
          name: 'completeInfo',
          component: resolve => require(['@/views/user/completeInfo'], resolve),
        },
        {
          path: 'completename',
          name: 'completename',
          component: resolve => require(['@/views/user/completename'], resolve)
        },
        {
          path: 'completePhone',
          name: 'completePhone',
          component: resolve => require(['@/views/user/completePhone'], resolve)
        },
        {
          path: 'completeIdcard',
          name: 'completeIdcard',
          component: resolve => require(['@/views/user/completeIdcard'],
            resolve)
        },
      ]
    },
    //专家医院
    {
      path: '/doctormain',
      name: 'doctormain',
      component: resolve => require(['@/views/doctor/doctormain'], resolve),
      children: [
        {
          path: 'doctor',
          name: 'doctor',
          component: resolve => require(['@/views/doctor/doctor'], resolve),
        },
        {
          path: 'hospital',
          name: 'hospital',
          component: resolve => require(['@/views/doctor/hospital'], resolve),
        }
      ]
    },
    //选择疾病
    {
      path: '/selectDisease/:from',
      name: 'selectDisease',
      component: resolve => require (['@/views/seriousill/selectDisease'], resolve),
    },
    //选择专家
    {
      path: '/selectDoctor',
      name: 'selectDoctor',
      component: resolve => require (['@/views/seriousill/selectDoctor'], resolve),
    },
    //私人医生
    {
      path: '/myDoctor',
      name: 'myDoctor',
      component: resolve => require (['@/views/user/myDoctor'], resolve),
    },
    //大病求医
    {
      path: '/dovrouterview',
      name: 'dovrouterview',
      component: resolve => require (['@/views/seriousill/docrouterview'], resolve),
      children:[
        {
          path: 'Submithelp',
          name: 'Submithelp',
          component: resolve => require (['@/views/seriousill/Submithelp'], resolve),
        },
        {
          path: 'success',
          name: 'success',
          component: resolve => require (['@/views/seriousill/success'], resolve),
        },
        {
          path: 'inputexpArea',
          name: 'inputexpArea',
          component: resolve => require (['@/views/seriousill/inputexpArea'], resolve),
        },
        //大病求医时间轴
        {
          path: 'circuit/:appId',
          name: 'circuit',
          component: resolve => require (['@/views/seriousill/circuit'], resolve),
        },
        {
          path: 'suredemand/:id',
          name: 'suredemand',
          component: resolve => require (['@/views/seriousill/suredemand'], resolve),
        },
        {
          path: 'applicationInfo/:id',
          name: 'applicationInfo',
          component: resolve => require (['@/views/seriousill/applicationInfo'], resolve),
        },
        {
          path: 'cancelApply/:id',
          name: 'cancelApply',
          component: resolve => require (['@/views/seriousill/cancelApply'], resolve),
        },
        {
          path: 'upload/:appId',
          name: 'upload',
          component: resolve => require (['@/views/seriousill/upload'], resolve),
        }
      ]
    },
    //就诊人管理
    {
      path: '/managementList',
      name: 'managementList',
      component: resolve => require (['@/views/patientmanagement/managementList'], resolve),
      children:[
        {
          path: 'addpatient',
          name: 'addpatient',
          component: resolve => require (['@/views/patientmanagement/addpatient'], resolve),
        },
        {
          path: 'revise/:id',
          name: 'revise',
          component: resolve => require (['@/views/patientmanagement/revise'], resolve),
        },
        {
          path: 'added',
          name: 'added',
          component: resolve => require (['@/views/patientmanagement/added'], resolve),
        },
        {
          path: 'patientname',
          name: 'patientname',
          component: resolve => require (['@/views/patientmanagement/patientname'], resolve),
        },
        {
          path: 'patientIdcard',
          name: 'patientIdcard',
          component: resolve => require (['@/views/patientmanagement/patientIdcard'], resolve),
        },
        {
          path: 'patientPhone',
          name: 'patientPhone',
          component: resolve => require (['@/views/patientmanagement/patientPhone'], resolve),
        },
        {
          path: 'patientinsurance',
          name: 'patientinsurance',
          component: resolve => require (['@/views/patientmanagement/patientinsurance'], resolve),
        },
        {
          path: 'patiEmrg',
          name: 'patiEmrg',
          component: resolve => require (['@/views/patientmanagement/patiEmrg'], resolve),
        },
        {
          path: 'patiEmrgPhone',
          name: 'patiEmrgPhone',
          component: resolve => require (['@/views/patientmanagement/patiEmrgPhone'], resolve),
        },
      ]
    },
    //陪诊申请
    {
      path: '/accompanyList',
      name: 'accompanyList',
      component: resolve => require (['@/views/accompany/accompanyList'], resolve),
      children:[
        {
          path: 'accompany',
          name: 'accompany',
          component: resolve => require (['@/views/accompany/accompany'], resolve),
        },
        {
          path: 'accompanyproject',
          name: 'accompanyproject',
          component: resolve => require (['@/views/accompany/accompanyproject'], resolve),
        },
        {
          path: 'accompanysuccess',
          name: 'accompanysuccess',
          component: resolve => require (['@/views/accompany/accompanysuccess'], resolve),
        },
        {
          path: 'selecthospital',
          name: 'selecthospital',
          component: resolve => require (['@/views/accompany/selecthospital'], resolve),
        },
        {
          path: 'pickupAddress',
          name: 'pickupAddress',
          component: resolve => require (['@/views/accompany/pickupAddress'], resolve),
        },
        {
          path: 'accompanyagreement',
          name: 'accompanyagreement',
          component: resolve => require (['@/views/accompany/accompanyagreement'], resolve),
        },
        //陪诊申请时间轴
        {
          path: 'accompanyCircuit/:appId',
          name: 'accompanyCircuit',
          component: resolve => require (['@/views/accompany/accompanyCircuit'], resolve),
        },
        {
          path: 'accompanyInfo/:id',
          name: 'accompanyInfo',
          component: resolve => require (['@/views/accompany/accompanyInfo'], resolve),
        },
        {
          path: 'accompanySure/:id',
          name: 'accompanySure',
          component: resolve => require (['@/views/accompany/accompanySure'], resolve),
        },
        {
          path: 'accompanyupload/:appId',
          name: 'accompanyupload',
          component: resolve => require (['@/views/accompany/accompanyupload'], resolve),
        }
      ]
    },
    //我的关注
    {
      path: '/myconcern',
      name: 'myconcern',
      component: resolve => require (['@/views/myconcern/myconcern'], resolve),
    },
    {
      path: '/expertInfo/:id',
      name: 'expertInfo',
      component: resolve => require (['@/views/myconcern/expertInfo'], resolve),
    },
    {
      path: '/hospitalInfo',
      name: 'hospitalInfo',
      component: resolve => require (['@/views/myconcern/hospitalInfo'], resolve),
    },
    {
      path: '/404',
      name: '404',
      component: resolve => require (['@/views/login/404'], resolve),
    },
    //帮助与反馈
    {
      path: '/help',
      name: 'help',
      component: resolve => require (['@/views/helpandfeedback/help'], resolve),
    },
    //提交反馈
    {
      path: '/subminfeedback',
      name: 'subminfeedback',
      component: resolve => require (['@/views/helpandfeedback/subminfeedback'], resolve),
    },
    //我的反馈
    {
      path: '/myFeedback',
      name: 'myFeedback',
      component: resolve => require (['@/views/helpandfeedback/myFeedback'], resolve),
    },
    //反馈留言板
    {
      path: '/leaveMessage/:problemId',
      name: 'leaveMessage',
      component: resolve => require (['@/views/helpandfeedback/leaveMessage'], resolve),
    },
    //搜索
    {
      path: '/search',
      name: 'search',
      component: resolve => require (['@/views/search/search'], resolve),
    },
    //用户协议
    {
      path: '/agreement',
      name: 'agreement',
      component: resolve => require (['@/views/about/agreement'], resolve),
    },
    //关于oklife
    {
      path: '/about',
      name: 'about',
      component: resolve => require (['@/views/about/about'], resolve),
    },
    {path: '/', redirect: '/404'},//路由重定向写法
    {path: '*', redirect: '/404'}//路由重定向写法
  ]
})




//使用 router.beforeEach 注册一个全局的 before 钩子：
router.beforeEach((to, from, next) => {
  let isfullinfo=store.state.userinfo.userinfo.nationalityId == '请选择您的国籍' ||
    !store.state.userinfo.userinfo.nationalityId
    || store.state.userinfo.userinfo.idCardType == '婴幼儿无身份可不填写' ||
    !store.state.userinfo.userinfo.idCardType
    || !store.state.userinfo.userinfo.givenName ||
    store.state.userinfo.userinfo.givenName == '请填写您的真实姓名'
    || !store.state.userinfo.userinfo.cellPhone ||
    store.state.userinfo.userinfo.cellPhone == '用于接收就诊信息，请认真填写'
    || !store.state.userinfo.userinfo.idCard ||
    store.state.userinfo.userinfo.idCard == '未填写'
    || store.state.userinfo.userinfo.sex == 0 ||
    !store.state.userinfo.userinfo.sex ||
    store.state.userinfo.userinfo.sex == '请选择'
    || !store.state.userinfo.userinfo.age ||
    store.state.userinfo.userinfo.age == '请选择'

  if(to.path == '/Submitq' && from.path.split('/')[2]=='completeInfo' && isfullinfo){
    // 用户登录成功后，从完善资料后退到快速提问，此时资料是不完善的，所以则关闭
    if('app'== window.Browser_Environment_Oklife){
      let jump = {//返回上层原生页面
        "nativeType": "back"
      }
      let Success=()=>{}
      let error=()=>{}
      cordova.plugins.oklife.skipNative(Success, error, jump);//调用原生插件返回原生
    }
    return false;
  }
  if(to.path == '/Submithelp' && from.path.split('/')[2]=='completeInfo' && isfullinfo){
    // 用户登录成功后，从完善资料后退到大病求医，此时资料是不完善的，所以则关闭
    if('app'== window.Browser_Environment_Oklife){
      let jump = {//返回上层原生页面
        "nativeType": "back"
      }
      let Success=()=>{}
      let error=()=>{}
      cordova.plugins.oklife.skipNative(Success, error, jump);//调用原生插件返回原生
    }
    return false;
  }
  if(to.path == '/accompany' && from.path.split('/')[2]=='completeInfo' && isfullinfo){
    // 用户登录成功后，从完善资料后退到陪诊申请，此时资料是不完善的，所以则关闭
    if('app'== window.Browser_Environment_Oklife){
      let jump = {//返回上层原生页面
        "nativeType": "back"
      }
      let Success=()=>{}
      let error=()=>{}
      cordova.plugins.oklife.skipNative(Success, error, jump);//调用原生插件返回原生
    }
    return false;
  }
  //这里定义入口参数entry，
  //v1001类，需要登录的业务且不能跳过；
  //v1002类，不需要登录的业务，但如未登录则要进入手机验证码页登录（跳过可直接进入业务）；
  //!!!!由于app上专家医院页面属于直接进入页不需要任何前置条件，所以app上无v1002类!app上就医陪同是需要登录的业务，所以属于V1001类
  //v1003类，直接进入页不需要任何前置条件；

  //v1001类：APP原生界面快速咨询v1001001、私人医生v1001002、我的关注v1001003、大病求医v1001004、就医陪同v1001005、
  // 就诊人管理v1001006、问卷详情v1001007;

  //v1003类：医生和医院v1003001、大病服务全部v1003002、大病服务的疾病v1000303、联系客服v1003004、资讯详情v1003005、
  // banner v1003006、帮助与反馈v1003007;

  let getUrlParams=commonUtils.getRequest() //输出一个对象包括url中所有参数键值对
  let entry= getUrlParams.entry==undefined?'':getUrlParams.entry
  let refresh_token=store.getters['common/getcurrentUser'].refresh_token
  console.log('entry:'+entry);
  console.log('topath:'+to.path)
  console.log('tofrom:'+from.path)
  console.log( 'refresh_token:'+refresh_token)

  if(entry=='v1001002' || entry=='v1001003' ||entry=='v1001004' ||entry=='v1001005' ||entry=='v1001006' ||entry=='v1001007'){
    if(!refresh_token || refresh_token=='' || refresh_token==null || refresh_token=='null'||refresh_token==undefined || refresh_token=='undefined'){
      console.warn('进入refresh_token为空的分支')
      pluginByApp.getinfoByApp(store,next)
    }else{
      console.warn('进入refresh_token已有的分支')
      console.warn('completeInfo:'+to.path.split('/')[2])
      if(to.path.split('/')[2]=='completeInfo'){
        next()
      }else {
        switch (entry) {
          case 'v1001002'://H5私人医生
            next({name: ''})
            break
          case 'v1001003'://H5我的关注
            next({name: 'myconcern'})
            break
          case 'v1001004'://H5大病求医
            if (store.state.userinfo.userinfo.nationalityId == '请选择您的国籍' ||
              !store.state.userinfo.userinfo.nationalityId
              || store.state.userinfo.userinfo.idCardType == '婴幼儿无身份可不填写' ||
              !store.state.userinfo.userinfo.idCardType
              || !store.state.userinfo.userinfo.givenName ||
              store.state.userinfo.userinfo.givenName == '请填写您的真实姓名'
              || !store.state.userinfo.userinfo.cellPhone ||
              store.state.userinfo.userinfo.cellPhone == '用于接收就诊信息，请认真填写'
              || !store.state.userinfo.userinfo.idCard ||
              store.state.userinfo.userinfo.idCard == '未填写'
              || store.state.userinfo.userinfo.sex == 0 ||
              !store.state.userinfo.userinfo.sex ||
              store.state.userinfo.userinfo.sex == '请选择'
              || !store.state.userinfo.userinfo.age ||
              store.state.userinfo.userinfo.age == '请选择') {
              console.warn('userId:' + store.state.common.loginInfo.userId)
              next({
                name: 'completeInfo',
                params: {id: store.state.common.loginInfo.userId}
              })
            } else {
              next({name: 'Submithelp'})
            }
            break
          case 'v1001005'://就医陪同
            if (store.state.userinfo.userinfo.nationalityId == '请选择您的国籍' ||
              !store.state.userinfo.userinfo.nationalityId
              || store.state.userinfo.userinfo.idCardType == '婴幼儿无身份可不填写' ||
              !store.state.userinfo.userinfo.idCardType
              || !store.state.userinfo.userinfo.givenName ||
              store.state.userinfo.userinfo.givenName == '请填写您的真实姓名'
              || !store.state.userinfo.userinfo.cellPhone ||
              store.state.userinfo.userinfo.cellPhone == '用于接收就诊信息，请认真填写'
              || !store.state.userinfo.userinfo.idCard ||
              store.state.userinfo.userinfo.idCard == '未填写'
              || store.state.userinfo.userinfo.sex == 0 ||
              !store.state.userinfo.userinfo.sex ||
              store.state.userinfo.userinfo.sex == '请选择'
              || !store.state.userinfo.userinfo.age ||
              store.state.userinfo.userinfo.age == '请选择') {
              next({
                name: 'completeInfo',
                params: {id: store.state.common.loginInfo.userId}
              })
            } else {
              next({name: 'accompany'})
            }
            break
          case 'v1001006'://就诊人管理
            next({name: 'addpatient'})
            break
          case 'v1001007'://问卷详情
            next({name: ''})
            break
          default:
            console.log('非法路径')
            let jump = {
              'nativeType': 'login'
            }
            let Success = () => {}
            let error = () => {}
            cordova.plugins.oklife.skipNative(Success, error, jump)//调用原生插件跳入原生快速咨询页面
        }
      }
    }
  }else {
    console.warn('进入不需要refresh_token的分支')
    next()
  }
})
//使用 router.afterEach 注册一个全局的 after 钩子：
// router.afterEach (route => {
//   // todo
// })

export default router
