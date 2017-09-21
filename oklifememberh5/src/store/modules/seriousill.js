import api from '../../server/api'
import commonUtils from '../../commonutils/commonUtils'
const state = {
  seriousill:{
    patient:'',//就诊人名字
    patientId:'',//就诊人Id
    selectDisease:'不知道什么疾病',//选择的疾病名字
    selectDiseaseId:'',//选择的疾病Id
    visitTime:'请选择时间范围',//就诊拼起来显示的时间
    visitStartDate:'',//就诊开始时间
    visitEndDate:'',//就诊结束时间
    appoint:'0',//是否指定专家标记
    choosedoctor:'请选择',//选择的专家名字
    choosedoctorId:'',//选择的专家Id
    expArea:'不限定',//意向地名字
    expAreaId:'',//意向地Id
    inputdoctor:'',//输入的专家名字
    picslocalId:[],//微信本地图片ID，从微信选择图片获得
    picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
    desc:'',//病情描述
    applytime:'',//申请时间

    //选择专家页面
    orderDoctorSelectdisease:'疾病',//选择专家页面选择的疾病名字
    orderDoctorSelectdiseaseId:'',//选择专家页面选择的疾病ID
    orderBy :1,//排序依据（1：综合排序（默认）2：诊断量3：好评率4：关注人数）
    selectArea:'地区',//选择的地区
    selectAreaId:'',//选择的地区ID
    scrollTop:''//记录滚动高度
  }
}

const getters = {
  getappoint: state => {
    if (state.seriousill.appoint == 1) {
      return '是'
    } else {
      return '否'
    }
  },
  getapplytime: state => {
    return commonUtils.getDate(state.seriousill.applytime, false)
  },
  getseriousillorderBy: state => {
    if (state.seriousill.orderBy == 1) {
      return '综合排序'
    } else if (state.seriousill.orderBy == 2) {
      return '诊断量'
    } else if (state.seriousill.orderBy == 3) {
      return '好评率'
    } else if (state.seriousill.orderBy == 4) {
      return '关注人数'
    }
  }
}

const mutations = {
  changeseriousill: (state, data) => {
    console.log(data)
    Object.assign(state.seriousill, data);
  },
  addpicslocalIdAndpicsmediaId:(state, data) => {
    state.seriousill.picslocalId.push(data.picslocalId)
    state.seriousill.picsmediaId.push(data.picsmediaId)
  },
  deletepicslocalIdAndpicsmediaId:(state, index) => {
    state.seriousill.picslocalId.splice(index, 1)
    state.seriousill.picsmediaId.splice(index, 1)
  },
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  //初始化state数据
  revertState({commit}){
    commit('changeseriousill',{
      patient:'',//就诊人名字
      patientId:'',//就诊人Id
      selectDisease:'不知道什么疾病',//选择的疾病名字
      selectDiseaseId:'',//选择的疾病Id
      orderDoctorSelectdisease:'疾病',//选择专家的时候通过选择的疾病名字排序专家
      orderDoctorSelectdiseaseId:'',//选择专家的时候通过选择的疾病Id排序专家
      visitTime:'请选择',//就诊拼起来显示的时间
      visitStartDate:'',//就诊开始时间
      visitEndDate:'',//就诊结束时间
      appoint:'0',//是否指定专家标记
      choosedoctor:'请选择',//选择的专家名字
      choosedoctorId:'',//选择的专家Id
      expArea:'不限定',//意向地名字
      expAreaId:'',//意向地Id
      inputdoctor:'',//输入的专家名字
      picslocalId:[],//微信本地图片ID，从微信选择图片获得
      picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
      desc:'',//病情描述
      applytime:'',//申请时间
      scrollTop:''//记录滚动高度
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
