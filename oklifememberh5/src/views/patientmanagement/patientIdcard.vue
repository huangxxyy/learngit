<template>
  <div class="idcard">
    <div class="marginB30 marginT10">
      <oklife-input placeholder="请输入证件号码" type="text" v-model="idCard" ></oklife-input>
    </div>
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
  </div>

  </template>

  <style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .marginB30{margin-bottom:px2rem(60);}
  .marginT10{position: relative; top:px2rem(20);}
  </style>

  <script>
    import commonutils from '../../commonutils/validatorUtils'
    import commonUtils from '../../commonutils/commonUtils'
    import { mapState, mapGetters } from 'vuex'
    import { Toast } from 'mint-ui'
      import oklifeInput from '../../components/input'
      import oklifeButton from '../../../src/components/button'
      export default {
        data () {
            return {
              idCard:this.$store.getters['patientinfo/toidCard']=="请填写"?"":this.$store.getters['patientinfo/toidCard'],
              patientId:this.$store.state.patientinfo.patientinfo.patientId
            }
        },
        computed: {
          ...mapGetters({
            idCardType: "patientinfo/getidcardType",
          })
        },
        mounted () {
          //触发异步请求action内的方法   dispath('方法名')
          this.$store.commit('common/changeHeaderConf', {
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip:false,//是否显示跳过
            skipto:'',//点跳过后到哪个路由页面
            title: '就诊人证件号码' // 标题
          })
      },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {},
        methods: {
              submit: function() {
                var verify=this.idCard
                if(this.idCardType=="大陆身份证"){
                  if(commonutils.isCardID(this.idCard)<1 ){
                    let instance = Toast('证件号码格式有误');
                    setTimeout(() => {
                      instance.close();
                    }, 2000);
                  }else {
                    this.$store.commit('patientinfo/changpatientinfo', {
                      idCard:this.idCard,
                      sex:commonUtils.getsexByIdCard(this.idCard),
                      birthday:commonUtils.getTimeStamp(commonUtils.getBirthdayByIdCard(this.idCard))
                    });
                    if(this.$store.state.patientinfo.patientinfo.patientId ==null){
                      this.$router.push({name:"added"})
                    }else{
                      this.$router.push({path:'revise/'+this.patientId})
                    }
                  }
                }else{
                    if(this.idCard.length<5){
                      let instance = Toast('证件号码格式有误');
                      setTimeout(() => {
                        instance.close();
                      }, 2000);
                    }else{
                      this.$store.commit('patientinfo/changpatientinfo', {idCard:this.idCard});
                      if(this.$store.state.patientinfo.patientinfo.patientId ==null){
                        this.$router.push({name:"added"})
                      }else{
                        this.$router.push({path:'revise/'+this.patientId})
                      }
                    }
                }
              }
        },
        components: {
          oklifeInput,
          oklifeButton,
          Toast
        }
    }
</script>
