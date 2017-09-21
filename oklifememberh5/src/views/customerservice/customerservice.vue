<template>
  <div class="imAllContain">
    <div class="chatmain">
      <div class="m-message">
        <div class="chatmain_ul">
          <div class="chatmain_li" v-for="(item,index) in curMsgList" :key="index">
            <!--左边-->
            <div class="chatmain_left" v-if="item.msgFrom != easemobAccount">
              <div class="msgtimecontain">
                <span class="msgtime">{{item.msgTime == null ?'':item.msgTime | formatTime}}</span>
              </div>
              <div class="avatar_text">
                <img class="doctor" src="../../assets/doctorAvatar.png">
                <div class="text_left_contain">
                  <i class="left_sanjiao"></i>
                  <span class="text_left" v-html="item.msgContent"></span>
                </div>
              </div>
              <div style="clear:both"></div>
            </div>
            <!--右边-->
            <div class="chatmain_right" v-if="item.msgFrom == easemobAccount">
              <div class="msgtimecontain">
                <span class="msgtime">{{item.msgTime == null ?'':item.msgTime | formatTime}}</span>
              </div>
              <div class="avatar_text">
                <img class="self" :src="userAvatar" onerror="this.src='./img/user.png';this.onerror=null">
                <div class="text_right_contain">
                  <span class="text_right" v-html="item.msgContent"></span>
                  <i class="right_sanjiao"></i>
                </div>
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer_header">
        <div class="voice_text_switch" @click="voice_text_show=!voice_text_show;showfacebox=false;showmorebox=false">
          <i class="voice_button" v-show="voice_text_show"></i>
          <i class="text_button" v-show="!voice_text_show"></i>
        </div>
        <div contenteditable="true" class="input_text" v-show="voice_text_show"></div>
        <div @touchstart="touchshow=!touchshow" @touchend="touchshow=!touchshow">
          <div class="input_voice" v-show="!voice_text_show && touchshow">按住 说话</div>
          <div class="input_voice" v-show="!voice_text_show && !touchshow">松开 发送</div>
        </div>
        <i class="emotion_botton" @click="showfacebox=!showfacebox;showmorebox=false;voice_text_show=true"></i>
        <i class="more_botton" @click="showmorebox=!showmorebox;showfacebox=false;voice_text_show=true"></i>
        <i class="send">发送</i>
      </div>
      <transition name="togglefacebox">
        <div class="face_box" v-show="showfacebox">
          <mt-swipe :auto="0">
            <mt-swipe-item>
              <ul>
                <li v-for="(item,index) in emotionMap" v-if="index<26"><img :id="item.key" :src="item.val"></li>
                <li class="deleteEmotion"><img src="../../assets/deleteEmotion.png" alt=""></li>
              </ul>
            </mt-swipe-item>
            <mt-swipe-item>
              <ul>
                <li v-for="(item,index) in emotionMap" v-if="index>=26"><img :id="item.key" :src="item.val"></li>
                <li class="deleteEmotion"><img src="../../assets/deleteEmotion.png" alt=""></li>
              </ul>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </transition>
      <transition name="togglemorebox">
        <div class="more_box" v-show="showmorebox">
          <div class="more_box_item">
            <i class="selectphpto"></i>
            <span class="more_box_text">相册</span>
          </div>
          <div class="more_box_item">
            <i class="camera"></i>
            <span class="more_box_text">拍摄</span>
          </div>
        </div>
      </transition>
    </footer>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import constants from '../../commonutils/constants'
  import myWebImUtil from '../../commonutils/myWebImUtil'
  import { mapState,mapGetters } from 'vuex'
  let conn,_this
  export default {
    name: '',
    data() {
      return {
        voice_text_show:true,
        touchshow:true,
        showfacebox:false,
        showmorebox:false,
        emotionMap:[],
        from:'',
        sendTo:'',
        curMsgList: [
          {
            msgTime:'1502354167',
            msgFrom:'hh',
            msgContent:'你好啊，请问有什么需要咨询的？'
          },
          {
            msgTime:'1502354474',
            msgFrom:'hh1',
            msgContent:'我失恋了，怎么才能治疗失恋呢？'
          },
          {
            msgTime:'1502359474',
            msgFrom:'hh',
            msgContent:'您可以留下电话吗？方面我们更快的了解您的失恋情况，以便给您做出感情弥补？'
          },
          {
            msgTime:'1502399474',
            msgFrom:'hh1',
            msgContent:'好的'
          },
          {
            msgTime:'1502399474',
            msgFrom:'hh1',
            msgContent:'15322335252'
          },
          {
            msgTime:'1502399474',
            msgFrom:'hh',
            msgContent:'好的，已经收到您的电话号码'
          },
          {
            msgTime:'1502399474',
            msgFrom:'hh1',
            msgContent:'一会儿给您打过去'
          }
        ],
        oldMsgList: [],
      }
    },
    computed: {
      ...mapState({
        userId:state => state.common.loginInfo.userId,
        loginAccount:state => state.common.loginInfo.loginAccount,
        easemobAccount: state => state.common.loginInfo.easemobAccount,
        easemobPassword:state => state.common.loginInfo.easemobPassword,
      }),
      userAvatar(){
        return (this.$store.state.userinfo.userinfo.avatar==''|| this.$store.state.userinfo.userinfo.avatar==null || !this.$store.state.userinfo.userinfo.avatar)?'./img/user.png':this.$store.state.userinfo.userinfo.avatar
      },

    },
    watch: {},
    beforeRouteEnter(to, from, next) {
      next()
    },
    mounted() {
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '咨询详情' // 标题
      });
      this.$nextTick(()=>{
        this.initChat()
        this.initEmotions()
      })
    },
    destroyed() {
      //
    },
    methods: {
      //加载表情
      loadEmotions() {
        WebIM.Emoji = {
          path: constants.PATH_EMOTION, /*表情包路径*/
          map: {
            '[):]': 'ee_1.png',
            '[:D]': 'ee_2.png',
            '[;)]': 'ee_3.png',
            '[:-o]': 'ee_4.png',
            '[:p]': 'ee_5.png',
            '[(H)]': 'ee_6.png',
            '[:@]': 'ee_7.png',
            '[:s]': 'ee_8.png',
            '[:$]': 'ee_9.png',
            '[:(]': 'ee_10.png',
            '[:\'(]': 'ee_11.png',
            '[:|]': 'ee_12.png',
            '[(a)]': 'ee_13.png',
            '[8o|]': 'ee_14.png',
            '[8-|]': 'ee_15.png',
            '[+o(]': 'ee_16.png',
            '[<o)]': 'ee_17.png',
            '[|-)]': 'ee_18.png',
            '[*-)]': 'ee_19.png',
            '[:-#]': 'ee_20.png',
            '[:-*]': 'ee_21.png',
            '[^o)]': 'ee_22.png',
            '[8-)]': 'ee_23.png',
            '[(|)]': 'ee_24.png',
            '[(u)]': 'ee_25.png',
            '[(S)]': 'ee_26.png',
            '[(*)]': 'ee_27.png',
            '[(#)]': 'ee_28.png',
            '[(R)]': 'ee_29.png',
            '[({)]': 'ee_30.png',
            '[(})]': 'ee_31.png',
            '[(k)]': 'ee_32.png',
            '[(F)]': 'ee_33.png',
            '[(W)]': 'ee_34.png',
            '[(D)]': 'ee_35.png'
          }
        }
        return WebIM.Emoji
      },
      //初始化表情
      initEmotions(){
        this.emotion = this.loadEmotions()
        let maps = this.emotion.map
        let emotionMap = []
        for (let i in maps) {
          emotionMap.push({key: i, val: require('../../../static/img/faces/' + maps[i])})
        }
        this.emotionMap = emotionMap
        console.log( this.emotionMap)
      },
      //环信初始化
      initChat() {
        //创建一个新的连接
        conn = new WebIM.connection({
          https: WebIM.config.https,
          url: WebIM.config.xmppURL,
          isAutoLogin: WebIM.config.isAutoLogin,
          isMultiLoginSessions: WebIM.config.isMultiLoginSessions
        })
        //环信登录
        this.login()
        conn.listen({
          //当连接成功时(登录成功后)的回调方法
          onOpened: function () {
            this.curUserId = conn.context.userId.toLowerCase()
            console.log('当前登录用户: ' + this.curUserId)
          },
          //当连接关闭时的回调方法
          onClosed: function () {
            this.login()
          },
          //收到文本消息时的回调方法
          onTextMessage: function (message) {
            m.handleTextMessage(message)
          },
          //收到表情消息时的回调方法
          onEmojiMessage: function (message) {
            m.handleEmoji(message)
          },
          //收到图片消息时的回调方法
          onPictureMessage: function (message) {
            m.handlePictureMessage(message)
          },
          //收到指令消息时的回调方法
          onCmdMessage: function (message) {
          },
          //收到音频消息时的回调方法
          onAudioMessage: function (message) {
            m.handleAudioMessage(message)
          },
          //收到视频消息
          onVideoMessage: function (message) {
          },
          //本机网络连接成功
          onOnline: function () {
          },
          //本机网络掉线的回调方法
          onOffline: function () {
            this.login()
          },
          //异常时的回调方法
          onError: function (message) {
            this.login()
          }
        })
      },
      //环信登录
      login(){
        var user = this.easemobAccount
        var pass = this.easemobPassword
        conn.open({
          apiUrl: WebIM.config.apiURL,
          user: user,
          pwd: pass,
          appKey: WebIM.config.appkey
        })
        console.log('已登录：'+user)
      },
    },
    components: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .imAllContain {
    /*margin-top: px2rem(88);*/;
    height: 100%;
    padding-bottom: px2rem(150);
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

  .footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left:0;
  }
  .footer_header {
    display: block;
    min-height:px2rem(100);
    line-height: px2rem(100);
    background-color: $spackbg;
    width: 100%;
    position: relative;
    left:0;
    bottom: 0;
    border-top: px2rem(1) solid #D9D9D9;
    border-bottom: px2rem(1) solid #D9D9D9;
  .voice_text_switch{
    display: inline-block;
    height:px2rem(54);
    width:px2rem(54);
    line-height: px2rem(54);
    position: absolute;
    bottom: px2rem(22);
    left:px2rem(20);
  .voice_button{
    display: inline-block;
    width: px2rem(54);
    height: px2rem(54);
    background-image: url("../../assets/voice_message.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .text_button{
    display: inline-block;
    width: px2rem(54);
    height: px2rem(54);
    background-image: url("../../assets/textbotton.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  }
  .input_text{
    display: inline-block;
    outline: none;
    background: #fcfcfc;
    border-radius: px2rem(16);
    border:px2rem(1) solid #cbcbcd;
    width: px2rem(330);
    min-height: px2rem(72);
    line-height: px2rem(72);
    position: relative;
    bottom:px2rem(5);
    left:px2rem(94);
    padding-left: px2rem(10);
    padding-right: px2rem(10);
    font-size: px2rem(26);
    color: #333333;
    margin-top: px2rem(15);
  }
  .input_voice{
    display: inline-block;
    outline: none;
    background: #c6c7ca;
    border-radius: px2rem(16);
    border:px2rem(1) solid #cbcbcd;
    width: px2rem(330);
    min-height: px2rem(72);
    line-height: px2rem(72);
    position: relative;
    bottom:px2rem(5);
    left:px2rem(94);
    padding-left: px2rem(10);
    padding-right: px2rem(10);
    font-size: px2rem(32);
    color: #333333;
    margin-top: px2rem(15);
    text-align: center;
  }
  .emotion_botton{
    display: inline-block;
    width: px2rem(54);
    height: px2rem(54);
    background-image: url("../../assets/emoji_ stickers.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    bottom: px2rem(22);
    right:px2rem(234);
  }
  .more_botton{
    display: inline-block;
    width: px2rem(54);
    height: px2rem(54);
    background-image: url("../../assets/more_button.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    bottom: px2rem(22);
    right:px2rem(160);
  }
  .send{
    width: px2rem(120);
    height: px2rem(72);
    line-height: px2rem(72);
    text-align: center;
    display: inline-block;
    background-color:$mainC;
    color: #ffffff;
    border: none;
    position: absolute;
    bottom: px2rem(14);
    right:px2rem(20);
    border-radius: px2rem(8);
    font-size: px2rem(32);
  }
  }
  .face_box{
    width: 100%;
    height: px2rem(324);
    background: #f5f5f6;
    border-bottom: px2rem(1) solid #D9D9D9;
    padding: px2rem(44) px2rem(48) px2rem(10) px2rem(48);
    box-sizing: border-box;

  ul {
    overflow: hidden;
    list-style: none;
  }

  ul li {
    float: left;
    width: px2rem(44);
    margin-right:px2rem(28);
    margin-bottom: px2rem(40);
    text-align: center;
  }
  ul li.deleteEmotion{
    float: left;
    margin-right:px2rem(28);
    margin-bottom: px2rem(40);
    text-align: center;
  }
  ul li img {
    height: px2rem(44);
  }
  }
  .more_box{
    width: 100%;
    height: px2rem(212);
    padding: px2rem(24) px2rem(30);
    background-color: $bColor;
    line-height:px2rem(212) ;
    box-sizing: border-box;
  .more_box_item{
    display: inline-block;
    box-sizing: border-box;
    width: px2rem(128);
    height: px2rem(702);
    margin-right:px2rem(20);
  .selectphpto{
    display:block;
    width: px2rem(128);
    height: px2rem(128);
    margin-right:px2rem(30);
    margin-bottom: px2rem(10);
    background-image: url("../../assets/Album.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .more_box_text{
    display: block;
    width:px2rem(52);
    height: px2rem(26);
    line-height: px2rem(26);
    font-size: px2rem(26);
    margin: auto;
  }
  .camera{
    display:block;
    width: px2rem(128);
    height: px2rem(128);
    margin-right:px2rem(30);
    margin-bottom: px2rem(10);
    background-image: url("../../assets/Album.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  }
  },
  .togglemorebox-enter-active{
    transition:all .3s ease;
    height:px2rem(212);
  }
  .togglemorebox-leave-active{
    transition:all .15s ease;
    height:0;
    opacity: 0;
  }
  .togglemorebox-leave{
    opacity: 1;
    height:px2rem(212);
  }
  .togglemorebox-enter{
    opacity:0;
    height: 0;
  }
  .togglefacebox-enter-active{
    transition:all .3s ease;
    height:px2rem(324);
  }
  .togglefacebox-leave-active{
    transition:all .15s ease;
    height:0;
    opacity: 0;
  }
  .togglefacebox-leave{
    opacity: 1;
    height:px2rem(324);
  }
  .togglefacebox-enter{
    opacity:0;
    height: 0;
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
