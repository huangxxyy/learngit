<template>
<div class="space">
  <div class="box">
    <div class="textatea">
        <textarea maxlength="500" @input="descInput" v-model="desc" ref="desctextarea"
                  class="condition" placeholder="欢迎提出您的宝贵意见">
        </textarea>
      <span>{{remnant}}字</span>
    </div>
  </div>
  <div class="box">
    <h3><i></i>请上传相关图片说明情况<span>（最多20张）</span></h3>
    <ul class="picture">
      <li v-for="(pic,index) in picslocalId">
        <img :src="pic" @click="photo_flag =index"/>
        <i class="close" @click="removepic(index)"></i>
      </li>
      <li class="addpicture" @click="addpic" v-show="isshowaddpic">
        <p>上传照片</p>
      </li>
    </ul>
  </div>
  <div class="tips">
    <p class="p1">温馨提示：</p>
    <p>感谢您的反馈，请及时到“我的”、“帮助与反馈”中查看客服回复</p>
  </div>
  <div class="btn">
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">提交</oklife-button>
  </div>
  <!--APP端上传图片点击弹出相册或拍照-->
  <mt-actionsheet
    :actions="appSelectPicOrcarmerAction"
    v-model="appSelectPicOrcarmerVisible">
  </mt-actionsheet>
  <!--上传照片放大-->
  <template v-for="(pic,index) in picslocalId">
    <transition name="scale">
      <div class="pick-mark"  @click="photo_flag ='-1'" v-show="photo_flag==index">
        <img :src="pic" class="bigPhoto"/>
      </div>
    </transition>
  </template>
</div>
</template>

