<template>
  <div class="address">
    <div class="marginB30 marginT10">
      <div class="textarea">
        <textarea placeholder="请输入详细地址"  rows="2" v-model="address">{{address}}</textarea>
        <i class="inputclear" v-if="address?true:false" @click="handleClear"></i>
      </div>
    </div>
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
  </div>
</template>
  <script>
      import { Toast } from 'mint-ui'
      import ruleP from '../../components/rule-p'
      import oklifeTextarea from '../../components/textarea'
      import oklifeButton from '../../../src/components/button'
      import { mapState } from 'vuex'
      export default {
      name:'address',
        data () {
            return {
              currentValue:false,
              address: this.$store.state.userinfo.userinfo.address=='请填写您的具体地址'?'':this.$store.state.userinfo.userinfo.address
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
            title: '详细地址' // 标题
          })
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        methods: {
          submit: function() {
            var verify=this.address

            if(verify==""){
              let instance = Toast('详细地址不能为空');
              setTimeout(() => {
                instance.close();
              }, 2000);
            }else{
              this.$store.dispatch("userinfo/changeAdress",{
                $router:this.$router,
                "id": this.userId,
                "address": {
                  "data": {
                    "address":this.address
                  }
                }
              })
            }
          },
          handleClear:function () {
            this.address = '';
          }
        },

        components: {
          ruleP,
          oklifeTextarea,
          oklifeButton,

        }
    }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .bColor{background:$bColor;}
  .marginB30{margin-bottom:px2rem(60);}
  .marginT10{position:relative;top:px2rem(20);}
  div.textarea {
    position: relative;
  }

  div.textarea textarea {
    width: 100%;
    background: #fff;
    font-size: px2rem(32);
    color: $font333;
    line-height: px2rem(88);
    text-indent: px2rem(30);
    border:none;
    width:px2rem(750);
    height:px2rem(196);
    resize : none;
    font-family: "PingFangSC-Regular";
  }

  div.textarea i.inputclear {
    position: absolute;
    top: px2rem(30);
    right:px2rem(30);
    display: inline-block;
    width: px2rem(28);
    height: px2rem(28);
    background: url(../../assets/clear.png) no-repeat;
    background-size: px2rem(28);
  }
</style>
