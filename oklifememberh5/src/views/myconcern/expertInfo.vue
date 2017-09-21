<template>
<div :class="{'margin-topfu128':isShowAppHeader,'margin-topfu88':!isShowAppHeader}">
  <div class="headerBg">
    <div class="headerTool" :class="{'paddingTop40':isShowAppHeader}">
      <a class="goback" @click="goback"></a>
      <em>专家主页</em>
      <span v-if="datas.follow==0" @click="concern">关注</span>
      <span v-if="datas.follow!=0" @click="noconcern">取消关注</span>
    </div>
    <div class="expertTitle">
      <div class="round">
        <div class="round2">
          <img :src="datas.headPath==null?(datas.sex==1?'./img/man.png':'./img/woman.png'):datas.headPath" onerror="this.src='./img/doctorAvatar.png';this.onerror=null"/>
        </div>
      </div>
      <p>{{datas.givenName}}<br /><span>{{datas.title}}</span></p>
    </div>
    <p class="headerHospital">{{datas.hospital==undefined?null:datas.hospital.hospName}}<span>{{datas.hospital==undefined?null:datas.hospital.hospLevelId | getLevel}}</span></p>
  </div>
  <div class="infobox">
    <h4 class="goodatIcon">擅长疾病</h4>
    <p>{{datas.goodAt}}</p>
  </div>
  <div class="infobox">
    <h4 class="introductionIcon">个人简介</h4>
    <p>{{datas.brief}}</p>
  </div>
  <div class="infobox">
    <h4 class="dutiesIcon">社会职务</h4>
    <p>{{datas.job}}</p>
  </div>
  <div class="infobox">
    <h4 class="educationIcon">学历信息</h4>
    <p>{{datas.eduExp}}</p>
  </div>
  <div class="btnBox">
    <oklife-button @click="submit" height="2.347rem" width="18.2rem" color="#4776e5">我要看病</oklife-button>
  </div>
</div>
</template>

