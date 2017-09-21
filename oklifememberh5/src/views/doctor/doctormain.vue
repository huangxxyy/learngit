<template>
  <div id="doctormain" :class="{'margin-topfu128':isShowAppHeader,'margin-topfu88':!isShowAppHeader}">
    <doctor-tab @click="sousuo"></doctor-tab>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .margin-topfu88 {
    margin-top: px2rem(-88);
  }

  .margin-topfu128 {
    margin-top: px2rem(-128);
  }
</style>

<script>
  import {mapState} from 'vuex'
  import doctorTab from './doctortab.vue'
  export default {
    name: "doctormain",
    data () {
      return {
        isShowAppHeader:''
      }
    },
    computed: {
      // Getting Vuex State from store/modules/commonutils
    },
    mounted () {
      let _this=this
      //触发异步请求action内的方法   dispath('方法名')
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow:false,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '' // 标题
      });
      if ('app' == window.Browser_Environment_Oklife) {
        _this.isShowAppHeader = true
      }else if('wx' == window.Browser_Environment_Oklife){
        _this.isShowAppHeader = false
      }else {
        _this.isShowAppHeader = true
      }
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {},
    methods: {
      sousuo(){
          alert('搜索')
      }
    },
    components: {
      doctorTab
    }
  }
</script>
