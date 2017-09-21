import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'

import userinfo from './modules/userinfo'

import completeInfo from './modules/completeInfo'

import baseInfo from './modules/baseInfo'

import seriousill from './modules/seriousill'

import patientinfo from './modules/patientinfo'

import quickconsultation from './modules/quickconsultation'

import doctorAndhospital from './modules/doctorAndhospital'

import accompany from  './modules/accompany'
import feedback from  './modules/feedback'

    Vue.use(Vuex)

  export default new Vuex.Store({
    modules: {
    common,
    userinfo,
    completeInfo,
    baseInfo,
    quickconsultation,
    patientinfo,
    seriousill,
    doctorAndhospital,
    accompany,
    feedback
  }
})
