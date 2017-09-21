<template>
  <div class="space" ref="sheight">
    <div class="circuitList">
      <!--发起申请-->
      <div class="circuitBox" :class="{circuitBoxBlue:applicationInfoisBlueBox==true}" v-for="item in datas" v-if="item.eventStatus==1">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"发起申请":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <div class="initiateBox" @click="applicationInfoisBlue" v-if="item.applicationInfo!=null">
            <router-link :to="{name:'accompanyInfo',params:{id:item.appId}}">
              <p class="p1">{{item.applicationInfo.patientName}} <span>{{item.applicationInfo.sex}} {{item.applicationInfo.age}}岁</span><i class="rightIcon"></i></p>
              <p>就诊时间：{{item.applicationInfo.visitDate|getTime}}</p>
              <p>就诊医院：{{item.applicationInfo.visitHosp}}</p>
              <p>陪诊人数：男{{item.applicationInfo.maleNum}}人，女{{item.applicationInfo.femaleNum}}人</p>
              <p>车接送：{{item.applicationInfo.specialCar==1?"是":"否"}}</p>
              <p>陪诊项目：{{item.applicationInfo.procedureList.productName}}</p>
              <p>申请时间：{{item.applicationInfo.applyDate|getTimeStamp}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <!--等待服务-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==3">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"等待确认":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>您的申请已发起成功，请您保持手机畅通，平台会有专业的医疗人员和您联系</p>
        </div>
      </div>
      <!--确认需求-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==4" :class="{circuitBoxBlue:sureDemandResultBlueBox==true}">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc" >
          <h6>{{item.eventStatusName==null?"确认需求":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <div class="initiateBox demandBox" v-if="item.sureDemandResultDto!=null">
            <router-link :to="{name:'accompanySure',params:{id:item.appId}}">
              <p class="p1">{{item.sureDemandResultDto.patientName}} <span>{{item.sureDemandResultDto.sex==1?"男":"女"}} {{item.sureDemandResultDto.age}}岁</span><i class="rightIcon"></i></p>
              <p>就诊时间：{{item.sureDemandResultDto.visitDate|getTime}}</p>
              <p>就诊医院：{{item.sureDemandResultDto.visitHosp}}</p>
              <p>陪诊人数：男{{item.sureDemandResultDto.maleNum==null?0:item.sureDemandResultDto.maleNum}}人，女{{item.sureDemandResultDto.femaleNum==null?0:item.sureDemandResultDto.femaleNum}}人</p>
              <p>车接送：{{item.sureDemandResultDto.specialCar==1?"是":"否"}}</p>
              <p v-for="procedureList in item.sureDemandResultDto.procedureList">陪诊项目：{{procedureList.productName}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <!--预约中-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==8">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>预约中<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>平台尽快给您提供陪诊人员以及相关事项</p>
        </div>
      </div>
      <!--已取消-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==11">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"已取消":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>您的申请已取消成功！取消原因{{item.hisDesc==null?"未填写":item.hisDesc}}</p>
        </div>
      </div>
      <!--预约成功-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==9">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"预约成功":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <i class="subscriptG"></i>
          <p v-if="item.aboutResultDto!=null">已安排
            <span v-for="(accompMemberList,index) in item.aboutResultDto.accompMemberList" v-if="index<3">{{accompMemberList.givenName}}<span v-show="index!=2">、</span></span>
            <span v-show="item.aboutResultDto.accompMemberList==undefined?'':item.aboutResultDto.accompMemberList.length>2">等</span>为您进行陪诊，陪诊时间{{item.aboutResultDto.visitDate|getTime}}地点{{item.aboutResultDto.visitHospName}}
          </p>
        </div>
      </div>
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==10">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"预约失败":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <i class="subscriptR"></i>
          <p>由于最近时间安排不开，故此取消本次陪诊申请，谢谢</p>
        </div>
      </div>
      <!--等待陪诊-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==14">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"等待陪诊":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <a class="upload" v-show="item.accompReadyFlag!=1" @click="messageBoxShow">人员已到位<i class="rightIcon"></i></a>
          <a class="upload font999" v-show="item.accompReadyFlag==1" disabled>人员已到位<i class="rightIcon"></i></a>
        </div>
      </div>
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==15">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"陪诊中":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>{{item.hisDesc==null?'':item.hisDesc}}</p>
        </div>
      </div>
      <!--上传病历 已上传-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==18">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"已上传病历":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <div class="sureExpert" v-if="item.elecMedicalRdResultDto!=null">
            <div class="recordsImg" v-for="(img,index) in images" v-if="index<4">
              <img :src="img" onerror="this.src='./img/picture.png';this.onerror=null"/>
            </div>
            <router-link disabled to="">{{item.elecMedicalRdResultDto.medicalRdDesc}}<i></i></router-link>
          </div>
        </div>
      </div>
      <!---快递信息---->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==30">
        <img class="circuitIcon" :src="'./img/circuit9.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"通知":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>{{item.hisDesc==null?'':item.hisDesc}}</p>
        </div>
      </div>
      <!---陪诊完成---->
      <!--<div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==16">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"陪诊完成":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>{{item.hisDesc==null?'':item.hisDesc}}</p>
        </div>
      </div>-->
    </div>
    <!--确认人员已到位-->
    <transition name="openmessage">
      <div class="pick-mark" v-show="messageBoxVisition">
        <div class="messageBox">
          <h4>您确定陪诊员已到位吗？</h4>
          <a class="cancelBtn" disabled  @click="cancel">取消</a>
          <a class="confirmBtn" disabled  @click="confirm">确定</a>
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
  import api from '../../server/api'
  import { MessageBox } from 'mint-ui';
  import wechatUtils from '../../commonutils/wechatUtils'
  const wx=require('weixin-js-sdk')
    export default {
        name:'accompanyCicuit',
        data () {
            return {
              messageBoxVisition:false,
              //todo 测试用 appId:158,
              datas:[],
              images:[],
              haveeventStatus14:true,
            }
        },
        computed: {
          applicationInfoisBlueBox(){
            return localStorage.getItem('applicationInfoisBlueBox')
          },
          scrollTop(){
              return this.$store.state.accompany.accompany.scrollTop
          },
          appId(){
            return this.$route.params.appId
          },
          sureDemandResultBlueBox(){
            return localStorage.getItem('sureDemandResultBlueBox')
          },
        },
        created () {

        },
      beforeRouteLeave(to, from, next){
            let _this=this
        console.warn(document.body.scrollTop)
        this.$store.commit('accompany/changeaccompany',{scrollTop:document.body.scrollTop})
        console.log(_this.$store.state.accompany.accompany.scrollTop)

        if(to.path.split('/')[2]!="accompanyInfo" && to.path.split('/')[2]!="accompanySure"){
          console.log(to.path.split('/')[2]);
          _this.$store.dispatch('accompany/revertState')
        }
        next ()

      },
  watch: {},
      methods: {
        handleback(){
          //alert("监听到页面后退按钮");//根据自己的需求实现自己的功能
          if ('wx' == window.Browser_Environment_Oklife) {
            if (wx) {
              wx.ready(function () {
                wx.closeWindow()
              })
            } else if (WeixinJSBridge) {
              WeixinJSBridge.call('closeWindow')
            }
          } else if ('app' == window.Browser_Environment_Oklife) {
            let jump = {//返回上层原生页面
              'nativeType': 'back'
            }
            let Success = () => {}
            let error = () => {}
            cordova.plugins.oklife.skipNative(Success, error, jump)//调用原生插件跳入原生快速咨询页面
          }
        },
        applicationInfoisBlue(){
          if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('applicationInfoisBlueBox', 'false')
          }
        },
        sureDemandResultBlue(){
          if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('sureDemandResultBlueBox', 'false')
          }
        },
        messageBoxShow(){
          this.messageBoxVisition = true
          this.$off('click', this.messageBoxShow)
        },
        cancel(){
          this.messageBoxVisition = false
        },
        confirm(){
          let _this = this
          api.sureAccompOKHandle({params: {appId: _this.appId}}).then(res => {
            if (res == undefined) {
              return false
            } else if (res.code == 0) {
              _this.$off('click', confirm)
            }
          })
          this.messageBoxVisition = false
        },
      },
      mounted () {
        let _this=this
        this.$store.commit('common/changeHeaderConf', {
          isshow:true,//是否显示头部
          isBack: true,  // 是否显示返回
          handleback:_this.handleback,
          isShare: false, // 是否显示分享
          isSkip: false,//是否显示跳过
          skipto: '',//点跳过后到哪个路由页面
          title: '陪诊申请' // 标题
        });
        api.getEventInfOfAppId({params:{appId:_this.appId}}).then(res=>{
          if(res==undefined){
            return false
          }else if(res.code==0){
            _this.datas=res.data
            var result =res.data;
            for(var i=0;i<result.length;i++) {
              if(18==result[i].eventStatus)
              {
                var fileList =result[i].elecMedicalRdResultDto.fileList;
                //console.warn(fileList)
                if(fileList==null){
                  return false;
                }else{
                  for(var i=0;i<fileList.length;i++) {
                    if(fileList[i].filePath==null) {
                      let callback=(localId)=>{
                        _this.images.push(localId)
                      }
                      wechatUtils.wxdownloadImage(fileList[i].mediaCode, callback, wx)
                    }else{
                      _this.images.push (fileList[i].filePath)
                    }
                  }
                }
                break;
              }else{

              }
            }
            _this.$nextTick(()=>{
              if (_this.scrollTop===""||_this.scrollTop===null) {
                console.log(_this.scrollTop);
                document.body.scrollTop = _this.$refs.sheight.offsetHeight-document.body.clientHeight+100;
              }else{
                document.body.scrollTop=_this.scrollTop
              }
            })
            _this.haveeventStatus14=14;
            var result =res.data;
            for(var i=0;i<result.length;i++) {
              if(_this.haveeventStatus14==result[i].eventStatus)
              {
                _this.haveeventStatus14 = false;
                console.log(_this.haveeventStatus14);
                break;
              }
            }

          }
        });
      },
      components: {
        MessageBox
      },
    }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .circuitList{margin-top:px2rem(108);}
  .circuitList .circuitBox{
    width:px2rem(646);
    height:auto;
    padding-bottom:px2rem(100);
    margin-left:px2rem(66);
    border-left:px2rem(4) solid transparent;
    -webkit-border-image:url(../../assets/border.png) 0 4 repeat; /* Safari 5 */
    -o-border-image:url(../../assets/border.png) 0 4 repeat; /* Opera */
    border-image:url(../../assets/border.png) 0 4 repeat;
    position:relative;
  }

  .circuitBox .circuitIcon{position:absolute;top:px2rem(54);left:px2rem(-52); width:px2rem(80);height:px2rem(80); border:px2rem(10) solid #EFEFF4;
  border-radius: 50%;}
  .circuitList .circuitBox:first-child .circuitIcon{position:absolute;top:0;left:px2rem(-52); width:px2rem(80);height:px2rem(80);padding-top:px2rem(54);background:#EFEFF4; border:px2rem(10) solid #EFEFF4;
    border-radius:px2rem(40);}
  .circuitList .circuitBox:last-child{
    border-left:px2rem(4) solid transparent;
    -webkit-border-image:url(../../assets/borderBottom.png) 0 0 0 4 stretch; /* Safari 5 */
    -o-border-image:url(../../assets/borderBottom.png) 0 0 0 4 stretch; /* Opera */
    border-image:url(../../assets/borderBottom.png) 0 0 0 4 stretch;}

  .circuitBox .circuitDesc{
    width:px2rem(512);
    height:auto;
    padding:px2rem(30);
    border:1px solid #e1e1e1;
    border-radius:px2rem(8);
    background: #ffffff;
    position:relative;
    top:0;left:px2rem(66); overflow:auto;
  }
  .circuitBox .riangle{
    width:0;
    height:0;
    border-top:px2rem(12) solid transparent;
    border-bottom:px2rem(12) solid transparent;
    border-right:px2rem(12) solid #e1e1e1;
    position:absolute;
    top:px2rem(88);
    left:px2rem(56);z-index:2;
  }
  .circuitBox .riangleW{
    width:0;
    height:0;
    border-top:px2rem(10) solid transparent;
    border-bottom:px2rem(10) solid transparent;
    border-right:px2rem(10) solid #fff;
    position:absolute;
    top:px2rem(90);
    left:px2rem(58);
    z-index:2;
  }
  .circuitDesc h6{
    font-weight:normal;
    font-size:px2rem(32);color:$font333;
    line-height:px2rem(60);
    width:100%;
    margin-bottom:px2rem(10);
  }
  .circuitDesc h6 span{display:inline-block;float: right;color:$font999;font-size:px2rem(26);}
  i.subscriptR{
    display:inline-block;
    position:absolute;
    top:0px;
    right:0px;
    width:px2rem(20);
    height:px2rem(20);
    background:url("../../assets/subscriptR.png") no-repeat;
    background-size:px2rem(20);
  }
  i.subscriptG{
    display:inline-block;
    position:absolute;
    top:0px;
    right:0px;
    width:px2rem(20);
    height:px2rem(20);
    background:url("../../assets/subscriptG.png") no-repeat;
    background-size:px2rem(20);
  }
  .circuitDesc p{
    font-size:px2rem(26);
    color:$font666;
    line-height:px2rem(40);
    margin:px2rem(10) 0;
  }
  .circuitDesc p.fontfff{color:$fontfff;}
  .circuitDesc p.tab{}
  .circuitDesc p.tab span{
    display:inline-block;
    margin-right:px2rem(20);
    font-size:px2rem(26);
    color:#83a6e1;
    background:#ecf2fe;
    padding:px2rem(4);
    border:1px solid #b4cdf8;
    border-radius:px2rem(4);
    line-height:px2rem(26)
  }
  .circuitDesc p.assess{line-height:px2rem(60);}
  .circuitDesc p.assess a{
    width:px2rem(138);
    height:px2rem(58);
    border:1px solid #4385f5;
    border-radius:px2rem(8);
    float: right;
    color:#4385f5;
    font-size:px2rem(28);
    text-align: center;
    display:inline-block;
  }
  .circuitDesc a.upload{
    padding-top:px2rem(20);
    border-top:1px solid #d9d9d9;
    color:#4385f5;
    font-size:px2rem(28);line-heihgt:px2rem(30);
    display:inline-block;
    width:100%;
  }
  .circuitDesc a.upload .rightIcon{
    float:right;
    display:inline-block;
    width:px2rem(16);
    height:px2rem(30);
    background:url("../../assets/go.png") no-repeat left bottom;
    background-size:px2rem(16);
  }
  .circuitDesc a.font999{
    color:$font999;
  }
    .sureExpert {
    float: left;
    width: px2rem(472);
    padding: px2rem(20);
    padding-bottom:0;
    background: #efeff3;
    border: 1px solid #e1e1e1;
    margin-bottom: px2rem(10);
  }
  .sureExpert:before,.sureExpert:after{
    content: "";
    clear: both;
  }
  .sureExpert .expertPhotoBox {
    width: px2rem(96);
    height: px2rem(96);
    border-radius: px2rem(8);
    float: left;
    position: relative;
  }
  .sureExpert .expertPhotoBox img{
    width:100%;height:100%;
  }
  .sureExpert .expertPhotoBox p{
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    background:rgba(0,0,0,0.5);
    color:#fff;
    line-height:px2rem(24);
    font-size:px2rem(16);
    margin:0;
    text-align: center ;
  }
  .sureExpert .expertBoxP {
    display: inline-block;
    margin-left: px2rem(20);
    float: left;
    width: px2rem(355);
  }
  .expertBoxP p {
    font-size: px2rem(24);
    color:$font666;
    line-height: px2rem(34);
    margin:0;
  }

  .expertBoxP p.p1 {
    font-size:px2rem(28);
    color:$font333;
  }

  .expertBoxP p.p1 span {
    margin-left:px2rem(10);
    font-size: px2rem(18);
    background:#8fc658;
    color:#fff;
    padding:px2rem(2) px2rem(8);
    border-radius:px2rem(18);
  }
  .expertBoxP p.tab span {
    padding: 0 px2rem(6);
    border-radius: px2rem(4);
    background: #ecf2fe;
    border: 1px solid #b4cdf7;
    margin-right: px2rem(20);
    font-size: px2rem(24);
    color: #8eaee4;
  }
  .sureExpert a{
    margin-top:px2rem(28);
    border-top:1px solid #d9d9d9;
    font-size:px2rem(26);
    line-height:px2rem(60);
    display: inline-block;
    width:100%;
    color:$font999;
  }
  .sureExpert a i,.initiateBox p.p1 i
  {
    float:right;
    display:inline-block;
    width:px2rem(16);
    height:px2rem(60);
    background:url("../../assets/go.png") no-repeat left center;
    background-size:px2rem(16);

  }
  .initiateBox{
    background:#e8eef9;padding:px2rem(20);
  }
  .initiateBox p.p1{font-size:px2rem(28);color:$font333;margin:0;}
  .initiateBox p.p1 span{font-size:px2rem(26); color:$font666;}
  .initiateBox p.p1 i{height:px2rem(40);}
  .initiateBox p.ellipsis{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
  }
  .initiateExpertBox{
    margin-top:px2rem(20);
    border: none;
    padding-bottom:px2rem(20);
  }

  .demandBox a{display:inline-block;width:100%;
    margin:0;}
  .demandBox>p{margin:0;}
  .demandBox p.p1,.initiateBox p.p1{border-bottom:1px solid #d9d9d9;padding:px2rem(10) 0;line-height:px2rem(60);margin-bottom:px2rem(20);}
  .circuitBoxBlue .circuitDesc{background:#679ef8;}
  .circuitBoxBlue .riangle{border-right:px2rem(12) solid #679ef8;}
  .circuitBoxBlue .riangleW{border-right:px2rem(10) solid #679ef8;}
  .circuitBoxBlue .circuitDesc h6,.circuitBoxBlue .circuitDesc h6 span{color:$fontfff;}
  .messageBox{text-align: center;width:px2rem(540);height:px2rem(208);background:#fff;border-radius:px2rem(24);
    position:fixed;top:50%;margin-top:px2rem(-52);left:px2rem(105);}
  .messageBox  h4{color:#000;font-size:px2rem(34);line-height:px2rem(120);border-bottom:1px solid #ddd;}
  .messageBox  a{ width:px2rem(268);height:px2rem(88);color:#0079ff;display:inline-block;float: left;line-height:px2rem(88);border-right:1px solid #ddd;}
  .messageBox  a:last-child{border:none;}
  .pick-mark {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);z-index: 3;}
  .openmessage-enter-active,.openmessage-leave-active {

    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin:50% 50%;
    -moz-transform-origin:50% 50%;
    -ms-transform-origin:50% 50%;
    transform-origin:50% 50%;
    opacity: 1;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

  }
  .openmessage-enter, .openmessage-leave-active {
    -webkit-transform: scale(0.4);
    -moz-transform: scale(0.4);
    -ms-transform: scale(0.4);
    transform: scale(0.4);
    opacity: 0;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }
</style>
