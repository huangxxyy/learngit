<template>
  <div class="name">
    <div class="marginB30">
      <div class="bloodpressure">
        <label>平时血糖</label>
        <input type="number" v-model="blvdSugarStart"/>&nbsp; ~ &nbsp;<input type="number" v-model="blvdSugarEnd" />
      </div>
      <rule-p ruletext="数值在0~1000之间，可以有一位小数，单位为mmol/L"></rule-p>
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
  .bloodpressure input{width:px2rem(234);border:none;border-bottom:1px solid #d9d9d9;}
  </style>

  <script>
    import commonutils from '../../commonutils/validatorUtils'
    import { Toast } from 'mint-ui'
    import ruleP from '../../components/rule-p'
    import oklifeButton from '../../../src/components/button'
      export default {
      name:'',
        data () {
            return {
              blvdSugarStart:this.$store.state.baseInfo.baseInfo.blvdSugarStart,
              blvdSugarEnd:this.$store.state.baseInfo.baseInfo.blvdSugarEnd,
            }
        },
        computed:{
          patientId(){
            return this.$store.state.baseInfo.baseInfo.patientId
          }
        },
        methods:{
          submit: function() {
            if(this.blvdSugarStart=="" && this.blvdSugarEnd=="") {
              let instance = Toast('请填写区间值');
              setTimeout(() => {
                instance.close();
              }, 2000)
            }else if(this.blvdSugarStart>1000||this.blvdSugarEnd>1000){
              let instance = Toast('输入值不能大于1000');
              setTimeout(() => {
                instance.close();
              }, 2000)
            }
            else {
              let num=parseFloat(this.blvdSugarStart).toFixed(1)
              if(num.split(".")[1]==0){
                num=parseFloat(this.blvdSugarStart)
              }else{
                num=parseFloat(this.blvdSugarStart).toFixed(1)
              };
              let num2=parseFloat(this.blvdSugarEnd).toFixed(1)
              if(num2.split(".")[1]==0){
                num2=parseFloat(this.blvdSugarEnd)
              }else{
                num2=parseFloat(this.blvdSugarEnd).toFixed(1)
              };
              this.$store.commit("baseInfo/changebaseInfo",{blvdSugarStart:num,blvdSugarEnd:num2})
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
            title: '平时血糖' // 标题
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
