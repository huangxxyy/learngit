<template>
  <div class="space">
    <span class="title">请认真阅读用户协议</span>
    <div class="agreeBox">
      协议具体内容还没有确定协议具体内容还没有确定协议具体内容还没有确定协议具体内容还没有确定协议具体内容还没有确定协议具体内容还没有确定协议具体内容还没有确定
    </div>
    <button class="noagree" @click="submitNoAgree">不同意</button>
    <oklife-button class="oklifebutton" @click="submitAgree" height="2.347rem" width="8.533rem">同意</oklife-button>
  </div>
</template>

<script>
  import oklifeButton from '../../../src/components/button'
  import {Toast} from 'mint-ui'
  import api from '../../server/api'
  export default {
    name: '',
    data() {
      return {}
    },
    computed: {},
    watch: {},
    beforeRouteEnter(to, from, next) {
      next()
    },
    mounted() {
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '用户协议' // 标题
      });
    },
    destroyed() {
      //
    },
    methods: {
      submitNoAgree(){
        this.$store.commit('accompany/changeaccompany',{
          isselectAgreement:false
        })
        this.$router.go(-1)
      },
      submitAgree(){
        this.$store.commit('accompany/changeaccompany',{
          isselectAgreement:true
        })
        this.$router.go(-1)
      }
    },
    components: {oklifeButton}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/
  }
  .title{
    display: inline-block;
    margin-left: px2rem(30);
    color:#333333;
    font-size:px2rem(32);
    margin-top: px2rem(40);
    margin-bottom: px2rem(40);
  }
  .agreeBox{
    text-indent:2em;
    margin: auto;
    margin-bottom: px2rem(52);
    background-color: #ffffff;
    font-size: px2rem(30);
    line-height: px2rem(38);
    color: #666666;
    border:px2rem(1) solid #D9D9D9;
    overflow-y: scroll;
    width: px2rem(690);
    height: px2rem(838);
    padding: px2rem(10);
  }
  .noagree{
    display: inline-block;
    box-sizing: border-box;
    width:px2rem(320);
    height: px2rem(88);
    border:px2rem(2) solid #4385f5;
    border-radius: px2rem(8);
    background-color: #ffffff;
    color:#4285f4;
    font-size: px2rem(36);
    margin-left:px2rem(40);
    margin-right: px2rem(20);
  }
  .oklifebutton{
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

  }
</style>
