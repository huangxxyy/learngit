import api from '../../server/api'
import { Toast } from 'mint-ui'
import commonUtils from '../../commonutils/commonUtils'

const state = {
  baseInfo:{
    healthRdId:null,
    patientId:null,
    height:null,//身高
    weight:null,//体重
    bmi:null,//bmi指数
    waistline:null,//腰围
    paunch:null,//腹围
    bloodpressureZ:null,//舒张压
    dBPEnd:null,//舒张压最高
    dBPStart:null,//舒张压最低
    bloodpressureS:null,//收缩压
    sBPEnd:null,//收缩压最高
    sBPStart:null,//收缩压最低
    bloodsuger:null,//血糖
    blvdSugarEnd:null,//血糖最低
    blvdSugarStart:null,//血糖最低
    heartrate:null,//心率
    heartRateEnd:null,//心率最高
    heartRateStart:null,//心率最低
    allergy:null,//过敏禁忌
    nowsick:null,//现病史
    historysick:null,//过往史
    familysick:null,//家族史
    marriagehistory:null,//婚育史
    personhistory:null,//个人史
    livinghabit:null,//生活习惯
    scrollTop:null,//记录位置
  }
}

const getters = {
  goheight:state=>{
    if(!state.baseInfo.height){
      return '请填写'
    }else{
      return state.baseInfo.height+"CM"
    }
  },
  goweight:state=>{
    return state.baseInfo.weight==null?"请填写":(parseFloat(state.baseInfo.weight)).toFixed(1)+"KG"
  },
  gobmi:state=>{
    if(state.baseInfo.weight!=null&&state.baseInfo.height!=null){
      let bmiNum=(parseFloat(state.baseInfo.weight)/((parseInt(state.baseInfo.height)/100)*(parseInt(state.baseInfo.height)/100))).toFixed(1);
      if(bmiNum<18.5){
        return "过轻 "+bmiNum
      }else if(bmiNum>=18.5&&bmiNum<=23.9){
        return "正常 "+bmiNum
      }else if(bmiNum>=24&&bmiNum<=27){
        return "过重 "+bmiNum
      }else if(bmiNum>=28&&bmiNum<=32){
        return "肥胖 "+bmiNum
      }else if(bmiNum>32){
        return "非常肥胖 "+bmiNum
      }
    }else{
      return "";
    }
  },
  gowaistline:state=>{
    return state.baseInfo.waistline==null?"请填写":state.baseInfo.waistline+"CM"
  },
  gopaunch:state=>{
    return state.baseInfo.paunch==null?"请填写":state.baseInfo.paunch+"CM"
  },
  gobloodpressureS:state=>{
    if(state.baseInfo.sBPEnd==null&&state.baseInfo.sBPStart==null){
      return "请填写"
    }else{
      return state.baseInfo.sBPStart+" ~ "+state.baseInfo.sBPEnd
    }
  },
  gobloodpressureZ:state=>{
    if(state.baseInfo.dBPEnd==null&&state.baseInfo.dBPStart==null){
      return "请填写"
    }else{
      return state.baseInfo.dBPStart+" ~ "+state.baseInfo.dBPEnd
    }
  },
  gobloodsuger:state=>{
    if(state.baseInfo.blvdSugarEnd==null&&state.baseInfo.blvdSugarStart==null){
      return "请填写"
    }else{
      return state.baseInfo.blvdSugarStart+" ~ "+state.baseInfo.blvdSugarEnd
    }
  },
  goheartrate:state=>{
    if(state.baseInfo.heartRateEnd==null&&state.baseInfo.heartRateStart==null){
      return "请填写"
    }else{
      return state.baseInfo.heartRateStart+" ~ "+state.baseInfo.heartRateEnd
    }
  },
  goallergy:state=>{
    return state.baseInfo.allergy==null?"请填写":state.baseInfo.allergy
  },
  gonowsick:state=>{
    return state.baseInfo.nowsick==null?"请填写":state.baseInfo.nowsick
  },
  gohistorysick:state=>{
    return state.baseInfo.historysick==null?"请填写":state.baseInfo.historysick
  },
  gofamilysick:state=>{
    return state.baseInfo.familysick==null?"请填写":state.baseInfo.familysick
  },
  gomarriagehistory:state=>{
    return state.baseInfo.marriagehistory==null?"请填写":state.baseInfo.marriagehistory
  },
  gopersonhistory:state=>{
    return state.baseInfo.personhistory==null?"请填写":state.baseInfo.personhistory
  },
  golivinghabit:state=>{
    return state.baseInfo.livinghabit==null?"请填写":state.baseInfo.livinghabit
  },

}

const mutations = {
  changebaseInfo: (state, data) => {
    Object.assign(state.baseInfo, data);
  }
}
//这里写异步的请求方法  在异步方法内，（数据响应）触发同步方法

const actions = {
  gethealthRd({ commit },params){
    api.gethealthRd(params).then(response => {
      if(response==undefined){
        return false;
      }else if(response.code==0){
        const data = response.data;
        commit('changebaseInfo', {
          healthRdId:data.healthRdId,
          height:data.height,
          weight:data.weight,//体重
          waistline:data.waist,//腰围
          paunch:data.belly,//腹围
          dBPEnd:data.dBPEnd,//舒张压最高
          dBPStart:data.dBPStart,//舒张压最低
          sBPEnd:data.sBPEnd,//收缩压最高
          sBPStart:data.sBPStart,//收缩压最低
          blvdSugarEnd:data.blvdSugarEnd,//血糖最低
          blvdSugarStart:data.blvdSugarStart,//血糖最低
          heartRateEnd:data.heartRateEnd,//心率最高
          heartRateStart:data.heartRateStart,//心率最低
          allergy:data.nkda,//过敏禁忌
          nowsick:data.hpi,//现病史
          historysick:data.pmh,//过往史
          familysick:data.fmh,//家族史
          marriagehistory:data.obstHistory,//婚育史
          personhistory:data.persHistory,//个人史
          livinghabit:data.generalHabits,//生活习惯
        })
      }
    })
  },
  //初始化state数据
  revertState({commit}){
    commit('changebaseInfo',{
      healthRdId:null,
      patientId:null,
      height:null,//身高
      weight:null,//体重
      bmi:null,//bmi指数
      waistline:null,//腰围
      paunch:null,//腹围
      dBPEnd:null,//舒张压最高
      dBPStart:null,//舒张压最低
      sBPEnd:null,//收缩压最高
      sBPStart:null,//收缩压最低
      blvdSugarEnd:null,//血糖最低
      blvdSugarStart:null,//血糖最低
      heartRateEnd:null,//心率最高
      heartRateStart:null,//心率最低
      allergy:null,//过敏禁忌
      nowsick:null,//现病史
      historysick:null,//过往史
      familysick:null,//家族史
      marriagehistory:null,//婚育史
      personhistory:null,//个人史
      livinghabit:null,//生活习惯
      scrollTop:null,//记录位置
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
