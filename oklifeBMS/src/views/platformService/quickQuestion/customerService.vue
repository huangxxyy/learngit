<template>
  <!--Create by hh on 2017/07/25-->
  <div class="main-content" style="min-width:980px">
    <div class="page-content">
      <el-row class="row" style="position:relative;padding: 0 340px;">
        <div class="leftUser" style="width:320px;position:absolute;left:10px;top:0">
          <div class="widget-box">
            <div class="widget-header">
              <h4 class="lighter smaller" v-text="'会话列表(最近联系'+latestMemberCount+'人)'"></h4>
            </div>
            <div class="widget-body">
              <div class="widget-main" style="overflow:auto">
                <!--最近会话start-->
                <div id="profile-feed-1" class="profile-feed">
                  <div class="profile-activity clearfix" v-for="(item, index) in latestMemberList" v-bind:key="index"
                       @click.stop="createChat(item.member, 2)" :class="{'activeBg': (item.member==undefined ?'':item.member.id) == memberId}" @mouseover.stop="isshowclosex=true" @mouseout.stop="isshowclosex=false">
                    <div class="latestSessionList">
                      <img class="pull-left" v-show="(item.member==undefined ?'':item.member.head) == null" src="../../../../static/images/user.png">
                      <img class="pull-left" v-show="(item.member==undefined ?'':item.member.head) != null" :src="(item.member==undefined ?'':item.member.head) != null ? (item.member==undefined ?'':item.member.head): ''">
                      <a class="user" @click="" v-text="(item.member==undefined ?'':item.member.name)"></a>
                      <span class="badge badge-danger pull-right">会员</span>
                      <!-- <div class="text-left" style="padding-top: 8px;"><span v-text="item.curTime | getdate "></span></div> -->
                      <div class="closex" @click.stop="shutdownSession(index)" v-show="isshowclosex"></div>
                      <div class="newsPoint" v-show="isShowNewPoint"></div>
                      <div class="news" v-show="item.newMsg != null">
                        <span class="lastNews" :title="newMsgContent"
                              v-html="item.newMsg != null?item.newMsg.newMsgContent:''"></span></div>
                    </div>
                  </div>
                </div>
                <!--最近会话end-->
              </div>
            </div>
          </div>
        </div>
        <div class="chat-contain">
          <div class="widget-box" v-show="sessionName != ''">
            <div class="widget-header" style="position:relative;padding-left:50px;">
              <div class="" style="width:36px;position:absolute;left:10px;">
                <img src="../../../../static/images/service.png" class="img-circle img-thumbnail">
              </div>
              <h4 class="lighter smaller" v-text="'与'+ sessionName + '会话中'"></h4>
            </div>
            <div class="widget-body" style="overflow:auto;" id="chatContain" @scroll="loadMore($event)">
              <div class="widget-main">
                <div class="text-center" v-show="isHaveMore==true"><a @click="" v-text="moreText"></a></div>
                <div class="text-center" v-show="isShowNoMore==true"><a @click="" v-text="noMoreText"></a></div>
                <div class="text-center" v-show="isShowLoad==true"><img src="../../../../static/images/loading.gif"
                                                                        height="20"/>
                </div>
                <div class="dialogs clearfix">
                  <!--消息列表start-->
                  <div v-for="(item,index) in curMsgList" class="chatDiv"  v-bind:key="index">
                    <div class="text-center">
                      <span class="shijian" >{{item.msgTime == null ?'':item.msgTime | formatTime}}</span>
                    </div>
                    <!--左边-->
                    <div class="itemdiv dialogdiv clearfix" v-show="item.msgFrom == from">
                      <div class="user" :id="'headImg_'+index">
                        <img alt="" :src="member.head">
                      </div>
                      <div class="name" style="margin-left:50px">
                        <h4 v-text="member.name"></h4>
                      </div>
                      <el-col class="body" :xs="16">
                        <div class="text" :id="'fromMsg_'+index" v-html="item.msgContent"></div>
                      </el-col>
                    </div>
                    <!--右边-->
                    <div class="itemdiv dialogdiv dlg clearfix" v-show="item.msgFrom != from">
                      <div class="self" :id="'headImg_'+index">
                        <img alt="头像" src="../../../../static/images/service.png">
                      </div>
                      <div class="name text-right" style="margin-right:50px">
                        <h4 v-show="item.msgFrom != from">oklife客服</h4>
                      </div>
                      <el-col :xs="16" class="body-self  pull-right" style="background: #6fb3e0;">
                        <div class="text" :id="'toMsg_'+index" v-html="item.msgContent"></div>
                      </el-col>
                    </div>
                  </div>
                  <!--消息列表end-->
                </div>
              </div><!-- /widget-main -->
            </div><!-- /widget-body -->
            <form>
              <div class="form-actions"
                   style="position:relative;padding: 7px 5px 5px 5px;margin:0;border-left:1px solid #e5e5e5;border-right:1px solid #e5e5e5;">
                <el-col :xs="24" class="input-group col-xs-12" style="padding-left:10px">
                  <a class="sendEmotion" unselectable="on" onmousedown="return false" title="选择表情" type="emotion"
                     @click="isShowEmotion=true"></a>
                  <a class="selectPic" title="选择图片" type="img" @click="selectPic"></a>
                  <input type="file" :id="'fileInput_'+from" @change="onChangeSelectPic('fileInput_'+from)" class="file"
                         style="display: none" accept="image/x-png,image/png,image/jpg,image/jpeg,image/tiff,image/gif,"
                         data-type="img">
                </el-col>
                <el-col :xs="24" class="input-group col-xs-12">
                  <el-col :xs="24" class="col-xs-12">
                    <div id="messageContent" contenteditable="true" data-placeholder="(最多输入500字, 可以使用Ctrl+Enter发送)"
                         @keyup="fastSend($event)"></div>
                  </el-col>
                  <el-col :xs="24" class="text-right col-xs-12" style="margin-top:5px">
                    <button class="btn btn-sm btn-info no-radius sub_btn" type="button" @click="sendMessage">
                      <i class="icon-share-alt"></i>发送
                    </button>
                  </el-col>
                  <!--表情盒子-->
                  <div class="wl_faces_box" unselectable="on" onmousedown="return false" style="bottom: 99px;"
                       v-show="isShowEmotion==true">
                    <div class="wl_faces_content">
                      <div class="title">
                        <ul>
                          <li class="title_name">常用表情</li>
                          <li class="wl_faces_close" @click="isShowEmotion=false"><span></span></li>
                        </ul>
                      </div>
                      <div class="wl_faces_main">
                        <ul class="emotionUL">
                          <li v-for="item in emotionMap"><img :id="item.key" :src="item.val" style="cursor:pointer;"
                                                              @click="selectEmotion($event)"></li>
                        </ul>
                      </div>
                    </div>
                    <div class="wlf_icon"></div>
                  </div>
                </el-col>
              </div>
            </form>
          </div><!-- /widget-box -->
        </div><!-- /span -->
        <div class="rightUser" style="width:320px;position:absolute;right:10px;top:0">
          <div class="widget-box">
            <div class="widget-header">
              <h4 class="lighter smaller">会员列表</h4>
            </div>
            <div class="widget-body">
              <div class="input-group">
                <input type="text" v-model="keyWord" class="form-control search-query" placeholder="姓名、手机、健康号、身份证号"
                       style="border-radius: 0px !important;border-left:none;border-top:none;">
                <span class="input-group-btn">
                                    <button type="button" class="btn btn-purple btn-sm">
                                        <i class="icon-search icon-on-right bigger-110"></i>
                                        搜索
                                    </button>
                                </span>
              </div>
              <div class="widget-main" style="overflow:auto;">
                <div id="" class="profile-feed">
                  <div class="profile-activity clearfix" v-for="item in memberList" @click="createChat(item.member, 1)">
                    <div>
                      <img class="pull-left" v-show="item.member.head == null" src="../../../../static/images/user.png">
                      <img class="pull-left" v-show="item.member.head != null"
                           :src="item.member.head == null? '':item.member.head == null ? item.member.head.url: item.member.head">
                      <!--<a class="user" @click="" v-text="item.name+'('+item.healthNum+')'"></a>-->
                      <a class="user" @click="" v-text="item.member.name"></a>
                      <span class="badge badge-danger pull-right">会员</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-row><!-- /.row -->
    </div><!-- /.page-content -->
  </div>
