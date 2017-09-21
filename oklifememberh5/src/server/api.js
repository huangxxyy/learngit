/**
 * Created by hh on 2017/7/17.
 */
//封装请求的方法
import http from './service'
//demo：app登录
const api={
  /*微信api*/
  getJsTokenParams:params => { return http.get('/weixin/getJsTokenParams', params,{baseURL:'http://119.29.215.189/oklife-weixin'}).then(res => res.data)},
  requestUserInfoByAuthCode:params => { return http.get('/weixin/requestUserInfoByAuthCode', params,{baseURL:'http://119.29.215.189/oklife-weixin'}).then(res => res.data)},
  lightAppLogin:params => { return http.post('/customer/wechat/lightapp/login', params).then(res => res.data)},
  checkisregister:params => { return http.post('/customer/wechat/lightapp/login/check', params).then(res => res.data)},
  getTempMediaFile:params => { return http.get('/weixin/getTempMediaFile', params,{baseURL:'http://119.29.215.189/oklife-weixin',responsetype:'arraybuffer', transformResponse:[function(data){
    return data;
  }]}).then(res => res)},

  /*个人资料api*/
  getplaceName:params => { return http.get('/customer/placeName', params).then(res => res.data)},
  getUserInfo: params => { return http.get('/customer', params).then(res => res.data)},
  changeNickname: (id,params) => { return http.put('/customer/nickName?id='+id,params).then(res => res.data)},
  changeName:(id,params) => { return http.put('/customer/givenName?id='+id,params).then(res => res.data) },
  changeIdCard:(id,params) => { return http.put('/customer/idCard?id='+id,params).then(res => res.data) },
  changeIdCardType:(id,params) => { return http.put('/customer/idCardInfo?id='+id,params).then(res => res.data) },
  changeSex:(id,params) => { return http.put('/customer/sex?id='+id,params).then(res => res.data) },
  changeMarriedFlag:(id,params) => { return http.put('/customer/marriedFlag?id='+id,params).then(res => res.data) },
  changeAdress :(id,params) => { return http.put('/customer/address?id='+id,params).then(res => res.data) },
  changeSin:(id,params) => { return http.put('/customer/sin?id='+id,params).then(res => res.data) },
  changeNationality:(id,params) => { return http.put('/customer/nationalityId?id='+id,params).then(res => res.data) },
  changeAge:(id,params) => { return http.put('/customer/age?id='+id,params).then(res => res.data) },
  changeBirthday:(id,params) => { return http.put('/customer/birthday?id='+id,params).then(res => res.data)},
  changeCellPhone:(id,params) => { return http.put('/customer/cellphoneInfo?id='+id,params).then(res => res.data) },
  changeprovinces:(id,params)=>{return http.put('/customer/placeId?id='+id,params).then(res => res.data)},
  geticode:params=>{return http.get('/customer/icode', params).then(res => res.data)},
  changeAccount:(id,params)=>{return http.put('/customer/loginAccount?id='+id,params).then(res => res.data)},

  /*完善个人资料*/
  identifyIdCode:data=>{return http.post('/customer/identifyIdCode', data).then(res => res.data)},
  custinfo:(id,params) => { return http.put('/customer/custinfo?id='+id,params).then(res => res.data) },
  gethealthRd:params=>{return http.get('/users/healthRd',params).then(res => res.data)},//获取基本信息（健康档案）
  updatehealthRd:data=>{return http.put('/users/healthRd/update',data).then(res => res.data)},//提交基本信息（健康档案）
  getnkdaList:params=>{return http.get('/users/healthRd/nkdaList',params).then(res => res.data)},//获取过敏禁忌列表（健康档案）

  /*就诊人管理*/
  insertpatient:data=>{return http.put('/patient/insert',data).then(res => res.data)},
  patiEmrgPhone:data=>{return http.put('/patient/update',data).then(res => res.data)},
  getpatientinfo:params=>{return http.get('/patient/select',params).then(res => res.data)},
  getpatientlist:params=>{return http.get('/patient/infoList',params).then(res => res.data)},//就诊人简要信息列表

  /*我的关注*/
  getmyconcernExpert:(params,data)=>{return http.put('/myFollowing/followedSpec',params,data).then(res => res.data)},//获取我关注的医生
  getmyconcernDisease:(params,data)=>{return http.put('/myFollowing/followedDis',params,data).then(res => res.data)},//获取我关注的疾病
  insertFollowSpec:data=>{return http.put('/specialist/insertFollowSpec',data).then(res => res.data)},//关注医生
  deleteFollowSpec:data=>{return http.put('/specialist/deleteFollowSpec',data).then(res => res.data)},//取消关注
  followingDis:data=>{return http.post('/myFollowing/followingDis',data).then(res => res.data)},//关注疾病

  /*大病求医*/
  seriousillnessApply:data=>{return http.post('/customer/seriousillness/apply',data).then(res=>res.data)},//大病求医申请
  getStDeptAndDiseaseList:params=>{return http.get('/deptcategory/getStDeptAndDiseaseList', params).then(res => res.data)},//科室疾病列表
  patientSimpleList:params=>{return http.get('/patient/infoList', params).then(res => res.data)},//就诊人简要信息列表
  hiQRCity:params=>{return http.get('/hospital/hiQRCity', params).then(res => res.data)},//获取优质资源地区
  getEventInfo:params=>{return http.get('/customer/seriousillness/getEventInfOfAppId', params).then(res => res.data)},//获取时间轴
  getSeriousIllnessInf:params=>{return http.get('/customer/seriousillness/getSeriousIllnessInf', params).then(res => res.data)},//获取申请详情
  cancelApply:data=>{return http.post('/customer/seriousillness/cancelApply', data).then(res => res.data)},//取消申请
  getsuredemand:params=>{return http.get('/customer/seriousillness/getSureDemandInfOfAppId', params).then(res => res.data)},//获取需求详情
  suredemand:data=>{return http.post('/customer/seriousillness/sureDemandHandle', data).then(res => res.data)},//确认需求
  insertEmedicalrd:data=>{return http.post('/customer/emedicalrd/insertEmedicalrd', data).then(res => res.data)},//添加拍照病历
  updateEmedicalrd:data=>{return http.post('/customer/emedicalrd/updateEmedicalrd', data).then(res => res.data)},//修改拍照病历

  /*专家列表及排序*/
  specialistOrder:data=>{return http.put('/specialist/order',data).then(res=>res.data)},
  speciaInfo:params=>{return http.get('/specialist/home', params).then(res => res.data)},//专家详细

  /*医院列表及排序*/
  hospitallistOrder:data=>{return http.post('/hospital/hospital',data).then(res=>res.data)},
  hospitalBanner:data=>{return http.post('/hospital/hospitalbanners',data).then(res=>res.data)},
  hospitalInfo:params=>{return http.get('/hospital/hospitalinfo',params).then(res=>res.data)},//医院详细

  /*陪诊申请*/
  accompanyApply:data=>{return http.post('/customer/accompDiagnosis/apply',data).then(res=>res.data)},//陪诊申请
  getEventInfOfAppId:params=>{return http.get('/customer/accompDiagnosis/getEventInfOfAppId',params).then(res=>res.data)},//陪诊申请时间轴
  getApplyInfo:params=>{return http.post('/customer/accompDiagnosis/getAccompDiagnosisInf', params).then(res => res.data)},//获取申请详情
  cancelAccompanyApply:data=>{return http.post('/customer/seriousillness/cancelApply', data).then(res => res.data)},//取消申请
  getAccompanydemand:params=>{return http.get('/customer/accompDiagnosis/getSureDemandInfOfAppId', params).then(res => res.data)},//获取需求详情
  sureAccompanydemand:data=>{return http.post('/customer/accompDiagnosis/sureDemandHandle', data).then(res => res.data)},//确认需求
  sureAccompOKHandle:data=>{return http.post('/customer/accompDiagnosis/sureAccompOKHandle', data).then(res => res.data)},//确认陪同人员已到位
  getaccompanyupload:params=>{return http.get('/customer/emedicalrd/getElecMedicalRdFoceByAppId',params).then(res=>res.data)},//获取病历详情

  /*快速提问*/
  disease:params=>{return http.get('/consult/query/diseases', params).then(res => res.data)},
  quickconsultationApply:data=>{return http.post('/consult/apply',data).then(res=>res.data)},//快速咨询申请
  taskCreate:params=>{return http.get('/consult/task/create', params).then(res => res.data)},//分配平台医生（下达任务）
  chatClose:params=>{return http.get('/consult/chat/close', params).then(res => res.data)},//结束快速提问中的咨询聊天
  getquestionInfo:params=>{return http.get('/consult/application/detail',params).then(res=>res.data)},//获取咨询申请

  /*帮助反馈*/
  gethelpList:params=>{return http.get('/feedBack/help', params).then(res => res.data)},//帮助列表
  getmyfeedback:params=>{return http.get('/feedBack/myfeedback', params).then(res => res.data)},//我的反馈列表
  insertfeedback:data=>{return http.put('/feedBack/insertFeedBack',data).then(res=>res.data)},//提交反馈
  insertFeedBackRd:data=>{return http.put('/feedBack/insertFeedBackRd',data).then(res=>res.data)},//追问补充反馈
  feedBackRdList:params=>{return http.get('/feedBack/feedBackRdList', params).then(res => res.data)},//获取反馈回复列表
  endfeedBack:data=>{return http.put('/feedBack/endFeedBack', data).then(res => res.data)},//结束咨询

  /*私人医生*/
  getMydoctor:params=>{return http.put('/privateSpec/myPrivateSpec', params).then(res => res.data)},//获取私人医生

  /*我的提问*/
  getmyQuestion:(params,data)=>{return http.put('/myQuarys/myQuary',params,data).then(res => res.data)},//获取我的提问
}
export default api
