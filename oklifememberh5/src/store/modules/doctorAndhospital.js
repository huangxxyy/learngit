/**
 * Created by hh on 2017/8/3.
 */import api from '../../server/api'
import commonUtils from '../../commonutils/commonUtils'
const state = {
  doctortab:{
    orderselectdisease:'疾病',//专家页面排序选择的疾病
    orderselectdiseaseId:'',//专家页面排序选择的疾病id
    orderBy :1,//排序依据（1：综合排序（默认）2：诊断量3：好评率4：关注人数）
    selectArea:'地区',//选择的地区
    selectAreaId:'',//选择的地区ID
  },
  hospitaltab:{
    orderselectdisease:'疾病',//专家页面排序选择的疾病
    orderselectdiseaseId:'',//专家页面排序选择的疾病id
    hospLevelId:'',//医院等级:1,2,3为三,二,一甲级,4,5,6为三,二,一乙级,7,8,9为三,二,一丙级)
    property:'',//1公立，2私立
    selectArea:'地区',//选择的地区
    selectAreaId:'',//选择的地区ID
  }
}

const getters = {
  getdoctortaborderBy:state=>{
    if(state.doctortab.orderBy==1){
      return '综合排序'
    }else if(state.doctortab.orderBy==2){
      return '诊断量'
    }else if(state.doctortab.orderBy==3){
      return '好评率'
    }else if(state.doctortab.orderBy==4){
      return '关注人数'
    }
  },
  getHospitaltabProperty:state=>{
    if(state.hospitaltab.property==1){
      return '公立'
    }else if(state.hospitaltab.property==2){
      return '私立'
    }else{
      return '类型'
    }
  },
  getHospitaltabHospLevelId:state=>{
    if(state.hospitaltab.hospLevelId==1){
      return '三甲级'
    }else if(state.hospitaltab.hospLevelId==2){
      return '二甲级'
    }else if(state.hospitaltab.hospLevelId==3){
      return '一甲级'
    }else if(state.hospitaltab.hospLevelId==4){
      return '三乙级'
    }else if(state.hospitaltab.hospLevelId==5){
      return '二乙级'
    }else if(state.hospitaltab.hospLevelId==6){
      return '一乙级'
    }else if(state.hospitaltab.hospLevelId==7){
      return '三丙级'
    }else if(state.hospitaltab.hospLevelId==8){
      return '二丙级'
    }else if(state.hospitaltab.hospLevelId==9){
      return '一丙级'
    }else {
      return '等级'
    }
  }
}

const mutations = {
  changedoctortab: (state, data) => {
    console.log(data)
    Object.assign(state.doctortab, data);
  },
  changehospitaltab: (state, data) => {
    console.log(data)
    Object.assign(state.hospitaltab, data);
  }
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