<script>
  import api from '../../server/api'
  import oklifeButton from '../../../src/components/button'
  import {Toast} from 'mint-ui'
    export default {
        name: '',
        data () {
            return {
              attention:true,
              attentionVisition:false,
              datas:[],
              isShowAppHeader:''
            }
        },
        computed: {
          specId(){
            return this.$route.params.id
          },
          userId(){
            return this.$store.state.common.loginInfo.userId
          }
        },
        watch: {},
        mounted () {
          let _this=this
          if ('app' == window.Browser_Environment_Oklife) {
            _this.isShowAppHeader = true
          }else if('wx' == window.Browser_Environment_Oklife){
            _this.isShowAppHeader = false
          }else {
            _this.isShowAppHeader = true
          }
          document.getElementsByClassName('selectbutton')[0].style.display='none'
          this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
            isshow:false,//是否显示头部
            isBack: false,  // 是否显示返回
            isShare: false, // 是否显示分享
            sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
            isSkip: false,//是否显示跳过
            skipto: '',//点跳过后到哪个路由页面
            title: '我的关注' // 标题
          });

          api.speciaInfo({params:{"specId":this.specId,"userId":this.userId}}).then(response => {
              if(response.code==0){
                this.datas=response.data;
              }else{
                Toast({
                  message: '网络异常，请稍后再试',
                  position: 'center',
                  duration: 2000
                });
              }
          });
        },
        beforeRouteEnter(to, from, next){
            next ()
        },
        methods: {
          submit: function () {

          },
          //添加关注
          concern(){
            api.insertFollowSpec({params:{"userId":this.userId,"specId":this.specId}}).then(response => {
                if(response==undefined){
                  Toast({
                    message: '网络异常，请稍后再试',
                    position: 'center',
                    duration: 2000
                  });
                }else if(0==response.code){
                  api.speciaInfo({params:{"specId":this.specId,"userId":this.userId}}).then(response => {
                    if(response.code==0){
                      this.datas=response.data;
                    }else{
                      Toast({
                        message: '网络异常，请稍后再试',
                        position: 'center',
                        duration: 2000
                      });
                    }
                  });
                }
            })
          },
          //取消关注
          noconcern(){
            api.deleteFollowSpec({params:{"userId":this.userId,"specId":this.specId}}).then(response => {
              if(response==undefined){
                Toast({
                  message: '网络异常，请稍后再试',
                  position: 'center',
                  duration: 2000
                });
              }else if(0==response.code){
                api.speciaInfo({params:{"specId":this.specId,"userId":this.userId}}).then(response => {
                  if(response.code==0){
                    this.datas=response.data;
                  }else{
                    Toast({
                      message: '网络异常，请稍后再试',
                      position: 'center',
                      duration: 2000
                    });
                  }
                });
              }
            })
          },
          goback(){
            this.$router.go(-1);
          },
        },
        components: {
          oklifeButton,Toast
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .margin-topfu88 {
    margin-top: px2rem(-88);
  }

  .margin-topfu128 {
    margin-top: px2rem(-128);
  }
  .headerBg{position:relative;color:$fontfff;text-align:center;width:px2rem(690);padding:0 px2rem(30);height:px2rem(460);background:url("../../assets/expertInfoBg.jpg") no-repeat center center;}
  .headerTool{width:100%;height:px2rem(70);line-height:px2rem(70);position:relative;}
  .paddingTop40{
    padding-top: px2rem(40)
  }
  .headerTool em{font-weight:normal;position:absolute;left:px2rem(270);}

  .headerTool a.goback{display:inline-block;width:px2rem(26);height:px2rem(44);float: left;margin-top:px2rem(10);background:url("../../assets/back_fff.png") no-repeat 0 center;background-size:px2rem(26);}
  .headerTool span{font-size:px2rem(28);color:$fontfff;float: right;}
  .expertTitle{position:relative;top:px2rem(30);left:0;width:100%;height:px2rem(300);}
  .expertTitle .round{
    position:absolute;
    top:0;
    left:px2rem(240);
    background:rgba(255,255,255,0.2);
    width:px2rem(210);height:px2rem(210);
    border-radius:50%;
  }
  .expertTitle .round2{
    position:absolute;
    top:px2rem(15);
    left:px2rem(15);
    background:rgba(255,255,255,0.3);
    width:px2rem(180);height:px2rem(180);
    border-radius:50%;
  }
  .expertTitle img{
    position:absolute;
    top:px2rem(15);
    left:px2rem(15);
    width:px2rem(150);height:px2rem(150);
    border-radius:50%;
  }
  .expertTitle p{position:absolute;bottom:0;text-align:center;width:100%;font-size:px2rem(36);line-height:px2rem(40);}
  .expertTitle p span{font-size:px2rem(28);}
  .headerBg p.headerHospital{line-height:px2rem(48);
    font-size:px2rem(30);
    position:absolute;
    bottom:px2rem(10);
    left:0;
    width:px2rem(690);
    padding:0 px2rem(30);
    text-align: left;
  }
  p.headerHospital span{display:inline-block;
    width:px2rem(140);height:px2rem(46);border:1px solid #fff;
    border-radius:px2rem(24);float: right;text-align:center;
  }
  .infobox{margin-top:px2rem(20);width:px2rem(720);padding-left:px2rem(30);height:auto;background:#fff;
    border-top:1px solid #d9d9d9;
    border-bottom:1px solid #d9d9d9;}
  .infobox h4{with:100%;border-bottom:1px solid #d9d9d9;line-height:px2rem(100);
  font-weight:normal;
  font-size:px2rem(32);color:$font333;
    text-indent: px2rem(52);
  }
  .infobox p{width:px2rem(690);margin:px2rem(20) 0;line-height:px2rem(40);font-size:px2rem(30);color:$font666;}
  .infobox h4.goodatIcon{background:url(../../assets/goodatIcon.png) no-repeat 0 center;background-size:px2rem(32);}
  .infobox h4.introductionIcon{background:url(../../assets/introductionIcon.png) no-repeat 0 center;background-size:px2rem(32);}
  .infobox h4.dutiesIcon{background:url(../../assets/dutiesIcon.png) no-repeat 0 center;background-size:px2rem(32);}
  .infobox h4.educationIcon{background:url(../../assets/educationIcon.png) no-repeat 0 center;background-size:px2rem(32);}
.btnBox{margin:px2rem(50) 0;}

</style>
