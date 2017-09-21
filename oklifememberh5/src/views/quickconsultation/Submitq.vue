<template>
  <div class="space">
    <div class="infoUl">
      <div>
        <a disabled  @click="sheetVisible = !sheetVisible">
          <span class="fl color333">就诊人</span>
          <i class="rightIcon"></i>
          <span class="fr color666">{{patient}}</span>
        </a>
      </div>
    </div>
    <div class="box">
      <h3>您想咨询哪种疾病问题</h3>
      <ul class="disease">
        <li v-for="(disease,index) in diseases" @click.self="select($event)" class='noactive' v-model="disease.disId" ref="diseases">{{ disease.disName }}</li>
      </ul>
    </div>
    <div class="box">
      <h3><i></i>请拍照上传疾病相关资料</h3>
      <p class="font26">门诊病历、出院小结、检查报告等,您还能上传{{canloadnum}}张</p>
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
    <div class="box">
      <h3><i></i>病情描述</h3>
      <div class="textatea">
        <textarea maxlength="500" @input="descInput" v-model="desc"
                  class="condition" placeholder="请详细描述您起病时间、有无诱发因素、主要不适症状、诊疗及用药过程等，以及您想要得到怎样的帮助...">
        </textarea>
        <span>{{remnant}}字</span>
        </div>
    </div>
    <div class="btn">
      <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
    </div>
    <!--上传照片放大-->
    <template v-for="(pic,index) in picslocalId">
      <transition name="scale">
        <div class="pick-mark"  @click="photo_flag ='no'" v-if="photo_flag==index">
          <img :src="pic" class="bigPhoto"/>
        </div>
      </transition>
    </template>
    <!--选择就诊人-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible" class="patient">
    </mt-actionsheet>
  </div>
</template>

<script>
  import oklifeButton from '../../../src/components/button'
  import { Actionsheet,Toast} from 'mint-ui'
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
        patientList:[],//就诊人列表

        defaultPatientId:'',//默认就诊人Id
        defaultPatient:'',//默认就诊人名字
        defaultPatientSex:'',
        defaultPatientAge:'',
        //actions:[{name:"苏南江",id:1,method:this.patients},{name:"孙澍雨",method:this.patients},{name:"新增就诊人",method:this.newpatients}],
        actions:[],
        diseases:[],
        diseaseIds:[],
        desc:'',
        photo_flag:'no',//是否显示大图

        patient: '',//就诊人名字
        patientId: '',//就诊人Id
        patientSex:'',//就诊人性别
        patientAge:'',//就诊人年龄

        picslocalId:[],//微信本地图片ID，从微信选择图片获得
        picsmediaId:[],//微信服务器图片ID，从微信上传成功后返回
        canloadnum:20,//还能上传多少张照片
      }
    },
    computed: {
      userId(){
        return this.$store.state.common.loginInfo.userId
      },
      isshowaddpic(){
        return this.picslocalId.length<20?true:false
      }
    },
    watch: {
      picslocalId(){
        this.canloadnum=this.canloadnum-this.picslocalId.length
      }
    },
    mounted () {

      let _this=this;

      _this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        handleback:_this.handleback,
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '快速提问' // 标题
      });
      api.disease({}).then(response => {
          if(response.code==0){
            _this.diseases=response.data
          }else if(response==undefined){
            Toast({
              message: '网络异常，请稍后再试',
              position: 'center',
              duration: 2000
            });
          }
      })
      //就诊人简要列表获取
      // todo,记得替换userId为this.userId
      api.patientSimpleList({params:{userId:this.userId}}).then((res)=>{
        if (undefined == res) {
          return false
        } else if (0 == res.code) {
          this.patientList=res.data
          var len=this.patientList.length
          for(var i=0;i<len;i++){
            if(1==this.patientList[i].byDefault){
              this.defaultPatient=this.patientList[i].patientName;
              this.defaultPatientId=this.patientList[i].patientId;
              this.defaultPatientSex=this.patientList[i].sex;
              this.defaultPatientAge=this.patientList[i].age;


              this.patient= this.defaultPatient
              this.patientId= this.defaultPatientId
              this.patientSex=this.defaultPatientSex
              this.patientAge=this.defaultPatientAge
            }
            this.actions.push({
              name: this.patientList[i].patientName,
              patientId: this.patientList[i].patientId,
              patientAge:this.patientList[i].age,
              patientSex:this.patientList[i].sex,
              method: this.patients
            })
          }
          if(this.patientList.length<7){
            this.actions.push({name:'新增就诊人',method:this.newpatients});
          }else{
            _this.$nextTick(()=>{
              let elemchildrens=document.getElementsByClassName('patient')[0].getElementsByTagName('*')
              for(let i=0,len=elemchildrens.length;i<len;i++){
                elemchildrens[i].setAttribute('style','color:#0075ff !important')
              }
            })
          }
        }
      })
    },
    beforeRouteEnter(to, from, next){
      next ()
    },
    methods: {
      handleback(){
        //alert("监听到页面后退按钮");//根据自己的需求实现自己的功能
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
      },
      submit:function(){
          let _this = this;
          for (let i = 0, len = _this.$refs.diseases.length; i < len; i++) {
            if (_this.$refs.diseases[i].getAttribute('class').indexOf('noactive') == -1) {
              _this.diseaseIds.push(_this.diseases[i].disId)
            }
            //console.log(_this.diseaseIds);
          }
          if(_this.desc.length<10){
              console.log(_this.desc.length)
            Toast('多写一点有助平台医生更了解您的需求哦')
            return false
          }
        let data={
          "diseaseIds": _this.diseaseIds,//选择的疾病Id
          "problemDesc": _this.desc,//病情描述
          "images":_this.picsmediaId,
          "fileType": window.Browser_Environment_Oklife=='wx'?1:0,
          "patientId": _this.patientId,
          //todo  记得换成this.userId
          "userId":_this.userId,
        }
        console.warn(data)
        api.quickconsultationApply({data:data}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            console.log(res.data)
            _this.$store.commit('quickconsultation/changequickconsultation',{
              appId:res.data.appId,
              patientName:_this.patient,
              patientId:_this.patientId,
              patientSex:_this.patientSex,
              patientAge:_this.patientAge,
              patientproblemDesc:_this.desc,
            })
            api.taskCreate({params:{appId:res.data.appId,userId:_this.userId}}).then((res)=>{
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
              }
            })
          }
        })
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
        }
      },
      //描述病症
      descInput(){
        var txtVal = this.desc.length;
        this.remnant = 500 - txtVal;
      },
      patients:function(actions,index){
        console.log(actions.name)
        console.log(actions.patientId)
        this.patient=actions.name
        this.patientId=actions.patientId
        this.patientAge=actions.patientAge
        this.patientSex=actions.patientSex
      },
      newpatients:function () {
        this.$router.push({name:'addpatient'})
      },
      //选疾病
      select(event){
        if (event.target.getAttribute('class').indexOf('noactive') == -1) {
          event.target.setAttribute('class', 'noactive');
        } else {
          event.target.setAttribute('class', 'active');
        }
      }
    },
    components: {oklifeButton,Actionsheet,Toast}
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
  .infoUl div{width:px2rem(676);height:px2rem(100);margin-left:px2rem(40);}
  .infoUl div a{display:inline-block;width:100%;height:100%;line-height:px2rem(100);}
  .infoUl div span.fl{font-size:px2rem(32);width:px2rem(150);}
  .infoUl div span{font-size:px2rem(30);}
  .infoUl div i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:100%;background:url("../../assets/go.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}

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