</template>
<style lang="css" scoped>
  .clearfix:after, .dl-horizontal dd:after, .row:after {
    clear: both;
  }
  .pull-right{float:right;}
  .pull-left{float:left;}
  .dialogs {
    padding: 9px 9px 0;
    position: relative
  }

  .itemdiv {
    padding-right: 3px;
    min-height: 66px;
    position: relative
  }

  .itemdiv>.user {
    display: inline-block;
    width: 42px;
    position: absolute;
    left: 0
  }

  .itemdiv>.user>img {
    border-radius: 100%;
    border: 2px solid #5293c4;
    max-width: 40px;
    position: relative
  }

  .itemdiv>.body {
    width: auto;
    margin-left: 50px;
    margin-right: 12px;
    position: relative
  }

  .itemdiv>.body>.time {
    display: block;
    font-size: 11px;
    font-weight: bold;
    color: #666;
    position: absolute;
    right: 9px;
    top: 0
  }

  .itemdiv>.body>.time [class*="icon-"] {
    font-size: 14px;
    font-weight: normal
  }

  .itemdiv>.body>.name {
    display: block;
    color: #999
  }

  .itemdiv>.body>.name>b {
    color: #777
  }

  .itemdiv>.body>.text {
    display: block;
    position: relative;
    margin-top: 2px;
    padding-bottom: 19px;
    padding-left: 7px;
    font-size: 13px
  }

  .itemdiv>.body>.text:after {
    display: block;
    content: "";
    height: 1px;
    font-size: 0;
    overflow: hidden;
    position: absolute;
    left: 16px;
    right: -12px;
    margin-top: 9px;
    border-top: 1px solid #e4ecf3
  }

  .itemdiv>.body>.text>[class*="icon-quote-"]:first-child {
    color: #dce3ed;
    margin-right: 4px
  }

  .itemdiv:last-child>.body>.text {
    border-bottom: 0
  }

  .itemdiv:last-child>.body>.text:after {
    display: none
  }

  .itemdiv.dialogdiv {
    padding-bottom: 14px
  }

  .itemdiv.dialogdiv:before {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    bottom: 0;
    left: 19px;
    width: 3px;
    max-width: 3px;
    background-color: #e1e6ed;
    border: 1px solid #d7dbdd;
    border-width: 0 1px
  }

  .itemdiv.dialogdiv:last-child:before {
    display: none
  }

  .itemdiv.dialogdiv>.user>img {
    border-color: #c9d6e5
  }

  .itemdiv.dialogdiv>.body {
    border: 1px solid #dde4ed;
    padding: 5px 8px 8px;
    border-left-width: 2px;
    margin-right: 1px
  }

  .itemdiv.dialogdiv>.body:before {
    content: "";
    display: block;
    position: absolute;
    left: -7px;
    top: 11px;
    width: 8px;
    height: 8px;
    border: 2px solid #dde4ed;
    border-width: 2px 0 0 2px;
    background-color: #FFF;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg)
  }

  .itemdiv.dialogdiv>.body>.time {
    position: static;
    float: right
  }

  .itemdiv.dialogdiv>.body>.text {
    padding-left: 0;
    padding-bottom: 0
  }

  .itemdiv.dialogdiv>.body>.text:after {
    display: none
  }

  .itemdiv.dialogdiv .tooltip-inner {
    word-break: break-all
  }

  .itemdiv.memberdiv {
    width: 175px;
    padding: 2px;
    margin: 3px 0;
    float: left;
    border-bottom: 1px solid #e8e8e8
  }

  .itemdiv.memberdiv>.user>img {
    border-color: #dce3ed
  }

  .itemdiv.memberdiv>.body>.time {
    position: static
  }

  .itemdiv.memberdiv>.body>.name {
    line-height: 18px;
    height: 18px;
    margin-bottom: 0
  }

  .itemdiv.memberdiv>.body>.name>a {
    display: inline-block;
    max-width: 100px;
    max-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all
  }

  .itemdiv .tools {
    position: absolute;
    right: 5px;
    bottom: 10px;
    display: none
  }

  .itemdiv .tools .btn {
    border-radius: 36px;
    margin: 1px 0
  }

  .itemdiv .body .tools {
    bottom: 4px
  }

  .itemdiv.commentdiv .tools {
    right: 9px
  }

  .itemdiv:hover .tools {
    display: inline-block
  }
  .main-content {
    margin-right: 0;
    margin-top: 0;
    min-height: 100%;
    padding: 0;
  }

  .page-content {
    background: #fff;
    margin: 0;
    padding: 8px 20px 24px;
  }

  .row {
    margin-right: -15px;
    margin-left: -15px;
  }

  .row:before {
    display: table;
    content: " ";
    box-sizing: border-box;
  }

  .widget-box {
    padding: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    margin: 3px 0;
    border-bottom: 1px solid #CCC;
  }

  .widget-header {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    position: relative;
    min-height: 38px;
    background: #f7f7f7;
    background-image: -webkit-gradient(linear, left 0, left 100%, from(#fff), to(#eee));
    background-image: -webkit-linear-gradient(top, #fff, 0%, #eee, 100%);
    background-image: -moz-linear-gradient(top, #fff 0, #eee 100%);
    background-image: linear-gradient(to bottom, #fff 0, #eee 100%);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffeeeeee', GradientType=0);
    color: #669fc7;
    border: 1px solid #CCC;
    border-bottom: 1px solid #DDD;
    padding-left: 12px;
  }

  .widget-header:before {
    content: "";
    display: table;
    line-height: 0;
    box-sizing: border-box;
  }

  .widget-header > :first-child {
    line-height: 36px;
    padding: 0;
    margin: 0;
    display: inline;
  }

  h4,h5,h6 {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .lighter {
    font-weight: lighter;
  }

  .widget-header:after {
    clear: right;
    content: "";
    display: table;
    line-height: 0;
    box-sizing: border-box;
  }

  .widget-body {
    border: 1px solid #CCC;
    border-top: 0;
    background-color: #FFF;
  }

  .widget-main {
    padding: 12px
  }

  .widget-box {
    padding: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    margin: 3px 0;
    border-bottom: 1px solid #CCC;
  }

  .widget-header > :first-child {
    line-height: 36px;
    padding: 0;
    margin: 0;
    display: inline;
    box-sizing: border-box;
  }

  .img-circle {
    border-radius: 50%;
  }

  .img-thumbnail {
    display: inline-block;
    max-width: 100%;
    height: auto;
    padding: 4px;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }

  img {
    vertical-align: middle;
    border: 0;
  }

  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }

  a {
    color: #337ab7;
    text-decoration: none;
    background-color: transparent;
    box-sizing: border-box;
  }

  .dialogs {
    padding: 9px 9px 0;
    position: relative;
    box-sizing: border-box;
  }

  form {
    display: block;
    margin-top: 0em;
  }

  .form-actions {
    display: block;
    background-color: #f5f5f5;
    border-top: 1px solid #e5e5e5;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 19px 20px 20px;
  }

  .input-group[class*="col-"] {
    float: none;
    padding-right: 0;
    padding-left: 0;
  }

  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
  }
  .profile-activity {
    padding: 10px 4px;
    border-bottom: 1px dotted #d0d8e0;
    position: relative;
    border-left: 1px dotted #FFF;
    border-right: 1px dotted #FFF
  }

  .profile-activity:first-child {
    border-top: 1px dotted transparent
  }

  .profile-activity:first-child:hover {
    border-top-color: #d0d8e0
  }

  .profile-activity:hover {
    background-color: #f4f9fd;
    border-left: 1px dotted #d0d8e0;
    border-right: 1px dotted #d0d8e0
  }

  .profile-activity img {
    border: 2px solid #c9d6e5;
    border-radius: 100%;
    max-width: 40px;
    margin-right: 10px;
    margin-left: 0;
    box-shadow: none
  }

  .profile-activity .thumbicon {
    background-color: #74abd7;
    display: inline-block;
    border-radius: 100%;
    width: 38px;
    height: 38px;
    color: #FFF;
    font-size: 18px;
    text-align: center;
    line-height: 38px;
    margin-right: 10px;
    margin-left: 0;
    text-shadow: none !important
  }

  .profile-activity .time {
    display: block;
    margin-top: 4px;
    color: #777
  }

  .profile-activity a.user {
    font-weight: bold;
    color: #9585bf
  }

  .profile-activity .tools {
    position: absolute;
    right: 12px;
    bottom: 8px;
    display: none
  }

  .profile-activity:hover .tools {
    display: block
  }

  .sendEmotion {
    top: -30px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAXPUlEQ…mg0LTL8RBQgsTDWt/UQQSUIB0UmnY5HgJKkHhY65s6iMB/AUgqQow5dNqpAAAAAElFTkSuQmCC) no-repeat center;
    background-size: 75%;
    cursor: pointer;
  }

  .selectPic {
    top: -30px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAN9klEQ…gw1DhRjAQgSIxRwzUHIwBBgqHGiWIkAEFijBquORiB/wMu51lnGTvZ/QAAAABJRU5ErkJggg==) no-repeat center;
    background-size: 75%;
    cursor: pointer;
  }

  input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    font: inherit;
    color: inherit;
  }

  input[type="file" i ]
  {
    align-items: baseline ;
    color: inherit ;
    text-align: start
  }
  input[type="hidden" i ],
  input[type="image" i  ],input[type="file" i ]
  {
    -webkit-appearance: initial ;
    background-color: initial ;
    padding: initial  ;
    border: initial
  }
  input {
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    user-select: text;
    cursor: auto;
    padding: 1px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
  }

  input {
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    -webkit-writing-mode: horizontal-tb;
  }

  .input-group[class*="col-"] {
    float: none;
    padding-right: 0;
    padding-left: 0;
  }

  .input-group-btn, .input-group .form-control {
    display: table-cell;
  }

  .input-group-btn {
    position: relative;
    font-size: 0;
    white-space: nowrap;
    width: 1%;
    vertical-align: middle;
    display: table-cell;
  }

  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }

  .form-control {
    height: 34px;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  input[type="text"] {
    color: #858585;
    background-color: #fff;
    border: 1px solid #d5d5d5;
    padding: 9px 4px;
    line-height: 1.2;
    font-size: 14px;
    font-family: inherit;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    -webkit-transition-duration: .1s;
    transition-duration: .1s;
  }

  .col-xs-12 {
    float: left;
    width: 100%;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  #messageContent {
    height: 100px;
    padding: 8px;
    outline: none;
    border: none;
    line-height: 150%;
    background: #fff;
    overflow: auto;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    word-break: break-all;
  }

  .btn-info, .btn-info:focus {
    background-color: #6fb3e0 !important;
    border-color: #6fb3e0;
  }

  .btn-sm {
    border-width: 4px;
    font-size: 13px;
    padding: 4px 9px;
    line-height: 1.39;
  }

  .btn-sm > [class*="icon-"].icon-on-right {
    margin-right: 0;
    margin-left: 3px;
    display: inline;
  }

  [class^="icon-"], [class*=" icon-"] {
    display: inline;
    width: auto;
    height: auto;
    line-height: normal;
    vertical-align: baseline;
    background-image: none;
    background-position: 0% 0%;
    background-repeat: repeat;
    margin-top: 0;
  }

  [class^="icon-"], [class*=" icon-"] {
    font-family: FontAwesome;
    font-weight: normal;
    text-align: center;
    font-style: normal;
    text-decoration: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .bigger-110 {
    font-size: 110%;
  }

  .btn {
    display: inline-block;
    color: #FFF !important;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25) !important;
    background-image: none !important;
    border: 5px solid #FFF;
    border-radius: 0;
    box-shadow: none !important;
    -webkit-transition: all ease .15s;
    transition: all ease .15s;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
    position: relative;
  }

  .no-radius {
    border-radius: 0 !important;
  }

  button {
    overflow: visible;
  }

  .btn-sm > [class*="icon-"] {
    margin-right: 3px;
  }

  .btn > [class*="icon-"] {
    display: inline;
  }

  [class^="icon-"], [class*=" icon-"] {
    display: inline;
    width: auto;
    height: auto;
    line-height: normal;
    vertical-align: baseline;
    background-image: none;
    background-position: 0% 0%;
    background-repeat: repeat;
    margin-top: 0;
  }

  [class^="icon-"], [class*=" icon-"] {
    font-family: FontAwesome;
    font-weight: normal;
    font-style: normal;
    text-decoration: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [class*=" icon-"], [class^="icon-"] {
    display: inline-block;
    text-align: center;
  }

  .latestSessionList {
    padding-left: 20px;
  }

  .latestSessionList .closex {
    background: url(../../../../static/images/close.png);
    -webkit-background-size: contain;
    background-size: contain;
    cursor: pointer;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    margin-top: -6px;
    left: 3px;
  }

  .latestSessionList .closex:hover {
    background: url(../../../../static/images/closeblue.png);
    -webkit-background-size: contain;
    background-size: contain;
    cursor: pointer;
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    margin-top: -6px;
    left: 3px;
  }

  .latestSessionList .lastNews {
    font-size: 12px;
    margin-left: 65px;
    margin-top: 5px;
    display: block;
    color: grey;
    width: 155px;
    overflow: hidden;
    /*文本超出显示省略号*/
    text-overflow: ellipsis;
    /*强制不换行*/
    white-space: nowrap;
  }

  .latestSessionList .newsPoint {
    position: absolute;
    top: 5px;
    left: 45px;
    background: #ff0006;
    border-radius: 20px;
    width: 15px;
    height: 15px;
    -webkit-box-shadow: 0 0 5px #ff0006;
    -moz-box-shadow: 0 0 5px #ff0006;
    box-shadow: 0 0 5px #ff0006;
  }

  /*表情样式*/
  .wl_faces_box {
    width: 428px;
    height: 225px;
    position: absolute;
    left: -10px;
    top: auto;
  }

  .wl_faces_content {
    background: #fff;
    border: 1px #ccc solid;
    width: 417px;
    height: 216px;
  }

  .wl_faces_content .title {
    background: url('../../../../static/images/wlf_title_bg.jpg') repeat-x 0 0;
    height: 40px;
    position: relative;
  }

  .wl_faces_content .title ul {

  }

  .wl_faces_content .title ul li {
    position: absolute;
    display: block;
  }

  .wl_faces_content .title ul li.title_name {
    background: url('../../../../static/images/wlf_title_btn.jpg') no-repeat 0 0;
    width: 82px;
    height: 30px;
    bottom: 0;
    _bottom: -2px;
    left: 15px;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
    color: #333;
  }

  .wl_faces_content .title ul li.wl_faces_close {
    right: 8px;
    top: 15px;
  }

  .wl_faces_content .title ul li.wl_faces_close span {
    background: url('../../../../static/images/icon.png') repeat-x 0 0;
    cursor: pointer;
    display: block;
    width: 15px;
    height: 15px;
  }

  .wl_faces_main ul {
    margin: 12px 28px;
    overflow: hidden;
    border-top: 1px #CCC solid;
    border-left: 1px #CCC solid;
    width: 360px;
    list-style: none;
  }

  .wl_faces_main ul li {
    float: left;
    border-right: 1px #CCC solid;
    border-bottom: 1px #CCC solid;
    width: 26px;
    margin: -1px 0 0 -1px;
    padding: 4px 2px;
    text-align: center;
  }

  .wl_faces_main ul li img {
    width: 22px;
    height: 22px;
  }

  .wlf_icon {
    background: url('../../../../static/images/layer_arrow.png') no-repeat 0 0;
    position: absolute;
    width: 22px;
    height: 9px;
    bottom: -4px;
    _bottom: -11px;
    left: 10px;
  }

  .sendEmotion {
    top: -30px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("../../../../static/images/emotion2.png") no-repeat center;
    -webkit-background-size: 75%;
    background-size: 75%;
    cursor: pointer;
  }

  .selectPic {
    top: -30px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("../../../../static/images/pic.png") no-repeat center;
    -webkit-background-size: 75%;
    background-size: 75%;
    cursor: pointer;
  }

  .type {
    color: #d15b47
  }

  .question-detail {
    border: 1px solid #009cdd;
    margin: 0px 15px 15px 15px;
    position: relative;
    top: 10px;
    border-radius: 10px;
    padding: 10px 15px;
  }

  .question-detail .user-name {
    color: #9585bf;
    font-weight: bold;
  }

  .question-detail .user-name span {
    color: #009cdd
  }

  .question-detail > p {
    color: #666
  }

  .question-detail .imgs img {
    display: block;
    float: left;
    width: 110px;
    height: 150px;
    margin-right: 10px;
    margin-top: 10px;
    background-color: #eee
  }

  .dialogdiv:before {
    background: none;
    border: none;
  }

  .user {
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .user img, .profile-activity img {
    width: 40px;
    height: 40px;
    border: none;
    background-image: url("../../../../static/images/user.png");
    background-size: 100%;
  }

  .itemdiv.dialogdiv:before {
    position: relative;
  }

  .itemdiv > .self {
    display: inline-block;
    width: 42px;
    position: absolute;
    right: 0;
  }

  .itemdiv.dialogdiv > .self > img {
    border-color: #c9d6e5;
  }

  .itemdiv > .self > img {
    border-radius: 100%;
    border: 2px solid #5293c4;
    max-width: 40px;
    position: relative;
  }

  .itemdiv.dialogdiv > .body-self {
    border: 1px solid #428bca;
    padding: 5px 8px 8px;
    border-right-width: 2px;
    margin-left: 1px;
    background-color: #6fb3e0;
    color: #fff;
  }

  .itemdiv > .body-self {
    width: auto;
    margin-right: 50px;
    margin-left: 12px;
    position: relative;
  }

  .dlg:before {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    bottom: 0;
    left: 19px;
    width: 3px;
    max-width: 3px;
    background-color: #e1e6ed;
    border: 1px solid #d7dbdd;
    border-width: 0 1px;
  }

  .dlg > .body-self:before {
    content: "";
    display: block;
    position: absolute;
    right: -7px;
    top: 11px;
    width: 8px;
    height: 8px;
    border: 2px solid #428bca;
    border-width: 2px 0 0 2px;
    background-color: #6fb3e0;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    -webkit-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  #messageContent {
    height: 100px;
    padding: 8px;
    outline: none;
    border: none;
    line-height: 150%;
    background: #fff;
    overflow: auto;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    word-break: break-all;
  }

  /*div编辑消息窗口的placehold功能*/
  #messageContent:empty:before {
    content: attr(data-placeholder);
    color: #bbb;
  }

  #messageContent:focus:before {
    content: none;
  }

  .activeBg {
    background-color: #f4f9fd;
  }

  .text {
    word-break: break-all;
  }
</style>
<script>
  import common from '../../../utils/common'
  import constants from '../../../utils/constants'
  import myWebImUtil from '../../../utils/myWebImUtil'
 // import ElCol from 'element-ui/packages/col/src/col'
  var conn = null
  var m = null
  export default {
    //初始化
//    components: {ElCol},
    created () {
      //common.isLogin(this);
      //模拟登陆成功
      var userInfo={
        key:{
          imThird:{
            account:'hh',
            password:'123456'
          },
          userId:'987654321'
        }
      }
      localStorage.setItem('userInfo',JSON.stringify(userInfo))
      console.log('模拟登陆成功：'+JSON.stringify(userInfo))
      //设置聊天界面的高度
      this.$nextTick(function () {
        $('.leftUser .widget-main').height($(window).height() - 174)
        $('.rightUser .widget-main').height($(window).height() - 212)
        $('#chatContain').height($(window).height() - 339)
      })

      this.$nextTick(function () {
        console.log('this.to: ' + this.to)
      })
      this.initLatestMember()
//      this.initChat(this.initData)
      this.initChat()
      this.initEmotions()
      m = this
      //点击聊天图片，查看原图
      $('#chatContain').on('click', '.chatDiv img', function () {
        myWebImUtil.showBigImgLayer($(this).parent().get(0).id)
      })
      // console.log("登录用户:" + JSON.stringify(this.userInfo));
    },
    data () {
      return {
        //当前登录用户
        userInfo: JSON.parse(localStorage.getItem('userInfo')),
        curDiv: '',
        curUserId: '',
        curMsgId: '',
        from: '',
        newFrom: '',
        keyWord: '',
        memberId: '',
        member: {},
        memberList: [],
        msgList: [],
        curMsgList: [],
        oldMsgList: [],
        latestMemberList: [],
        latestMemberCount: 0,
        sessionName: '某某',
        name: '',
        type: 78,
        // textContent: '',
        emotion: {},
        emotionMap: [],
        isShowEmotion: false,
        isShowNewPoint: false,
        newMsgContent: '',
        emojData: '',
        isShowLoad: false,
        isShowHaveMore: true,
        isShowBottom: true,
        isShowNoMore: false,
        moreText: '查看更多消息',
        noMoreText: '没有更多消息了',
        isGetOldMsg: false,
        newMsgList: [],
        isshowclosex:false
      }
    },
    computed: {
      to(){
        return this.userInfo == null ? '' : this.userInfo.key.imThird == null ? '' : this.userInfo.key.imThird.account
      },
      initData(){
        var initDataTemp = {}
        initDataTemp['user'] = this.userInfo == null
          ? ''
          : this.userInfo.key.imThird == null
            ? ''
            : this.userInfo.key.imThird.account
        initDataTemp['pass'] = this.userInfo == null
          ? ''
          : this.userInfo.key.imThird == null
            ? ''
            : this.userInfo.key.imThird.password
        return initDataTemp
      },
      isHaveMore(){
        var flag = false
        if (this.oldMsgList.length > 0 && this.isShowHaveMore) {
          flag = true
        }
        return flag
      }
    },
    watch: {
      //聊天窗口总显示最底部最新会话
      curMsgList(){
        //收到新消息
        if (this.isShowBottom) {
          var div = $('#chatContain').get(0)
          div.scrollTop = div.scrollHeight
        }
        //拉取旧消息
        if (this.isGetOldMsg) {
          //改变滚动位置
          var chatDiv = $('.chatDiv')
          var div = $('#chatContain')
          if (chatDiv.length > 10) {
            var tempScrollHeight = 0
            for (var i = chatDiv.length - 10; i < chatDiv.length; i++) {
              tempScrollHeight += chatDiv.eq(i).get(0).scrollHeight
            }
            div.scrollTop(tempScrollHeight)
          }
        }
      }
    },
    methods: {
      //加载更多消息
      loadMore(event){
        if (this.curMsgList.length <= 0) {
          return
        }
        if (this.oldMsgList.length == 0 && this.isShowHaveMore) {
          this.isShowNoMore = true
          return
        }
        var topHeight = event.target.scrollTop
        if (topHeight <= 0) {
          this.isShowLoad = true
          this.isShowHaveMore = false
          console.log('加载: ' + event.target.scrollTop)
          //拉取n条旧数据插入到消息列表前面
          setTimeout(this.getOldMsg, 1000)
        }
      },
      //拉取旧消息
      getOldMsg(){
        var len = this.oldMsgList.length
        if (len >= constants.MSG_PAGE_SIZE) {
          var temp = this.oldMsgList.slice(len - 10)
          this.curMsgList = temp.concat(this.curMsgList)
          this.oldMsgList.splice(len - 10, constants.MSG_PAGE_SIZE)
        } else {
          var temp = this.oldMsgList.slice(0)
          this.curMsgList = temp.concat(this.curMsgList)
          this.oldMsgList = []
        }
        this.isShowHaveMore = true
        this.isShowLoad = false

        this.isGetOldMsg = true
        this.isShowBottom = false
      },

      //初始化最近联系人
      initLatestMember(){//latestMemberList
        if(this.userInfo){
          var localMemberList = localStorage.getItem(this.userInfo.key.userId + '_latestMemberList')
          if (null != localMemberList) {
            this.latestMemberList = JSON.parse(localMemberList)
            this.latestMemberCount = this.latestMemberList.length
            console.log(JSON.stringify(this.latestMemberList))
          }
        }
      },

      //更新最近联系人列表
      updateLatestMember(from, newMsg){
        if(this.userInfo){
          var latestMemberList = JSON.parse(localStorage.getItem(this.userInfo.key.userId + '_latestMemberList'))
          for (var i = 0; i < latestMemberList.length; i++) {
            if (latestMemberList[i].member.user.imThird.account == from) {
              latestMemberList[i]['newMsg'] = newMsg
            } else {
              continue
            }
          }
          this.latestMemberList = latestMemberList
          console.log(JSON.stringify(latestMemberList))
          localStorage.setItem(this.userInfo.key.userId + '_latestMemberList', JSON.stringify(this.latestMemberList))
        }

//   结构：latestMemberList = [
//          {
//            'member': {
//              'name': 'admin',
//              'head': './static/images/user.png',
//              'newMsg': {
//                'newFrom': 'admin',
//                'newMsgContent': '的说法的说法',
//                'newMsgTime': '4564564564'
//              },
//              'user': {
//                'imThird': {
//                  'account': 'admin'
//                }
//              },
//              'id': '123456'
//            },
//            'newMsg': ''
//          }
//        ]
      },

      //拉取本地消息记录
      getLocalMsg(){
        this.curMsgList = []//清空当前数据
        this.oldMsgList = []//清空剩余数据
        //清除过期数据
        myWebImUtil.clearOutTimeData(this.userInfo.key.userId + '_' + this.from, constants.LOCAL_MSG_DAY)
        //如果本地数据没有则拉取服务器消息记录
        var localMsg = localStorage.getItem(this.userInfo.key.userId + '_' + this.from)
        console.log('缓存消息 ：' + localMsg)
        if (null === localMsg) {
          //拉取服务端消息记录
          this.msgList = []
          this.curMsgList = []
        } else {
          //拉取本地消息记录
          this.msgList = JSON.parse(localMsg)
          var len = this.msgList.length
          if (len >= constants.MSG_PAGE_SIZE) {
            this.curMsgList = this.msgList.slice(len - 10)
            this.oldMsgList = this.msgList.slice(0, len - 10)
          } else {
            this.curMsgList = this.msgList.slice(0)
          }
        }
      },
      //创建聊天窗口
      createChat(member, type, newMsg){
        this.isShowLoad = false
        this.isShowHaveMore = false
        this.isShowBottom = true
        this.isShowNoMore = false
        this.isGetOldMsg = false
        $('#messageContent').html('')

        //从ext扩展消息中获取发送消息的用户详情
        this.member=member
        this.memberId = this.member.id;
        console.log(JSON.stringify(this.member))
        if (type == 1) {
          if (!myWebImUtil.contains(this.latestMemberList, this.memberId)) {
            var latestMember = {member:this.member}
            latestMember['newMsg'] = newMsg
            this.latestMemberList.push(latestMember)
            this.latestMemberCount = this.latestMemberList.length
            localStorage.setItem(this.userInfo.key.userId + '_latestMemberList',
              JSON.stringify(this.latestMemberList))
          }
        }
        if (!newMsg) {
           console.log("没有新消息,");
          this.sessionName = this.member.name
          this.name = this.member.name
          this.from = this.member.user.imThird.account
          //拉取本地消息
          this.getLocalMsg()
          this.newMsgContent = ''
          this.isShowNewPoint = false
        }else{
          this.isShowNewPoint = true
        }
        if (type == 2) {
          this.updateLatestMember(this.from, null)
        }
      },
      //快键键发送消息
      fastSend(event){
        if (event.keyCode == 13 && event.ctrlKey) {
          this.sendMessage()
        }
//        if (event.keyCode == 13) {
//          this.sendMessage()
//        }
      },
      //发送文本消息
      sendMessage(){
        //div编辑框中要显示表情，而发送的却要是表情字符串。
        var clone = $('#messageContent').clone(true)
        var len = clone.find('img').length
        for (var i = len - 1; i >= 0; i--) {
          var emotionid = clone.find('img').eq(i).data('emotionid')
          emotionid = emotionid.replace(/</g, '&lt;').replace(/>/g, '&gt;')

          clone.find('img').eq(i).replaceWith(emotionid)
        }
        var message = clone.text()//处理之后的待发送内容
        if ('' === message) {
          alert('发送内容不能为空')
          return
        }
        var msgContent = WebIM.utils.parseEmoji(message)
        this.sendPrivateText(message, this.from, 2)//客服咨询type是2
        var msg = {
          'msgFrom': this.to,
          'msgContent': msgContent,
          'msgTime': myWebImUtil.getSendTime()
        }
        this.curMsgList.push(msg)
        var localMsg = localStorage.getItem(this.userInfo.key.userId + '_' + this.from)
        if (null !== localMsg) {
          //拉取本地消息记录
          this.msgList = JSON.parse(localMsg)
        }
        this.msgList.push(msg)
        //保存本地
        localStorage.setItem(this.userInfo.key.userId + '_' + this.from, JSON.stringify(this.msgList))
        $('#messageContent').html('')
        this.isShowEmotion = false
      },

      //发送图片消息
      sendPicture(fileId){
        console.log(fileId)
        var id = conn.getUniqueId()                    // 生成本地消息id
        var msg = new WebIM.message('img', id)         // 创建文件消息
        var input = document.getElementById(fileId)    // 选择文件的input
        var file = WebIM.utils.getFileUrl(input)       // 将文件转化为二进制文件
        console.warn(file)
        var uploadUrl = ''
        var allowType = {
          'jpg': true,
          'gif': true,
          'png': true,
          'bmp': true
        }
        if (file.filetype.toLowerCase() in allowType) {
          var option = {
            apiUrl: WebIM.config.apiURL,
            file: file,
            to: this.from,                          // 接收消息对象
            roomType: false,
            ext: {
              "type": 2,//客服咨询种类是2
              "senderId": "",
              "receiverId": "",
              "senderType": 2,//平台医生
              "senderHead": "",
              "senderNickName":""
            },
            chatType: 'singleChat',
            onFileUploadError: function () {      // 文件上传失败
              console.log('上传文件失败')
            },
            onFileUploadComplete: function (data) {   // 文件上传成功
              console.log(data)
              if (data && WebIM.utils.isCanUploadFile) {
                uploadUrl = data.uri + '/' + data.entities[0].uuid
              } else {
                uploadUrl = file.url
              }
            },
            success: function () {                // 消息发送成功
              var msgContent = '<img src="' + uploadUrl + '" width="200"/>'
              var msgJson = {
                'msgFrom': m.to,
                'msgContent': msgContent,
                'msgTime': myWebImUtil.getSendTime()
              }
              m.curMsgList.push(msgJson)
              var localMsg = localStorage.getItem(m.userInfo.key.userId + '_' + m.from)
              if (null !== localMsg) {
                //拉取本地消息记录
                m.msgList = JSON.parse(localMsg)
              }
              m.msgList.push(msgJson)
              //保存本地
              localStorage.setItem(m.userInfo.key.userId + '_' + m.from, JSON.stringify(m.msgList))
              $('#messageContent').html('')
              m.isShowEmotion = false
            },
            flashUpload: WebIM.flashUpload
          }
          msg.set(option)
          conn.send(msg.body)
        }
      },

      //初始化表情
      initEmotions(){
        var emotion = this.loadEmotions()
        this.emotion = emotion
        var maps = emotion.map
        var emotionMap = []
        for (var i in maps) {
          emotionMap.push({key: i, val: require('../../../../static/images/faces/' + maps[i])})
        }
        this.emotionMap = emotionMap
      },

      //选择表情
      selectEmotion(event){
        var content = '<img class="em-emotion" src="' + event.target.src + '" data-emotionid="' + event.target.id + '"/>'
        $('#messageContent').append(content)
        // this.textContent += e.target.id;
        this.isShowEmotion = false
        this.setFocus()
      },

      //输入之后将光标移到最后
      setFocus(){
        var el = document.getElementById('messageContent')
        el.focus()
        if ($.support.msie) {
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

      //选择图片
      selectPic(){
        //触发 文件选择的click事件
        $('.file').trigger('click')
      },

      //选择图片之后
      onChangeSelectPic(file){
        this.sendPicture(file)
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

      //加载表情
      loadEmotions() {
        WebIM.Emoji = {
          path: constants.PATH_EMOTION  /*表情包路径*/
          , map: {
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

      //环信登录
      login(){
        var user = this.initData.user
        var pass = this.initData.pass
//        var user = 'hh'
//        var pass = '123456'
        conn.open({
          apiUrl: WebIM.config.apiURL,
          user: user,
          pwd: pass,
          appKey: WebIM.config.appkey
        })
      },

      //处理文本消息
//  {
//    "id": "358635182078559360",
//    "type": "chat",
//    "from": "admin",
//    "to": "hh",
//    "data": "dsfdsfa",
//    "ext": {
//      "type": 2,//客服咨询
//      "senderId": 3124,
//      "receiverId": 333,
//      "senderType": 2,//1是会员发送，2是平台医生发送
//      "senderHead": "http://1.jpg"
//  },
//    "error": false,
//    "errorText": "",
//    "errorCode": ""
//  }
      handleTextMessage(message){
        console.log('接受到的文本消息： ' + JSON.stringify(message))
        this.isShowBottom = true
        this.isGetOldMsg = false
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        var ext = message.ext                   //扩展消息
        var msgContent = message.data          //消息内容
        var from = message.from.toLowerCase()  //发送消息者
        ext['imThirdAccount']=from
        var to = message.to.toLowerCase()      //接收消息者
        var type = message.type                //消息类型
        var msg = {
          'msgFrom': from,
          'msgContent': msgContent,
          'msgTime': myWebImUtil.getSendTime()
        }
        var localMsg = localStorage.getItem(this.userInfo.key.userId + '_' + from)
        if (null === localMsg) {
          //拉取服务端消息记录
          this.msgList = []
          this.curMsgList = []
        } else {
          //拉取本地消息记录
          this.msgList = JSON.parse(localMsg)
        }
        this.msgList.push(msg)
        //保存本地
        localStorage.setItem(this.userInfo.key.userId + '_' + from, JSON.stringify(this.msgList))
        if (this.from !== '' && this.from === from) {
          this.curMsgList.push(msg)
        } else {
          var newMsg = {}
          newMsg['newFrom'] = from
          newMsg['newMsgContent'] = msgContent
          newMsg['newMsgTime']=myWebImUtil.getSendTime()
          let member = {
            'name': ext.senderNickName,
            'head': ext.senderHead,
            'user': {
              'imThird': {
                'account': ext.imThirdAccount
              }
            },
            'id': ext.senderId
          }
          this.createChat(member, 1, newMsg)
          //添加新消息缓存
          localStorage.setItem(this.userInfo.key.userId + '_' + from + '_new', JSON.stringify(newMsg))
          //更新最近联系人
          this.updateLatestMember(from, newMsg)
        }
      },

      //处理表情消息
      handleEmoji(message) {
        console.log('接受到表情消息： ' + JSON.stringify(message))
        this.isShowBottom = true
        this.isGetOldMsg = false
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        var ext = message.ext
        var data = message.data               //消息内容
        var msgContent = ''
        var from = message.from.toLowerCase()  //发送消息者
        ext['imThirdAccount']=from
        var to = message.to.toLowerCase()      //接收消息者
        var type = message.type                //消息类型
        for (var i = 0, l = data.length; i < l; i++) {
          if (data[i].type == 'txt') {
            msgContent += data[i].data
          } else {
            this.emojData = data[i].data
            msgContent += '<img class="em-emotion" src="' + this.emojData + '"/>'
          }
        }
        var msg = {
          'msgFrom': from,
          'msgContent': msgContent,
          'msgTime': myWebImUtil.getSendTime()
        }
        var localMsg = localStorage.getItem(this.userInfo.key.userId + '_' + from)
        if (null === localMsg) {
          //拉取服务端消息记录
          this.msgList = []
          this.curMsgList = []
        } else {
          //拉取本地消息记录
          this.msgList = JSON.parse(localMsg)
        }
        this.msgList.push(msg)
        //保存本地
        localStorage.setItem(this.userInfo.key.userId + '_' + from, JSON.stringify(this.msgList))
        if (this.from === from) {
          this.curMsgList.push(msg)
        } else {
          var newMsg = {}
          newMsg['newFrom'] = from
          newMsg['newMsgContent'] = msgContent
          newMsg['newMsgTime']=myWebImUtil.getSendTime()
          let member = {
            'name': ext.senderNickName,
            'head': ext.senderHead,
            'user': {
              'imThird': {
                'account': ext.imThirdAccount
              }
            },
            'id': ext.senderId
          }
          this.createChat(member, 1, newMsg)
          //添加新消息缓存
          localStorage.setItem(this.userInfo.key.userId + '_' + from + '_new', JSON.stringify(newMsg))
          //更新最近联系人
          this.updateLatestMember(from, newMsg)
        }
      },

      //处理音频消息
      handleAudioMessage(message){
        console.log('接受到音频消息： ' + JSON.stringify(message))
        this.isShowBottom = true
        this.isGetOldMsg = false
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        var ext = message.ext
        var options = {url: message.url}
        var from = message.from.toLowerCase()  //发送消息者
        ext['imThirdAccount']=from
        options.onFileDownloadComplete = function (response) {
          var objectUrl = WebIM.utils.parseDownloadResponse.call(this, response)
          var downloadUrl = message.url
          console.log(objectUrl)
          // var msgContent = '<audio controls><source src="'+downloadUrl+'">您的浏览器不支持audio元素。</audio>';
          var msgContent = '<audio controls><source src="' + objectUrl + '">您的浏览器不支持audio元素。</audio>'
          var msg = {
            'msgFrom': from,
            'msgContent': msgContent,
            'msgTime': myWebImUtil.getSendTime()
          }
          var localMsg = localStorage.getItem(m.userInfo.key.userId + '_' + from)
          if (null === localMsg) {
            //拉取服务端消息记录
            m.msgList = []
            m.curMsgList = []
          } else {
            //拉取本地消息记录
            m.msgList = JSON.parse(localMsg)
          }
          m.msgList.push(msg)
          //保存本地
          localStorage.setItem(m.userInfo.key.userId + '_' + from, JSON.stringify(m.msgList))
          if (m.from === from) {
            m.curMsgList.push(msg)
          } else {
            var newMsg = {}
            newMsg['newFrom'] = from
            newMsg['newMsgContent'] = '您有新语音消息'
            newMsg['newMsgTime']=myWebImUtil.getSendTime()
            let member = {
              'name': ext.senderNickName,
              'head': ext.senderHead,
              'user': {
                'imThird': {
                  'account': ext.imThirdAccount
                }
              },
              'id': ext.senderId
            }
            m.createChat(member, 1, newMsg)
            //添加新消息缓存
            localStorage.setItem(m.userInfo.key.userId + '_' + from + '_new', JSON.stringify(newMsg))
            //更新最近联系人
            m.updateLatestMember(from, newMsg)
          }
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

      //处理图片消息
      handlePictureMessage(message) {
        console.log('接受到图片消息： ' + JSON.stringify(message))
        this.isShowBottom = true
        this.isGetOldMsg = false
        if (this.curMsgId != '' && this.curMsgId == message.id) {
          return
        }
        this.curMsgId = message.id
        var ext = message.ext
        var filename = message.filename
        var from = message.from.toLowerCase()  //发送消息者
        ext['imThirdAccount']=from
        var options = message
        options.onFileDownloadComplete = function (response, res) {
          // var objectUrl = WebIM.utils.parseDownloadResponse(response);
          var downloadUrl = message.url
          console.log('收到图片地址： ' + downloadUrl)
          var msgContent = '<img src="' + downloadUrl + '" width="200"/>'
          var msg = {
            'msgFrom': from,
            'msgContent': msgContent,
            'msgTime': myWebImUtil.getSendTime()
          }
          var localMsg = localStorage.getItem(m.userInfo.key.userId + '_' + from)
          if (null === localMsg) {
            //拉取服务端消息记录
            m.msgList = []
            m.curMsgList = []
          } else {
            //拉取本地消息记录
            m.msgList = JSON.parse(localMsg)
          }
          m.msgList.push(msg)
          //保存本地
          localStorage.setItem(m.userInfo.key.userId + '_' + from, JSON.stringify(m.msgList))
          if (m.from === from) {
            m.curMsgList.push(msg)
          } else {
            var newMsg = {}
            newMsg['newFrom'] = from
            newMsg['newMsgContent'] = '您有新图片消息'
            newMsg['newMsgTime']=myWebImUtil.getSendTime()
            let member = {
              'name': ext.senderNickName,
              'head': ext.senderHead,
              'user': {
                'imThird': {
                  'account': ext.imThirdAccount
                }
              },
              'id': ext.senderId
            }
            m.createChat(member, 1, newMsg)
            //添加新消息缓存
            localStorage.setItem(m.userInfo.key.userId + '_' + from + '_new', JSON.stringify(newMsg))
            //更新最近联系人
            m.updateLatestMember(from, newMsg)
          }
        }
        options.onFileDownloadError = function (e) {
          //图片下载失败
        }
        WebIM.utils.download.call(conn, options)
      },

      //发送文本消息(单聊)
      sendPrivateText(message, to, type) {
        var id = conn.getUniqueId()                 //生成本地消息id
        var msg = new WebIM.message('txt', id)      //创建文本消息
        msg.set({
          msg: message,                            //消息内容
          to: to,                                  // 接收消息对象（用户id）
          roomType: false,
          ext: {
            "type": type,//客服咨询种类是2,快速提问种类是1
            "senderId": "",
            "receiverId": "",
            "senderType": 2,//平台医生
            "senderHead": "",
            "senderNickName":""
          },
          success: function (id, serverMsgId) {
            console.log('发送成功: ' + id + ':' + serverMsgId)
          }
        })
        msg.body.chatType = 'singleChat'
        conn.send(msg.body)
      },

      //关闭会话
      shutdownSession(index){
        this.member = {}
        this.from = ''
        this.curMsgList = []
        this.msgList = []
        this.oldMsgList = []
        this.sessionName = ''
        this.isShowBottom = true
        this.isGetOldMsg = false
        this.latestMemberList.splice(index, 1)
        this.latestMemberCount = this.latestMemberList.length
        localStorage.setItem(this.userInfo.key.userId + '_latestMemberList', JSON.stringify(this.latestMemberList))
      }
    },
  }
</script>
