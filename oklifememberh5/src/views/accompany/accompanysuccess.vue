<template>
  <div class="space">
    <div class="blueBox">
      <img src="../../assets/applysuccess.png"/>
      <h4>恭喜您已提交成功!</h4>
      <p>平台尽快给您提供陪诊人员以及相关事项</p>
    </div>
    <div class="box">
      <h4 class="infoCard">就诊信息</h4>
      <p>就诊人：<span>{{patient}}</span></p>
      <p>就诊时间：<span>{{time}}</span></p>
      <p>就诊医院：<span>{{gethospital}}</span></p>
      <p>陪诊人数：<span>{{getPeopleNum}}</span></p>
      <p>车接送：<span>{{getcarappoint}}</span></p>
      <p>陪诊项目：<span>全流程陪诊</span></p>
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
  export default {
    name: '',
    data () {
      return {

      }
    },
    computed: {
      ...mapState({
        patient: state => state.accompany.accompany.patient,
        time: state => state.accompany.accompany.visitTime,
        applytime:state=>state.accompany.accompany.applytime,
      }),
      ...mapGetters({
        getPeopleNum:'accompany/getPeopleNum',
        getcarappoint:'accompany/getcarappoint',
        gethospital:'accompany/gethospital'
      })
    },
    watch: {},
    mounted () {
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
          if(WeixinJSBridge){
            WeixinJSBridge.call('closeWindow');
          }else if(wx){
            wx.ready(function () {
              wx.closeWindow()
            })
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
