<template>
  <div class="home">
    <div class="menu">
      <router-link :to="{name:'fillphone'}">微信输入手机</router-link>
      <router-link class="reset" :to="{name:'authorize'}">微信授权登录</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'bindAccount'}">微信绑定账号1</router-link>
      <router-link :to="{name:'alreadybindapp'}" class="reset">微信绑定账号2</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'userinfo'}">微信个人资料</router-link>
      <router-link :to="{name:'fdisease'}" class="reset">关注疾病</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'404'}">404</router-link>
      <router-link :to="{name:'doctor'}" class="reset">专家医院</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'selectDoctor'}" >专家选择</router-link>
      <router-link :to="{name:'selectDisease',params:{from:'home'}}" class="reset">疾病选择</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'baseInfo',params:{id:199}}" >基本资料</router-link>
      <router-link :to="{name:'completeInfo',params:{id:1}}" class="reset">完善个人资料</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'Submitq'}" >快速咨询</router-link>
      <router-link :to="{name:'questionInfo',params:{id:242}}" class="reset">查看快速咨询信息</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'easemobInline'}" >聊天界面</router-link>
      <router-link :to="{name:'about'}" class="reset">关于oklife</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'Submithelp'}" >大病求医</router-link>
      <router-link :to="{name:'accompany'}" class="reset">陪诊申请</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'myconcern'}" >我的关注</router-link>
      <router-link :to="{name:'addpatient'}" class="reset">就诊人管理</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'myFeedback'}" >我的反馈</router-link>
      <router-link :to="{name:'help'}" class="reset">帮助反馈</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'circuit',params:{appId:261}}" >大病求医时间轴</router-link>
      <router-link :to="{name:'accompanyCircuit',params:{appId:158}}" class="reset" >就医陪诊时间轴</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'search'}">搜索</router-link>
      <router-link :to="{name:'agreement'}" class="reset">用户协议</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'customerservice'}">联系客服</router-link>
      <router-link :to="{name:'appdownload'}" class="reset">APP下载</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'myDoctor'}">我的私人医生</router-link>
      <router-link :to="{name:'myQuestion'}" class="reset">我的提问</router-link>
    </div>
    <div class="menu">
      <router-link :to="{name:'hospitalInfo',params:{id:1}}">医院详情</router-link>
    </div>

  </div>
</template>

<script>
  import { Picker } from 'mint-ui';
  import api from '../../src/server/api'
  const wx=require('weixin-js-sdk')
  export default {
    name: 'home',
    data () {
      return {

      }
    },
    methods: {

    },
    mounted () {
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow:true,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '菜单' // 标题
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../static/css/base/min.scss';

  .home {
    /*margin-top: px2rem(88);*/
    width:100%;
    .menu{
      height:1.5rem;
      line-height:1.5rem;
      padding: 0.5rem 1.5rem;
    }
    .menu a{
      font-size:0.8rem;
      color:$mainC;
    }
    .menu a.reset{
      float:right;
    }
  }
</style>