<script>
  import oklifeButton from '../../../src/components/button'
  import { Actionsheet,Toast,Indicator } from 'mint-ui'
  import api from '../../server/api'
  import { mapState} from 'vuex'
  import wechatUtils from '../../commonutils/wechatUtils'
  import commonUtils from '../../commonutils/commonUtils'
  const wx=require('weixin-js-sdk')
    export default {
        name: '',
        data () {
            return {
              remnant: 500,
              appSelectPicOrcarmerAction:[{name:"拍照",method:this.carmer},{name:"从相册选取",method:this.selectPic}],
              appSelectPicOrcarmerVisible:false,
              inputdoctor:'',
              inputdoctorVisible:true,
              photo_flag:'-1',//是否显示大图
              desc:this.$store.state.feedback.feedback.desc
            }
        },
        computed: {
          ...mapState({
            //desc: state => state.feedback.feedback.desc,
            picslocalId:state=>state.feedback.feedback.picslocalId,//微信本地图片ID，从微信选择图片获得
            picsmediaId:state=>state.feedback.feedback.picsmediaId,//微信服务器图片ID，从微信上传成功后返回
            problemId:state=>state.feedback.feedback.problemId,//问题Id

          }),
          userId(){
            return this.$store.state.common.loginInfo.userId
          },
          isshowaddpic(){
            return this.picslocalId.length<20?true:false
          }
        },
        watch: {},
        mounted () {
          this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
            isshow:true,//是否显示头部
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip: false,//是否显示跳过
            skipto: '',//点跳过后到哪个路由页面
            title: '帮助与反馈' // 标题
          });
        },
        beforeRouteEnter(to, from, next){
            next ()
        },
        methods: {
            submit(){
              if(this.desc==""){
                Toast('请输入反馈详情')
                return false
              }
              if(this.problemId==null){
                let data={
                  "problemDesc": this.desc,//病情描述
                  "images":this.$store.state.feedback.feedback.picsmediaId,//todo 测试用['1fa6ded19d094f74975125fe69a24529','1fa6ded19d094f74975125fe69a24529'] ,
                  "fileType": window.Browser_Environment_Oklife=='wx'?1:0,
                  "custId":this.userId,
                }
                api.insertfeedback({data:data}).then((res)=>{
                  if (undefined == res) {
                    return false
                  } else if (0 == res.code) {

                    this.$store.commit('feedback/changefeedback',{"problemId":res.data});
                    console.log(this.$store.state.feedback.feedback.problemId);
                    this.$router.push({name:'leaveMessage',params:{problemId:res.data}});
                  }
                })
              }else{
                let date=new Date();
                let data={
                  "problemDesc": this.desc,//病情描述
                  "images":this.$store.state.feedback.feedback.picsmediaId,//todo 测试用['1fa6ded19d094f74975125fe69a24529','1fa6ded19d094f74975125fe69a24529'] ,
                  "fileType": window.Browser_Environment_Oklife=='wx'?1:0,
                  "custId":this.userId,
                  "sendTime":commonUtils.getTimeStamp(date),
                  "problemId":this.problemId,
                  "senderType":1
                }
                api.insertFeedBackRd({data:data}).then((res)=>{
                  if (undefined == res) {
                    return false
                  } else if (0 == res.code) {
                    this.$router.push({name:'leaveMessage',params:{problemId:this.problemId}});
                  }
                })
              }

            },
          //图片
          carmer(){//拍照
            let _this=this
            let jump = {
              "nativeType": "camera",
            }
            let suceess=(data)=>{
              let result=JSON.parse(data)
              Indicator.close ()
              if(_this.picslocalId.length<20){
                _this.$store.commit('feedback/addpicslocalIdAndpicsmediaId',{
                  picslocalId:result.url,
                  picsmediaId:result.key
                })
              }else{
                Toast({
                  message: '最多上传20张',
                  position: 'center',
                  duration: 2000
                })
              }
            }
            let error=()=>{Indicator.close ();Toast('上传失败')}
            cordova.plugins.oklife.skipNative(suceess, error, jump);
            Indicator.open({
              text: '上传中...',
              spinnerType: 'fading-circle'
            });

          },
          selectPic(){//从相册中选择图片
            let _this=this
            let jump = {
              "nativeType": "selectPic",
            }
            let suceess=(data)=>{
              let result=JSON.parse(data)
              Indicator.close ()
              if(_this.picslocalId.length<20){
                _this.$store.commit('feedback/addpicslocalIdAndpicsmediaId',{
                  picslocalId:result.url,
                  picsmediaId:result.key
                })
              }else{
                Toast({
                  message: '最多上传20张',
                  position: 'center',
                  duration: 2000
                });
              }
            }
            let error=()=>{Indicator.close ();Toast('上传失败')}
            cordova.plugins.oklife.skipNative(suceess, error, jump);
            Indicator.open({
              text: '上传中...',
              spinnerType: 'fading-circle'
            });
          },
          removepic(index) {
            this.$store.commit('feedback/deletepicslocalIdAndpicsmediaId',index)
          },
          addpic(){
            let _this=this
            if(window.Browser_Environment_Oklife=='app'){
              if(_this.picslocalId.length<20){
                _this.appSelectPicOrcarmerVisible=true
              }else{
                Toast('最多上传20张')
              }
            }else{
              Toast('请在app上操作')
            }
          },
          //描述病症
          descInput(){
            var txtVal = this.desc.length;
            this.remnant = 500 - txtVal;
          },
        },
        components: {
          oklifeButton,Actionsheet,Toast,Indicator
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/;
  }
  h3,h4{font-weight: normal;}
  .box{width:100%;margin-top:px2rem(20);border-top:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;background:$fontfff;}
  .box p{width:px2rem(690);line-height:px2rem(100);border-bottom:1px solid #d9d9d9;font-size:$fontNavm;color:$font333;margin:0 px2rem(30);}
  .box p span{color:$font666;font-size:px2rem(30);}
  .box p:last-child{border-bottom:none;}
  .box h3{width:px2rem(690);padding:0 px2rem(30);font-size:$fontNavm; line-height:px2rem(100);color:$font333;border-bottom:none;text-indent:0;}
  .box h3 span{color:$font666;font-size:px2rem(28);}
  .box h3 i{width:px2rem(20);height:px2rem(20);background:#4285F4;border-radius:50%;margin-right:px2rem(20);display:inline-block;line-height:px2rem(100);}
  .box ul.picture{width:px2rem(690);padding:px2rem(20) px2rem(30) px2rem(40);height:auto;overflow: hidden;}
  .box ul.picture li{position:relative;width:px2rem(154);margin-right:px2rem(15);height:px2rem(154);float: left;border-radius:px2rem(8);border:1px solid #4385F5;overflow:hidden;}
  .box ul.picture li:nth-child(4n){margin-right:px2rem(0);}
  .box ul.picture li img{width:px2rem(154);height:px2rem(154);position:absolute;top:0;left:0;}
  .box ul.picture li i.close{width:px2rem(40);height:px2rem(40);position:absolute;top:0;right:0;
    display:inline-block;background:url("../../assets/deletepicture.png") no-repeat;background-size:px2rem(40);}

  .textatea{position:relative;font-size:px2rem(26);}
  textarea.condition{border-radius:px2rem(8);background:#fafafa;height:px2rem(210);width:px2rem(648);padding:px2rem(20);border:1px solid #ebebeb;margin:px2rem(30);
    resize : none;
    font-family: "PingFangSC-Regular";}
  .btn{margin:px2rem(60) auto;}
  .textatea span{position:absolute;bottom:px2rem(40);right:px2rem(40);color:$font999;}
  .box ul.picture li.addpicture{border:none;background:url("../../assets/addpicture.png") no-repeat center px2rem(32) #fafafa;background-size:px2rem(56);}
  .box ul.picture li.addpicture p{color:$font999;line-height:px2rem(50);font-size:px2rem(26);width:px2rem(104);position:absolute;top:px2rem(90);}
  .tips{width:px2rem(690);margin:0 px2rem(30);margin-top:px2rem(20);}
  .tips p{font-size:$fontSmall;color:$font666; line-height:px2rem(40);}
  .tips p.p1{color:#4675e5;font-size:$font28;line-height:px2rem(60);}
</style>
<style lang="scss">
  @import "../../../static/css/base/min.scss";
  .mint-actionsheet{
    background-color: transparent;
    width: px2rem(710);
  }
  .mint-actionsheet .mint-actionsheet-list .mint-actionsheet-listitem{
    color:#0075ff !important;
    background-color: transparent;
    font-size: px2rem(40);
  }
  .mint-actionsheet .mint-actionsheet-button{
    color:#0075ff !important;
    border-radius: px2rem(24);
    margin-bottom: px2rem(16);
    font-size: px2rem(40);
  }

  .mint-actionsheet .mint-actionsheet-list{
    border-radius: px2rem(24);
    background-color: #f2f2f2;
  }
</style>
