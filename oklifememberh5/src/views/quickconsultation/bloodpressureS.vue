<template>
  <div class="name">
    <div class="marginB30">
      <div class="bloodpressure">
        <label>收缩压</label>
        <input type="number" v-model="sBPStart"/>&nbsp; ~ &nbsp;<input type="number" v-model="sBPEnd" />
      </div>
      <rule-p ruletext="数值在0~1000之间，为整数，单位为mmHg"></rule-p>
    </div>
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5"><span>确定</span></oklife-button>

  </div>
</template>

  <style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .marginB30{margin-top:px2rem(108);margin-bottom:px2rem(150); position:relative;}
  .marginB30 span{position:absolute;top:0.6rem;right:2rem;font-size:$font28;color:$font999}
    .bloodpressure{height:px2rem(60);width:px2rem(690);padding:px2rem(20) px2rem(30);
      background: #ffffff;font-size:px2rem(30);color:$font333;line-height:px2rem(60);}
  .bloodpressure label{margin-right:px2rem(20);}
  .bloodpressure input{width:px2rem(250);border:none;border-bottom:1px solid #d9d9d9;}

  </style>

  <script>
    import validatorUtils from '../../commonutils/validatorUtils'
    import { Toast } from 'mint-ui'
    import ruleP from '../../components/rule-p'
    import oklifeButton from '../../../src/components/button'
      export default {
      name:'',
        data () {
            return {
              sBPStart:this.$store.state.baseInfo.baseInfo.sBPStart,
              sBPEnd:this.$store.state.baseInfo.baseInfo.sBPEnd,
            }
        },
        computed:{
          patientId(){
            return this.$store.state.baseInfo.baseInfo.patientId
          }
        },
        methods:{
          submit: function() {
            if(!validatorUtils.isNumeric(this.sBPStart)||!validatorUtils.isNumeric(this.sBPEnd)){
              let instance = Toast('输入值格式不正确');
              setTimeout(() => {
                instance.close();
              }, 2000)
            }else if(this.sBPStart>1000||this.sBPEnd>1000){
              let instance = Toast('输入值不能大于1000');
              setTimeout(() => {
                instance.close();
              }, 2000)
            }else {
              this.$store.commit("baseInfo/changebaseInfo",{sBPStart:this.sBPStart,sBPEnd:this.sBPEnd})
              this.$router.push({name:"baseInfo",params:{id:this.patientId}})
            }
          }
        },
        mounted () {
          //触发异步请求action内的方法   dispath('方法名')
          this.$store.commit('common/changeHeaderConf', {
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip:false,//是否显示跳过
            skipto:'',//点跳过后到哪个路由页面
            title: '收缩压' // 标题
          })
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        components: {
          oklifeButton,
          Toast,
          ruleP
        }
    }
</script>
