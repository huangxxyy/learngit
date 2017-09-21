import Vue from 'vue'
import Router from 'vue-router'
import {Indicator} from 'mint-ui';
import store from '../store/index'
import commonUtils from '../../src/commonutils/commonUtils'
import api from '../../src/server/api'
const wx=require('weixin-js-sdk')
//按需加载组件
// const Hello = resolve => {
//   // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point（代码分割点）
//   require.ensure(['@/components/Hello'], () => {
//     resolve(require('@/components/Hello'))
//   })
// };
//还有另一种代码分块的语法，使用 AMD 风格的 require，于是就更简单了：
// const Hi = resolve => require(['@/components/hi'], resolve);

Vue.use (Router);
const router = new Router ({
  routes: [
    //个人信息
    {
      path: '/infoList',
      name: 'infoList',
      component: resolve => require (['@/views/user/infoList'], resolve),
      children: [
        {
          path: 'userinfo',
          name: 'userinfo',
          component: resolve => require(['@/views/user/userinfo'], resolve),
        },
        {
          path: 'inputname',
          name: 'inputname',
          component: resolve => require(['@/views/user/inputname'], resolve)
        },
        {
          path: 'inputbabyname',
          name: 'inputbabyname',
          component: resolve => require(['@/views/user/inputbabyname'], resolve)
        },
        {
          path: 'address',
          name: 'address',
          component: resolve => require(['@/views/user/address'], resolve)
        },
        {
          path: 'idcard',
          name: 'idcard',
          component: resolve => require(['@/views/user/idcard'], resolve)
        },
        {
          path: 'phonenumber',
          name: 'phonenumber',
          component: resolve => require(['@/views/user/phonenumber'], resolve)
        },
        {
          path: 'insurance',
          name: 'insurance',
          component: resolve => require(['@/views/user/insurance'], resolve)
        },
        {
          path: 'changeAccount',
          name: 'changeAccount',
          component: resolve => require(['@/views/user/changeAccount'], resolve)
        },
        {
          path: 'changeAccountNP',
          name: 'changeAccountNP',
          component: resolve => require(['@/views/user/changeAccountNophone'],
            resolve)
        }
      ]
    },
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
    {
      path: '/fillphone',
      name: 'fillphone',
      component: resolve => require (['@/views/login/fillphone'], resolve)},
    {
      path: '/authorize',
      name: 'authorize',
      component: resolve => require (['@/views/login/authorize'], resolve)},
    {
      path: '/bindAccount',
      name: 'bindAccount',
      component: resolve => require (['@/views/login/bindAccount'], resolve)},
    {
      path: '/alreadybindapp',
      name: 'alreadybindapp',
      component: resolve => require (['@/views/login/alreadybindapp'], resolve)},
    {
      path: '/fdisease',
      name: 'fdisease',
      component: resolve => require (['@/views/login/fdisease'], resolve),
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
      component: resolve => require (['@/views/user/myDoctor'], resolve)},
    //快速咨询---提交问题资料
    {
      path: '/quickrouterview',
      name: 'quickrouterview',
      component: resolve => require (['@/views/quickconsultation/quickrouterview'], resolve),
      children:[
        {
          path: 'Submitq',
          name: 'Submitq',
          component: resolve => require (['@/views/quickconsultation/Submitq'], resolve),
          },
        {
          path: 'baseInfo/:id',
          name: 'baseInfo',
          component: resolve => require (['@/views/quickconsultation/baseInfo'], resolve),
        },
        {
          path: 'height',
          name: 'height',
          component: resolve => require (['@/views/quickconsultation/height'], resolve),
        },
        {
          path: 'weight',
          name: 'weight',
          component: resolve => require (['@/views/quickconsultation/weight'], resolve),
        },
        {
          path: 'waistline',
          name: 'waistline',
          component: resolve => require (['@/views/quickconsultation/waistline'], resolve),
        },
        {
          path: 'paunch',
          name: 'paunch',
          component: resolve => require (['@/views/quickconsultation/paunch'], resolve),
        },
        {
          path: 'historysick',
          name: 'historysick',
          component: resolve => require (['@/views/quickconsultation/historysick'], resolve),
        },
        {
          path: 'nowsick',
          name: 'nowsick',
          component: resolve => require (['@/views/quickconsultation/nowsick'], resolve),
        },
        {
          path: 'allergy',
          name: 'allergy',
          component: resolve => require (['@/views/quickconsultation/allergy'], resolve),
        },
        {
          path: 'questionInfo/:id',
          name: 'questionInfo',
          component: resolve => require (['@/views/quickconsultation/questionInfo'], resolve),
        },
        {
          path: 'easemobInline',
          name: 'easemobInline',
          component: resolve => require (['@/views/quickconsultation/easemobInline'], resolve),
          },
        {
          path: 'bloodpressureS',
          name: 'bloodpressureS',
          component: resolve => require (['@/views/quickconsultation/bloodpressureS'], resolve),
        },
        {
          path: 'bloodpressureZ',
          name: 'bloodpressureZ',
          component: resolve => require (['@/views/quickconsultation/bloodpressureZ'], resolve),
        },
        {
          path: 'bloodsuger',
          name: 'bloodsuger',
          component: resolve => require (['@/views/quickconsultation/bloodsuger'], resolve),
        },
        {
          path: 'heartrate',
          name: 'heartrate',
          component: resolve => require (['@/views/quickconsultation/heartrate'], resolve),
        },
        {
          path: 'familysick',
          name: 'familysick',
          component: resolve => require (['@/views/quickconsultation/familysick'], resolve),
        },
        {
          path: 'marriagehistory',
          name: 'marriagehistory',
          component: resolve => require (['@/views/quickconsultation/marriagehistory'], resolve),
        },
        {
          path: 'personhistory',
          name: 'personhistory',
          component: resolve => require (['@/views/quickconsultation/personhistory'], resolve),
        },
        {
          path: 'livinghabit',
          name: 'livinghabit',
          component: resolve => require (['@/views/quickconsultation/livinghabit'], resolve),
        }
      ]
    },
    //我的提问（咨询记录）
    {
      path: '/myQuestion',
      name: 'myQuestion',
      component: resolve => require (['@/views/quickconsultation/myQuestion'], resolve)},
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
    //联系客服
    {
      path: '/customerservice',
      name: 'customerservice',
      component: resolve => require (['@/views/customerservice/customerservice'], resolve)},
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
          path: 'accompanycancelApply/:id',
          name: 'accompanycancelApply',
          component: resolve => require (['@/views/accompany/accompanycancelApply'], resolve),
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
      component: resolve => require (['@/views/myconcern/myconcern'], resolve)},
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
    //app下载页
    {
      path: '/appdownload',
      name: 'appdownload',
      component: resolve => require (['@/views/appdownload/appdownload'], resolve)},
    //用户协议
    {
      path: '/agreement',
      name: 'agreement',
      component: resolve => require (['@/views/about/agreement'], resolve)},
    //关于oklife
    {
      path: '/about',
      name: 'about',
      component: resolve => require (['@/views/about/about'], resolve)},
    {
      path: '/404',
      name: '404',
      component: resolve => require (['@/views/login/404'], resolve)},
    //搜索
    {
      path: '/search',
      name: 'search',
      component: resolve => require (['@/views/search/search'], resolve),
    },
    {path: '/', redirect: '/fillphone'},//路由重定向写法
    {path: '*', redirect: '/fillphone'}//路由重定向写法
  ]
})


