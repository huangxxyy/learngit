<template>
  <div class="babyname">
    <rule-p ruletext="4-20个字符，可使用中英文字母和数字任意组合"></rule-p>
    <div class="marginB30">
      <oklife-input placeholder="请输入昵称" type="text" v-model="nickName"></oklife-input>
    </div>
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>

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
      import { mapState } from 'vuex'
      export default {
      name:'inputbabyname',
        data () {
            return {
              nickName:this.$store.state.userinfo.userinfo.nickName=='未设置'?'':this.$store.state.userinfo.userinfo.nickName
            }
        },
        computed: {
          userId(){
            return this.$store.state.common.loginInfo.userId
          }
        },
        mounted () {
          //触发异步请求action内的方法   dispath('方法名')
          this.$store.commit('common/changeHeaderConf', {
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip:false,//是否显示跳过
            skipto:'',//点跳过后到哪个路由页面
            title: '昵称设置' // 标题
          })
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        methods: {

          submit: function() {
            var verify=this.nickName;
            console.log(this.nickName);
            var test ={
              $router:this.$router,
              "id": this.userId,
              "nickName": {
                "data": {
                  "nickName": this.nickName
                }
              }
            };
            if(commonutils.isEnNumericLimit(verify)<1 ){
              let instance = Toast('4-20个字符，可使用中英文字母和数字任意组合');
              setTimeout(() => {
                instance.close();
              }, 2000);
            }else {
              this.$store.dispatch("userinfo/changeNickname",test);
            }
          }
        },
        components: {
          ruleP,
          oklifeInput,
          oklifeButton,
          Toast
        }
    }
</script>
