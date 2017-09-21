import api from '../../server/api'
import { Toast } from 'mint-ui'
import commonUtils from '../../commonutils/commonUtils'
const state = {
  patientinfo:{
    patientName:null,
    sex:0,
    nationalityId:null,
    idCardType:null,
    idCard:null,
    cellPhone:null,
    birthday:null,
    sin:null,
    relationship:null,
    patiEmrg:null,//紧急联系人姓名
    patiEmrgPhone:null,//紧急联系人电话
    byDefault:null,//是否是默认就诊人
    patientId:null,//就诊人ID
  }
}

const getters = {
  getgivenName:state=>{
    return state.patientinfo.patientName==null?"请填写真实姓名":state.patientinfo.patientName
  },
  getpatiEmrg:state=>{
    return state.patientinfo.patiEmrg==null?"请填写":state.patientinfo.patiEmrg
  },
  getpatiEmrgPhone:state=>{
    return state.patientinfo.patiEmrgPhone==null?"请填写":state.patientinfo.patiEmrgPhone
  },
  getbyDefault:state=>{
    if(state.patientinfo.byDefault==0){
      return false;
    }else{
      return true;
    }
  },
  getrelationship:state=> {
    switch (state.patientinfo.relationship){
      case 1:return "本人";break;
      case 2:return "父母";break;
      case 3:return "子女";break;
      case 4:return "亲属";break;
      default:return "请选择";
    }
  },
    getsex:state=>{
      if(state.patientinfo.sex==1){
        return "男";
      }else if(state.patientinfo.sex==2) {
        return "女"
      }else{
        return "请选择"
      }
    },
  getnationalityId:state=>{
    if(state.patientinfo.nationalityId==1){
      return "中国";
    }else{
      return "请选择"
    }
  },
    getidcardType:state=>{
      if(state.patientinfo.idCardType==1){
        return "大陆身份证";
      }else if(state.patientinfo.idCardType==2) {
        return "护照"
      }else if(state.patientinfo.idCardType==3) {
        return "港澳台胞证"
      }else if(state.patientinfo.idCardType==4) {
        return "其他"
      }else{
        return "婴幼儿无身份可不填写"
      }
    },
    getbirthday:state=>{
      if(state.patientinfo.birthday==null){
        return "请选择"
      }else{
        return commonUtils.getDate(state.patientinfo.birthday,true)
      }
    },
    toTel:state=>{
      if(state.patientinfo.cellPhone==null) {
        return "请填写"
      }else{
        let start = state.patientinfo.cellPhone.slice(0, 3);
        let end = state.patientinfo.cellPhone.slice(-3);
        return start + '*****' + end;
      }
    },
  tosin:state=>{
    let val=state.patientinfo.sin
    if(val==null) {
      return "请填写"
    }else{
      if(val.length>4&&val.length<8){
        let start = val.slice(0, 1);
        let end = val.slice(-2);
        return start + '***' + end;
      }else if(val.length>7&&val.length<12){
        let start = val.slice(0, 2);
        let end = val.slice(-2);
        return start + '*****' + end;
      }else if(val.length>11){
        let start = val.slice(0, 3);
        let end = val.slice(-4);
        return start + '********' + end;
      }
    }
  },
  toidCard:state=>{
    let val=state.patientinfo.idCard
    if(val==null) {
      return "请填写"
   }else{
      if(val.length>4&&val.length<8){
        let start = val.slice(0, 1);
        let end = val.slice(-2);
        return start + '***' + end;
      }else if(val.length>7&&val.length<12){
        let start = val.slice(0, 2);
        let end = val.slice(-2);
        return start + '*****' + end;
      }else if(val.length>11){
        let start = val.slice(0, 3);
        let end = val.slice(-4);
        return start + '********' + end;
      }
    }
  }
}

const mutations = {
  changpatientinfo: (state, data) => {
    Object.assign(state.patientinfo, data);
    //console.log(state.patientinfo);
  }
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  //新增就诊人
  insertpatient({ commit },params) {
    api.insertpatient(params).then(res => {
      if(res.code==0){
        params.$router.push({name:"addpatient"})
        commit('changpatientinfo',{
          patientName:null,
          sex:0,
          nationalityId:null,
          idCardType:null,
          idCard:null,
          cellPhone:null,
          birthday:null,
          sin:null,
          relationship:null,
          patiEmrg:null,
          patiEmrgPhone:null,
          byDefault:0,
          patientId:null
        })
      }else{
        Toast({
          message: '添加失败',
          position: 'center',
          duration: 2000
        });
      }
    })
  },
  //获取就诊人信息
  getpatientinfo({ commit },params) {
    api.getpatientinfo(params).then(res => {
      if(res.code==0){
        const data = res.data;
        commit('changpatientinfo', {
          patientName: data.patientName,
          sex: data.sex,
          nationalityId: data.nationalityId,
          idCardType: data.idCardType,
          idCard: data.idCard,
          cellPhone:data.cellPhone,
          birthday:data.birthday,
          relationship:data.relationship,
          patiEmrg: data.patiEmrg,
          patiEmrgPhone: data.patiEmrgPhone,
          sin: data.sin,
          patientId:data.patientId,
          byDefault:data.byDefault
        })
      }else {
        Toast({
          message: '获取失败',
          position: 'center',
          duration: 2000
        })
      }
    })
  },
  //修改就诊人信息
  patiEmrgPhone({ commit },params) {
    api.patiEmrgPhone(params).then(res => {
      if(res.code==0){
        Toast({
          message: '修改成功',
          position: 'center',
          duration: 2000
        });
        let timer = setTimeout(function(){
          params.$router.push({name:"addpatient"});
          commit('changpatientinfo',{
            patientName:null,
            sex:0,
            nationalityId:null,
            idCardType:null,
            idCard:null,
            cellPhone:null,
            birthday:null,
            sin:null,
            relationship:null,
            patiEmrg:null,
            patiEmrgPhone:null,
            byDefault:0,
            patientId:null
          })
        },2000);
      }else{
        Toast({
          message: '修改失败',
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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
