import api from '../../server/api'
import { Toast } from 'mint-ui'
import commonUtils from '../../commonutils/commonUtils'
const state = {
  userinfo:{
    avatar:'./img/user.png',
    loginAccount:'未设置',
    nickName:'',
    provinceName:'请选择您的所在城市',
    address:'请填写您的具体地址',
    givenName:'请填写您的真实姓名',
    sex:'请选择',
    age:'请选择',
    nationalityId:'请选择您的国籍',
    idCardType:'婴幼儿无身份可不填写',
    idCard:'请填写',
    cellPhone:'用于接收就诊信息，请认真填写',
    birthday:'请选择',
    marriedFlag:'请选择',
    sin:null
  }
}

const getters = {
    getImSenderNickName:state=>{
      if(state.userinfo.nickName && state.userinfo.nickName !='未设置'){
        return state.userinfo.nickName
      }else if(!state.userinfo.nickName || state.userinfo.nickName=='' || state.userinfo.nickName=='未设置'){
        return state.userinfo.givenName
      }else if(!state.userinfo.givenName || state.userinfo.givenName=='' || state.userinfo.givenName=='未设置' ){
        return state.loginAccount
      }
    },
    getsex:state=>{
      if(state.userinfo.sex==1){
        return "男";
      }else if(state.userinfo.sex==2) {
        return "女"
      }else{
        return "请选择"
      }
    },
    getmarried:state=>{
      if(state.userinfo.marriedFlag==1){
        return "已婚";
      }else if(state.userinfo.marriedFlag==2) {
        return "未婚"
      }else{
        return "请选择"
      }
    },
    getidcardType:state=>{
      if(state.userinfo.idCardType==1){
        return "大陆身份证";
      }else if(state.userinfo.idCardType==2) {
        return "护照"
      }else if(state.userinfo.idCardType==3) {
        return "港澳台胞证"
      }else if(state.userinfo.idCardType==4) {
        return "其他"
      }else{
        return "婴幼儿无身份可不填写"
      }
    },
    getbirthday:state=>{
      if(state.userinfo.birthday=="请选择"){
        return "请选择"
      }else{
        return commonUtils.getDate(state.userinfo.birthday,true)
      }
    },
  toTel:state=>{
    if(state.userinfo.cellPhone!=="用于接收就诊信息，请认真填写") {
      let start = state.userinfo.cellPhone.slice(0, 3);
      let end = state.userinfo.cellPhone.slice(-3);
      return start + '*****' + end;
    }else{
      return state.userinfo.cellPhone
    }
  },
  tosin:state=>{
    let sin=state.userinfo.sin
    if(sin==null) {
      return "请填写"
    }else{
      if(sin.length>4&&sin.length<8){
        let start = sin.slice(0, 1);
        let end = sin.slice(-2);
        return start + '***' + end;
      }else if(sin.length>7&&sin.length<12){
        let start = sin.slice(0, 2);
        let end = sin.slice(-2);
        return start + '*****' + end;
      }else if(sin.length>11){
        let start = sin.slice(0, 3);
        let end = sin.slice(-4);
        return start + '********' + end;
      }
    }
  },
  toidCard:state=>{
      let idCard=state.userinfo.idCard
    if(idCard=="请填写") {
      return idCard
    }else{
      if(idCard.length>4&&idCard.length<8){
        let start = idCard.slice(0, 1);
        let end = idCard.slice(-2);
        return start + '***' + end;
      }else if(idCard.length>7&&idCard.length<12){
        let start = idCard.slice(0, 2);
        let end = idCard.slice(-2);
        return start + '*****' + end;
      }else if(idCard.length>11){
        let start = idCard.slice(0, 3);
        let end = idCard.slice(-4);
        return start + '********' + end;
      }
    }
  }
}

