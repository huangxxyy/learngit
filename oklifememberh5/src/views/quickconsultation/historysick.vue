<template>
  <div class="address">
    <div class="marginB30 marginT10">
      <div class="textarea">
        <textarea placeholder="请您填写曾经患过的疾病、有无传染病病史、手术外伤史、输血史等" maxlength="500" @input="descInput"  rows="6" v-model="historysick"></textarea>
        <i class="inputclear" v-if="historysick?true:false" @click="handleClear"></i>
        <span>{{remnant}}字</span>
      </div>
    </div>
    <div class="btnBox">
      <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
      <default-button @click="cancel" height="2.347rem" width="16.8rem" class="marginT60">暂无</default-button>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import oklifeButton from '../../../src/components/button'
  import defaultButton from '../../../src/components/defaultbutton'
  export default {
    name:'historysick',
    data () {
      return {
        remnant: 500,
        currentValue:false,
        historysick: this.$store.getters['baseInfo/gohistorysick']=="请填写"?"":this.$store.getters['baseInfo/gohistorysick'],
      }
    },
    computed: {
      patientId(){
        return this.$store.state.baseInfo.baseInfo.patientId
      }
    },
    mounted () {
      //触发异步请求action内的方法   dispath('方法名')
      this.$store.commit('common/changeHeaderConf', {
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip:false,//是否显示跳过
        skipto:'',//点跳过后到哪个路由页面
        title: '过往史' // 标题
      })
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {},
    methods: {
      submit: function() {
        var verify=this.historysick

        if(verify==""){
          let instance = Toast('请填写过往病史');
          setTimeout(() => {
            instance.close();
          }, 2000);
        }else{
          this.$store.commit("baseInfo/changebaseInfo",{historysick:this.historysick})
          this.$router.push({name:"baseInfo",params:{id:this.patientId}})
        }
      },
      descInput(){
        var txtVal = this.historysick.length;
        this.remnant = 500 - txtVal;
      },
      handleClear:function () {
        this.historysick = '';
        this.remnant = 500
      },
      cancel(){
        this.$store.commit("baseInfo/changebaseInfo",{historysick:'暂无'})
        this.$router.push({name:"baseInfo",params:{id:this.patientId}})
      }
    },
    components: {
      oklifeButton,
      defaultButton,
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
    background: #fff;
    font-size: px2rem(32);
    color: $font333;
    line-height: px2rem(50);
    border:none;
    width:px2rem(690);
    height:px2rem(480);
    padding:px2rem(20) px2rem(30);
    resize : none;
    font-family: "PingFangSC-Regular";
  }
  div.textarea span{position:absolute;bottom:px2rem(20);right:px2rem(20);color:$font999;font-size:px2rem(28);}
  div.textarea i.inputclear {
    position: absolute;
    top: px2rem(30);
    right:px2rem(20);
    display: inline-block;
    width: px2rem(28);
    height: px2rem(28);
    background: url(../../assets/clear.png) no-repeat;
    background-size: px2rem(28);
  }
  .btnBox{margin-top:px2rem(180);}
  .marginT60{margin-top:px2rem(60);}
</style>
