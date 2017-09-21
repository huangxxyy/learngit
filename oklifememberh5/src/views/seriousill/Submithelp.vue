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
      <div>
        <router-link  :to="{name:'selectDisease',params:{ from: 'Submithelp'}}">
          <span class="fl color333">选择疾病</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="selectDisease=='不知道什么疾病'?color999:color666">{{selectDisease}}</span>
        </router-link>
      </div>
      <div>
        <router-link  :to="{name:'inputexpArea'}">
          <span class="fl color333">意向地</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="expArea=='不限定'?color999:color666">{{expArea}}</span>
        </router-link>
      </div>
      <div>
        <a disabled>
          <span class="fl color333">就诊时间</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="time=='请选择时间范围'?color999:color666">{{time}}</span>
          <datepicker  v-model="datepickertime"  :range=true :min="minDate" :max="maxDate"></datepicker>
        </a>
      </div>
    </div>
    <div class="infoUl">
      <div class="bordernone">
        <a disabled  @click="appointVisible = !appointVisible">
          <span class="fl color333">指定专家</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="appointcolor?color999:color666">{{appoint}}</span>
        </a>
      </div>
      <div v-show="doctorVisible" class="choosedoctorBox">
        <input class="doctorname" placeholder="请填写专家姓名" v-model="inputdoctor" v-if="inputdoctorVisible" ref="inputdoc"/>
        <router-link  :to="{name:'selectDoctor'}" v-if="choosedoctorVisible">
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="choosedoctorcolor?color999:color666">{{choosedoctor}}</span>
        </router-link>
      </div>
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
        <textarea maxlength="500" @input="descInput" v-model="desc" ref="desctextarea"
                  class="condition" placeholder="请详细描述您起病时间、有无诱发因素、主要不适症状、诊疗及用药过程等，以及您想要得到怎样的帮助...">
        </textarea>
        <span>{{remnant}}字</span>
        </div>
    </div>
    <div class="btn">
      <oklife-button @click="submithelp" height="2.347rem" width="18.4rem" color="#4776e5">提交申请</oklife-button>
    </div>
    <!--就诊人-->
    <mt-actionsheet id="patientsheet"
      :actions="actions" cla
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--指定专家-->
    <mt-actionsheet
      :actions="appointdoc"
      v-model="appointVisible">
    </mt-actionsheet>
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
  import { mapState,mapGetters } from 'vuex'
  import commonUtils from '../../commonutils/commonUtils'
  import api from '../../server/api'
  import datepicker from '../../components/vue-datepicker/Datepicker.vue'
  import wechatUtils from '../../commonutils/wechatUtils'
  const wx=require('weixin-js-sdk')
  export default {
    name: 'submithelp',
    data () {
      return {
        datepickertime: [],
        remnant: 500,
        color999:"color999",
        color666:"color666",
        bordernone:"bordernone",

        choosedoctorcolor:true,
        appointcolor:true,
        isbordernone:false,
        sheetVisible:false,
        appointVisible:false,
        choosedoctorVisible:true,
        patientList:[],//就诊人列表
        defaultPatientId:'',//默认就诊人Id
        defaultPatient:'',//默认就诊人名字
        //actions:[{name:"苏南江",id:1,method:this.patients},{name:"孙澍雨",method:this.patients},{name:"新增就诊人",method:this.newpatients}],
        actions:[],
        appointdoc:[{name:"是",method:this.yes},{name:"否",method:this.no}],

        appSelectPicOrcarmerAction:[{name:"拍照",method:this.carmer},{name:"从相册选取",method:this.selectPic}],
        appSelectPicOrcarmerVisible:false,
        inputdoctor:'',
        inputdoctorVisible:true,
        desc:'',
        photo_flag:'-1',//是否显示大图
        canloadnum:20,//还能上传多少张照片
        minDate:String(commonUtils.getDate(new Date().getTime(),false,'-')),
        maxDate:String(commonUtils.getDate(new Date(new Date().getTime()+3*31*24*60*60*1000),false,'-'))
      }
    },
    computed: {
      ...mapState({
        patient: state => state.seriousill.seriousill.patient,
        patientId: state => state.seriousill.seriousill.patientId,
        expArea:state => state.seriousill.seriousill.expArea,
        expAreaId:state => state.seriousill.seriousill.expAreaId,
        selectDisease: state => state.seriousill.seriousill.selectDisease,
        choosedoctor: state => state.seriousill.seriousill.choosedoctor,
        desccontent: state => state.seriousill.seriousill.desc,
        inputdoctorname:state=>state.seriousill.seriousill.inputdoctor,
        time:state=>state.seriousill.seriousill.visitTime,
        visitStartDate:state=>state.seriousill.seriousill.visitStartDate,
        visitEndDate:state=>state.seriousill.seriousill.visitEndDate,
        picslocalId:state=>state.seriousill.seriousill.picslocalId,//微信本地图片ID，从微信选择图片获得
        picsmediaId:state=>state.seriousill.seriousill.picsmediaId//微信服务器图片ID，从微信上传成功后返回
      }),
      ...mapGetters({
        appoint: "seriousill/getappoint",
     }),
      doctorVisible(){
        return this.appoint=='是' ? true: false
      },
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
      },
      datepickertime(){
        var visitTime = this.datepickertime[0] == '' ? '请选择时间范围' : this.datepickertime[0] + '-' + this.datepickertime[1]
        if (visitTime!= '请选择时间范围') {
          this.$store.commit('seriousill/changeseriousill', {
            visitTime: visitTime,
            visitStartDate: commonUtils.getTimeStamp(this.datepickertime[0]),
            visitEndDate: commonUtils.getTimeStamp(this.datepickertime[1])
          })
        }
      },
      inputdoctor(){
        if (this.inputdoctor) {
          this.choosedoctorVisible = false
        } else {
          this.choosedoctorVisible = true
        }
      },
      choosedoctor(){
        if (this.choosedoctor=="请选择") {
          this.inputdoctorVisible = true
        } else {
          this.inputdoctorVisible = false
        }
      }
    },
    mounted () {
      let _this=this
      document.getElementsByClassName('selectbutton')[0].style.display='none';
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        handleback:_this.handleback,
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '大病求医' // 标题
      });
      //就诊人列表获取
      // todo,记得替换userId为this.userId
      api.patientSimpleList({params:{userId:this.userId}}).then((res)=>{
        if (undefined == res) {
          return false
        } else if (0 == res.code) {
          this.patientList=res.data
          console.log(res.data)
          for(var i=0,len=this.patientList.length;i<len;i++){
            if(1==this.patientList[i].byDefault){
              this.defaultPatient=this.patientList[i].patientName;
              this.defaultPatientId=this.patientList[i].patientId;
            }
            this.actions.push({name:this.patientList[i].patientName,patientId:this.patientList[i].patientId,method:this.patients});
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

          if(!this.$store.state.seriousill.seriousill.patientId){
            this.$store.commit('seriousill/changeseriousill',{//设置带入默认就诊人
              patient:this.defaultPatient,
              patientId:this.defaultPatientId
            })
          }
        }
      })

      //监听失去焦点 填入专家名到vuex的store
      _this.$refs.inputdoc.addEventListener('blur', function () {
        _this.$store.commit("seriousill/changeseriousill",{
          inputdoctor:_this.inputdoctor,
          choosedoctor:'请选择',
          choosedoctorId:''
        });
      });
      _this.$refs.desctextarea.addEventListener('blur', function () {
        _this.$store.commit("seriousill/changeseriousill",{desc:_this.desc});
      });

      //进入页面的时候判断vuex的state中是否有专家名
      if(this.inputdoctorname){this.inputdoctor=this.inputdoctorname}
      if(this.desccontent){this.desc=this.desccontent}
      if(this.choosedoctor!='请选择'||!this.choosedoctor){this.inputdoctorVisible = false}
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
      submithelp(){
        if(!this.$store.state.seriousill.seriousill.visitStartDate || !this.$store.state.seriousill.seriousill.visitEndDate){
          Toast('请输入就诊时间')
          return false
        }else if(this.desc){
          Toast('请您输入病情描述')
          return false
        }
        let data={
          "aboutFlag": this.$store.state.seriousill.seriousill.appoint,//是否指定专家标志
          "disId": this.$store.state.seriousill.seriousill.selectDiseaseId,//选择的疾病Id
          "diseaseDesc": this.$store.state.seriousill.seriousill.desc,//病情描述
          "expArea": this.$store.state.seriousill.seriousill.expArea=='不限定' || !this.$store.state.seriousill.seriousill.expArea?'':this.$store.state.seriousill.seriousill.expArea,
          "expAreaId": this.$store.state.seriousill.seriousill.expAreaId,
          "fileKeyList":this.$store.state.seriousill.seriousill.picsmediaId,
          "fileType": window.Browser_Environment_Oklife=='wx'?1:0,
          "hopeSpecId": this.$store.state.seriousill.seriousill.appoint==0?'':this.$store.state.seriousill.seriousill.choosedoctorId,//指定专家ID
          "hopeSpecName":this.$store.state.seriousill.seriousill.appoint==0?'':(this.$store.state.seriousill.seriousill.choosedoctor=='请选择' || !this.$store.state.seriousill.seriousill.choosedoctor?this.$store.state.seriousill.seriousill.inputdoctor:this.$store.state.seriousill.seriousill.choosedoctor),//指定专家姓名
          "patientId": this.$store.state.seriousill.seriousill.patientId,
          "userId":this.userId,
          //todo "userId": 1,调试开发用
          "visitEndDate": this.$store.state.seriousill.seriousill.visitStartDate,
          "visitStartDate": this.$store.state.seriousill.seriousill.visitEndDate,
        }
//        this.$router.push("success");

        api.seriousillnessApply({data:data}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            console.log(res)
            this.$store.commit('seriousill/changeseriousill',{
              applytime:res.data.applyDate
            })
            this.$router.push("success");
          }
        })

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
            _this.$store.commit('seriousill/addpicslocalIdAndpicsmediaId',{
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
          console.log('成功回调')
          console.log(result)
          if(_this.picslocalId.length<20){
            _this.$store.commit('seriousill/addpicslocalIdAndpicsmediaId',{
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
        this.$store.commit('seriousill/deletepicslocalIdAndpicsmediaId',index)
      },
      addpic(){
        let _this=this
        if(window.Browser_Environment_Oklife=='wx'){
          wx.ready(function () {
            let callback=(mediaId,localId)=>{
              if(_this.picslocalId.length<20){
                _this.$store.commit('seriousill/addpicslocalIdAndpicsmediaId',{
                  picslocalId:localId,
                  picsmediaId:mediaId
                })
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
      patients:function(actions,index){
        console.log(actions.name)
        console.log(actions.patientId)
        this.$store.commit("seriousill/changeseriousill",{patient:actions.name,patientId:actions.patientId})
        console.log(this.$store.state.seriousill.seriousill.patient)
        console.log(this.$store.state.seriousill.seriousill.patientId)
      },
      newpatients:function () {
        this.$router.push({name:'addpatient'})
//        alert('进入新增就诊人页面')
      },
      //选择专家
      yes: function(appointdoc,index){
        this.appoint=appointdoc.name;
        this.appointcolor=false;
        this.doctorVisible=true;
        this.isbordernone=true;
        this.$store.commit("seriousill/changeseriousill",{appoint:1});
      },
      no: function(appointdoc,index){
        this.doctorVisible=false;
        this.isbordernone=false;
        this.inputdoctor='';//清空手输专家名
        this.$store.commit("seriousill/changeseriousill",{
          appoint:0,
          inputdoctor:'',
          choosedoctor:'请选择',
          choosedoctorId:''
        });
      }
    },
    components: {oklifeButton,Actionsheet,datepicker }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/
  }
  html,body,.box{overflow-x:hidden;}
  .fl{float:left;}
  .fr{float:right;}
  .color333{color:$font333;}
  .color999{color:$font999;}
  .color666{color:$font666;}
  .infoUl{width:100%;background:#fff;margin-top:px2rem(20);overflow:hidden;}
  .infoUl div{width:px2rem(676);height:px2rem(100);margin-left:px2rem(40);border-bottom:1px solid #D9D9D9;}
  .infoUl div:last-child{border-bottom:0px solid #D9D9D9;}
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
.choosedoctorBox{position:relative;border-top:px2rem(1) solid #D9D9D9;}
.doctorname{position:absolute;top:0;left:0;width:px2rem(500);height:100%;border:none;font-size:px2rem(30)}
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
  .infoUl div.bordernone{border:none;}
  .pick-mark {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);}
  .bigPhoto{position:fixed; width:100%;height:auto; vertical-align:middle; top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);}

  .move-enter-active,.move-leave-active {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

  }
  .move-enter, .move-leave-active {
    -webkit-transform: translateY(90%);
    -moz-transform: translateY(90%);
    -ms-transform: translateY(90%);
    transform: translateY(90%);
    opacity: 0;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }
  .scale-enter-active,.scale-leave-active {

    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin:100% 0%;
    -moz-transform-origin:100% 0%;
    -ms-transform-origin:100% 0%;
    transform-origin:100% 0%;
    opacity: 1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;

  }
  .scale-enter, .scale-leave-active {
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    -ms-transform: scale(0.3);
    transform: scale(0.3);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }


</style>
<style lang="scss" >
  @import "../../../static/css/base/min.scss";
  .mint-datetime .picker-toolbar{background:#efeff4 !important;}
  .mint-datetime-action{width:20% !important;}
  .mint-datetime-cancel{color:#707274 !important;}
  .mint-datetime-confirm{color:#4776E5 !important;}

  /*修改就诊人弹窗样式*/
 .mint-actionsheet{
    background-color: transparent;
    width: px2rem(710);
  }
  .mint-actionsheet .mint-actionsheet-list .mint-actionsheet-listitem{
    color:#0075ff !important;
    background-color: transparent;
    font-size: px2rem(40);
  }
 .mint-actionsheet .mint-actionsheet-list .mint-actionsheet-listitem:last-child{
    color:#fe3724 !important;
    border-bottom: none;
    margin-bottom: px2rem(16);
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
