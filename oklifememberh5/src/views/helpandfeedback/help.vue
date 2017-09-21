<template>
<div class="space">
  <div class="helpheadercontain">
    <div v-if="isShowAppHeader" class="appHeaderSpace fixed"></div>
    <div class="header">
      <a class="goback" @click="goback"></a>
      <span>帮助与反馈</span>
      <a class="goMyfeedback" @click="goMyfeedback">我的反馈</a>
    </div>
  </div>
  <div class="search">
    <input type="text" placeholder="搜索" class="searchInput" />
    <i></i>
  </div>
  <div class="helpList">
    <div v-for="item in datas">
      <router-link disabled to="">
        <img :src="item.qType=='软件使用'?
        './img/help1.png':item.qType=='医学问题'?
        './img/help2.png':item.qType=='疾病问题'?
        './img/help3.png':'./img/help0.png'"/>
        <p>{{item.question}}</p>
        <div class="rightIcon"></div>
      </router-link>
    </div>
  </div>
  <div class="btnBox">
    <div>
      <default-button @click="feedback" height="2.347rem" width="8.29rem">意见反馈</default-button>
    </div>
    <div>
      <oklife-button @click="help" height="2.347rem" width="8.29rem" color="#4776e5">联系客服</oklife-button>
    </div>
  </div>

</div>
</template>

<script>
  import oklifeButton from '../../../src/components/button'
  import defaultButton from '../../../src/components/defaultbutton'
  import api from '../../server/api'
    export default {
        data () {
            return {
              datas:[],
              isShowAppHeader:''
            }
        },
        computed: {},
        watch: {},
        mounted () {
          let _this = this
          if ('app' == window.Browser_Environment_Oklife) {
            _this.isShowAppHeader = true
          }else if('wx' == window.Browser_Environment_Oklife){
            _this.isShowAppHeader = false
          }else {
            _this.isShowAppHeader = true
          }

          this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
            isshow:false,//是否显示头部
            isBack: true,  // 是否显示返回
            handleback:_this.handleback,
            isShare: false, // 是否显示分享
            isSkip: false,//是否显示跳过
            skipto: '',//点跳过后到哪个路由页面
            title: '帮助与反馈' // 标题
          });
          api.gethelpList({}).then(res=>{
              if(res==undefined){
                  return false;
              }else if(res.code==0){
                  this.datas=res.data
              }
          })
        },
        beforeRouteEnter(to, from, next){
            next ()
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
          feedback(){
            this.$router.push({name:"subminfeedback"})
          },
          help(){

          },
          goback(){
            this.$router.go(-1);
          },
          goMyfeedback(){
              this.$router.push({name:"myFeedback"})
          }
        },
        components: {
          oklifeButton,defaultButton
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .search{height:px2rem(100); position:relative;}
  .search i{position:absolute;top:px2rem(36);left:px2rem(310);
    display:inline-block;width:px2rem(24);height:px2rem(24);
    background:url(../../assets/sousuo.png) no-repeat; background-size:px2rem(24);}
  .searchInput{width:px2rem(646);padding:0 px2rem(20);
    font-size:px2rem(28);line-height:px2rem(56); text-align: center;
    margin:px2rem(20) px2rem(30); border:1px solid #cacaca;border-radius:px2rem(8);}
  .helpList{width:100%;height:auto;border-bottom:1px solid #d9d9d9;background:#fff;}
  .helpList>div{width:px2rem(720);margin-left:px2rem(30);height:px2rem(100);border-bottom:1px solid #d9d9d9;}
  .helpList>div:last-child{border-bottom:none;}
  .helpList>div img{width:px2rem(56);margin:px2rem(22) 0;float: left;}
  .helpList>div p{line-height:px2rem(100);font-size:$fontNavm;width:px2rem(580);float: left;margin-left:px2rem(20);color:$font666;}
  .helpList>div .rightIcon{display:inline-block;width:px2rem(10);height:px2rem(100);
    background:url("../../assets/go.png") no-repeat center center;background-size:px2rem(10) px2rem(22);flaot: right;margin-right:px2rem(30);}
  .btnBox{margin-top:px2rem(80);}
  .btnBox>div{margin:0 px2rem(30);float: left;}
.helpheadercontain{
  width: 100%;
  position: fixed;
  top:0;
  z-index: 1000;
}
.header{
  padding: 0 0.8rem;
  width: 100%;
  height: px2rem(88);
  line-height: px2rem(88);
  background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
  z-index: 1001;
  border-bottom: 1px solid $line;
  display: flex;
  align-items:center;
  position: fixed;
  box-sizing: border-box;
  text-align: center;
  color: #ffffff;
}
  .appHeaderSpace{
    width: 100%;
    height: px2rem(40);
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    z-index: 1000;
    display: flex;
    align-items:center;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: px2rem(-1);
  }
  .header a.goback{display:inline-block;width:px2rem(26);height:px2rem(44);float: left;background:url("../../assets/back_fff.png") no-repeat 0 center;background-size:px2rem(26);}
  .header span{text-align:center;position:absolute;left:50%;top:0;display:inline-block;margin-left:-2.5rem; height: 2.34667rem;
    line-height: 2.34667rem;font-size:px2rem(36);}
  .header a.goMyfeedback{display:inline-block;line-height:px2rem(88);position:absolute;top:0;right:px2rem(30);font-size:px2rem(30);}

</style>
