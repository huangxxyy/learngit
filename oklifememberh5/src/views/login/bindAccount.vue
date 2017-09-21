<template>
  <div class="bindAccount">
    <img :src="headImgUrl"/>
    <p class="loginName">账号：<span v-text="loginAccount"></span></p>
    <div class="hrline"></div>
    <div class="tipsBox">
      <p class="mainC">您的手机号、微信账号将与OkLife账号进行绑定</p>
      <p>绑定后，您的手机号、微信账号和OkLife账号都可以登录</p>
    </div>
    <oklife-button @click="toBusiness"  height="2.347rem" width="16.8rem" color="#4776e5">马上绑定账号</oklife-button>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../static/css/base/min.scss';
  .bindAccount {
   width:px2rem(630);margin:0 px2rem(60); margin-top:px2rem(88); text-align:center;
  }
  .bindAccount img{
    width:px2rem(164);
    height:px2rem(164);
    border-radius:50%;
    margin-top:px2rem(80);
  }
  .bindAccount p.loginName{color:$font333;margin-top:px2rem(16);font-size:$font28;}
  p.loginName span{color:#375dde;}
  .hrline{width:100%;height:1px;background:#d9d9d9;margin-top:px2rem(100);}
  .tipsBox{text-align: left;margin-top:px2rem(20);margin-bottom:px2rem(110);}
  .tipsBox p{font-size:px2rem(24);color:$font999;line-height:px2rem(50);}
  .tipsBox p.mainC{color:#4675e5;font-size:px2rem(28);  }

</style>

<script>
  import oklifeButton from '@/components/button'
  import commonutils from '../../commonutils/commonUtils'
  import { mapGetters } from 'vuex'
  export default {
    name:"bindAccount",
    data () {
      return {

      }
    },
    computed: {
      loginAccount(){
          return this.$store.state.common.loginInfo.loginAccount
      },
      ...mapGetters({
        headImgUrl:'common/headImgUrl',
        nickName:'common/nickName'
      })
    },
    watch: {},
    methods: {
      toBusiness(){
        let entry=commonutils.getRequest().entry;
        switch (entry) {
          case 'v1001001':
            if(this.$store.state.userinfo.userinfo.cellPhone=='用于接收就诊信息，请认真填写' || this.$store.state.userinfo.userinfo.idCard=='未填写' ||this.$store.state.userinfo.userinfo.sex=='请选择' ||this.$store.state.userinfo.userinfo.age=='请选择'  ){
              this.$router.replace({name:'completeInfo',params:{id:this.$store.state.common.loginInfo.userId}});
            }else{
              this.$router.push({name:'Submitq'});
            }
            break
          case 'v1001006':
            if(this.$store.state.userinfo.userinfo.cellPhone=='用于接收就诊信息，请认真填写' || this.$store.state.userinfo.userinfo.idCard=='未填写' ||this.$store.state.userinfo.userinfo.sex=='请选择' ||this.$store.state.userinfo.userinfo.age=='请选择'  ){
              this.$router.replace({name:'completeInfo',params:{id:this.$store.state.common.loginInfo.userId}});
            }else{
              this.$router.push({name:'Submithelp'});
            }
            break
          case 'v1002001':
            this.$router.push({name:'doctor'});
            break
          case 'v1001008':
            if(this.$store.state.userinfo.userinfo.cellPhone=='用于接收就诊信息，请认真填写' || this.$store.state.userinfo.userinfo.idCard=='未填写' ||this.$store.state.userinfo.userinfo.sex=='请选择' ||this.$store.state.userinfo.userinfo.age=='请选择'  ){
              this.$router.replace({name:'completeInfo',params:{id:this.$store.state.common.loginInfo.userId}});
            }else{
              this.$router.push({name:'accompany'});
            }
            break
          case 'v1001002':
            this.$router.push({name:'userinfo'});
            break
          case 'v1001003':
            this.$router.push({name:'myQuestion'});
            break
          case 'v1001004':
            this.$router.push({name:'myDoctor'});
            break
          case 'v1001005':
            this.$router.push({name:'myconcern'});
            break
          case 'v1003002':
            this.$router.push({name:'appdownload'});
            break
          case 'v1003003':
            this.$router.push({name:'customerservice'});
            break
          case 'v1003004':
            this.$router.push({name:'agreement'});
            break
          case 'v1003005':
            this.$router.push({name:'about'});
            break
          default:
            console.log('非法路径');
            this.$router.push({name:'fillphone'});
        }
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
        title: '绑定账号' // 标题
      })
    }
  }
</script>