//使用 router.beforeEach 注册一个全局的 before 钩子：
router.beforeEach ((to, from, next) => {
  //alert('进入router全局before钩子函数')
  //从url中获取用户授权后的code授权码；同时还可获取用户进入的入口；
  let getUrlParams=commonUtils.getRequest();//输出一个对象包括url中所有参数键值对
  let code=getUrlParams.code;
  let state=getUrlParams.state;
  let type=0;//0表示snsapi_userinfo,1表示 snsapi_base
  let entry= getUrlParams.entry==undefined?'':getUrlParams.entry;
  console.log('entry:'+entry);
  console.log('topath:'+to.path)
  console.log('tofrom:'+from.path)
  console.log( 'refresh_token:'+store.getters['common/getcurrentUser'].refresh_token)
  if(to.path == '/404'){
    next()
    return false
  }
  if(to.path == '/fillphone' && store.getters['common/getcurrentUser'].refresh_token){
    // 用户登录成功后，使用后退返回到填手机验证码页，则关闭wx浏览器页面
    if(wx){
      wx.ready(function () {
        wx.closeWindow();
      })
    }else if(WeixinJSBridge){
      WeixinJSBridge.call('closeWindow');
    }
    return false
  }
  if(to.path == '/authorize' && store.getters['common/getcurrentUser'].refresh_token){
    // 用户登录成功后，使用后退返回到授权登录页面，则关闭wx浏览器页面
    if(wx){
      wx.ready(function () {
        wx.closeWindow();
      })
    }else if(WeixinJSBridge){
      WeixinJSBridge.call('closeWindow');
    }
    return false
  }
  if(to.path == '/bindAccount' && store.getters['common/getcurrentUser'].refresh_token && from.path!='/fillphone' && from.path!='/authorize'){
    // 用户登录成功后，使用后退返回到绑定账号页面，则关闭wx浏览器页面，除来自fillphone和author页面
    if(wx){
      wx.ready(function () {
        wx.closeWindow();
      })
    }else if(WeixinJSBridge){
      WeixinJSBridge.call('closeWindow');
    }
    return false
  }
  if(to.path == '/alreadybindapp' && store.getters['common/getcurrentUser'].refresh_token && from.path!='/fillphone' && from.path!='/authorize'){
    // 用户登录成功后，使用后退返回到绑定账号页面，则关闭wx浏览器页面，除来自fillphone和author页面
    if(wx){
      wx.ready(function () {
        wx.closeWindow();
      })
    }else if(WeixinJSBridge){
      WeixinJSBridge.call('closeWindow');
    }
    return false
  }
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
    if(wx){
      wx.ready(function () {
        wx.closeWindow();
      })
    }else if(WeixinJSBridge){
      WeixinJSBridge.call('closeWindow');
    }
    return false
  }
  if(to.path == '/Submithelp' && from.path.split('/')[2]=='completeInfo' && isfullinfo){
    // 用户登录成功后，从完善资料后退到大病求医，此时资料是不完善的，所以则关闭
    if(wx){
      wx.ready(function () {
        wx.closeWindow();
      })
    }else if(WeixinJSBridge){
      WeixinJSBridge.call('closeWindow');
    }
    return false
  }
  if(to.path == '/accompany' && from.path.split('/')[2]=='completeInfo' && isfullinfo){
    // 用户登录成功后，从完善资料后退到陪诊申请，此时资料是不完善的，所以则关闭
    if(wx){
      wx.ready(function () {
        wx.closeWindow();
      })
    }else if(WeixinJSBridge){
      WeixinJSBridge.call('closeWindow');
    }
    return false
  }

  //通过code以上参数向后端请求微信用户更多信息
  let callback=function (payload,res) {
    let openid=res.openId;
    let unionId=res.unionId;
    //这里定义入口参数entry，
    //v1001类，需要登录的业务且不能跳过；
    //v1002类，不需要登录的业务，但如未登录则要进入手机验证码页登录（跳过可直接进入业务）；
    //v1003类，直接进入页不需要任何前置条件；

    //v1001类：快速咨询v1001001、个人信息v1001002、咨询记录v1001003、私人医生v1001004、我的关注v1001005、大病求医v1001006、大病求医时间轴v1001007、todo 陪诊申请v1001008    陪诊申请时间轴v1001009
    //v1002类：找医生v1002001；
    //v1003类：下载APPv1003002、联系客服v1003003、用户协议v1003004、关于oklife v1003005；
    let data={
      openId:openid,
      unionId:unionId
    }
    console.warn(data)
    //检测openid是否已经在平台注册；
    api.checkisregister({data:data}).then((response)=>{
      if(response==undefined){
        payload.next({name:'404'});
        return false
      }else if(0==response.code){
        console.log(response)
        if(null!=response.data.customerInfo){//openid已经注册过
          store.commit('userinfo/changUserinfo',{
            avatar:response.data.customerInfo.avatar==null?'./img/defaultAvatar.png':response.data.customerInfo.avatar,
            loginAccount:response.data.customerInfo.loginAccount,
            nickName:response.data.customerInfo.nickName==null?'未设置':response.data.customerInfo.nickName,
            provinceName:response.data.customerInfo.provinceName==null?'请选择您的所在城市':response.data.customerInfo.provinceName,
            address:response.data.customerInfo.address==null?'请填写您的具体地址':response.data.customerInfo.address,
            givenName:response.data.customerInfo.givenName==null?'请填写您的真实姓名':response.data.customerInfo.givenName,
            sex:response.data.customerInfo.sex==0?'请选择':response.data.customerInfo.sex,
            age:response.data.customerInfo.age==null?'请选择':response.data.customerInfo.age,
            nationalityId:response.data.customerInfo.nationalityId==null?'请选择您的国籍':response.data.customerInfo.nationalityId,
            idCardType:response.data.customerInfo.idCardType==null?'婴幼儿无身份可不填写':response.data.customerInfo.idCardType,
            idCard:response.data.customerInfo.idCard==null?'未填写':response.data.customerInfo.idCard,
            cellPhone:response.data.customerInfo.cellPhone==null?'用于接收就诊信息，请认真填写':response.data.customerInfo.cellPhone,
            birthday:response.data.customerInfo.birthday==null?'请选择':response.data.customerInfo.birthday,
            marriedFlag:response.data.customerInfo.marriedFlag==null?'请选择':response.data.customerInfo.marriedFlag,
            sin:response.data.customerInfo.sin==null?'未填写':response.data.customerInfo.sin
          });
          store.commit('common/changeloginInfo', {
            userId:response.data.customerInfo.userId,//会员ID
            loginAccount:response.data.customerInfo.loginAccount,//会员账号
            access_token:response.data.accessToken,//访问Token
            refresh_token:response.data.refreshToken,//刷新Token
            easemobAccount:response.data.easemobInfo==null?null:response.data.easemobInfo.easemobAccount,//环信账号
            easemobPassword:response.data.easemobInfo==null?null:response.data.easemobInfo.easemobPassword,//环信密码
          });
          store.commit('common/setLocalUserlRefresh_token',{refresh_token:response.data.refreshToken,loginAccount:response.data.customerInfo.loginAccount});//设置存储到localstorage刷新Token和用户账号
          switch (entry) {
            case 'v1001001':
              if(response.data.customerInfo.cellPhone==null || response.data.customerInfo.idCard==null ||response.data.customerInfo.sex==0 ||response.data.customerInfo.age==null  ){
                payload.next({name:'completeInfo',params:{id:response.data.customerInfo.userId}});
              }else{
                payload.next({name:'Submitq'});
              }
              break
            case 'v1001006':
              if(response.data.customerInfo.cellPhone==null || response.data.customerInfo.idCard==null ||response.data.customerInfo.sex==0 ||response.data.customerInfo.age==null  ){
                payload.next({name:'completeInfo',params:{id:response.data.customerInfo.userId}});
              }else{
                payload.next({name:'Submithelp'});
              }
              break
            case 'v1001007'://如果检测到进大病求医时间轴，则直接进入
              payload.next();
              break
            case 'v1001009'://如果检测到进陪诊申请时间轴，则直接进入
              payload.next();
              break
            case 'v1001008'://微信陪诊申请
              if(response.data.customerInfo.cellPhone==null || response.data.customerInfo.idCard==null ||response.data.customerInfo.sex==0 ||response.data.customerInfo.age==null  ){
                payload.next({name:'completeInfo',params:{id:response.data.customerInfo.userId}});
              }else{
                payload.next({name:'accompany'});
              }
              break
            case 'v1002001':
              payload.next({name:'doctor'});
              break
            case 'v1001002':
              payload.next({name:'userinfo'});
              break
            case 'v1001003':
              payload.next({name:'myQuestion'});
              break
            case 'v1001004':
              payload.next({name:'myDoctor'});
              break
            case 'v1001005':
              payload.next({name:'myconcern'});
              break
            case 'v1003002':
              payload.next({name:'appdownload'});
              break
            case 'v1003003':
              payload.next({name:'customerservice'});
              break
            case 'v1003004':
              payload.next({name:'agreement'});
              break
            case 'v1003005':
              payload.next({name:'about'});
              break
            default:
              console.log('非法路径');
              payload.next({name:'fillphone'});
          }
        } else{//openid在后台并没有注册过
          switch (entry) {
            case 'v1001001':
              payload.next({name:'fillphone'});
              break
            case 'v1001006':
              payload.next({name:'fillphone'});
              break
            case 'v1001007':
              payload.next({name:'fillphone'});
              break
            case 'v1001009':
              payload.next({name:'fillphone'});
              break
            case 'v1002001':
              payload.next({name:'fillphone'});
              break
            case 'v1001008'://陪诊申请
              payload.next({name:'fillphone'});
              break
            case 'v1001002':
              payload.next({name:'fillphone'});
              break
            case 'v1001003':
              payload.next({name:'fillphone'});
              break
            case 'v1001004':
              payload.next({name:'fillphone'});
              break
            case 'v1001005':
              payload.next({name:'fillphone'});
              break
            case 'v1003002'://appdownload
              payload.next();
              break
            case 'v1003003'://fillphone
              payload.next();
              break
            case 'v1003004'://agreement
              payload.next();
              break
            case 'v1003005'://about
              payload.next();
              break
            default:
              console.log('非法路径');
              payload.next({name:'fillphone'});
          }
        }
      }
    })
  };
  let params={
    "code":code,
    "state":state,
    "type":type
  };
  console.log(params);
  let payload={
    params:params,
    callback:callback,
    to:to,
    from:from,
    next:next
  }
  if((to.path == '/fillphone') ||(to.path == '/404')){
    next()
  }else {
    //判断如果是登录状态则不用getsyncUserInfoByAuthCode
    console.warn(!store.getters['common/getcurrentUser'].refresh_token || !store.getters['common/getcurrentUser'].userId)
    console.warn('refresh_token:'+store.getters['common/getcurrentUser'].refresh_token)
    console.log('userId:'+store.getters['common/getcurrentUser'].userId)
    if(!store.getters['common/getcurrentUser'].refresh_token){
      store.dispatch('common/getsyncUserInfoByAuthCode',payload);//触发vuex中异步获取UserInfoByAuthCode
    }else{
      next()
    }
  }
})
//使用 router.afterEach 注册一个全局的 after 钩子：
// router.afterEach (route => {
//   // todo
// })

export default router
