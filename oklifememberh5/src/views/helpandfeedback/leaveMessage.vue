<template>
  <div class="imAllContain">
    <div class="chatmain">
      <div class="m-message" ref="messageScrollContain">
        <div class="chatmain_ul">
          <div class="chatmain_li" v-for="(item,index) in curMsgList.fBRdList" :key="index">
            <!--左边-->
            <div class="chatmain_left" v-if="item.senderType != 1">
              <div class="msgtimecontain">
                <span class="msgtime">{{item.sendTime == null ?'':item.sendTime | getTimeStamp}}</span>
              </div>
              <div class="avatar_text">
                <img class="doctor" src="../../assets/doctorAvatar.png">
                <div class="text_left_contain">
                  <i class="left_sanjiao"></i>
                  <span class="text_left" v-html="item.content"></span>
                  <div class="imgBox">
                    <img v-for="attachList in item.attachList" :src="attachList.filePath"/>
                  </div>
                </div>
              </div>
              <div style="clear:both"></div>
            </div>
            <!--右边-->
            <div class="chatmain_right" v-if="item.senderType == 1">
              <div class="msgtimecontain">
                <span class="msgtime">{{item.sendTime == null ?'':item.sendTime | getTimeStamp}}</span>
              </div>
              <div class="avatar_text">
                <img class="self" :src="userAvatar" onerror="this.src='./img/user.png';this.onerror=null">
                <div class="text_right_contain">
                  <span class="text_left" v-html="item.content"></span>
                  <div class="imgBox">
                    <img v-for="attachList in item.attachList" :src="attachList.filePath" onerror="this.src='./img/picture.png';this.onerror=null"/>
                  </div>
                  <i class="right_sanjiao"></i>
                </div>
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="ended" v-if="curMsgList.status==3">--------- {{curMsgList.lastTalkDate|getTimeStamp}} 已解决 ----------</p>
    <footer class="footer" v-if="curMsgList.status!=3">
      <a class="asked" @click="asked">追问</a>
      <a class="endAsk" @click="endAsk">结束咨询</a>
    </footer>
  </div>
</template>

