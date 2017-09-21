<template>
  <div :class="{'margin-topfu128':isShowAppHeader,'margin-topfu88':!isShowAppHeader}">
    <div v-if="isShowAppHeader" class="appHeaderSpace fixed"></div>
    <div class="blueBox">
      <img src="../../assets/applysuccess.png"/>
      <h4>恭喜您已提交成功!</h4>
      <p>将通过平台数据库<br />为您精准匹配适合的专家后给您回复</p>
    </div>
    <div class="box">
      <h4 class="infoCard">就诊信息</h4>
      <p>就诊人：<span>{{patient}}</span></p>
      <p>疾病类型：<span>{{selectDisease}}</span></p>
      <p>意向地：<span>{{expArea}}</span></p>
      <p>就诊时间：<span>{{time=='请选择'?'未选择':time}}</span></p>
      <p>选择专家：<span>{{appoint==0?'未指定':(inputdoctor==""||!inputdoctor ?choosedoctor:inputdoctor)}}</span></p>
      <p>申请时间：<span>{{applytime | getTimeStamp}}</span></p>
    </div>
    <span class="remind">请您保持地那话通畅，平台将会与您联系</span>
    <div class="btn">
      <oklife-button @click="goHome" height="2.347rem" width="18.4rem" color="#4776e5">确定</oklife-button>
    </div>
  </div>
</template>

<script>
  import oklifeButton from '../../components/button'
  import { mapState,mapGetters } from 'vuex'
  import { Toast } from 'mint-ui'
  const wx=require('weixin-js-sdk')
  export default {
    name: '',
    data () {
      return {
        isShowAppHeader:''
      }
    },
    computed: {
      ...mapState({
        patient: state => state.seriousill.seriousill.patient,
        selectDisease: state => state.seriousill.seriousill.selectDisease,
        expArea:state => state.seriousill.seriousill.expArea,
        time:state=>state.seriousill.seriousill.visitTime,
        appoint:state=>state.seriousill.seriousill.appoint,
        inputdoctor:state=>state.seriousill.seriousill.inputdoctor,
        choosedoctor: state => state.seriousill.seriousill.choosedoctor,
        applytime:state=>state.seriousill.seriousill.applytime,
      })
    },
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
      this.$store.commit('common/changeHeaderConf', {
        isshow:false,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '' // 标题
      });
    },
    beforeRouteEnter(to, from, next){
      next ()
    },
    methods: {
      goHome: function () {
        if(window.Browser_Environment_Oklife=='wx'){
          if(wx){
            wx.ready(function () {
              wx.closeWindow();
            })
          }else if(WeixinJSBridge){
            WeixinJSBridge.call('closeWindow');
          }
        }else if(window.Browser_Environment_Oklife=='app'){
          let jump = {//返回上层原生页面
            "nativeType": "back"
          }
          let Success=()=>{}
          let error=()=>{}
          cordova.plugins.oklife.skipNative(Success, error, jump);//调用原生插件跳入原生快速咨询页面
        }else{
          Toast('请在APP或微信公众号操作')
        }
      }
    },
    components: {oklifeButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .margin-topfu88 {
    margin-top: px2rem(-88);
  }

  .margin-topfu128 {
    margin-top: px2rem(-128);
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
  h3,h4{font-weight: normal;}
  .box{width:100%;margin-top:px2rem(20);border-top:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;background:$fontfff;}
  .box h4{color:#333;width:px2rem(690);padding:0 px2rem(30);font-size:$fontNavm; text-indent:px2rem(50);line-height:px2rem(100);border-bottom:1px solid #d9d9d9;}
  .box h4.infoCard{background:url("../../assets/jiuzhenxiangqing.png") no-repeat px2rem(30) center;background-size:px2rem(38) px2rem(42);}
  .box p{width:px2rem(690);line-height:px2rem(30);font-size:px2rem(30);color:$font333;margin:0 px2rem(30);margin-top:px2rem(40);}
  .box p:last-child{margin-bottom:px2rem(50);}
  .box p span{color:$font666;font-size:$font28;float:right;}
.blueBox{width:100%;height:px2rem(370);background:linear-gradient(to right, #5390f4, #2470f2); text-align: center;color:#fff;}
  .blueBox img{width:px2rem(100);height:px2rem(100);margin-top:px2rem(30);}
  .blueBox h4{font-weight:normal;font-size:px2rem(40);margin-top:px2rem(30);line-height:px2rem(40);}
  .blueBox p{font-size:px2rem(26);margin-top:px2rem(40);line-height:px2rem(34);}
.remind{
  display: inline-block;
  color:$font999 ;
  font-size:px2rem(26);
  margin-left: px2rem(30);
  margin-top: px2rem(30);
}
  .btn{margin-top:px2rem(30);}
</style>
