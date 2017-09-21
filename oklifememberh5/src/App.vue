<template>
  <div id="app" :class="{'paddingTop128':isShowAppHeader,'paddingTop88':!isShowAppHeader}">
    <oklife-header></oklife-header>
    <span class="selectbutton" @click="showSelectRadio" :class="{'margin40':isShowAppHeader}">{{buttontext}}</span>
    <transition :name="transitionName">
      <!--每次切换路由的时候，尽量避免不要重复请求数据，所以我们还需要配置一下组件的keep-alive-->
      <!--<keep-alive >-->
        <router-view class="child-view"></router-view>
      <!--</keep-alive>-->
    </transition>
  </div>
</template>

<script>
  import oklifeHeader from '@/components/header'
  import api from '../src/server/api'
  import commonUtils from '../src/commonutils/commonUtils'
  const wx=require('weixin-js-sdk')
  import { mapState } from 'vuex'
export default {
  name: 'app',
  data: function () {
    return {
      transitionName: 'slide-left',
      ifshow:true,
      isShowAppHeader:''
    }
  },
  computed:{
    buttontext(){
      return this.$store.state.common.headerConf.selectbuttontext
    },
    allowBack(){
      return this.$store.state.common.AppSetting.allowBack
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods:{
    showSelectRadio(){//医生选择页的头部右侧“选择”按钮
      let _this=this
      if(this.buttontext=='选择'){
        this.$store.commit('common/changeHeaderConf',{selectbuttontext:'取消选择'})
      }else{
        this.$store.commit('common/changeHeaderConf',{selectbuttontext:'选择'})
      }
    }
  },
  mounted(){

    let _this = this
    if ('app' == window.Browser_Environment_Oklife) {
      _this.isShowAppHeader = true
    }else if('wx' == window.Browser_Environment_Oklife){
      _this.isShowAppHeader = false
    }else {
      _this.isShowAppHeader = true
    }
    if ('wx' == window.Browser_Environment_Oklife) {
      // 一、配置微信 config信息
      let data = {
        url: encodeURIComponent(location.href.split('#')[0]),
        jsApiList: [
          /*
           * 所有要调用的 API 都要加到这个列表中
           * 这里以图像接口为例
           */
          'chooseImage',//拍照或从手机相册中选图接口
          'previewImage',//预览图片接口
          'uploadImage',//上传图片接口
          'downloadImage',//下载图片接口
          'getLocalImgData',//获取本地图片接口
          'startRecord',//开始录音接口
          'stopRecord',//停止录音接口
          'onVoiceRecordEnd',//监听录音自动停止接口
          'playVoice',//播放语音接口
          'pauseVoice',//暂停播放接口
          'stopVoice',//停止播放接口
          'onVoicePlayEnd',//监听语音播放完毕接口
          'uploadVoice',//上传语音接口
          'downloadVoice',//下载语音接口
          'translateVoice',//识别音频并返回识别结果接口
          'getNetworkType',//获取网络状态接口
          'closeWindow',//关闭当前网页窗口接口
          'hideMenuItems',//批量隐藏功能按钮接口
          'showMenuItems',//批量显示功能按钮接口
          'hideAllNonBaseMenuItem'//隐藏所有非基础按钮接口
        ]
      }
      // 二、从后台获取appid和对应的signature
      api.getJsTokenParams({params: {url: data.url}}).then((res) => {
        console.log(res)
        if (res == undefined) {
          return
        } else if (0 == res.code) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录1
            jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        } else {
          console.log(res.message)//此处是http请求成功，但业务有错误代码
        }
      })
    }
  },
  components:{
    oklifeHeader
  }
}
</script>

<style lang="scss">

  @font-face {
    font-family: 'PingFangSC-Regular';
    src: url('../src/assets/fonts/PingFangscRegular.ttf');
  }

  @import "../static/css/app.scss";

  .paddingTop128{
    border:none;
    padding-top: px2rem(128);
  }
  .paddingTop88{
    border:none;
    padding-top: px2rem(88);
  }
  .selectbutton{
    color:$fontfff;
    position: fixed;
    top:px2rem(20);
    right: px2rem(20);
    z-index: 99999;
    font-size: px2rem(30);
    display: none;
  }
  .margin40{
    position: fixed;
    top:px2rem(60);
    right: px2rem(20);
  }
</style>
