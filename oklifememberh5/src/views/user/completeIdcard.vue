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
  import validatorUtils from '../../commonutils/validatorUtils'
  import commonUtils from '../../commonutils/commonUtils'
  import { mapState, mapGetters } from 'vuex'
  import { Toast } from 'mint-ui'
  import oklifeInput from '../../components/input'
  import oklifeButton from '../../../src/components/button'
  export default {
    name: 'idcard',
    data () {
      return {
        idCard: this.$store.state.completeInfo.completeInfo.idCard == '请填写' ? '' : this.$store.getters['completeInfo/toidCard'],

      }
    },
    computed: {
      ...mapGetters({
        idCardType: 'completeInfo/getidcardType',
      }),
      completeuserId(){
        return this.$store.state.completeInfo.completeInfo.id
      }

    },
    mounted () {
      this.$store.commit('common/changeHeaderConf', {
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '证件号码' // 标题
      })
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {},
    methods: {
      submit: function () {
        console.log(this.completeuserId)
        var verify = this.idCard
        if (this.idCardType == '大陆身份证') {
          if (validatorUtils.isCardID(this.idCard)) {
            this.$store.commit('completeInfo/changcompleteInfo', {
              idCard: this.idCard,
              sex: commonUtils.getsexByIdCard(this.idCard),
              age: commonUtils.getAgeByIdCard(this.idCard),
            })
            console.log(this.completeuserId)
            this.$router.push({name:'completeInfo',params:{id:this.completeuserId}})
          } else {
            let instance = Toast('证件号码格式有误')
            setTimeout(() => {
              instance.close()
            }, 2000)
          }
        } else {
          this.$store.commit('completeInfo/changcompleteInfo', {idCard: this.idCard})
          this.$router.push({name:'completeInfo',params:{id:this.completeuserId}})
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
