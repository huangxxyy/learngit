<template>
  <div class="space">
    <div class="infoUl">
      <div @click="skipNative">
        <a disabled >
          <span class="sureposition fl color333">确定位置</span>
          <i class="rightIcon"></i>
          <span class="fr color999">位置</span>
        </a>
      </div>
      <div class="inputcontain">
        <textarea v-model="inputaddress" class="inputaddress" maxlength="38" placeholder="请定位或输入详细地址,最多38个字"></textarea>
        <i class="leftIcon"></i>
      </div>
    </div>
    <span class="remind">请认真填写您的详细地址，方面我们为您接送</span>
    <oklife-button @click="submitaddress" height="2.347rem" width="18.4rem">保存</oklife-button>
  </div>
</template>

<script>
  import oklifeButton from '../../../src/components/button'
  import {Toast,Indicator} from 'mint-ui'

  import api from '../../server/api'
  export default {
    name: '',
    data() {
      return {
        inputaddress:''
      }
    },
    computed: {},
    watch: {},
    beforeRouteEnter(to, from, next) {
      next()
    },
    mounted() {
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '填写地址' // 标题
      });
      if(this.$store.state.accompany.accompany.pickupAddress){
        this.inputaddress=this.$store.state.accompany.accompany.pickupAddress
      }
    },
    destroyed() {
      //
    },
    methods: {
      submitaddress(){
        this.$store.commit('accompany/changeaccompany',{
          pickupAddress:this.inputaddress
        })
        this.$router.go(-1)
      },
      skipNative(){
        let _this=this
        let jump = {"nativeType": "map"}
        let Success=(result)=>{
          Indicator.close ()
          _this.inputaddress=result
        }
        let error=(err)=>{Indicator.close ();Toast('定位失败，请重新定位')}
        cordova.plugins.oklife.skipNative(Success, error, jump);
        Indicator.open({
          text: '定位中...',
          spinnerType: 'fading-circle'
        });
      }
    },
    components: {oklifeButton}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    margin-top: px2rem(108);
  }
  .fl{float:left;}
  .fr{float:right;}
  .color333{color:$font333;}
  .color999{color:$font999;}
  .color666{color:$font666;}
  .infoUl{box-sizing: border-box; width:100%;background:#fff;overflow:hidden;}
  .infoUl div{width:px2rem(676);height:px2rem(100);margin-left:px2rem(40);border-bottom:1px solid #D9D9D9;}
  .infoUl div:last-child{border-bottom:none;}
  .infoUl div a{display:inline-block;width:100%;height:100%;line-height:px2rem(100);}
  .infoUl div span.fl{font-size:px2rem(32);}
  .infoUl div span{font-size:px2rem(30);}
  .infoUl div i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:100%;background:url("../../assets/go.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}
  .sureposition{
    &:before{
      content:'';
      display:inline-block;
      width:px2rem(22);
      height: px2rem(26);
      background-image: url("../../assets/dingwei.png");
      background-size: cover;
      vertical-align: middle;
      margin-right: px2rem(20);
    }
  }
  .inputcontain{
    position: relative;
    height: px2rem(150) !important;
    line-height: px2rem(100);
  }
  .inputaddress{
    outline: none;
    border:none;
    line-height:px2rem(50);
    height: px2rem(100);
    width: px2rem(620);
    display: inline-block;
    font-size: px2rem(32);
    padding-left:px2rem(42) ;
    padding-top:px2rem(30);
    resize : none;
    color: #333333;
  }
  .leftIcon{
    position: absolute;
    top:px2rem(45);
    left:0;
    display:inline-block;
    width:px2rem(22);
    height: px2rem(22);
    background-image: url("../../assets/xiedizhi.png");
    background-size: cover;
    vertical-align: middle;
  }
  .remind{
    display: inline-block;
    margin-top: px2rem(20);
    margin-bottom: px2rem(200);
    color: #999999;
    font-size:px2rem(26);
    margin-left: px2rem(30);
  }
</style>
