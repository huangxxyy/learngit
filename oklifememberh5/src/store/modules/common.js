import api from '../../server/api'
import {Toast} from 'mint-ui';
import commonUtils from '../../commonutils/commonUtils'
const state = {
  headerConf: {
    isshow:true,//头部是否显示
    isBack: '',  // 是否显示返回
    handleback:'',//传递后退处理回调函数
    isShare: '', // 是否显示分享
    sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
    isSkip:'',//是否显示跳过
    skipto:'',//跳过后到哪个路由名字
    title: '', // 标题
    isShow: '', // 标题是否显示
    selectbuttontext:'选择'//这个参数不用配置，只需要在有选择按钮的时候配置
  },

  loginInfo:{
    userId:'1',//会员ID
    loginAccount:'',//会员账号
    access_token:'',//访问Token
    refresh_token:'',//刷新Token
    easemobAccount:'',//环信账号
    easemobPassword:'',//环信密码
  },
  UserInfoByAuthCode:{//微信用户通过code获取到的微信用户信息
    country: "",  //国家，如中国为CN
    unionId: "",   //只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
    avatar: "", //用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
    province: "",  //用户个人资料填写的省份
    city: "",    //普通用户个人资料填写的城市
    nickName: "", //用户昵称
    openId: "",  //用户的唯一标识
    sex: 0,  //用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    unionId:''//用户unionId
  }

}

const getters = {
  getcurrentUser: state => {
    return {
      userId: state.loginInfo.userId,
      loginAccount:state.loginInfo.loginAccount,
      openId:state.UserInfoByAuthCode.openId,
      unionId:state.UserInfoByAuthCode.unionId,
      access_token: state.loginInfo.access_token,
      refresh_token: state.loginInfo.refresh_token,
      easemobAccount:state.loginInfo.easemobAccount,
      easemobPassword:state.loginInfo.easemobPassword,
    }
  },
  headImgUrl:state=>{
    return state.UserInfoByAuthCode.avatar?state.UserInfoByAuthCode.avatar:'./img/defaultAvatar.png'
  },
  nickName:state=>{
    return state.UserInfoByAuthCode.nickName?state.UserInfoByAuthCode.nickName:'尊敬的用户'
  }
}

