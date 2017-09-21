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
            <router-link :to="{name:'applicationInfo',params:{id:item.appId}}">
              <p class="p1">{{item.applicationInfo.patientName}} <span>{{item.applicationInfo.sex}} {{item.applicationInfo.age}}岁</span><i class="rightIcon"></i></p>
              <p class="ellipsis">{{item.applicationInfo.content}}</p>
            </router-link>
          </div>
          <div class="sureExpert initiateExpertBox" v-if="item.appointSpeclistInfo!==null">
            <div class="expertPhotoBox">
              <img class="expertPhoto" :src="item.appointSpeclistInfo.headPath==null?
              './img/man.png':item.appointSpeclistInfo.headPath"/>
            </div>
            <div class="expertBoxP">
              <p class="p1">{{item.appointSpeclistInfo.givenName}}<span> {{item.appointSpeclistInfo.titleName}} </span></p>
              <p class="tab">
                <span v-for="tab in item.appointSpeclistInfo.diseaseList">{{tab.disName}}</span>
              </p>
              <p>已诊断:{{item.appointSpeclistInfo.receiver}}人 &nbsp; 被关注:{{item.appointSpeclistInfo.follower}}人</p>
            </div>
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
          <p>恭喜您已提交成功，请保持联系电话畅通，平台医生将与您确认大病求医需求</p>
        </div>
      </div>
      <!--确认需求-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==4" :class="{circuitBoxBlue:sureDemandResultBlueBox==true}">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc" >
          <h6>{{item.eventStatusName==null?"确认需求":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <div class="initiateBox demandBox" v-if="item.sureDemandResultDto!=null" @click="sureDemandResultBlue">
            <router-link :to="{name:'suredemand',params:{id:item.appId}}">
              <p class="p1">{{item.sureDemandResultDto.patientName}} <span>{{item.sureDemandResultDto.sex==1?"男":"女"}} {{item.sureDemandResultDto.age}}岁</span><i class="rightIcon"></i></p>
              <p>选择疾病：{{item.sureDemandResultDto.disName==null?"不知道什么病":item.sureDemandResultDto.disName}}</p>
              <p>意向地：{{item.sureDemandResultDto.provinceName==null?"不限定":item.sureDemandResultDto.provinceName}}</p>
              <p>就诊时间：{{item.sureDemandResultDto.sureStartDate|getTime}}-{{item.sureDemandResultDto.sureEndDate|getTime}}</p>
              <p>指定专家：{{item.sureDemandResultDto.selectExpertFlag==0?"否":"是"}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <!--等待推荐专家-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==6">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"等待推荐专家":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>平台将通过专家库为您精准匹配适合的专家推荐给您，请等待</p>
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
      <!--推荐专家-->
      <div class="circuitBox" :class="{circuitBoxBlue:appointSpecisBlueBox==true}" v-for="item in datas" v-if="item.eventStatus==7">
        <img class="circuitIcon" src="../../assets/daipingjia_icon.png"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"推荐专家":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <div class="sureExpert" v-if="item.sureSpeclistInfo!=null">
            <div class="expertPhotoBox">
              <img class="expertPhoto" :src="item.sureSpeclistInfo.headPath==null?
              './img/man.png':item.sureSpeclistInfo.headPath"/>
              <p class="expertPhotoP">极力推荐</p>
            </div>
            <div class="expertBoxP">
              <p class="p1">{{item.sureSpeclistInfo.givenName}}<span> {{item.sureSpeclistInfo.hospName}} </span></p>
            </div>
            <div @click="appointSpecisBlue">
              <router-link :to="{name:'expertInfo',params:{id:item.sureSpeclistInfo.specId}}">请查看专家信息<i></i></router-link>
            </div>
          </div>
        </div>
      </div>
      <!--预约专家中-->
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==8">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?",预约专家中":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <p>平台已通过电话，正在与{{!item.aboutSpeclistInfo?'':item.aboutSpeclistInfo.givenName}}专家进行联系，请您耐心等待</p>
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
          <p>恭喜预约成功，请您关注就诊时间以免错过专家问诊</p>
        </div>
      </div>
      <div class="circuitBox" v-for="item in datas" v-if="item.eventStatus==10">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <div class="circuitDesc">
          <h6>{{item.eventStatusName==null?"预约失败":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
          <i class="subscriptR"></i>
          <p>由于最近时间安排不开，故此取消本次就医申请，谢谢</p>
        </div>
      </div>
      <!--上传病历 待上传-->
      <div class="circuitBox circuitBoxBlue" v-for="item in datas" v-if="item.eventStatus==17">
        <img class="circuitIcon" :src="'./img/circuit'+item.eventStatus+'.png'"/>
        <div class="riangle"></div>
        <div class="riangleW"></div>
        <router-link :to="{name:'upload',params:{id:item.appId}}">
          <div class="circuitDesc">
            <h6>{{item.eventStatusName==null?"上传病历":item.eventStatusName}}<span>{{item.createDate|getTimeStamp}}</span></h6>
            <p class="fontfff">请您上传本次就诊病历，以便平台医生了解您的病情，为您提供更精准的服务</p>
            <span class="upload">上传病历资料</span>
          </div>
        </router-link>
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
              <img :src="img"  onerror="this.src='./img/picture.png';this.onerror=null"/>
            </div>
            <router-link :to="{name:'upload',params:{id:item.appId}}">{{item.elecMedicalRdResultDto.medicalRdDesc}}<i></i></router-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>



<script>
import api from '../../server/api'
import wechatUtils from '../../commonutils/wechatUtils'
const wx=require('weixin-js-sdk')
  export default {
    name:'circuit',
    data () {
      return {
        //todo 测试用 appId:152,
        datas:[],
        images:[],
        uploadcancelFlag:true
      }
    },
    computed: {
      applicationInfoisBlueBox(){
        return localStorage.getItem('applicationInfoisBlueBox')
      },
      appointSpecisBlueBox(){
        return localStorage.getItem('appointSpecisBlueBox')
      },
      sureDemandResultBlueBox(){
        return localStorage.getItem('sureDemandResultBlueBox')
      },

      scrollTop(){
        return this.$store.state.seriousill.seriousill.scrollTop
      },
      appId(){
        return this.$route.params.appId
      }
    },
    created () {

    },
    beforeRouteEnter(to, from, next){
      next ()
    },
    beforeRouteLeave(to, from, next){
      let _this=this
      console.warn(document.body.scrollTop)
      this.$store.commit('seriousill/changeseriousill',{scrollTop:document.body.scrollTop})
      console.log(to.path.split('/')[2]);
      if(to.path.split('/')[2]!="applicationInfo" && to.path.split('/')[2]!="suredemand" && to.path.split('/')[1]!="expertInfo"&& to.path.split('/')[2]!="upload"){
        _this.$store.dispatch('seriousill/revertState')
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
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("applicationInfoisBlueBox", "false");
        }
      },
      appointSpecisBlue(){
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("appointSpecisBlueBox", "false");
        }
      },
      sureDemandResultBlue(){
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("sureDemandResultBlueBox", "false");
        }
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
        title: '大病求医' // 标题
      });
      api.getEventInfo({params:{appId:_this.appId}}).then(res=>{
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
                console.log(_this.scrollTop)
              if (_this.scrollTop===""||_this.scrollTop===null) {
                document.body.scrollTop = _this.$refs.sheight.offsetHeight-document.body.clientHeight+100;
              }else{
                document.body.scrollTop=_this.scrollTop
              }
            })
          }
      })

    },
    components: {

    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    margin-top: px2rem(108);
  }
  .circuitList{margin-top:px2rem(100);}
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
  .circuitDesc span.upload{
    margin:0 auto;
    font-size:px2rem(26);line-height:px2rem(60);
    text-align: center;
    display:inline-block;
    width:px2rem(240);
    height:px2rem(60);
    border-radius:px2rem(8);
    color:#4385f4;
    background:#fff;
    margin-top:px2rem(20);
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
  .demandBox{padding-top:0;}
  .demandBox a{display:inline-block;width:100%;
    margin:0;}
  .demandBox p.p1{border-bottom:1px solid #d9d9d9;line-height:px2rem(60);padding:px2rem(20) 0;margin-bottom:px2rem(20);}
  .demandBox>p{margin:0;}
  .circuitBoxBlue .circuitDesc{background:#679ef8;}
  .circuitBoxBlue .riangle{border-right:px2rem(12) solid #679ef8;}
  .circuitBoxBlue .riangleW{border-right:px2rem(10) solid #679ef8;}
  .circuitBoxBlue .circuitDesc h6,.circuitBoxBlue .circuitDesc h6 span{color:$fontfff;}
  .recordsImg img{width:px2rem(140);height:px2rem(140);float:left;margin-right:px2rem(16);}
  .recordsImg img:last-child{margin-right:0;}
</style>
