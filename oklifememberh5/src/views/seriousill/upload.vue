<template>
  <div class="space">
    <div class="infoUl">
      <div>
          <span class="fl color333">就诊人</span>
          <span class="fr color666">{{patientName}}</span>
      </div>
    </div>
    <div class="box">
      <h3><i></i>病历描述</h3>
      <div class="textatea">
        <textarea maxlength="500" @input="descInput" v-model="desc"
                  class="condition" placeholder="请填写本次看病的文字描述信息">
        </textarea>
        <span>{{remnant}}字</span>
      </div>
    </div>
    <div class="box">
      <h3><i></i>请拍照上传病历相关资料</h3>
      <p class="font26">门诊病历、出院小结、检查报告等</p>
      <ul class="picture">
        <li v-for="(pic,index) in picslocalId">
          <img :src="pic" @click="photo_flag =index" onerror="this.src='./img/picture.png';this.onerror=null"/>
          <i class="close" @click="removepic(index)"></i>
        </li>
        <li class="addpicture" @click="addpic" v-show="isshowaddpic">
          <p>上传照片</p>
        </li>
      </ul>
    </div>
    <div class="btn">
      <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
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
          <img :src="pic" class="bigPhoto" onerror="this.src='./img/picture.png';this.onerror=null"/>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
  import oklifeButton from '../../../src/components/button'
  import { Actionsheet,Toast,Indicator} from 'mint-ui'
  import { mapState,mapGetters } from 'vuex'
  import api from '../../server/api'
  import wechatUtils from '../../commonutils/wechatUtils'
  const wx=require('weixin-js-sdk')
  export default {
    name: '',
    data () {
      return {
        remnant: 500,
        color999:"color999",
        color666:"color666",
        patientcolor:true,
        sheetVisible:false,
        elecId:'',
        desc:'',
        photo_flag:'-1',//是否显示大图
        patientName:'',
        patientId:'',//就诊人Id
        picslocalId:[],//微信本地图片ID，从微信选择图片获得
        picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
        appSelectPicOrcarmerAction:[{name:"拍照",method:this.carmer},{name:"从相册选取",method:this.selectPic}],
        appSelectPicOrcarmerVisible:false,
      }
    },
    computed: {
      userId(){
        return this.$store.state.common.loginInfo.userId
      },
      appId(){
        return this.$route.params.appId
      },
      isshowaddpic(){
        return this.picslocalId.length<20?true:false
      }
    },
    watch: {},
    mounted () {

      this.$store.commit('common/changeHeaderConf', {
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '拍照上传病历' // 标题
      });
      //获取病历信息
      let _this=this;
      api.getaccompanyupload({params:{appId:_this.appId}}).then(res=>{
        if (undefined == res) {
          return false
        } else if (0 == res.code) {
          _this.desc = res.data.medicalRdDesc;
          _this.elecId=res.data.elecId;
          _this.patientName=res.data.patientName;
          _this.patientId=res.data.patientId;
          var result =res.data.fileList;
          if(result==null){
            return false;
          }else{
            for(var i=0;i<result.length;i++) {
              if(result[i].filePath==null) {
                let callback=(localId)=>{
                  _this.picslocalId.push(localId)
                }
                wechatUtils.wxdownloadImage(result[i].mediaCode, callback, wx)
              }else{
                _this.picslocalId.push (result[i].filePath)
              }
            }
          }

        }
      })
    },
    beforeRouteEnter(to, from, next){
      next ()
    },
    methods: {
      submit:function(){
          if(!this.desc){
            Toast('请填写病情描述')
            return false
          }
          if(this.picslocalId.length==0){
            Toast('请最少上传一张病历照片')
            return false
          }
        let _this=this
          if(_this.elecId==null){
            let data={
              "appId":_this.appId,
              "medicalRdDesc": _this.desc,//病情描述
              "images":_this.picsmediaId,
              "fileType": window.Browser_Environment_Oklife=='wx'?1:0,
              "patientId": _this.patientId,
              "patientName": _this.patientName,
              "createBy":_this.userId,
            }
            api.insertEmedicalrd({data:data}).then((res)=>{
              if (undefined == res) {
                return false
              } else if (0 == res.code) {
                Toast({
                  message: '添加病历照片成功',
                  position: 'center',
                  duration: 2000
                });
                _this.$nextTick(()=>{
                  let timer = setTimeout(function(){
                    _this.$router.push({name:"circuit",params:{appId:_this.appId}});
                  },2000);
                })
              }
            })
          }else{

            let data={
              "appId":_this.appId,
              "elecId":_this.elecId,//档案编号
              "medicalRdDesc": _this.desc,//病情描述
              "images":_this.picsmediaId,
              "fileType": window.Browser_Environment_Oklife=='wx'?1:0,
              "patientId": _this.patientId,
              "createBy":_this.userId,
            }
            api.updateEmedicalrd({data:data}).then((res)=>{
              if (undefined == res) {
                return false
              } else if (0 == res.code) {
                Toast({
                  message: '修改病历照片成功',
                  position: 'center',
                  duration: 2000
                });
                let timer = setTimeout(function(){
                  _this.$router.push({name:"circuit",params:{appId:_this.appId}});
                },2000);
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
            _this.picslocalId.push(result.url)
            _this.picsmediaId.push(result.key)
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
          console.log('成功回调')
          console.log(result)
          if(_this.picslocalId.length<20){
            _this.picslocalId.push(result.url)
            _this.picsmediaId.push(result.key)
          }else{
            Toast({
              message: '最多上传20张',
              position: 'center',
              duration: 2000
            });
          }
        }
        let error = (err) => {
          Indicator.close()
          console.log('失败回调')
          console.log(err)
          Toast('上传失败')
        }
        cordova.plugins.oklife.skipNative(suceess, error, jump);
        Indicator.open({
          text: '上传中...',
          spinnerType: 'fading-circle'
        });
      },
      removepic(index) {
        this.picslocalId.splice(index, 1)
        this.picsmediaId.splice(index, 1)
      },
      addpic(){
        let _this=this
        if(window.Browser_Environment_Oklife=='wx'){
          wx.ready(function () {
            let callback=(mediaId,localId)=>{
              if(_this.picslocalId.length<20){
                _this.picslocalId.push(localId)
                _this.picsmediaId.push(mediaId)
              }else{
                Toast('最多上传20张')
              }
            }
            let count=20-_this.picslocalId.length>=9?9:20-_this.picslocalId.length
            wechatUtils.wxChooseImage(callback,count,wx)
          })
        }else if(window.Browser_Environment_Oklife=='app'){
          if(_this.picslocalId.length<20){
            _this.appSelectPicOrcarmerVisible=true
          }else{
            Toast('最多上传20张')
          }
        }else{
          Toast('请在微信或者app上操作')
        }
      },
      //描述病症
      descInput(){
        var txtVal = this.desc.length;
        this.remnant = 500 - txtVal;
      },
    },
    components: {oklifeButton,Actionsheet,Toast,Indicator}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/;
  }
  html,body,.box,.infoUl{overflow-x:hidden;}
  .fl{float:left;}
  .fr{float:right;}
  .color333{color:$font333;}
  .color999{color:$font999;}
  .color666{color:$font666;}
  .infoUl{width:100%;background:#fff;}
  .infoUl div{width:px2rem(676);height:px2rem(100);margin-left:px2rem(40);line-height:px2rem(100);}
  .infoUl div span.fl{font-size:px2rem(32);width:px2rem(150);}
  .infoUl div span{font-size:px2rem(30);}

  h3,h4{font-weight: normal;}
  .box{width:100%;margin-top:px2rem(20);border-top:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;background:$fontfff;}
  .box h4.recode{background:url("../../assets/recode.png") no-repeat px2rem(30) center;background-size:px2rem(38) px2rem(42);}
  .box p{width:px2rem(690);line-height:px2rem(100);border-bottom:1px solid #d9d9d9;font-size:$fontNavm;color:$font333;margin:0 px2rem(30);}
  .box p span{color:$font666;font-size:px2rem(30);}
  .box p:last-child{border-bottom:none;}
  .box p.font28{font-size:$font28;line-height:px2rem(40);padding:px2rem(10) 0;}
  .box h3{width:px2rem(690);padding:0 px2rem(30);font-size:$fontNavm; line-height:px2rem(100);color:$font333;border-bottom:none;text-indent:0;}
  .box h3 i{width:px2rem(20);height:px2rem(20);background:#4285F4;border-radius:50%;margin-right:px2rem(20);display:inline-block;line-height:px2rem(100);}
  .box p.font26{font-size:$fontSmall;color:$font999;line-height:px2rem(26);text-indent: px2rem(40);border:none;}
  .box ul.picture{width:px2rem(690);padding:px2rem(20) px2rem(30) px2rem(40);height:auto;overflow: hidden;}
  .box ul.picture li{position:relative;width:px2rem(154);margin-right:px2rem(15);height:px2rem(154);float: left;border-radius:px2rem(8);border:1px solid #4385F5;overflow:hidden;}
  .box ul.picture li:nth-child(4n){margin-right:px2rem(0);}
  .box ul.picture li img{width:px2rem(154);height:px2rem(154);position:absolute;top:0;left:0;}
  .box ul.picture li i.close{width:px2rem(40);height:px2rem(40);position:absolute;top:0;right:0;
    display:inline-block;background:url("../../assets/deletepicture.png") no-repeat;background-size:px2rem(40);}

  .disease{width:px2rem(690);padding:0 px2rem(30) px2rem(40);overflow: hidden;height:auto;}
  .disease li{float:left;width:auto;padding:0 px2rem(20);font-size:$font28; line-height:px2rem(50);border:1px solid #4385F5;border-radius:px2rem(30);margin-right:px2rem(20);margin-bottom:px2rem(20);}
  .disease li.noactive{background:#fff;color:$font666;}
  .disease li.active{background:#4385F5;color:$fontfff;}
  .textatea{position:relative;font-size:px2rem(26);}
  textarea.condition{border-radius:px2rem(8);background:#fafafa;height:px2rem(210);width:px2rem(648);padding:px2rem(20);border:1px solid #ebebeb;margin:0 px2rem(30) px2rem(30);
    resize : none;
    font-family: "PingFangSC-Regular";}
  .btn{margin:px2rem(60) auto;}
  .textatea span{position:absolute;top:px2rem(210);right:px2rem(40);color:$font999;}
  .box ul.picture li.addpicture{border:none;background:url("../../assets/addpicture.png") no-repeat center px2rem(32) #fafafa;background-size:px2rem(56);}
  .box ul.picture li.addpicture p{color:$font999;line-height:px2rem(50);font-size:px2rem(26);width:px2rem(104);position:absolute;top:px2rem(90);}


</style>
<style lang="scss" >
  @import "../../../static/css/base/min.scss";
  /*修改就诊人弹窗样式*/
  .mint-actionsheet{
    background-color: transparent;
    width: px2rem(710);
  }
  .mint-actionsheet .mint-actionsheet-list .mint-actionsheet-listitem{
    color:#0075ff;
    background-color: transparent;
    font-size: px2rem(40);
  }
.mint-actionsheet .mint-actionsheet-list .mint-actionsheet-listitem:last-child{
    color:#fe3724;
    border-bottom: none;
    margin-bottom: px2rem(16);
  }
  .mint-actionsheet .mint-actionsheet-button{
    color:#0075ff;
    border-radius: px2rem(24);
    margin-bottom: px2rem(16);
    font-size: px2rem(40);
  }

  .mint-actionsheet .mint-actionsheet-list{
    border-radius: px2rem(24);
    background-color: #f2f2f2;
  }
</style>
