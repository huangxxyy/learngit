<template>
  <div class="addparient">
    <router-link :to="this.have==7?'':{name:'added'}" class="addparientA">
      <span class="newicon">新增就诊人</span><span>（已有{{have}}人，还能添加{{can}}人）</span>
    </router-link>
    <div class="parientList" v-show="parientListVisition" >
      <div class="parientBox" v-for="item in datas">
        <router-link :to="{name:'revise',params:{id:item.patientId}}">
          <img :src="item.sex==1?'./img/man.png':'./img/woman.png'"/>
          <div class="parientBoxP">
            <p class="p1">{{item.patientName}}<span> {{item.sex==1?"男":"女"}}</span> <i>{{item.byDefault==1?"默认就诊人":""}}</i></p>
            <p>手机号：{{item.cellPhone|hidenum}}</p>
            <p>证件号：{{item.idCard|hidenumidcard}}</p>
          </div>
          <div class="rightIcon"></div>
        </router-link>
      </div>
    </div>
    <div class="nothing" v-show="nothingVisition">
      <img src="../../assets/addparient.png"/>
      <p class="addparientP">您还未添加就诊人，请赶快添加</p>
    </div>
  </div>
</template>
<script>
  import api from '../../server/api'
  const wx=require('weixin-js-sdk')
  export default {
    name:"addpatient",
    data () {
      return {
        frompath:'',
        parientListVisition:true,
        byDefaultVisition:false,
        nothingVisition:true,
        userId:this.$store.state.common.loginInfo.userId,
        //todo userId:2,
        datas:[]
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        //判断从哪个源头进来，左上角后退的时候最终后退到哪里
        if(from.path=='/quickrouterview/Submitq' || from.path=='/dovrouterview/Submithelp' || from.path=='/accompanyList/accompany'){
          vm.frompath=from.path
        }

        if(from.path.split('/')[2]=="revise"){
          vm.$store.commit('patientinfo/changpatientinfo',{
            patientName:null,
            sex:0,
            nationalityId:null,
            idCardType:null,
            idCard:null,
            cellPhone:null,
            birthday:null,
            sin:null,
            relationship:null,
            patiEmrg:null,
            patiEmrgPhone:null,
            byDefault:0,
            patientId:null
          })
        }
      });
    },
    computed: {
      have(){
        return this.datas.length
      },
      can(){
        return 7-this.datas.length
      },

    },
    watch: {},
    methods: {
      handleback(){
        if(this.frompath=='/quickrouterview/Submitq'){
          this.$router.push({name:'Submitq'})
        }else if(this.frompath=='/dovrouterview/Submithelp'){
          this.$router.push({name:'Submithelp'})
        }else if(this.frompath=='/accompanyList/accompany'){
          this.$router.push({name:'accompany'})
        }else {
          //如果是其他路径，则是从app的“我的”里面就诊人管理入口进来的，按返回则关闭页面
          if('wx'== window.Browser_Environment_Oklife){
            if(wx){
              wx.ready(function () {
                wx.closeWindow();
              })
            }else if(WeixinJSBridge){
              WeixinJSBridge.call('closeWindow')
            }
          }else if('app'== window.Browser_Environment_Oklife){
            let jump = {//返回上层原生页面
              "nativeType": "back"
            }
            let Success=()=>{}
            let error=()=>{}
            cordova.plugins.oklife.skipNative(Success, error, jump);//调用原生插件跳入原生快速咨询页面
          }
        }
      }
    },
    components: {

    },
    mounted(){
      let _this=this;
      //监听安卓手机的后退物理键
      window.addEventListener("popstate", function(e) {
        //alert("监听到后退物理键");//根据自己的需求实现自己的功能
        if(this.frompath=='/quickrouterview/Submitq'){
          _this.$router.push({name:'Submitq'})
        }else if(this.frompath=='/dovrouterview/Submithelp'){
          _this.$router.push({name:'Submithelp'})
        }else if(this.frompath=='/accompanyList/accompany'){
          _this.$router.push({name:'accompany'})
        }
      }, false);

      setInterval(this.initloading,1000);
      _this.$store.commit ('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        handleback:_this.handleback,
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '就诊人管理' // 标题
      });

      api.getpatientlist({params:{"userId":_this.userId}}).then(res => {
        if(res==undefined){
          return;
        }else if(0==res.code){
          _this.datas=res.data
          if(_this.datas.length==0){
            _this.parientListVisition=false;
            _this.nothingVisition=true;
          }else{
            _this.parientListVisition=true;
            _this.nothingVisition=false;
          };
        }
      });

    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../static/css/base/min.scss';

  .addparient {
    /*margin-top: px2rem(88);*/;
    /*text-align: center;*/
  }

  .addparient .nothing img {
    display: block;
    margin: auto;
    width: px2rem(414);
    height: px2rem(352);
    margin-top: px2rem(152);
  }
  .addparientA{display:inline-block;background:#fff;margin-top:px2rem(20);height:px2rem(100);width:100%;border-top:1px solid #d9d9d9;}
  .addparientA span{font-size:$fontNavm;color:$font999;line-height:px2rem(100);}
  .addparientA span.newicon{display:inline-block;height:px2rem(100);color:#4285f4;text-indent:px2rem(90);background:url(../../assets/add_icon.png) no-repeat px2rem(30) px2rem(30);background-size:px2rem(40) px2rem(40);}

  .addparientP{
    margin:px2rem(80) auto;
    color: $font999 ;
    font-size:$fontNavm;line-height:px2rem(32);
    text-align:center;
  }
  .parientList{width:100%;height:auto;}
  .parientList .parientBox{float: left;width:px2rem(690);padding:px2rem(30);background:#fff;border-top:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;margin-top:px2rem(20);}
  .parientBox img{width:px2rem(140);height:px2rem(140);border-radius:px2rem(8);float:left;}
  .parientBox .parientBoxP{display:inline-block;margin-left:px2rem(20);float: left;width:px2rem(500);}
  .parientBoxP p{font-size:$fontSmall;color:$font666;line-height:px2rem(40);}
  .parientBoxP p.p1{font-size:$fontNavm;color:$font333;line-height:px2rem(60);}
  .parientBoxP p.p1 span{font-size:px2rem(30);color:$font666;}
  .parientBoxP p.p1 i{display:inline-block;padding:0 px2rem(18);font-size:px2rem(18);line-height:px2rem(30);color:$fontfff;
    font-style: normal;border-radius:px2rem(15);background:#7E9FEC;}
  .parientBox .rightIcon{display:inline-block;width:px2rem(24);height:px2rem(140);
    background:url("../../assets/go.png") no-repeat center center;background-size:px2rem(24) px2rem(46);flaot: right;}


</style>
