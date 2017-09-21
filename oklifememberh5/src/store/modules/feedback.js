import api from '../../server/api'
import commonUtils from '../../commonutils/commonUtils'
const state = {
  feedback:{
    picslocalId:[],//微信本地图片ID，从微信选择图片获得
    picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
    desc:'',//病情描述
    problemId:null
  }
}

const getters = {

}

const mutations = {
  changefeedback: (state, data) => {
    Object.assign(state.feedback, data);
  },
  addpicslocalIdAndpicsmediaId:(state, data) => {
    state.feedback.picslocalId.push(data.picslocalId)
    state.feedback.picsmediaId.push(data.picsmediaId)
  },
  deletepicslocalIdAndpicsmediaId:(state, index) => {
    state.feedback.picslocalId.splice(index, 1)
    state.feedback.picsmediaId.splice(index, 1)
  },
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  //初始化state数据
  revertState({commit}){
    commit('changefeedback',{
      picslocalId:[],//微信本地图片ID，从微信选择图片获得
      picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
      desc:'',//病情描述
      problemId:null
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
