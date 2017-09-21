<template>
  <div class="idcard">
    <div class="marginB30 marginT10">
      <oklife-input placeholder="请输入证件号码" type="text" v-model="idCard"  ref="input1"></oklife-input>
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
    import validator from '../../commonutils/validatorUtils'
    import commonUtils from '../../commonutils/commonUtils'
    import { mapState } from 'vuex'
    import { Toast } from 'mint-ui'
      import oklifeInput from '../../components/input'
      import oklifeButton from '../../../src/components/button'
      export default {
      name:'idcard',
        data () {
            return {
              idCard:this.$store.getters['userinfo/toidCard']=='未填写'?'':this.$store.getters['userinfo/toidCard']
            }
        },
        computed: {
          ...mapState({
            userId:state=>state.common.loginInfo.userId,
            idCardType: state => state.userinfo.userinfo.idCardType,
          }),
        },
        mounted () {
          //触发异步请求action内的方法   dispath('方法名')
          this.$store.commit('common/changeHeaderConf', {
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip:false,//是否显示跳过
            skipto:'',//点跳过后到哪个路由页面
            title: '证件号码' // 标题
          })

        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        methods: {
          submit: function() {
            if(this.idCardType=="1"){
              var verify=this.idCard
              console.log(this.idCard);
              if(!validator.isCardID(this.idCard)){
                let instance = Toast('证件号码格式有误');
                setTimeout(() => {
                  instance.close();
                }, 2000);
              }else {
                  //function changecard() {
                    this.$store.dispatch("userinfo/changeIdCardType", {
                      $router:this.$router,
                      "id": this.userId,
                      "idCardType": {
                        "data": {
                          "idCard": this.idCard,
                          "idCardType": this.idCardType
                        }
                      }
                    });
                  //}
                 // function changesexByidcard(){
                    this.$store.dispatch("userinfo/changeSex", {
                      "id": this.userId,
                      "sex": {
                        "data": {
                          "sex": commonUtils.getsexByIdCard(this.idCard)
                        }
                      }
                    });
                  //}
                 // function changeageByidcard() {
                    this.$store.dispatch("userinfo/changeAge", {
                      "id": this.userId,
                      "age": {
                        "data": {
                          "age": commonUtils.getAgeByIdCard(this.idCard)
                        }
                      }
                    });
                  //}
                //function changebirByidcard() {
                  this.$store.dispatch("userinfo/changeBirthday", {
                    "id": this.userId,
                    "birthday": {
                      "data": {
                        "birthday": commonUtils.getTimeStamp(commonUtils.getBirthdayByIdCard(this.idCard))
                      }
                    }
                  })
                //}
                //axios.all([changecard(),changesexByidcard(),changeageByidcard(),changebirByidcard()])
              }
            }else{
              this.$store.dispatch("userinfo/changeIdCardType", {
                $router:this.$router,
                "id": this.userId,
                "idCardType": {
                  "data": {
                    "idCard": this.idCard,
                    "idCardType": this.idCardType
                  }
                }
              });
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
