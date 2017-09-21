/**
 * Created by hh on 2017/8/3.
 */
import commonUtils from '../../src/commonutils/commonUtils'
import store from '../store/index'

const pluginByApp=(function () {
  const getinfoByApp=(store,next)=>{
    let getUrlParams=commonUtils.getRequest() //输出一个对象包括url中所有参数键值对
    let entry= getUrlParams.entry==undefined?'':getUrlParams.entry
    let refresh_token=store.getters['common/getcurrentUser'].refresh_token
    //获取用户登录基本信息
    let suceess=(result)=>{
      console.log(result)
      let data=JSON.parse(result)
      console.log(data)
      let token=data.token==null?'':data.token
      let myInfo=data.myInfo==null?'':data.myInfo
      console.log(token)
      console.log(myInfo)
      console.log(token && myInfo)
      if (token && myInfo) {
        //console.warn('已经进入处理store')
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
        console.log('refresh_token:'+store.getters['common/getcurrentUser'].refresh_token)
        if (store.getters['common/getcurrentUser'].refresh_token) {
          switch (entry) {
            case 'v1001002'://H5私人医生
              next({name: ''})
              break
            case 'v1001003'://H5我的关注
              next({name: 'myconcern'})
              break
            case 'v1001004'://H5大病求医
              if (!myInfo.nationalityId || myInfo.nationalityId == '请选择您的国籍'
                || !myInfo.idCardType || myInfo.idCardType == '婴幼儿无身份可不填写'
                || !myInfo.givenName || myInfo.givenName == '请填写您的真实姓名'
                || !myInfo.cellPhone || myInfo.cellPhone == '用于接收就诊信息，请认真填写'
                || !myInfo.idCard || myInfo.idCard == '未填写'
                || myInfo.sex == 0 || !myInfo.sex || myInfo.sex == '请选择'
                || !myInfo.age || myInfo.age == '请选择') {
                console.log(myInfo.userId)
                next({name: 'completeInfo', params: {id: myInfo.userId}})
              } else {
                next({name: 'Submithelp'})
              }
              break
            case 'v1001005'://就医陪同
              if (!myInfo.nationalityId || myInfo.nationalityId == '请选择您的国籍'
                || !myInfo.idCardType || myInfo.idCardType == '婴幼儿无身份可不填写'
                || !myInfo.givenName || myInfo.givenName == '请填写您的真实姓名'
                || !myInfo.cellPhone || myInfo.cellPhone == '用于接收就诊信息，请认真填写'
                || !myInfo.idCard || myInfo.idCard == '未填写'
                || myInfo.sex == 0 || !myInfo.sex || myInfo.sex == '请选择'
                || !myInfo.age || myInfo.age == '请选择') {
                console.log(myInfo.userId)
                next({name: 'completeInfo', params: {id: myInfo.userId}})
              }else{
                next({name: 'accompany'})
              }
              break
            case 'v1001006'://就诊人管理
              next('addpatient')
              break
            case 'v1001007'://问卷详情
              next('')
              break
            default:
              console.log('非法路径')
              let jump = {
                'nativeType': 'login'
              }
              let Success = () => {}
              let error = () => {}
              cordova.plugins.oklife.skipNative(Success, error, jump)
              return false
          }
        }else {
          console.log('H5异常，获取不到refresh_token')
          let jump = {
            'nativeType': 'login'
          }
          let Success = () => {}
          let error = () => {}
          cordova.plugins.oklife.skipNative(Success, error, jump)//调用原生插件跳入原生快速咨询页面
          return false
        }
      }else{
        console.log('app异常，获取不到refresh_token')
        let jump = {
          'nativeType': 'login'
        }
        let Success = () => {}
        let error = () => {}
        cordova.plugins.oklife.skipNative(Success, error, jump)
        return false
      }
    }
    let error=(errorMsg)=>{
      console.log('获取用户基本信息失败：用户未登录')
      let jump = {
        "nativeType": "login"
      }
      let Success=()=>{}
      let error=()=>{}
      cordova.plugins.oklife.skipNative(Success, error, jump);//调用原生插件跳入原生快速咨询页面
      return false
    }
    let args = {
      'basedata': [
        'myInfo',
        'token'
      ]
    }
    cordova.plugins.oklife.getBaseInfo(suceess,error,args)
  }
  return {
    getinfoByApp:getinfoByApp
  }
})()
export default pluginByApp
