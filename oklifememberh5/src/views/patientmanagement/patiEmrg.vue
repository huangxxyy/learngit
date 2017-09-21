<template>
  <div class="name">
    <rule-p ruletext="6个汉字或12个字母以内"></rule-p>
    <div class="marginB30">
      <oklife-input placeholder="请输入紧急联系人姓名" type="text" v-model="patiEmrg"></oklife-input>
    </div>
    <oklife-button @click="submitComplete" height="2.347rem" width="16.8rem" color="#4776e5"><span>确定</span></oklife-button>
  </div>

</template>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .marginB30{margin-bottom:px2rem(60);}
  </style>

  <script>
    import commonutils from '../../commonutils/validatorUtils'
    import { Toast } from 'mint-ui'
      import ruleP from '../../components/rule-p'
      import oklifeInput from '../../components/input'
      import oklifeButton from '../../../src/components/button'
    import {mapGetters} from 'vuex'
      export default {
        name:'patientname',
        data () {
            return {
              patiEmrg:this.$store.state.patientinfo.patientinfo.patiEmrg==null?'':this.$store.state.patientinfo.patientinfo.patiEmrg,
              patientId:this.$store.state.patientinfo.patientinfo.patientId
            }
        },
        computed:{

        },
        methods:{
          submitComplete: function() {
            var verify=this.patiEmrg

            if(commonutils.isCnAndEnNumeric(this.patiEmrg)<1 ) {
              let instance = Toast('6个汉字或12个字母以内');
              setTimeout(() => {
                instance.close();
              }, 2000)
            }else {
              this.$store.commit('patientinfo/changpatientinfo', {patiEmrg:this.patiEmrg})
              if(this.$store.state.patientinfo.patientinfo.patientId ==null){
                this.$router.push({name:"added"});
              }else{
                this.$router.push({path:'revise/'+this.patientId})
              }
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
            title: '紧急联系人姓名' // 标题
          })
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {
        },
        components: {
          ruleP,
          oklifeInput,
          oklifeButton,
          Toast
        }
    }
</script>
