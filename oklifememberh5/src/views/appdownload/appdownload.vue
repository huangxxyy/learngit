<template>
  <div class="container">
    <img class="backgroundimage" src="../../assets/app_download_back_image.jpg" alt="">
    <div class="downloadButton" >
      点击下载APP
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {}
        },
        computed: {},
        watch: {},
        mounted () {
          let _this=this
          this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
            isshow:true,//是否显示头部
            isBack: true,  // 是否显示返回
            handleback:_this.handleback,
            isShare: false, // 是否显示分享
            sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
            isSkip: false,//是否显示跳过
            skipto: '',//点跳过后到哪个路由页面
            title: '金医网' // 标题
          });
        },
        beforeRouteEnter(to, from, next){
            next()
        },
        methods: {
          handleback(){
            //alert("监听到页面后退按钮");//根据自己的需求实现自己的功能
            if ('wx' == window.Browser_Environment_Oklife) {
              if (wx) {
                wx.ready(function () {
                  wx.closeWindow()
                })
              } else if (WeixinJSBridge) {
                WeixinJSBridge.call('closeWindow')
              }
            } else if ('app' == window.Browser_Environment_Oklife) {
              let jump = {//返回上层原生页面
                'nativeType': 'back'
              }
              let Success = () => {}
              let error = () => {}
              cordova.plugins.oklife.skipNative(Success, error, jump)//调用原生插件跳入原生快速咨询页面
            }
          },
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .backgroundimage{
    width: px2rem(750);
  }
  .downloadButton{
    text-align: center;
    height: px2rem(80);
    width:px2rem(400);
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    border-radius: px2rem(10);
    font-size: px2rem(36);
    color: #ffffff;
    line-height: px2rem(80);
    position: absolute;
    top:px2rem(1024);
    left:px2rem(175);
  }


</style>
