<template>
  <div class="idcard">
    <div class="marginB30 marginT10">
      <oklife-input placeholder="请输入社保号" type="text" v-model="sin" ></oklife-input>
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
    import { Toast } from 'mint-ui'
      import ruleP from '../../components/rule-p'
      import oklifeInput from '../../components/input'
      import oklifeButton from '../../../src/components/button'
    import { mapState } from 'vuex'
      export default {
      name:'insurance',
        data () {
            return {
                sin:this.$store.getters['userinfo/tosin']=='未填写'?'':this.$store.getters['userinfo/tosin']
            }
        },
        computed: {

        },
        mounted () {
          //触发异步请求action内的方法   dispath('方法名')
          this.$store.commit('common/changeHeaderConf', {
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip:false,//是否显示跳过
            skipto:'',//点跳过后到哪个路由页面
            title: '社保号' // 标题
          })
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        methods: {
          submit: function() {
            var verify=this.sin

            if(commonutils.isAlphaNumeric(this.sin)<1 ){
              let instance = Toast('社保号码格式有误');
              setTimeout(() => {
                instance.close();
              }, 2000);
            }else {
              this.$store.dispatch("userinfo/changeSin", {
                $router:this.$router,
                "id": 1,
                "sin": {
                  "data": {
                    "sin": this.sin
                  }
                }
              })
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