<script>
  import api from '../../server/api'
  import { Swipe, SwipeItem } from 'mint-ui';
  import constants from '../../commonutils/constants'
  import myWebImUtil from '../../commonutils/myWebImUtil'
  import { mapState,mapGetters } from 'vuex'
  export default {
    name: '',
    data() {
      return {
        from:'',//消息来自于哪里
        curMsgList: {},
      }
    },
    computed: {
      problemId(){
          return this.$route.params.problemId
      },
      userAvatar(){
        return (this.$store.state.userinfo.userinfo.avatar==''|| this.$store.state.userinfo.userinfo.avatar==null || !this.$store.state.userinfo.userinfo.avatar)?'./img/user.png':this.$store.state.userinfo.userinfo.avatar
      },
    },
    watch: {},
    beforeRouteEnter(to, from, next) {
      next()
    },
    mounted() {
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow: true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '意见反馈' // 标题
      });
      api.feedBackRdList({params:{problemId:this.problemId}}).then(res=>{
        if(res==undefined){
          return false
        }else if(res.code==0){
          this.curMsgList=res.data

          console.log(this.curMsgList)
          console.log(this.problemId)
        }
      })
    },
    destroyed() {
      //
    },
    methods: {
        asked(){
            this.$store.commit('feedback/changefeedback',{problemId:this.problemId})
          this.$router.push({name:'subminfeedback'})
        },
      endAsk(){
            api.endfeedBack({params:{problemId:this.problemId}}).then(res=>{
              if(res==undefined){
                return false
              }else if(res.code==0){
                this.curMsgList=res.data
                this.$store.dispatch('feedback/revertState');
                this.$router.push({name:'myFeedback'})
              }
            })

      }
    },
    components: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .imAllContain {
    /*margin-top: px2rem(88);*/;
    height: 100%;
    padding-bottom: px2rem(180);
    box-sizing: border-box;
  }
  .chatmain{
    position: relative;
    overflow: hidden;
    height: 100%;
    margin-bottom: px2rem(30);
    .m-message {
      height: 100%;
      padding: 0px 10px 15px;
      overflow-y: scroll;
    }
    .chatmain_ul{
      width: 100%;
      min-height:100%;
      .chatmain_li{
        margin-bottom:px2rem(60);
      }
      .msgtimecontain{
        margin: auto;
        text-align: center;
        margin-bottom: px2rem(40);
        .msgtime{
          background-color: #cfcfcf;
          border-radius: px2rem(8);
          height: px2rem(40);
          line-height: px2rem(40);
          padding-left:px2rem(10);
          padding-right:px2rem(10);
          color: #ffffff;
          font-size:px2rem(24);
        }
      }
      .chatmain_left{
        text-align: left;
        width:100%;
        height: auto;
        .avatar_text{
          float: left;
        }
        .doctor{
          float: left;
          width: px2rem(80);
          height: px2rem(80);
          margin-right: px2rem(20);
        }
        .text_left_contain{
          max-width: px2rem(420);
          float: left;
          position: relative;
          box-sizing: border-box;
          display: inline-block;
          background-color: #fcfcfc;
          padding: px2rem(17) px2rem(15) px2rem(17) px2rem(20);
          color: #333333;
          font-size: px2rem(32);
          border-radius: px2rem(8);
          .left_sanjiao{
            width: 0;
            height: 0;
            border-left: px2rem(20) solid transparent;
            border-right: px2rem(20) solid transparent;
            border-top: px2rem(20) solid #fcfcfc;
            border-bottom: px2rem(20) solid transparent;
            position: absolute;
            left:px2rem(-14);
            top:0;
          }
        }
      }
      .chatmain_right{
        text-align: right;
        height: auto;
        width:100%;
        .avatar_text{
          float: right;
        }
        .self{
          float: right;
          width: px2rem(80);
          height: px2rem(80);
          margin-left: px2rem(20);
        }
        .text_right_contain{
          float: right;
          max-width: px2rem(420);
          text-align: left;
          position: relative;
          box-sizing: border-box;
          display: inline-block;
          background-color: #4385f5;
          padding: px2rem(17) px2rem(15) px2rem(17) px2rem(20);
          color: #ffffff;
          font-size: px2rem(32);
          border-radius: px2rem(8);
        .right_sanjiao{
          width: 0;
          height: 0;
          border-left: px2rem(20) solid transparent;
          border-right: px2rem(20) solid transparent;
          border-top: px2rem(20) solid #4385f5;
          border-bottom: px2rem(20) solid transparent;
          position: absolute;
          right:px2rem(-14);
          top:0;
        }
        }
      }
    }
  }
  .imgBox{width:100%;}
  .imgBox img{width: px2rem(120);
    height: px2rem(120);float:left;margin-right:px2rem(10);margin-top:px2rem(10);}
  .imgBox img:nth-child(3n){margin-right:0;}
  .ended{
     width: 100%;
     position: fixed;
     bottom: 0;
     left:0;
     text-align:center;background:#EFEFF4;color:$font999;font-size:px2rem(26);line-height:px2rem(100);}
  .footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left:0;
    text-align:center;background:#4285f4;
    .asked{
      float:left;
      display:inline-block;
      background:#EFEFF4;
      width:px2rem(370);
      height:px2rem(98);
      border:px2rem(1) solid #4285f4;
      color:#4285f4;
      line-height:px2rem(98);
    }
    .endAsk{
      float:left;
      display:inline-block;
      width:px2rem(370);
      height:px2rem(98);
      border:px2rem(1) solid #4285f4;
      color:#fff;
      line-height:px2rem(98);
    }
  }
</style>
<style lang="scss">
  .imAllContain .face_box .mint-swipe-indicators {
    position: absolute;
    left:50%;
    bottom: 0%;
    z-index: 888;
  }
  .imAllContain .mint-swipe-indicator.is-active{
    display: inline-block;
    width: 8px;
    height: 8px;
    opacity: 0.3;
    background: #333333;
  }
  .imAllContain .mint-swipe-indicator{
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #999999;
  }
</style>
