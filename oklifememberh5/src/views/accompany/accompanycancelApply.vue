<template>
  <div class="address">
    <div class="marginB30 marginT10">
      <div class="textarea">
        <textarea placeholder="请输入您取消的原因"  rows="5" v-model="cancelText" ></textarea>
        <i class="inputclear" v-if="cancelText?true:false" @click="handleClear"></i>
      </div>
    </div>
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
  </div>
</template>
  <script>
      import ruleP from '../../components/rule-p'
      import oklifeTextarea from '../../components/textarea'
      import api from '../../server/api'
      import oklifeButton from '../../components/button'
      import { Toast } from 'mint-ui'
      export default {
      name:'accompanycancelApply',
        data () {
            return {
              currentValue:false,
              cancelText: ""
            }
        },
        computed: {
          appId(){
            return this.$route.params.id
          },
        },
        mounted () {
          //触发异步请求action内的方法   dispath('方法名')
          this.$store.commit('common/changeHeaderConf', {
            isshow:true,//是否显示头部
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip:false,//是否显示跳过
            skipto:'',//点跳过后到哪个路由页面
            title: '取消申请' // 标题
          })
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        methods: {
          submit: function() {
            let verify=this.cancelText
            let _this=this;
            if(verify==""){
              let instance = Toast('取消原因不能为空');
              setTimeout(() => {
                instance.close();
              }, 2000);
            }else{
              api.cancelAccompanyApply({data:{appId:_this.appId,cancelReason:_this.cancelText}}).then(res=>{
                if(res==undefined){
                  return false
                }else if(res.code==0){
                  Toast({
                    message: '取消申请成功',
                    position: 'center',
                    duration: 2000
                  });

                  setTimeout(function(){
                    _this.$router.push({name:"accompanyCircuit",params:{id:_this.appId}});
                  },2000);

                }
              });
            }
          },
          handleClear:function () {
            this.cancelText = '';
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
