<template>
  <div class="name">
    <div class="marginB30">
      <oklife-input placeholder="请输入您的体重" type="number" v-model="weight" oninput="if(value.length>5)value=value.slice(0,5)"></oklife-input>
      <rule-p ruletext="注：默认单位为千克KG"></rule-p>
    </div>
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5"><span>确定</span></oklife-button>

  </div>
</template>

  <style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .marginB30{margin-top:px2rem(108);margin-bottom:px2rem(150); position:relative;}
  .marginB30 span{position:absolute;top:0.6rem;right:2rem;font-size:$font28;color:$font999}
  </style>

  <script>
    import commonutils from '../../commonutils/validatorUtils'
    import { Toast } from 'mint-ui'
    import oklifeInput from '../../components/input'
    import ruleP from '../../components/rule-p'
    import oklifeButton from '../../../src/components/button'
      export default {
      name:'weight',
        data () {
            return {
              weight: this.$store.state.baseInfo.baseInfo.weight
            }
        },
        computed:{
          patientId(){
            return this.$store.state.baseInfo.baseInfo.patientId
          }
        },
        methods:{
          submit: function() {
            if(this.weight=="" ) {
              let instance = Toast('请填写您的体重');
              setTimeout(() => {
                instance.close();
              }, 2000)
            }else {
              this.$store.commit("baseInfo/changebaseInfo",{weight:this.weight,})
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
            title: '基本信息' // 标题
          })
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        components: {
          oklifeInput,
          oklifeButton,
          Toast,
          ruleP
        }
    }
</script>
