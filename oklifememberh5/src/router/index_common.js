import Vue from 'vue'
import Router from 'vue-router'
import {Indicator} from 'mint-ui';
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
    {
      path: '/home',
      name: 'home',
      component: resolve => require (['@/components/home'], resolve)
    },
    //个人信息
    {
      path: '/infoList',
      name: 'infoList',
      component: resolve => require (['@/views/user/infoList'], resolve),
      children: [
        {path: 'userinfo', name: 'userinfo', component: resolve => require (['@/views/user/userinfo'], resolve)},
        {path: 'inputname', name: 'inputname', component: resolve => require (['@/views/user/inputname'], resolve)},
        {
          path: 'inputbabyname',
          name: 'inputbabyname',
          component: resolve => require (['@/views/user/inputbabyname'], resolve)
        },
        {path: 'address', name: 'address', component: resolve => require (['@/views/user/address'], resolve)},
        {path: 'idcard', name: 'idcard', component: resolve => require (['@/views/user/idcard'], resolve)},
        {
          path: 'phonenumber',
          name: 'phonenumber',
          component: resolve => require (['@/views/user/phonenumber'], resolve)
        },
        {path: 'insurance', name: 'insurance', component: resolve => require (['@/views/user/insurance'], resolve)},
        {path: 'changeAccount', name: 'changeAccount', component: resolve => require (['@/views/user/changeAccount'], resolve)},
        {path: 'changeAccountNP', name: 'changeAccountNP', component: resolve => require (['@/views/user/changeAccountNophone'], resolve)}
      ]
    },
    //完善个人资料
    {
      path: '/completeList',
      name: 'completeList',
      component: resolve => require (['@/views/user/completeList'], resolve),
      children: [
        {path: 'completeInfo/:id', name: 'completeInfo', component: resolve => require (['@/views/user/completeInfo'], resolve)},
        {path: 'completename', name: 'completename', component: resolve => require (['@/views/user/completename'], resolve)},
        {path: 'completePhone', name: 'completePhone', component: resolve => require (['@/views/user/completePhone'], resolve)},
        {path: 'completeIdcard', name: 'completeIdcard', component: resolve => require (['@/views/user/completeIdcard'], resolve)},
      ]
    },
    {
      path: '/fillphone',
      name: 'fillphone',
      component: resolve => require (['@/views/login/fillphone'], resolve),
    },
    {
      path: '/authorize',
      name: 'authorize',
      component: resolve => require (['@/views/login/authorize'], resolve),
    },
    {
      path: '/bindAccount',
      name: 'bindAccount',
      component: resolve => require (['@/views/login/bindAccount'], resolve),
    },
    {
      path: '/alreadybindapp',
      name: 'alreadybindapp',
      component: resolve => require (['@/views/login/alreadybindapp'], resolve),
    },
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
        }, {
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
          path: 'baseInfo',
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
    //我的提问
    {
      path: '/myQuestion',
      name: 'myQuestion',
      component: resolve => require (['@/views/quickconsultation/myQuestion'], resolve),
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
    //联系客服
    {
      path: '/customerservice',
      name: 'customerservice',
      component: resolve => require (['@/views/customerservice/customerservice'], resolve),
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
      component: resolve => require (['@/views/myconcern/myconcern'], resolve),
    },
    {
      path: '/expertInfo/:id',
      name: 'expertInfo',
      component: resolve => require (['@/views/myconcern/expertInfo'], resolve),
    },
    {
      path: '/hospitalInfo/:id',
      name: 'hospitalInfo',
      component: resolve => require (['@/views/myconcern/hospitalInfo'], resolve),
    },
    //app下载页
    {
      path: '/appdownload',
      name: 'appdownload',
      component: resolve => require (['@/views/appdownload/appdownload'], resolve),
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
    {path: '/', redirect: '/home'},//路由重定向写法
    {path: '*', redirect: '/home'}//路由重定向写法
  ]
})

router.beforeEach ((to, from, next) => {
  next()
})


export default router
