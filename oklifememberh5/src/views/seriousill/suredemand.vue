<template>
  <div class="space">
    <div class="box">
      <h4 class="demandIcon">需求详情</h4>
      <p>就诊人：<span>{{datas.patientName}} {{datas.sex==1?"男":"女"}} {{datas.age}}</span></p>
      <p>疾病类型：<span>{{datas.disName==null?"不知道什么病":datas.disName}}</span></p>
      <p>意向地：<span>{{datas.provinceName==null?"不限定":datas.provinceName}}</span></p>
      <p>就诊时间：<span>{{datas.sureStartDate|getTime}}-{{datas.sureEndDate|getTime}}</span></p>
      <p>指定专家：<span>{{datas.selectExpertFlag==0?"否":"是"}}</span></p>
      <p>服务名称：<span>{{datas.guidSpecFlag==1?"导医":datas.guidSpecFlag==2?"导诊":"导医导诊"}}</span></p>
      <p>患者状态：<span>{{datas.condition}}</span></p>
    </div>
    <span class="remind">请您保持地那话通畅，平台将会与您联系</span>
    <!--<div class="btn">
      <oklife-button v-show="datas.confirmReqFlag!=1" @click="suredemand" height="2.347rem" width="18.4rem" color="#4776e5">确认需求</oklife-button>
    </div>-->
  </div>
</template>
`
<script>
  import oklifeButton from '../../components/button'
  import { mapState,mapGetters } from 'vuex'
  import { Toast } from 'mint-ui'
  import api from '../../server/api'
  export default {
    name: '',
    data () {
      return {
        datas:[]
      }
    },
    computed: {
      appId(){
        return this.$route.params.id
      },
    },
    watch: {},
    mounted () {
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '需求内容' // 标题
      });
      let _this=this
      api.getsuredemand({params:{appId:_this.appId}}).then(res=>{
        if(res==undefined){
          return false
        }else if(res.code==0){
          _this.datas=res.data
          console.log(_this.datas)
        }
      });
    },
    beforeRouteEnter(to, from, next){
      next ()
    },
    methods: {
      /*suredemand: function () {
          let _this=this;
        api.suredemand({params:{appId:_this.appId}}).then(res=>{
          if(res==undefined){
            return false
          }else if(res.code==0){
            Toast({
              message: '确认需求成功',
              position: 'center',
              duration: 2000
            });
            let timer = setTimeout(function(){
              _this.$router.push({name:"circuit"});
            },2000);
          }
        });
      }*/
    },
    components: {oklifeButton,Toast}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/;
  }
  h3,h4{font-weight: normal;}
  .box{width:100%;margin-top:px2rem(108);border-top:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;background:$fontfff;}
  .box h4{color:#333;width:px2rem(690);padding:0 px2rem(30);font-size:$fontNavm; text-indent:px2rem(50);line-height:px2rem(100);border-bottom:1px solid #d9d9d9;}
  .box h4.demandIcon{background:url("../../assets/successIcon.png") no-repeat px2rem(30) center;background-size:px2rem(38) px2rem(42);}
  .box p{width:px2rem(690);line-height:px2rem(30);font-size:px2rem(30);color:$font333;margin:0 px2rem(30);margin-top:px2rem(40);}
  .box p:last-child{margin-bottom:px2rem(50);}
  .box p span{color:$font666;font-size:$font28;float:right;}

.remind{
  display: inline-block;
  color:$font999 ;
  font-size:px2rem(26);
  margin-left: px2rem(30);
  margin-top: px2rem(30);
}
  .btn{margin:px2rem(120) 0;}
</style>
