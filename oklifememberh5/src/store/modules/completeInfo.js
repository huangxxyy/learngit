import api from '../../server/api'
import {Toast} from 'mint-ui';
import commonUtils from '../../commonutils/commonUtils'
const state = {
  completeInfo:{
    id:'',//完善人的userId
    givenName:'请填写您的真实姓名',
    sex:'请选择',
    age:'请选择',
    nationalityId:'请选择您的国籍',
    idCardType:'婴幼儿无身份可不填写',
    idCard:'请填写',
    cellPhone:'用于接收就诊信息，请认真填写',
  }
}

const getters = {
  getsex:state=>{
    if(state.completeInfo.sex==1){
      return "男";
    }else if(state.completeInfo.sex==2) {
      return "女"
    }else{
      return "请选择"
    }
  },
  getnationality:state=>{
    if(state.completeInfo.nationalityId==1){
      return "中国";
    }else{
      return "请选择您的国籍"
    }
  },
  getidcardType:state=>{
    if(state.completeInfo.idCardType==1){
      return "大陆身份证";
    }else if(state.completeInfo.idCardType==2) {
      return "护照"
    }else if(state.completeInfo.idCardType==3) {
      return "港澳台胞证"
    }else if(state.completeInfo.idCardType==4) {
      return "其他"
    }else{
      return "婴幼儿无身份可不填写"
    }
  },
  toTel:state=>{
    if(state.completeInfo.cellPhone!=="用于接收就诊信息，请认真填写") {
      let start = state.completeInfo.cellPhone.slice(0, 3);
      let end = state.completeInfo.cellPhone.slice(-3);
      return start + '*****' + end;
    }else{
      return state.completeInfo.cellPhone
    }
  },
  toidCard:state=>{
    let idCard=state.completeInfo.idCard
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
  changcompleteInfo: (state, data) => {
    Object.assign(state.completeInfo, data);
    //console.log(state.completeInfo);
  }
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  //初始化state数据
  // revertState({commit}){
  //   commit('changcompleteInfo',{
  //     givenName:'请填写您的真实姓名',
  //     sex:'请选择',
  //     age:'请选择',
  //     nationalityId:'请选择您的国籍',
  //     idCardType:'婴幼儿无身份可不填写',
  //     idCard:'请填写',
  //     cellPhone:'用于接收就诊信息，请认真填写',
  //   })
  // },
  getsyncuserinfo({ commit },params)
  {
    api.getUserInfo(params).then(response => {
      if(response==undefined){
        return;
      }else {
        const data = response.data;
        commit('changcompleteInfo', {
          givenName: data.givenName == null ? "请填写您的真实姓名" : data.givenName,
          sex: data.sex,
          age: data.age,
          nationalityId: data.nationalityId == null ? "请选择您的国籍" : data.nationalityId,
          idCardType: data.idCardType,
          idCard: data.idCard == null ? "请填写" : data.idCard,
          cellPhone: data.cellphone == null ? "用于接收就诊信息，请认真填写" : data.cellphone,
        });
      }
      //resolve(response);
    }).catch(error => {
      console.log(error);
    });
  },
  geticode({commit},params){
    api.geticode(params).then(res => {
    })
  },
  identifyIdCode({commit},data){
    api.identifyIdCode(data).then(res => {
      /*if(res.code==0) {
        commit('changUserinfo', res.data.cellPhone);
      }*/
    })
  },
  custinfo({ commit },payload) {
    api.custinfo(payload.id,payload.custinfo).then(res => {
      if(res==undefined){
        payload.$router.push({name:'404'});
        return false
      }else if(0==res.code){
        commit('changcompleteInfo', {
          givenName: payload.custinfo.data.givenName,
          sex: payload.custinfo.data.sex,
          age: payload.custinfo.data.age,
          nationalityId: payload.custinfo.data.nationalityId,
          idCardType: payload.custinfo.data.idCardType,
          idCard: payload.custinfo.data.idCard,
          cellPhone: payload.custinfo.data.cellphone,
        })
        let instance = Toast('资料已完善')
        setTimeout(() => {
          instance.close()
          let entry= commonUtils.getRequest().entry;
          console.warn(entry)
          if( 'wx'==window.Browser_Environment_Oklife){
            switch (entry) {
              case 'v1001001':
                payload.$router.push({name:'Submitq'});
                break
              case 'v1001006':
                payload.$router.push({name:'Submithelp'});
                break
              case 'v1002001':
                payload.$router.push({name:'doctor'});
                break
              case 'v1001008':
                payload.$router.push({name:'accompany'});
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
                payload.$router.push({ name: 'fillphone'})
            }
          }else if('app'==window.Browser_Environment_Oklife){
            switch (entry) {
              case 'v1001002'://H5私人医生app
                payload.$router.push({name:'myDoctor'});
                break
              case 'v1001003'://H5我的关注app
                payload.$router.push({name:'myconcern'});
                break
              case 'v1001004'://H5大病求医app
                payload.$router.push({name:'Submithelp'});
                break
              case 'v1001005'://H5就医陪同app
                payload.$router.push({name:'accompany'});
                break
              case 'v1001006'://H5就诊人管理app
                payload.$router.push('addpatient');
                break
              case 'v1001007'://H5问卷详情app
                payload.$router.push('');
                break
              case 'v1001001'://原生调用完善个人资料页面后跳回原生快速咨询页面
              {
                let jump_v1001001 = {
                  'nativeType': 'quickquestion'
                }
                let Success = () => {}
                let error = () => {}
                cordova.plugins.oklife.skipNative(Success, error,
                  jump_v1001001)//调用原生插件跳入原生快速咨询页面
                return false
              }
                break
              default: {
                console.log('非法路径');
                let jump_default = {
                  "nativeType": "login"
                }
                let Success = () => {}
                let error = () => {}
                cordova.plugins.oklife.skipNative(Success, error, jump_default);//调用原生插件跳入原生快速咨询页面
                return false
              }
            }
          }
        }, 1000)
      }

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