const mutations = {
  changeUserInfoByAuthCode:(state, payload) => {
    Object.assign(state.UserInfoByAuthCode, payload)
  },
  changeHeaderConf: (state, payload) => {
    if(payload.handleback==undefined || !payload.handleback){
      payload.handleback=()=>{
        window.history.go(-1)
      }
    }
    Object.assign(state.headerConf, payload)
  },
  changeloginInfo (state, payload) {//更新
    Object.assign(state.loginInfo, payload)
  },
  getLocalUserlRefresh_token (state) {
    state.loginInfo.loginAccount=localStorage.getItem('loginAccount'+state.UserInfoByAuthCode.openId)
    state.loginInfo.refresh_token = localStorage.getItem('refresh_token_'+state.UserInfoByAuthCode.openId)//需要永久存储，所以存local,用微信号唯一标识区别不同用户的refresh_token，如果微信openid存在对应的refresh_token，则证明是登录状态，并用refresh_token获取access_token，从而发送请求；
  },
  setLocalUserlRefresh_token (state, payload) {//设置
    localStorage.setItem('loginAccount'+state.UserInfoByAuthCode.openId,payload.loginAccount)
    localStorage.setItem('refresh_token_'+state.UserInfoByAuthCode.openId,payload.refresh_token)//需要永久存储，所以存local,用微信号唯一标识区别不同用户的refresh_token，如果微信openid存在对应的refresh_token，则证明是登录状态，并用refresh_token获取access_token，从而发送请求；
  },
  logout (state) {//登出
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token_'+state.UserInfoByAuthCode.openId)//需要永久存储，所以存local,用微信号唯一标识区别不同用户的refresh_token，如果微信openid存在对应的refresh_token，则证明是登录状态，并用refresh_token获取access_token，从而发送请求；
    sessionStorage.removeItem('openId')
    sessionStorage.removeItem('easemobAccount')
    sessionStorage.removeItem('easemobPassword')
    state.userId =''
    state.access_token =''
    state.refresh_token =''
    state.openId =''
    state.easemobAccount =''
    state.easemobPassword =''
  }
}
//这里写异步的请求方法  在异步方法内，（数据相应）触发同步方法
const actions = {
  getsyncUserInfoByAuthCode ({commit}, payload) {
    if(state.UserInfoByAuthCode.openId){
      payload.callback(payload,state.UserInfoByAuthCode)
    }else{
      api.requestUserInfoByAuthCode({params:payload.params}).then((res) => {
        if(res==undefined){
          payload.next('404');
          return false
        }else if(0==res.code){
          console.log (res.data);
          let UserInfoByAuthCode={
            country: res.data.country,  //国家，如中国为CN
            unionId: res.data.unionId,   //只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
            avatar: res.data.headImgUrl, //用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
            province: res.data.province,  //用户个人资料填写的省份
            city: res.data.city,    //普通用户个人资料填写的城市
            nickName: res.data.nickName, //用户昵称
            openId: res.data.openId,  //用户的唯一标识
            sex: res.data.sex==0?'':res.data.sex,  //用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
            unionId:res.data.unionId//用户unionId
          };
          commit('changeUserInfoByAuthCode',UserInfoByAuthCode);
          payload.callback(payload,UserInfoByAuthCode)
        }
      })
    }

  },
  lightAppLogin({ commit }, payload) {
    console.warn(JSON.stringify(payload.data))
    api.lightAppLogin({data:payload.data}).then((res)=>{
      if(res==undefined){
        payload.$router.push('404');
        return false
      }else if(0==res.code){//验证码有效，并登录
        console.log (res);
        commit('userinfo/changUserinfo',{
          avatar:res.data.customerInfo.avatar==null?'./img/defaultAvatar.png':res.data.customerInfo.avatar,
          loginAccount:res.data.customerInfo.loginAccount,
          nickName:res.data.customerInfo.nickName==null?'未设置':res.data.customerInfo.nickName,
          provinceName:res.data.customerInfo.provinceName==null?'请选择您的所在城市':res.data.customerInfo.provinceName,
          address:res.data.customerInfo.address==null?'请填写您的具体地址':res.data.customerInfo.address,
          givenName:res.data.customerInfo.givenName==null?'请填写您的真实姓名':res.data.customerInfo.givenName,
          sex:!res.data.customerInfo.sex?'请选择':res.data.customerInfo.sex,
          age:res.data.customerInfo.age==null?'请选择':res.data.customerInfo.age,
          nationalityId:res.data.customerInfo.nationalityId==null?'请选择您的国籍':res.data.customerInfo.nationalityId,
          idCardType:res.data.customerInfo.idCardType==null?'婴幼儿无身份可不填写':res.data.customerInfo.idCardType,
          idCard:res.data.customerInfo.idCard?'未填写':res.data.customerInfo.idCard,
          cellPhone:res.data.customerInfo.cellPhone?'用于接收就诊信息，请认真填写':res.data.customerInfo.cellPhone,
          birthday:res.data.customerInfo.birthday?'请选择':res.data.customerInfo.birthday,
          marriedFlag:res.data.customerInfo.marriedFlag?'请选择':res.data.customerInfo.marriedFlag,
          sin:res.data.customerInfo.sin?'未填写':res.data.customerInfo.sin
        },{root: true});
        commit('changeloginInfo', {
          userId:res.data.customerInfo.userId,//会员ID
          loginAccount:res.data.customerInfo.loginAccount,//会员账号
          access_token:res.data.accessToken,//访问Token
          refresh_token:res.data.refreshToken,//刷新Token
          easemobAccount:res.data.easemobInfo==null?null:res.data.easemobInfo.easemobAccount,//环信账号
          easemobPassword:res.data.easemobInfo==null?null:res.data.easemobInfo.easemobPassword,//环信密码
        });
        commit('setLocalUserlRefresh_token',{refresh_token:res.data.refreshToken,loginAccount:res.data.customerInfo.loginAccount});//设置存储到localstorage刷新Token和用户账号
        //跳转页面
        if(res.data.binded==0){//0代表填了手机号，但是手机号并没有在平台绑定
          payload.$router.push('bindAccount')
          return false
        }else if(res.data.binded==1){//1代表填了手机号，并手机号在平台已经绑定
          payload.$router.push('alreadybindapp')
          return false
        }else if(res.data.binded==2){//2代表没填手机号是跳过的，openid在平台中已经有了，所以应该是直接进入业务
          let entry= commonUtils.getRequest().entry;
          switch (entry) {
            case 'v1001001':
              if(res.data.customerInfo.cellPhone==null || res.data.customerInfo.idCard==null ||res.data.customerInfo.sex==0 ||res.data.customerInfo.age==null ){
                payload.$router.push({name:'completeInfo',params:{id:res.data.customerInfo.userId}});
              }else{
                payload.$router.push({name:'Submitq'});
              }
              break
            case 'v1001006':
              if(res.data.customerInfo.cellPhone==null || res.data.customerInfo.idCard==null ||res.data.customerInfo.sex==0 ||res.data.customerInfo.age==null ){
                payload.$router.push({name:'completeInfo',params:{id:res.data.customerInfo.userId}});
              }else{
                payload.$router.push({name:'Submithelp'});
              }
              break
            case 'v1002001':
              payload.$router.push({name:'doctor'});
              break
            case 'v1001008':
              if(res.data.customerInfo.cellPhone==null || res.data.customerInfo.idCard==null ||res.data.customerInfo.sex==0 ||res.data.customerInfo.age==null ){
                payload.$router.push({name:'completeInfo',params:{id:res.data.customerInfo.userId}});
              }else{
                payload.$router.push({name:'accompany'});
              }
              break
            case 'v1001002':
              payload.$router.push({name:'userinfo'});
              break
            case 'v1001003':
              payload.$router.push({name:'myQuestion'});
              break
            case 'v1001004':
              payload.$router.push({name:'myDoctor'});
              break
            case 'v1001005':
              payload.$router.push({name:'myconcern'});
              break
            case 'v1003002':
              payload.$router.push({name:'appdownload'});
              break
            case 'v1003003':
              payload.$router.push({name:'customerservice'});
              break
            case 'v1003004':
              payload.$router.push({name:'agreement'});
              break
            case 'v1003005':
              payload.$router.push({name:'about'});
              break
            default:
              console.log('非法路径');
              payload.$router.push({name:'fillphone'});
          }
        }else if(res.data.binded==null){//null代表没填手机号是跳过的，且openid在平台中也没有，所以是用openid注册的，直接进入业务；
          let entry= commonUtils.getRequest().entry;
          switch (entry) {
            case 'v1001001':
              if(res.data.customerInfo.cellPhone==null || res.data.customerInfo.idCard==null ||res.data.customerInfo.sex==0 ||res.data.customerInfo.age==null ){
                payload.$router.push({name:'completeInfo',params:{id:res.data.customerInfo.userId}});
              }else{
                payload.$router.push({name:'Submitq'});
              }
              break
            case 'v1001006':
              if(res.data.customerInfo.cellPhone==null || res.data.customerInfo.idCard==null ||res.data.customerInfo.sex==0 ||res.data.customerInfo.age==null ){
                payload.$router.push({name:'completeInfo',params:{id:res.data.customerInfo.userId}});
              }else{
                payload.$router.push({name:'Submithelp'});
              }
              break
            case 'v1002001':
              payload.$router.push({name:'doctor'});
              break
            case 'v1001008':
              if(res.data.customerInfo.cellPhone==null || res.data.customerInfo.idCard==null ||res.data.customerInfo.sex==0 ||res.data.customerInfo.age==null ){
                payload.$router.push({name:'completeInfo',params:{id:res.data.customerInfo.userId}});
              }else{
                payload.$router.push({name:'accompany'});
              }
              break
            case 'v1001002':
              payload.$router.push({name:'userinfo'});
              break
            case 'v1001003':
              payload.$router.push({name:'myQuestion'});
              break
            case 'v1001004':
              payload.$router.push({name:'myDoctor'});
              break
            case 'v1001005':
              payload.$router.push({name:'myconcern'});
              break
            case 'v1003002':
              payload.$router.push({name:'appdownload'});
              break
            case 'v1003003':
              payload.$router.push({name:'customerservice'});
              break
            case 'v1003004':
              payload.$router.push({name:'agreement'});
              break
            case 'v1003005':
              payload.$router.push({name:'about'});
              break
            default:
              console.log('非法路径');
              payload.$router.push({name:'fillphone'});
          }
        }
      }else if(1==res.code){//当手机号出现已经被绑定的时候，提醒用户换其他手机
        if(res.errors.code==1001){
          Toast({
            message: res.errors.message,
            position: 'center',
            duration: 2000
          });
          return false
        }else if(res.errors.code==1002){
          Toast({
            message: res.errors.message,
            position: 'center',
            duration: 2000
          });
          return false
        }else {
          Toast({
            message: res.errors.message,
            position: 'center',
            duration: 2000
          });
          return false
        }
      }
    })
  },



}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
