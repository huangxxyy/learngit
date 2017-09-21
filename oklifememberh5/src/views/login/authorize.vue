<template>
  <div class="authorize">
    <img class="banner" src="../../assets/wechat_banner@3x.jpg"/>
    <div class="authorizeCon">
      <img :src="headImgUrl"/>
      <div class="authorizeP">
        <p class="color666">亲爱的微信平台用户：<span v-text="nickName"></span></p>
        <p class="marginB50">您已对OkLife应用授予以下权限：</p>
        <p><i>1</i>获取微信账号头像</p>
        <p><i>2</i>获取微信账号的昵称</p>
      </div>
    </div>
    <div class="clear"></div>
    <oklife-button @click="submitauthorizelogin"  height="2.347rem" width="16.8rem" color="#4776e5">登录</oklife-button>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../static/css/base/min.scss';
  .authorize img.banner{width:100%;height:px2rem(400);}
  .authorizeCon{margin:px2rem(94) px2rem(80) px2rem(160) px2rem(80);float:left;display:block;}
  .clear{clear: both;width:0;height:0;line-height: 0;}
  .authorizeCon img{width:px2rem(100);height:px2rem(100);float:left;border-radius:px2rem(8);}
  .authorizeCon .authorizeP{float:left;width:px2rem(460);margin-left:px2rem(30);}
  .authorizeP p{line-height:px2rem(80);color:$font333;font-size:px2rem(30);}
  .authorizeP p.color666{color:$font666;line-height:px2rem(50);}
  .authorizeP p.marginB50{margin-bottom:px2rem(50);line-height:px2rem(60);}
  p i{text-align:center;line-height:px2rem(40);color:#fff;font-style:normal;display:inline-block;width:px2rem(40);height:px2rem(40);background:#ccc;border-radius:50%;margin-right:px2rem(20);}

</style>

<script>
  import oklifeButton from '@/components/button'
  export default {
    name:"authorize",
    data () {
      return {
        headImgUrl:this.$store.state.common.UserInfoByAuthCode.headImgUrl?this.$store.state.common.UserInfoByAuthCode.headImgUrl:'./img/defaultAvatar.png',
        nickName:this.$store.state.common.UserInfoByAuthCode.nickName?this.$store.state.common.UserInfoByAuthCode.nickName:'唐英子',
      }
    },
    computed: {},
    watch: {},
    methods: {
      submitauthorizelogin(){//因为跳过填手机号就会进入此页面，此页面实际是微信第三方登录，成功后返回注册的账号并登录，无手机号
        let params={
          data:Object.assign(this.$store.state.common.UserInfoByAuthCode,{"cellphone":"","identityCode":""}),
          $router:this.$router
        };
        console.log(params);
        this.$store.dispatch('common/lightAppLogin',params);//注册并登录
      }
    },
    beforeRouteEnter(to, from, next){
      next ()
    },
    components: {
      oklifeButton
    },
    mounted(){
      this.$store.commit ('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '登录/注册' // 标题
      })
    }
  }
</script>
