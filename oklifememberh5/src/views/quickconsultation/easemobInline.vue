<template>
  <div class="imAllContain" :class="{'imAllContain_small':issmall}">
    <div class="chatmain">
      <div class="m-message" ref="messageScrollContain">
        <div class="chatmain_ul">
          <div class="chatmain_li" v-for="(item,index) in curMsgList" :key="index">

            <!--消息类型提醒-->
            <div class="msgtimecontain" v-if="item.ext.subtype==1">
              <span class="msgtime" >{{item.ext.buzzData.Prompt}}</span>
            </div>

            <!--平台医生发送的结束卡片-->
            <div class="oklife_end" v-if="item.ext.subtype==14 && isshowEndCard" @click="chatClose">
              <span>您的问题已解决，请结束</span>
              <i class="endpic"></i>
            </div>

            <!--左边-->
            <div class="chatmain_left" v-if="(item.msgFrom != myEasemobAccount) && item.ext.subtype!=='1' && item.ext.subtype!=='14'">
              <div class="msgtimecontain" v-if="item.isshowTime">
                <span class="msgtime" >{{item.msgTime == null ?'':item.msgTime | oklifeFormatTime}}</span>
              </div>
              <div class="avatar_text">
                <img class="doctor" src="../../assets/doctorAvatar.png">
                <div class="text_left_contain">
                  <i class="left_sanjiao"></i>

                  <!--平台医生发送的所有入口卡片-->
                  <div class="text_left">
                    <router-link :to="{name:item.ext.buzzData.cardroutername}">
                      <div class="oklife_rukou" v-if="item.ext.subtype!=1 && item.ext.subtype!=2 && item.ext.subtype!=14">
                        <p class="rukouTitle">{{item.ext.buzzData.cardname}}</p>
                        <div class="rukouSummary">{{item.ext.buzzData.carddescribe}}</div>
                        <img class="rukouPic" :src="item.ext.buzzData.cardpic" onerror="this.src='./img/rukou.png';this.onerror=null"/>
                      </div>
                    </router-link>
                  </div>

                  <div class="text_left" v-html="item.msgContent"></div>
                </div>
              </div>
              <div style="clear:both"></div>
            </div>
            <!--右边-->
            <div class="chatmain_right" v-if="(item.msgFrom == myEasemobAccount) && item.ext.subtype!=='1'">
              <div class="msgtimecontain" v-if="item.isshowTime">
                <span class="msgtime">{{item.msgTime == null ?'':item.msgTime | oklifeFormatTime}}</span>
              </div>
              <div class="avatar_text">
                <img class="self" :src="userAvatar" onerror="this.src='./img/user.png';this.onerror=null">
                <div class="text_right_contain">
                  <!--用户发快速提问详情及填写基本信息卡片-->
                  <div class="text_right"  v-if="item.ext.subtype==2">
                    <router-link :to="{name:'questionInfo'}">
                      <div class="easemobinlin_detailBaseinfo"><p><span
                        class="patientName">{{item.ext.buzzData.username}}&nbsp;</span><span class="patientSex">&nbsp;{{item.ext.buzzData.sex}}&nbsp;</span><span
                        class="patientAge">&nbsp;{{item.ext.buzzData.age}}岁&nbsp;</span></p>
                        <p class="descDetail">{{item.ext.buzzData.desc}}</p></div>
                    </router-link>
                    <router-link :to="{name:'baseInfo'}">
                      <span class="easemobinlin_inputbaseinfo">填写基本信息</span><i
                      class="easemobinlin_baseRighticon"></i>
                    </router-link>
                  </div>

                  <div class="text_right" v-html="item.msgContent"></div>
                  <i class="right_sanjiao"></i>
                </div>
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="footerTogger">
      <div>
        <footer v-show="isshowfooter" class="footer">
          <div class="footer_header">
            <div class="voice_text_switch" @click.stop="voiceTextBut">
              <i class="voice_button" v-show="voice_text_show"></i>
              <i class="text_button" v-show="!voice_text_show"></i>
            </div>
            <div contenteditable="true" class="input_text" v-show="voice_text_show" ref="inputText"></div>
            <div @touchstart.stop.prevent="pressDownStartVoice($event)" @touchend.stop.prevent="pressUpStopVoice($event)" style="user-select:none;">
              <div class="input_voice" v-show="!voice_text_show && touchshow" style="user-select:none;">按住 说话</div>
              <div class="input_voice" v-show="!voice_text_show && !touchshow" style="user-select:none;">松开 发送</div>
            </div>
            <i class="emotion_botton" @click.stop="emotionBut"></i>
            <i class="more_botton" @click.stop="moreBut"></i>
            <i class="send" @click="sendMessage">发送</i>
          </div>
          <transition name="togglefacebox">
            <div class="face_box" v-show="showfacebox">
              <mt-swipe :auto="0">
                <mt-swipe-item>
                  <ul>
                    <li v-for="(item,index) in emotionMap" v-if="index<26"><img :id="item.key" :src="item.val" @click.stop="selectEmotion($event)"></li>
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
              <div class="more_box_item" @click="addpicByAlbum">
                <i class="selectphpto"></i>
                <span class="more_box_text">相册</span>
              </div>
              <div class="more_box_item" @click="addpicByCamera">
                <i class="camera"></i>
                <span class="more_box_text">拍摄</span>
              </div>
            </div>
          </transition>
        </footer>
        <div  v-show="!isshowfooter"class="againAskAndComment">
          <span class="againAsk" @click="againAsk">再次提问</span>
          <span class="comment" @click="comment">待评价</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Swipe, SwipeItem,Toast } from 'mint-ui';
  import constants from '../../commonutils/constants'
  import myWebImUtil from '../../commonutils/myWebImUtil'
  import { mapState,mapGetters } from 'vuex'
  import api from '../../server/api'
  import wechatUtils from '../../commonutils/wechatUtils'
  const wx=require('weixin-js-sdk')
  let conn,_this
  export default {
    name: '',
    data() {
      return {
        isshowEndCard:true,//结束卡片是否显示
        isshowfooter:true,//底部输入回话是否显示，结束咨询后就不显示
        issmall:false,//键盘或者盒子显示的时候，需要把对话窗口高度变小
        voice_text_show:true,//录音及输入切换
        touchshow:true,//按住说话和松开发送切换
        showfacebox:false,//是否显示消息盒子
        showmorebox:false,//是否显示更多盒子
        emotionMap:[],//表情数组
        from:'',//消息来自于哪里
        sendTo:'',//消息发送给谁

        startVoice:'',//开始录音时间
        endVoice:'',//结束录音时间
        recordTimer:'',//录音延迟开始的setTimeou

        curMsgList: [],//当前消息列表
        curMsgId:'',//当前接收到的最新消息的ID
        oldMsgList: [],//消息记录列表
      }
    },
    computed: {
      ...mapState({
        userId:state => state.common.loginInfo.userId,
        loginAccount:state => state.common.loginInfo.loginAccount,
        myEasemobAccount: state => state.common.loginInfo.easemobAccount,
        myEasemobPassword:state => state.common.loginInfo.easemobPassword,

        appId:state => state.quickconsultation.quickconsultation.appId,//申请快速问答成功后返回的appId
        custId: state => state.quickconsultation.quickconsultation.custId,//平台医生ID（客服ID）
        doctorEasemobAccount: state => state.quickconsultation.quickconsultation.doctorEasemobAccount,//平台医生环信账号（客服环信账号）
        isDefaultAccount: state => state.quickconsultation.quickconsultation.isDefaultAccount,//是否默认环信账号（0：否，1：是） - length:4 ,
        isWorkTime: state => state.quickconsultation.quickconsultation.isWorkTime,//是否上班时间范围内 （0：否，1：是）- length:4 ,
        taskCode: state => state.quickconsultation.quickconsultation.taskCode,//任务单号 - length:16

        senderId:state => state.common.loginInfo.userId,//发送至ID，也就是用户Id
        senderHead:state => state.userinfo.userinfo.avatar=='./img/user.png'?'': state.userinfo.userinfo.avatar,//发送至头像url，也就是用户头像url

        patientName:state => state.quickconsultation.quickconsultation.patientName,
        patientId:state => state.quickconsultation.quickconsultation.patientId,
        patientSex:state => state.quickconsultation.quickconsultation.patientSex,
        patientAge:state => state.quickconsultation.quickconsultation.patientAge,
        patientproblemDesc:state => state.quickconsultation.quickconsultation.patientproblemDesc,
      }),
      ...mapGetters({
        senderNickName:'userinfo/getImSenderNickName'
      }),
      userAvatar(){
        return (this.$store.state.userinfo.userinfo.avatar==''|| this.$store.state.userinfo.userinfo.avatar==null || !this.$store.state.userinfo.userinfo.avatar )?'./img/user.png':this.$store.state.userinfo.userinfo.avatar
      },

    },
    watch: {},
    beforeRouteEnter(to, from, next) {
      next()
    },
    mounted() {
      let _this=this
      if(this.isWorkTime==0){
        this.sendPrompt('','平台医生不在工作时间，请您先留言！')
      }

      //一、快速提问进入聊天页面用户发送快速提问详情卡片
      let msgjson= {
        msgTime:'1502502720',
        msgFrom:_this.myEasemobAccount,
        msgContent:'',
        isshowTime:true,
        ext:{
          "appID":_this.appId,// [long, 申请单编号],
          "taskID":_this.taskCode,// [string, 任务单编号],
          "type": 1,//大业务类型：快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
          "subtype":'2',//前端用来区分卡片类型样式；
          "senderId": '',                        //[long, 发送者userId],
          "receiverId": '',
          "senderType": '2',                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
          "senderHead": '',
          "senderNickName":'',                 //[string, 发送者昵称],
          "buzzData":{"username":this.patientName,"sex":this.patientSex==1?'男':'女',"age":this.patientAge,"desc":this.patientproblemDesc}     //业务所需要的数据
        }
      }
      this.curMsgList.push(msgjson)
      //二、大病求医入口
      let msgjsonseriousill= {
        msgTime:'1502502720',
        msgFrom:_this.doctorEasemobAccount,
        msgContent:'',
        isshowTime:true,
        ext:{
          "appID":_this.appId,// [long, 申请单编号],
          "taskID":_this.taskCode,// [string, 任务单编号],
          "type": 1,//大业务类型：快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
          "subtype":'3',//前端用来区分卡片类型样式；
          "senderId": '',                        //[long, 发送者userId],
          "receiverId": '',
          "senderType": '2',                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
          "senderHead": '',
          "senderNickName":'',                 //[string, 发送者昵称],
          "buzzData":{"cardname":"大病求医","carddescribe":"为大病、重症患者找到权威专家，提供就医绿色通道、导医导诊、陪诊服务等","cardpic":"","cardfullurl":'http://http://119.29.215.189/www/index.html#/dovrouterview/Submithelp',"cardroutername":'Submithelp'}     //业务所需要的数据
        }
      }
      this.curMsgList.push(msgjsonseriousill)

      //三、陪诊申请入口
      let msgjsonaccompany= {
        msgTime:'1502502720',
        msgFrom:_this.doctorEasemobAccount,
        msgContent:'',
        isshowTime:true,
        ext:{
          "appID":_this.appId,// [long, 申请单编号],
          "taskID":_this.taskCode,// [string, 任务单编号],
          "type": 1,//大业务类型：快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
          "subtype":'4',//前端用来区分卡片类型样式；
          "senderId": '',                        //[long, 发送者userId],
          "receiverId": '',
          "senderType": '2',                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
          "senderHead": '',
          "senderNickName":'',                 //[string, 发送者昵称],
          "buzzData":{"cardname":"陪诊申请","carddescribe":"为大病、重症患者找到权威专家，提供就医绿色通道、全程陪诊服务","cardpic":"","cardfullurl":'http://119.29.215.189/www/index.html#/accompanyList/accompany',"cardroutername":'accompany'}     //业务所需要的数据
        }
      }
      this.curMsgList.push(msgjsonaccompany)

      //四、结束咨询卡片
      let msgjsonEnd= {
        msgTime:'1502512720',
        msgFrom:_this.doctorEasemobAccount,
        msgContent:'',
        isshowTime:true,
        ext:{
          "appID":_this.appId,// [long, 申请单编号],
          "taskID":_this.taskCode,// [string, 任务单编号],
          "type": 1,//大业务类型：快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
          "subtype":'14',//前端用来区分卡片类型样式；
          "senderId": '',                        //[long, 发送者userId],
          "receiverId": '',
          "senderType": '2',                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
          "senderHead": '',
          "senderNickName":'',                 //[string, 发送者昵称],
          "buzzData":{}     //业务所需要的数据
        }
      }
      this.curMsgList.push(msgjsonEnd)

      //刚刚进入页面的时候，判断录音是否授权，如没有授权则自动录音并弹出授权，然后瞬间结束录音，目的是获取授权
      if(window.Browser_Environment_Oklife=='wx'){
        wx.ready(function () {
          if(!localStorage.oklifeuser_rainAllowRecord || localStorage.oklifeuser_rainAllowRecord !== 'true'){
            wx.startRecord({
              success: function(){
                localStorage.oklifeuser_rainAllowRecord = 'true';
                wx.stopRecord();
              },
              cancel: function () {
                Toast('您拒绝授权录音');
              }
            });
          }
        })
      }

      _this.$refs.inputText.addEventListener('focus', ()=>{
        _this.issmall=true
        _this.showfacebox=false
        _this.showmorebox=false
        setTimeout(()=>{
          _this.scrollBottom()
        },500)
      })
      _this.$refs.inputText.addEventListener('blur', ()=>{
        if(_this.showfacebox || _this.showmorebox){//点击表情盒子和更多盒子inputText也会失去焦点，所以要判断一下表情盒子和更多盒子是否打开
          _this.issmall=true
          this.scrollBottom()
        }else{
          _this.issmall=false
          this.scrollBottom()
        }
      })
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '咨询详情' // 标题
      });
      _this.$nextTick(()=>{
        _this.initChat()
        _this.initEmotions()
        this.scrollBottom()
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
        _this=this
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
            console.log('当前登录环信账号: ' + conn.context.userId.toLowerCase())
          },
          //当连接关闭时的回调方法
          onClosed: function () {
            //_this.login()
          },
          //收到文本消息时的回调方法
          onTextMessage: function (message) {
            _this.handleTextMessage(message)
          },
          //收到表情消息时的回调方法
          onEmojiMessage: function (message) {
            _this.handleEmoji(message)
          },
          //收到图片消息时的回调方法
          onPictureMessage: function (message) {
            _this.handlePictureMessage(message)
          },
          //收到指令消息时的回调方法
          onCmdMessage: function (message) {
          },
          //收到音频消息时的回调方法
          onAudioMessage: function (message) {
            _this.handleAudioMessage(message)
          },
          //收到视频消息
          onVideoMessage: function (message) {
          },
          //本机网络连接成功
          onOnline: function () {
            //_this.login()
          },
          //本机网络掉线的回调方法
          onOffline: function () {
            //_this.login()
          },
          //异常时的回调方法
          onError: function (message) {
          //_this.login()
          }
        })
      },
      //环信登录
      login(){
        var user = this.myEasemobAccount
        var pass = this.myEasemobPassword
        conn.open({
          apiUrl: WebIM.config.apiURL,
          user: user,
          pwd: pass,
          appKey: WebIM.config.appkey
        })
        console.log('已登录：'+user)
      },
      //收到文本消息时的回调方法
      handleTextMessage(message){
        console.log('接受到的文本消息： ' + JSON.stringify(message))
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        let ext = message.ext                   //扩展消息
        let msgContent = message.data          //消息内容
        let from = message.from                //发送消息者,消息来自哪个环信ID
        let msg = {
          'msgFrom': from,
          'msgContent': msgContent,
          'msgTime': myWebImUtil.getSendTime(),
          'ext':ext
        }
        this.curMsgList.push(msg)
        this.scrollBottom()
      },
      //收到表情消息的回调方法
      handleEmoji(message) {
        console.log('接受到表情消息： ' + JSON.stringify(message))
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        let ext = message.ext
        let data = message.data               //消息内容
        let msgContent = ''
        let from = message.from                //发送消息者,消息来自哪个环信账号
        for (var i = 0, l = data.length; i < l; i++) {
          if (data[i].type == 'txt') {
            msgContent += data[i].data
          } else {
            this.emojData = data[i].data
            msgContent += '<img class="em-emotion" src="' + this.emojData + '"/>'
          }
        }
        var msg = {
          'msgId':message.id,
          'msgFrom': from,
          'msgContent': msgContent,
          'msgTime': myWebImUtil.getSendTime(),
          'ext':ext
        }
        this.curMsgList.push(msg)
        this.scrollBottom()
      },
      //收到图片消息的回调方法
      handlePictureMessage(message) {
        let _this=this
        console.log('接受到图片消息： ' + JSON.stringify(message))
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        let ext = message.ext
        let filename = message.filename
        let from = message.from.toLowerCase()  //发送消息者
        let options = message
        let msgContent=''
        let msg={}
        options.onFileDownloadComplete = function (response, res) {

          let objectUrl = WebIM.utils.parseDownloadResponse(response);
          console.log('收到图片地址objectUrl：' + objectUrl)
          // 创建对象
          let img = new Image()
          img.src = objectUrl
          img.onload = function(){
            if(img.width>=155){//图片宽超过155则只能显示155，否则显示原图
              msgContent = '<img src="' + objectUrl + '" width="155" alt="'+filename+'"/>'
              msg = {
                'msgId':message.id,
                'msgFrom': from,
                'msgContent': msgContent,
                'msgTime': myWebImUtil.getSendTime(),
                'ext':ext
              }
              _this.curMsgList.push(msg)
              _this.scrollBottom()
            }else {
              msgContent = '<img src="' + objectUrl + '" alt='+filename+'"/>'
              msg = {
                'msgId':message.id,
                'msgFrom': from,
                'msgContent': msgContent,
                'msgTime': myWebImUtil.getSendTime(),
                'ext':ext
              }
              _this.curMsgList.push(msg)
              _this.scrollBottom()
            }
          }

//          let downloadUrl = message.url
//          console.log('收到图片地址downloadUrl： ' + downloadUrl)
//          // 创建对象
//          let img = new Image()
//          img.src = downloadUrl
//          img.onload = function(){
//            if(img.width>=155){
//              msgContent = '<img src="' + downloadUrl + '" width="155"/>'
//              msg = {
//                'msgId':message.id,
//                'msgFrom': from,
//                'msgContent': msgContent,
//                'msgTime': myWebImUtil.getSendTime(),
//                'ext':ext
//              }
//              _this.curMsgList.push(msg)
//              _this.scrollBottom()
//            }else {
//              msgContent = '<img src="' + downloadUrl + '"/>'
//              msg = {
//                'msgId':message.id,
//                'msgFrom': from,
//                'msgContent': msgContent,
//                'msgTime': myWebImUtil.getSendTime(),
//                'ext':ext
//              }
//              _this.curMsgList.push(msg)
//              _this.scrollBottom()
//            }
//          }
        }
        options.onFileDownloadError = function (e) {
          //图片下载失败
        }
        WebIM.utils.download.call(conn, options)
      },
      //收到音频消息的回调方法
      handleAudioMessage(message){
        let _this=this
        console.log('接受到音频消息： ' + JSON.stringify(message))
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        let ext = message.ext
        let options = {url: message.url}
        let from = message.from        //发送消息者,消息来自哪个环信账号
        options.onFileDownloadComplete = function (response) {
          let objectUrl = WebIM.utils.parseDownloadResponse.call(this, response)
          let downloadUrl = message.url
          console.log(objectUrl)
          let audio=_this.strToDom('<audio><source src="'+downloadUrl+'">您的浏览器不支持audio元素。</audio>')
          audio.src = downloadUrl
          let audioalltime=''
          audio.addEventListener("loadeddata",()=>{
            audioalltime=audio.duration
          })
          let msgContent = '<span class="left_audiotime">'+audioalltime+'s"</span><div class="btn-audio" id="'+message.id+'"><audio id="audio'+message.id+'"><source src="'+downloadUrl+'">您的浏览器不支持audio元素。</audio></div>';
          //let msgContent = '<audio controls><source src="' + objectUrl + '">您的浏览器不支持audio元素。</audio>'
          let msg = {
            'msgFrom': from,
            'msgContent': msgContent,
            'msgTime': myWebImUtil.getSendTime(),
            'ext':ext
          }
          _this.curMsgList.push(msg)
          _this.$nextTick(()=>{
            document.getElementById('audio'+message.id).src=downloadUrl
            document.getElementById('audio'+message.id).volume=1
            document.getElementById(message.id).addEventListener('click',()=>{
              if( document.getElementById('audio'+message.id).paused){//暂停的状态
                document.addEventListener("WeixinJSBridgeReady", function () {
                  _this.pauseAudios()//先让其他audio都暂停
                  document.getElementById('audio'+message.id).play()
                  document.getElementById(message.id).className='btn-audio playaudio'
                }, false)
              }else{
                document.addEventListener("WeixinJSBridgeReady", function () {
                  document.getElementById('audio'+message.id).pause()
                  document.getElementById(message.id).className='btn-audio'
                }, false)
              }
            })
          })
          _this.showmorebox=false
          _this.showfacebox=false
          _this.scrollBottom()
        }
        options.onFileDownloadError = function () {
          //音频下载失败
        }
        //通知服务器将音频转为mp3
        options.headers = {
          'Accept': 'audio/mp3'
        }
        WebIM.utils.download.call(conn, options)
      },
      //环信发送单聊消息封装
      sendPrivateText(message, to, ext,successCallback) {
        let id = conn.getUniqueId()                 //生成本地消息id
        let msg = new WebIM.message('txt', id)      //创建文本消息
        msg.set({
          msg: message,                            //消息内容
          to: to,                                  // 接收消息对象
          roomType: false,                         //是否聊天室
          ext: {
            "appID":ext.appID,// [long, 申请单编号],
            "taskID":ext.taskID,// [string, 任务单编号],
            "type": ext.type,//大业务类型：快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
            "subtype":'',//web后台需要发这个字段，前端用来区分卡片类型样式，前端不需要发；
            "senderId": ext.senderId,                        //[long, 发送者userId],
            "receiverId": ext.receiverId,
            "senderType": 1,                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
            "senderHead": ext.senderHead,
            "senderNickName":ext.senderNickName                    //[string, 发送者昵称],
          },
          success: function (id, serverMsgId) {
            console.log('发送成功: ' + id + ':' + serverMsgId)
            successCallback()
          }
        })
        msg.body.chatType = 'singleChat'
        conn.send(msg.body)
      },
      //微信从相册选择图片的回调函数
      addpicByAlbum(){
        let _this=this
        if(window.Browser_Environment_Oklife=='wx'){
          wx.ready(function () {
            let callback = (mediaId, localId) => {
              //todo 调用后台接口传mediaId，返回二进制文件流,blob返回的二进制流，
              let blob=''
//              let uBuffer
//              api.getTempMediaFile({params:{mediaId:mediaId}}).then((res)=>{
//                if (undefined == res) {
//                  return false
//                } else {
//                  let arrayBuffer = res;
//                  console.warn(arrayBuffer)
//                  if (arrayBuffer) {
//                    uBuffer = new Uint8Array(arrayBuffer);
//                    console.log("data1 = ", uBuffer );
//                  }
//                  blob=new Blob([uBuffer], {type: "image/jpeg"});
//                  console.log(blob)
//                }
//              })

              new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest()
                xhr.open('GET', 'http://119.29.215.189/oklife-weixin/weixin/getTempMediaFile?mediaId=' + mediaId, true)
                xhr.responseType = 'arraybuffer'
                xhr.onload = function (e) {
                  // response is unsigned 8 bit integer
                  ///var responseArray = new Uint8Array(this.response);
                  resolve(this.response)
                }
                xhr.send()
              }).catch(error => {
                reject(error)
              }).then((res) => {
                let arrayBuffer = res
                if (arrayBuffer) {
                  let byteArray = new Uint8Array(arrayBuffer)
                  console.log('data1 = ', byteArray)
                  blob = new Blob([byteArray], {type: 'image/jpeg'})
                  console.log(blob)


                  let id = conn.getUniqueId()                    // 生成本地消息id
                  let msg = new WebIM.message('img', id)// 创建文件消息
                  let objectUrl = _this.getObjectURL(blob)
                  console.warn(objectUrl)
                  let uploadUrl = ''

                  let ext = {
                    'appID': _this.appId,// [long, 申请单编号],
                    'taskID': _this.taskCode,// [string, 任务单编号],
                    'type': 1,//快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
                    'subtype': '',//web后台需要发这个字段，前端用来区分卡片类型样式，前端不需要发；
                    'senderId': _this.senderId,                        //[long, 发送者userId],
                    'receiverId': _this.custId,
                    'senderType': 1,                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
                    'senderHead': _this.senderHead,
                    'senderNickName': _this.senderNickName                    //[string, 发送者昵称],
                  }
                  let option = {
                    apiUrl: WebIM.config.apiURL,
                    file: {data: blob, url: objectUrl},
                    to: _this.doctorEasemobAccount,                          // 接收消息对象
                    roomType: false,
                    ext: ext,
                    chatType: 'singleChat',
                    onFileUploadError: function () {      // 文件上传失败
                      console.log('上传文件失败')
                    },
                    onFileUploadComplete: function (data) {   // 文件上传成功
                      console.log(data)
                      if (data && WebIM.utils.isCanUploadFile) {
                        uploadUrl = data.uri + '/' + data.entities[0].uuid
                      } else {
                        uploadUrl = objectUrl
                      }
                    },
                    success: function () {                // 消息发送成功
                      let msgContent = ''
                      let msgjson = {}
                      // 创建对象
                      let img = new Image()
                      img.src = uploadUrl
                      console.log(img)
                      img.onload = ()=> {
                        if (img.width >= 155) {//图片宽超过155则只能显示155，否则显示原图
                          msgContent = '<img src="' + uploadUrl + '" width="155" alt=""/>'
                          msgjson = {
                            'msgFrom': _this.myEasemobAccount,
                            'msgContent': msgContent,
                            'msgTime': myWebImUtil.getSendTime(),
                            'ext': ext
                          }
                          _this.curMsgList.push(msgjson)
                          console.log(_this.curMsgList)

                          //判断是否显示消息时间
                          let lasttime = _this.curMsgList[_this.curMsgList.length - 1].msgTime
                          let pretime = _this.curMsgList[_this.curMsgList.length - 2].msgTime
                          if (lasttime - pretime <= 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = false
                          } else if (lasttime - pretime > 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = true
                          }

                          _this.showmorebox = false
                          _this.showfacebox = false
                          _this.scrollBottom()
                        } else {
                          msgContent = '<img src="' + uploadUrl + '" alt=""/>'
                          msgjson = {
                            'msgFrom': _this.myEasemobAccount,
                            'msgContent': msgContent,
                            'msgTime': myWebImUtil.getSendTime(),
                            'ext': ext
                          }
                          _this.curMsgList.push(msgjson)
                          console.log(_this.curMsgList)

                          //判断是否显示消息时间
                          let lasttime = _this.curMsgList[_this.curMsgList.length - 1].msgTime
                          let pretime = _this.curMsgList[_this.curMsgList.length - 2].msgTime
                          if (lasttime - pretime <= 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = false
                          } else if (lasttime - pretime > 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = true
                          }

                          _this.showmorebox = false
                          _this.showfacebox = false
                          _this.scrollBottom()
                        }
                      }
                    },
                    flashUpload: WebIM.flashUpload
                  }
                  msg.set(option)
                  conn.send(msg.body)
                }
              })
            }
            wechatUtils.wxChooseImageByAlbum(callback,9,wx)
          })
        }
      },
      addpicByCamera(){
        let _this=this
        if(window.Browser_Environment_Oklife=='wx'){
          wx.ready(function () {
            let callback = (mediaId, localId) => {
              //todo 调用后台接口传mediaId，返回二进制文件流,blob返回的二进制流，
              let blob=''
              new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest()
                xhr.open('GET', 'http://119.29.215.189/oklife-weixin/weixin/getTempMediaFile?mediaId=' + mediaId, true)
                xhr.responseType = 'arraybuffer'
                xhr.onload = function (e) {
                  // response is unsigned 8 bit integer
                  ///var responseArray = new Uint8Array(this.response);
                  resolve(this.response)
                }
                xhr.send()
              }).catch(error => {
                reject(error)
              }).then((res) => {
                let arrayBuffer = res
                if (arrayBuffer) {
                  let byteArray = new Uint8Array(arrayBuffer)
                  console.log('data1 = ', byteArray)
                  blob = new Blob([byteArray], {type: 'image/jpeg'})
                  console.log(blob)

                  let id = conn.getUniqueId()                    // 生成本地消息id
                  let msg = new WebIM.message('img', id)// 创建文件消息
                  let objectUrl = _this.getObjectURL(blob)
                  console.warn(objectUrl)
                  let uploadUrl = ''

                  let ext = {
                    'appID': _this.appId,// [long, 申请单编号],
                    'taskID': _this.taskCode,// [string, 任务单编号],
                    'type': 1,//快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
                    'subtype': '',//web后台需要发这个字段，前端用来区分卡片类型样式，前端不需要发；
                    'senderId': _this.senderId,                        //[long, 发送者userId],
                    'receiverId': _this.custId,
                    'senderType': 1,                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
                    'senderHead': _this.senderHead,
                    'senderNickName': _this.senderNickName                    //[string, 发送者昵称],
                  }
                  let option = {
                    apiUrl: WebIM.config.apiURL,
                    file: {data:blob,url:objectUrl},
                    to: _this.doctorEasemobAccount,                          // 接收消息对象
                    roomType: false,
                    ext: ext,
                    chatType: 'singleChat',
                    onFileUploadError: function () {      // 文件上传失败
                      console.log('上传文件失败')
                    },
                    onFileUploadComplete: function (data) {   // 文件上传成功
                      console.log(data)
                      if (data && WebIM.utils.isCanUploadFile) {
                        uploadUrl = data.uri + '/' + data.entities[0].uuid
                      } else {
                        uploadUrl = objectUrl
                      }
                    },
                    success: function () {                // 消息发送成功
                      let msgContent = ''
                      let msgjson = {}
                      // 创建对象
                      let img = new Image()
                      img.src = uploadUrl
                      console.log(img)
                      img.onload = ()=> {
                        if (img.width >= 155) {//图片宽超过155则只能显示155，否则显示原图
                          msgContent = '<img src="' + uploadUrl + '" width="155" alt=""/>'
                          msgjson = {
                            'msgFrom': _this.myEasemobAccount,
                            'msgContent': msgContent,
                            'msgTime': myWebImUtil.getSendTime(),
                            'ext': ext
                          }
                          _this.curMsgList.push(msgjson)
                          console.log(_this.curMsgList)

                          //判断是否显示消息时间
                          let lasttime = _this.curMsgList[_this.curMsgList.length - 1].msgTime
                          let pretime = _this.curMsgList[_this.curMsgList.length - 2].msgTime
                          if (lasttime - pretime <= 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = false
                          } else if (lasttime - pretime > 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = true
                          }

                          _this.showmorebox = false
                          _this.showfacebox = false
                          _this.scrollBottom()
                        } else {
                          msgContent = '<img src="' + uploadUrl + '" alt=""/>'
                          msgjson = {
                            'msgFrom': _this.myEasemobAccount,
                            'msgContent': msgContent,
                            'msgTime': myWebImUtil.getSendTime(),
                            'ext': ext
                          }
                          _this.curMsgList.push(msgjson)
                          console.log( _this.curMsgList)

                          //判断是否显示消息时间
                          let lasttime = _this.curMsgList[_this.curMsgList.length - 1].msgTime
                          let pretime = _this.curMsgList[_this.curMsgList.length - 2].msgTime
                          if (lasttime - pretime <= 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = false
                          } else if (lasttime - pretime > 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = true
                          }

                          _this.showmorebox = false
                          _this.showfacebox = false
                          _this.scrollBottom()
                        }
                      }
                    },
                    flashUpload: WebIM.flashUpload
                  }
                  msg.set(option)
                  conn.send(msg.body)
                }
              })
            }
            wechatUtils.wxChooseImageByCamera(callback,9,wx)
          })
        }
      },
      pressDownStartVoice(event){
        event.preventDefault()
        this.touchshow=!this.touchshow
        if(window.Browser_Environment_Oklife=='wx'){
          this.startVoice = new Date().getTime()
          this.recordTimer=setTimeout(function(){
            wx.ready(function () {
              wechatUtils.wxStartRecord(wx)
            })
          },300)//要防止用户误操作（如：反复点击、误触摸）导致的无效录音,小于300ms不录音
        }
      },
      pressUpStopVoice(event){
        event.preventDefault()
        let _this=this
        this.touchshow=!this.touchshow
        if (window.Browser_Environment_Oklife == 'wx') {
          this.endVoice = new Date().getTime()
          if ((this.endVoice - this.startVoice) < 300) {
            this.endVoice = 0
            this.startVoice = 0
            //小于300ms，不录音
            clearTimeout(this.recordTimer)
          } else {
            wx.ready(function () {
              let callback = (mediaId, localId) => {
                //todo 调用后台接口传mediaId，返回二进制文件流,blob返回的二进制流，
                let blob=''
                new Promise((resolve, reject) => {
                  let xhr = new XMLHttpRequest()
                  xhr.open('GET', 'http://119.29.215.189/oklife-weixin/weixin/getTempMediaFile?mediaId=' + mediaId, true)
                  xhr.responseType = 'arraybuffer'
                  xhr.onload = function (e) {
                    // response is unsigned 8 bit integer
                    ///var responseArray = new Uint8Array(this.response);
                    resolve(this.response)
                  }
                  xhr.send()
                }).catch(error => {
                  reject(error)
                }).then((res) => {
                  let arrayBuffer = res
                  if (arrayBuffer) {
                    let byteArray = new Uint8Array(arrayBuffer)
                    console.log('data1 = ', byteArray)
                    blob = new Blob([byteArray],{type: 'audio/amr'})
                    console.log(blob)

                    let id = conn.getUniqueId()                    // 生成本地消息id
                    let msg = new WebIM.message('audio', id);         // 创建文件消息
                    let objectUrl=_this.getObjectURL(blob)
                    console.warn(objectUrl)
                    let uploadUrl = ''
                    let ext = {
                      'appID': _this.appId,// [long, 申请单编号],
                      'taskID': _this.taskCode,// [string, 任务单编号],
                      'type': 1,//快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
                      'subtype': '',//web后台需要发这个字段，前端用来区分卡片类型样式，前端不需要发；
                      'senderId': _this.senderId,                        //[long, 发送者userId],
                      'receiverId': _this.custId,
                      'senderType': 1,                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
                      'senderHead': _this.senderHead,
                      'senderNickName': _this.senderNickName                    //[string, 发送者昵称],
                    }
                    let option = {
                      apiUrl: WebIM.config.apiURL,
                      file: {data:blob,url:objectUrl},
                      to: _this.doctorEasemobAccount,                          // 接收消息对象
                      roomType: false,
                      ext: ext,
                      chatType: 'singleChat',
                      onFileUploadError: function () {      // 文件上传失败
                        console.log('上传音频失败')
                      },
                      onFileUploadComplete: function (data) {   // 文件上传成功
                        console.log(data)
                        if (data && WebIM.utils.isCanUploadFile) {
                          uploadUrl = data.uri + '/' + data.entities[0].uuid
                        } else {
                          uploadUrl = objectUrl
                        }
                      },
                      success: function () {                // 消息发送成功
                        let audio= new Audio()
                        audio.src = uploadUrl
                        let audioalltime = ''
                        console.log(audio)
                        audio.loadeddata=() => {
                          audioalltime = audio.duration
                          console.log(audioalltime)
                          let msgContent = '<span class="right_audiotime">' + audioalltime +
                            's"</span><div class="btn-audio" id="' + id + '"><audio id="audio' + id + '"><source src="' +
                            uploadUrl + '">您的浏览器不支持audio元素。</audio></div>'
                          let msgjson = {
                            'msgFrom': _this.myEasemobAccount,
                            'msgContent': msgContent,
                            'msgTime': myWebImUtil.getSendTime(),
                            'ext': ext
                          }
                          _this.curMsgList.push(msgjson)
                          console.log(_this.curMsgList)


                          //判断是否显示消息时间
                          let lasttime = _this.curMsgList[_this.curMsgList.length - 1].msgTime
                          let pretime = _this.curMsgList[_this.curMsgList.length - 2].msgTime
                          if (lasttime - pretime <= 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = false
                          } else if (lasttime - pretime > 60) {
                            _this.curMsgList[_this.curMsgList.length - 1]['isshowTime'] = true
                          }

                          _this.$nextTick(() => {
                            document.getElementById('audio' + id).src = uploadUrl
                            document.getElementById('audio' + id).volume = 1
                            document.getElementById(''+id).addEventListener('click', () => {
                              if (document.getElementById('audio' + id).paused) {//如果暂停状态
                                document.addEventListener('WeixinJSBridgeReady', function () {
                                  _this.pauseAudios()//先让其他audio都暂停
                                  document.getElementById('audio' + id).play()
                                  document.getElementById(''+id).className = 'btn-audio playaudio'
                                }, false)
                              } else {
                                document.addEventListener('WeixinJSBridgeReady', function () {
                                  document.getElementById('audio' + id).pause()
                                  document.getElementById(''+id).className = 'btn-audio'
                                }, false)

                              }
                            })
                          })
                          _this.showmorebox = false
                          _this.showfacebox = false
                          _this.scrollBottom()
                        }
                      },
                      flashUpload: WebIM.flashUpload
                    }
                    msg.set(option)
                    conn.send(msg.body)
                  }
                })
              }
              wechatUtils.wxStopRecord(callback, wx)
            })
          }
        }
      },
      //主动发送系统提示语给用户
      sendPrompt(url,prompt){
        let _this=this
        let ext={
          "appID":_this.appId,// [long, 申请单编号],
          "taskID":_this.taskCode,// [string, 任务单编号],
          "type": 1,//大业务类型：快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
          "subtype":'1',//前端用来区分卡片类型样式；
          "senderId": '',                        //[long, 发送者userId],
          "receiverId": '',
          "senderType": '',                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
          "senderHead": '',
          "senderNickName":'',                 //[string, 发送者昵称],
          "buzzData":{"url":url,"Prompt":prompt}      //业务所需要的数据，基本上都是进入页面的url,prompt提示语
        }
        let msgjson = {
          'msgFrom':'',
          'msgContent': '',
          'msgTime': '',
          'ext':ext
        }
        this.curMsgList.push(msgjson)
      },
      //发送文本消息
      sendMessage(){
        let _this=this
        //div编辑框中要显示表情，而发送的却要是表情字符串。
        let clone = this.$refs.inputText.cloneNode(true)
        console.log(clone)
        let len = clone.getElementsByTagName('img').length
        console.log(len)
        for (let i = len - 1; i >= 0; i--) {
          let emotionid = clone.getElementsByTagName('img')[i].getAttribute('data-emotionid')
          console.warn(emotionid)
          emotionid = emotionid.replace(/</g, '&lt;').replace(/>/g, '&gt;')
          clone.getElementsByTagName('img')[i].outerHTML=emotionid
        }
        let message = clone.innerText//处理之后的待发送内容
        if ('' === message) {
          alert('发送内容不能为空')
          return
        }
        console.log(message)
        let msgContent = WebIM.utils.parseEmoji(message)
        console.log(msgContent)
        let ext={
            "appID":_this.appId,// [long, 申请单编号],
            "taskID":_this.taskCode,// [string, 任务单编号],
            "type": 1,//大业务类型：快速提问种类是1,客服咨询种类是2,大病求医3,陪诊申请4,二次会诊5,报告解读6,远程复查7,系统纯提醒类8,健康指导9,新病例档案10,问卷11,资讯12,健康报告13
            "subtype":'',//前端用来区分卡片类型样式；
            "senderId": _this.senderId,                        //[long, 发送者userId],
            "receiverId": _this.custId,
            "senderType": 1,                       //[int, 发送者类型 - 会员: 1:  平台医生:2],
            "senderHead": _this.senderHead,
            "senderNickName":_this.senderNickName,                 //[string, 发送者昵称],
            "buzzData":{}      //业务所需要的数据，基本上都是进入页面的url,prompt提示语
        }
        console.log(ext)
        let successCallback=()=>{
          let msgjson = {
            'msgFrom': _this.myEasemobAccount,
            'msgContent': msgContent,
            'msgTime': myWebImUtil.getSendTime(),
            'ext':ext
          }
          this.curMsgList.push(msgjson)

          //判断是否显示消息时间
          let lasttime=_this.curMsgList[_this.curMsgList.length-1].msgTime
          let pretime=_this.curMsgList[_this.curMsgList.length-2].msgTime
          if(lasttime-pretime<=60){
            _this.curMsgList[_this.curMsgList.length-1]['isshowTime']=false
          }else if(lasttime-pretime>60){
            _this.curMsgList[_this.curMsgList.length-1]['isshowTime']=true
          }

          this.showfacebox=false
          this.showmorebox=false
          this.scrollBottom()
          this.$refs.inputText.innerHTML=''
        }
        this.sendPrivateText(message, 'hh', ext,successCallback)
      },

      //点击表情按钮，打开表情盒子
      emotionBut(){
        this.showfacebox=!this.showfacebox;
        this.showmorebox=false;
        this.voice_text_show=true;
        if(this.showfacebox){
          this.issmall=true
        }else {
          this.issmall=false
        }
        this.scrollBottom()

      },
      //选择表情
      selectEmotion(event){
        let contentNode=document.createElement("img")
        contentNode.className='em-emotion'
        contentNode.src=event.target.src
        contentNode.setAttribute('data-emotionid',event.target.id)
        this.$refs.inputText.appendChild(contentNode)
        this.setFocus()
      },
      //点击更多按钮，打开更多盒子
      moreBut(){
        this.showmorebox=!this.showmorebox;
        this.showfacebox=false;
        this.voice_text_show=true;
        if( this.showmorebox){
          this.issmall=true
        }else{
          this.issmall=false
        }
        this.scrollBottom()
      },
      //录音和输入切换按钮
      voiceTextBut(){
        this.voice_text_show=!this.voice_text_show;
        this.showfacebox=false
        this.showmorebox=false
        this.scrollBottom()
      },
      //消息滚动到最底部
      scrollBottom(){
        this.$nextTick(()=>{
          this.$refs.messageScrollContain.scrollTop = this.$refs.messageScrollContain.scrollHeight;
        })
      },
      //输入之后将光标移到最后
      setFocus(){
        let el = this.$refs.inputText
        el.focus()
        if (document.selection) {
          var range = document.selection.createRange()
          this.last = range
          range.moveToElementText(el)
          range.select()
          document.selection.empty() //取消选中
        } else {
          var range = document.createRange()
          range.selectNodeContents(el)
          range.collapse(false)
          var sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
        }
      },
      //dom字符串转换成dom元素
      strToDom(arg) {
        var objE = document.createElement('div')
        objE.innerHTML = arg
        return objE.childNodes
      },
      //先暂停所有audio
      pauseAudios(){
        let allAudios=document.getElementsByTagName('audio')
        for(let i=0,len=allAudios.length;i<len;i++){
          allAudios[i].pause()
        }
      },
      //结束咨询
      chatClose(){
        let _this=this
        api.chatClose({params:{taskCode:_this.taskCode}}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            console.log(res)
            _this.isshowfooter=false
            _this.isshowEndCard=false
          }
        })
      },
      //再次提问
      againAsk(){
        let _this=this
        api.taskCreate({params:{appId:_this.appId,userId:_this.userId}}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            console.log(res.data)
            _this.$store.commit('quickconsultation/changequickconsultation',{
              "custId": res.data.custId,
              "doctorEasemobAccount": res.data.easemobAccount,
              "isDefaultAccount": res.data.isDefaultAccount,
              "isWorkTime": res.data.isWorkTime,
              "taskCode": res.data.taskCode
            })
            _this.$router.replace({name:'easemobInline'})
            _this.isshowfooter=true
            _this.isshowEndCard=true
          }
        })
      },
      comment(){
        Toast({
          message: '评价功能还未开启',
          position: 'center',
          duration: '评价功能还未开启'.length*200
        });
      },
      getObjectURL(file) {
        let url = null
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
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
    padding-bottom: px2rem(140);
    box-sizing: border-box;
  }
  .imAllContain_small {
    /*margin-top: px2rem(88);*/;
    /*height: 65%;*/
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
        margin-bottom:px2rem(40);
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
        margin-top: px2rem(40);
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
        margin-top: px2rem(40);
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
          background: -webkit-linear-gradient(to right, #5390f4 , #4385f5); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(to right, #5390f4 , #4385f5); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(to right, #5390f4 , #4385f5); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #5390f4 , #4385f5); /* 标准的语法（必须放在最后） */

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
      max-height: px2rem(144);
      overflow-y: auto;
      line-height: px2rem(72);
      position: relative;
      bottom:px2rem(-12);
      left:px2rem(94);
      padding-left: px2rem(10);
      padding-right: px2rem(10);
      margin-bottom: px2rem(15);
      font-size: px2rem(32);
      color: #333333;
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
      font-size: px2rem(30);
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
      background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
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
  }
  .againAskAndComment{
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 0 0 0;
    display: inline-block;
    height: px2rem(100);
    line-height: px2rem(100);
    width: 100%;
    font-size:px2rem(36);
    box-sizing: border-box;
    .againAsk{
      float: left;
      margin: 0 0 0 0;
      display: inline-block;
      width: 50%;
      height: 100%;
      line-height: px2rem(100);
      text-align: center;
      background-color:#fcfcfc ;
      border-top: px2rem(1) solid #a7a7ab;
      color: #4285f4;
    }
    .comment{
      float: left;
      margin: 0 0 0 0;
      display: inline-block;
      width: 50%;
      height: 100%;
      line-height: px2rem(100);
      text-align: center;
      background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
      border-top: px2rem(1) solid #a7a7ab;
      color: #ffffff;
    }
  }
  .footerTogger-enter-active{
    transition:all .3s ease;
    height:px2rem(100);
  }
  .footerTogger-leave-active{
    transition:all .3s ease;
    height:0;
    opacity: 0;
  }
  .footerTogger-leave{
    opacity: 1;
    height:px2rem(100);
  }
  .footerTogger-enter{
    opacity:0;
    height: 0;
  }
  .togglemorebox-enter-active{
    transition:all .3s ease;
    height:px2rem(100);
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
  /*快速提问详情及就诊人基本信息卡片*/
  .easemobinlin_detailBaseinfo{
    width:px2rem(384);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #ffffff;
    padding: 0 0 px2rem(16) 0;
    margin-bottom: px2rem(16);
    color:#ffffff;
    .patientName{
      font-size: px2rem(32);
    }
    .patientSex,.patientAge{
      font-size:px2rem(26);
    }
    .descDetail{
      font-size:px2rem(26);
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
    }
  }
  .easemobinlin_inputbaseinfo{
    font-size:px2rem(32);
    color:#ffffff;
  }
  .easemobinlin_baseRighticon{
    display: inline-block;
    width: px2rem(26);
    height:px2rem(36);
    margin-top: px2rem(6);
    background-size: contain;
    background-image:url("../../assets/rightjiantou.png");
    background-repeat: no-repeat;
    float: right;
  }
  /*所有入口样式*/
  .oklife_rukou{
    width:px2rem(384);
    height:px2rem(196);
    color:#333333;
    .rukouTitle{
      margin-bottom:px2rem(16);
    }
    .rukouSummary{
      display: inline-block;
      font-size:px2rem(26);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      width:px2rem(270);
      height:px2rem(120);
      line-height: px2rem(40);
      float: left;
    }
    .rukouPic{
      width:px2rem(95);
      height: px2rem(95);
      float: left;
      margin-top:px2rem(6);
      margin-left:px2rem(15)
    }
  }
  /*结束卡片*/
  .oklife_end{
    margin: auto;
    text-align: center;
    margin-top:px2rem(60);
    background-color: #cfcfcf;
    border-radius: px2rem(30);
    box-sizing: border-box;
    height: px2rem(60);
    width:px2rem(380);
    line-height: px2rem(60);
    padding-left:px2rem(30);
    padding-right:px2rem(30);
    color: #666666;
    font-size:px2rem(24);
    .endpic{
      background-image: url("../../assets/go.png");
      background-size: contain;
      background-repeat: no-repeat;
      display: inline-block;
      margin-left: px2rem(15);
      width:px2rem(16);
      height: px2rem(24);
      vertical-align: middle;
    }
  }

</style>
<style lang="scss">
  @import "../../../static/css/base/min.scss";
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

  /*播放音频样式*/
  .btn-audio{
    width: px2rem(44);
    height: px2rem(44);
    background:url('../../assets/start.png') no-repeat center center;
    background-size:cover;
  }
  .left_audiotime{
    display: inline-block;
    color:#666666;
    font-size: px2eem(12);
    position: absolute;
    bottom:0;
    right:px2rem(-15)
  }
  .right_audiotime{
    display: inline-block;
    color:#666666;
    font-size: px2eem(12);
    position: absolute;
    bottom:0;
    left:px2rem(-15)
  }
  .playaudio{
    background:url('../../assets/textbotton.png') no-repeat center center;
    background-size:cover;
  }
</style>