const mutations = {
  changUserinfo: (state, data) => {
    Object.assign(state.userinfo, data);
    //console.log(state.userinfo);
  }
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  getsyncuserinfo({ commit },params)
  {
   api.getUserInfo(params).then(response => {
     if(response==undefined){
       return;
     }else {
     const data = response.data;
       commit('changUserinfo', {
         loginAccount: data.loginAccount==null?"未设置":data.loginAccount,
         givenName: data.givenName == null ? "请填写您的真实姓名" : data.givenName,
         nickName: data.nickName == null ? "未设置" : data.nickName,
         provinceName:data.provinceName==null?"请选择您的所在城市":data.provinceName+" "+data.cityName+" "+data.areaName,
         sex: data.sex,
         age: data.age,
         nationalityId: data.nationalityId == null ? "请选择您的国籍" : (data.nationalityId == 1 ? "中国" : null),
         idCardType: data.idCardType,
         idCard: data.idCard == null ? "请填写" : data.idCard,
         cellPhone: data.cellphone == null ? "用于接收就诊信息，请认真填写" : data.cellphone,
         marriedFlag: data.marriedFlag,
         birthday: data.birthday == null ? "315504000000" : data.birthday,
         address: data.address == null ? "请填写您的具体地址" : data.address,
         sin: data.sin
   });
       console.log(response.data.marriedFlag)
  }
    }).catch(error => {
      console.log(error);
    });
  },
  changeNickname({ commit },params) {
      api.changeNickname(params.id,params.nickName).then(res => {
        //console.log(params.nickName.data)
       if(res.code==0){
       commit('changUserinfo',params.nickName.data);
         params.$router.push({name:"userinfo"});
       }else if(res==undefined){
         Toast({
           message: '网络异常，请稍后再试',
           position: 'center',
           duration: 2000
         });
       }
       })
  },
  changeAccount({ commit },params) {
    api.changeAccount(params.id,params.loginAccount).then(res => {
      //console.log(params.nickName.data)
      if(res.code==0){
        commit('changUserinfo',params.loginAccount.data);
        params.$router.push({name:"userinfo"});
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeName({ commit },params) {
    api.changeName(params.id,params.givenName).then(res => {
      if(res.code==0) {
        commit('changUserinfo', params.givenName.data);
        params.$router.push({name:"userinfo"});
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
      //resolve();
    })
  },
  changeIdCard({ commit },params){
    api.changeIdCard(params.id,params.idCard).then(res => {
      if(res.code==0) {
        commit('changUserinfo', params.idCard.data);
        params.$router.push({name:"userinfo"});
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeIdCardType({ commit },params){
    api.changeIdCardType(params.id,params.idCardType).then(res => {
      //
      if(res.code==0) {
        commit('changUserinfo',params.idCardType.data);
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeSex({ commit },params) {
    api.changeSex(params.id,params.sex).then(res => {
      //console.log(params.sex.data.sex);
      if(res.code==0){
        commit('changUserinfo', params.sex.data);
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeMarriedFlag({ commit },params) {
    api.changeMarriedFlag(params.id,params.marriedFlag).then(res => {
      if(res.code==0) {
        commit('changUserinfo',params.marriedFlag.data );
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeAge({ commit },params) {
    api.changeAge(params.id,params.age).then(res => {
      if(res.code==0) {
        commit('changUserinfo',params.age.data );
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeBirthday({ commit },params) {
    api.changeBirthday(params.id, params.birthday).then(res => {
      if (res.code == 0) {
        commit('changUserinfo', params.birthday.data);
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeAdress({ commit },params) {
    api.changeAdress(params.id,params.address).then(res => {
      if(res.code==0) {
        commit('changUserinfo', params.address.data);
        params.$router.push({name:"userinfo"});
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
      //resolve();
    })
  },
  changeSin({ commit },params) {
    api.changeSin(params.id,params.sin).then(res => {
      if(res.code==0) {
        params.$router.push({name:"userinfo"});
        commit('changUserinfo', params.sin.data);
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeNationality({ commit },params) {
    api.changeNationality(params.id,params.nationalityId).then(res => {
      //console.log({"nationalityId":params.nationalityId.data.nationalityId==1?"中国":null})
      if(res.code==0) {
        commit('changUserinfo', {"nationalityId":params.nationalityId.data.nationalityId==1?"中国":null});
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  geticode({commit},params){
    api.geticode(params).then(res => {
    })
  },
  changeCellPhone({ commit },params) {
    api.changeCellPhone(params.id,params.cellPhone).then(resolve => {
      if(res.code==0) {
        params.$router.push({name:"userinfo"})
        commit('changUserinfo', params.cellPhone.data);
      }else if(res==undefined){
        Toast({
          message: '网络异常，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }else{
        Toast({
          message: '验证码错误',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  changeprovinces({commit},params){
    api.changeprovinces(params.id,params.provinces).then(res => {
    })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
