/**
 * Created by hh on 2017/8/6.
 */
import api from '../../server/api'
import commonUtils from '../../commonutils/commonUtils'
const state = {
  accompany:{
    patient:'',//就诊人名字
    patientId:'',//就诊人Id
    visitTime:'',//就诊的时间

    inputhospitalname:'',//输入的医院名字
    choosehospital:'',//选择的医院名字
    choosehospitalId:'',//选择的医院Id

    carappoint:'0',//是否车接送标记

    picslocalId:[],//微信本地图片ID，从微信选择图片获得
    picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
    desc:'',//病情描述
    applytime:'',//申请时间

    orderHospitalSelectdisease:'',//医院排序选择的疾病名称
    orderHospitalSelectdiseaseId:'',
    femaleNum:'0',//男人陪诊数
    maleNum:'0',//女人陪诊数

    isselectAgreement:true,//是否勾选协议
    pickupAddress:'',//输入或者定位的地址
    scrollTop:''
  }
}

const getters = {
  gethospital:state=>{
    if(state.accompany.inputhospitalname){
      return state.accompany.inputhospitalname
    }else if(state.accompany.choosehospitalId){
      return state.accompany.choosehospital
    }
  },
  getPeopleNum:state=>{
    if(state.accompany.femaleNum=='0' && state.accompany.maleNum!='0'){
      return '男0人，女'+state.accompany.maleNum+'人'
    }else if(state.accompany.femaleNum!='0' && state.accompany.maleNum=='0'){
      return '男'+state.accompany.femaleNum+'人，女0人'
    }else if(state.accompany.femaleNum!='0' && state.accompany.maleNum!='0'){
      return '男'+state.accompany.femaleNum+'人，女'+state.accompany.maleNum+'人'
    }else{
      return '请选择'
    }
  },
  getcarappoint: state => {
    if (state.accompany.carappoint == 1) {
      return '是'
    } else {
      return '否'
    }
  },
  getapplytime: state => {
    return commonUtils.getDate(state.accompany.applytime, false)
  },
  getvisitTime:state=>{
    if(!state.accompany.visitTime){
      return '请选择'
    }else{
      return state.accompany.visitTime
    }
  },
  getchoosehospital:state=>{
    if(!state.accompany.choosehospital){
      return '请选择'
    }else{
      return state.accompany.choosehospital
    }
  }

}

const mutations = {
  changeaccompany: (state, data) => {
    console.log(data)
    Object.assign(state.accompany, data);
  },
  addpicslocalIdAndpicsmediaId:(state, data) => {
    state.accompany.picslocalId.push(data.picslocalId)
    state.accompany.picsmediaId.push(data.picsmediaId)
  },
  deletepicslocalIdAndpicsmediaId:(state, index) => {
    state.accompany.picslocalId.splice(index, 1)
    state.accompany.picsmediaId.splice(index, 1)
  },
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  //初始化state数据
  revertState({commit}){
    commit('changeaccompany',{
      patient:'',//就诊人名字
      patientId:'',//就诊人Id
      visitTime:'',//就诊的时间

      inputhospitalname:'',//输入的医院名字
      choosehospital:'',//选择的医院名字
      choosehospitalId:'',//选择的医院Id

      carappoint:'0',//是否车接送标记

      picslocalId:[],//微信本地图片ID，从微信选择图片获得
      picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
      desc:'',//病情描述
      applytime:'',//申请时间

      orderHospitalSelectdisease:'',//医院排序选择的疾病名称
      orderHospitalSelectdiseaseId:'',
      femaleNum:'',//男人陪诊数
      maleNum:'',//女人陪诊数

      isSelectAgreement:true,//是否勾选协议，0为没勾选，1为勾选
      pickupAddress:'',//输入或者定位的地址
      scrollTop:''
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
