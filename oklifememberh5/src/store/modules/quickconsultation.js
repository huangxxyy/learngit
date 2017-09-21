import api from '../../server/api'
import commonUtils from '../../commonutils/commonUtils'
const state = {
  quickconsultation:{
    appId:'',//申请快速问答成功后返回的appId
    custId: 0,//平台医生ID（客服ID）
    doctorEasemobAccount: "hh",//平台医生环信账号（客服环信账号）
    isDefaultAccount: 1,//是否默认环信账号（0：否，1：是） - length:4 ,
    isWorkTime: 0,//是否上班时间范围内 （0：否，1：是）- length:4 ,
    taskCode: "",//任务单号 - length:16


    patientName:'',
    patientId:'',
    patientSex:'',
    patientAge:'',
    patientproblemDesc:'',
  }
}

const getters = {
 }

const mutations = {
  changequickconsultation: (state, data) => {
    Object.assign(state.quickconsultation, data);
    //console.log(state.completeInfo);
  }
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  //初始化state数据
  revertState({commit}){
    commit('changequickconsultation',{
      patient:'请选择',
      choosesick:'请选择',
      time:'请选择',
      appoint:'否',
      choosedoctor:'请选择',
      inputdoctor:'',
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
