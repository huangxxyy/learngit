<template>
  <div class="space">
    <div class="infoUl">
      <div>
        <a disabled @click="sheetVisible = !sheetVisible">
          <span class="fl color333">就诊人</span>
          <i class="rightIcon"></i>
          <span class="fr color666">{{patient}}</span>
        </a>
      </div>
      <div>
        <a disabled>
          <span class="fl color333">就诊时间</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="time=='请选择'?color999:color666">{{time}}</span>
          <datepicker v-model="datepickertime"></datepicker>
        </a>
      </div>
    </div>
    <div class="infoUl">
      <div class="choosehospitalBox">
        <input class="hospitalname" placeholder="请填写就诊医院" v-model="inputhospital" v-if="inputhospitalVisible" ref="inputhos"/>
        <router-link :to="{name:'selecthospital'}" v-if="choosehospitalVisible">
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="choosehospitalcolor?color999:color666">{{choosehospital}}</span>
        </router-link>
      </div>
    </div>
    <div class="infoUl">
      <div class="peopleNum">
        <a disabled @click="peopleNum_flag = !peopleNum_flag">
          <span class="fl color333">陪诊人数</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="getPeopleNum=='请选择'?color999:color666">{{getPeopleNum}}</span>
        </a>
      </div>
      <div>
        <a disabled @click="carVisible = !carVisible">
          <span class="fl color333">车接送</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="carappointcolor?color999:color666">{{carappoint}}</span>
        </a>
      </div>
      <div>
        <router-link :to="{name:'accompanyproject'}">
          <span class="fl color333">陪诊项目</span>
          <i class="rightIcon"></i>
          <span class="fr color666">全流程陪诊</span>
        </router-link>
      </div>
    </div>
    <div class="box">
      <h3><i></i>请拍照上传疾病相关资料</h3>
      <p class="font26">门诊病历、出院小结、检查报告等,您还能上传{{canloadnum}}张</p>
      <ul class="picture">
        <li v-for="(pic,index) in picslocalId">
          <img :src="pic" @click="photo_flag =index"  onerror="this.src='./img/picture.png';this.onerror=null"/>
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
      <oklife-button @click="submithelp" height="2.347rem" width="18.4rem">提交申请</oklife-button>
      <div class="agreementcontain">
        <span class="text" @click="selectAgreement"><i :class="{'selectAgreement':isselectAgreement,'noselectAgreement':!isselectAgreement}"></i>
      同意</span><router-link :to="{name:'accompanyagreement'}" class="goAgreement">《oklife就医陪诊协议》</router-link>
      </div>
    </div>
    <!--就诊人-->
    <mt-actionsheet id="patientsheet"
                    :actions="actions"
                    v-model="sheetVisible" class="patient">
    </mt-actionsheet>
    <!--指定车接送-->
    <mt-actionsheet
      :actions="carappointdoc"
      v-model="carVisible">
    </mt-actionsheet>
    <!--APP端上传图片点击弹出相册或拍照-->
    <mt-actionsheet
      :actions="appSelectPicOrcarmerAction"
      v-model="appSelectPicOrcarmerVisible">
    </mt-actionsheet>
    <!--上传照片放大-->
    <template v-for="(pic,index) in picslocalId">
      <transition name="scale">
        <div class="pick-mark" @click="photo_flag ='-1'" v-show="photo_flag==index">
          <img :src="pic" class="bigPhoto" onerror="this.src='./img/picture.png';this.onerror=null"/>
        </div>
      </transition>
    </template>
    <!--陪诊人数-->
    <transition name="move">
      <div class="pick-mark" v-show="peopleNum_flag">
        <div class="btn-wrap">
          <a class="btn-cancel" @click="peopleNum_flag = !peopleNum_flag">取消</a>
          <span></span>
          <a class="btn-sure" @click="fillPeopleNum">确定</a>
        </div>
        <div class="headertitle">
          <a class="headerleft">男</a>
          <span></span>
          <a class="headerright">女</a>
        </div>
        <mt-picker class="select peopleNum" :slots="slotPeopleNum"  @change="onValuesChangeNum" value-key="num"></mt-picker>
      </div>
    </transition>
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
    name: 'accompany',
    data () {
      return {
        datepickertime:'',
        remnant: 500,
        color999:"color999",
        color666:"color666",

        choosehospitalcolor:true,
        carappointcolor:true,
        sheetVisible:false,
        carVisible:false,
        choosehospitalVisible:true,
        patientList:[],//就诊人列表
        defaultPatientId:'',//默认就诊人Id
        defaultPatient:'',//默认就诊人名字
        //actions:[{name:"苏南江",id:1,method:this.patients},{name:"孙澍雨",method:this.patients},{name:"新增就诊人",method:this.newpatients}],
        actions:[],
        carappointdoc:[{name:"是",method:this.yes},{name:"否",method:this.no}],

        appSelectPicOrcarmerAction:[{name:"拍照",method:this.carmer},{name:"从相册选取",method:this.selectPic}],
        appSelectPicOrcarmerVisible:false,
        inputhospital:'',//页面双向绑定的手动输入的医院名字变量
        inputhospitalVisible:true,
        desc:'',
        photo_flag:'-1',//是否显示大图
        valuesfemaleNum:[],
        valuesmaleNum:[],

        slotPeopleNum:[],
        peopleNum_flag:false,
        femaleNumPeople:'0',//临时存储男性人数
        maleNumPeople:'0',//临时存储女性人数
        canloadnum:20,//还能上传多少张照片
      }
    },
    computed: {
      ...mapState({
        patient: state => state.accompany.accompany.patient,
        patientId: state => state.accompany.accompany.patientId,
        choosehospitalId: state => state.accompany.accompany.choosehospitalId,
        desccontent: state => state.accompany.accompany.desc,
        inputhospitalname:state=>state.accompany.accompany.inputhospitalname,//从vuex获取的手动输入的医院名字变量
        visitStartDate:state=>state.accompany.accompany.visitStartDate,
        visitEndDate:state=>state.accompany.accompany.visitEndDate,
        picslocalId:state=>state.accompany.accompany.picslocalId,//微信本地图片ID，从微信选择图片获得
        picsmediaId:state=>state.accompany.accompany.picsmediaId,//微信服务器图片ID，从微信上传成功后返回
        femaleNum:state=>state.accompany.accompany.femaleNum,
        maleNum:state=>state.accompany.accompany.maleNum,
        isselectAgreement:state=>state.accompany.accompany.isselectAgreement,
      }),
      ...mapGetters({
        carappoint: "accompany/getcarappoint",
        time:'accompany/getvisitTime',
        choosehospital:'accompany/getchoosehospital',
        getPeopleNum:'accompany/getPeopleNum'//显示陪诊人数
      }),
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
        let visitTime = this.datepickertime?this.datepickertime:''
        if (visitTime) {
          this.$store.commit('accompany/changeaccompany', {
            visitTime: visitTime
          })
        }
        console.log(this.$store.state.accompany.accompany.visitTime)
      },
      inputhospital(){
        if (this.inputhospital) {
          this.choosehospitalVisible = false
        } else {
          this.choosehospitalVisible = true
        }
      },
      choosehospital(){
        if (this.choosehospital=="请选择") {
          this.inputhospitalVisible = true
        } else {
          this.inputhospitalVisible = false
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
        title: '陪诊申请' // 标题
      });
      //初始化陪诊人数
      this.initPeopleNum()
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


          if(!this.$store.state.accompany.accompany.patientId){
            this.$store.commit('accompany/changeaccompany',{//设置带入默认就诊人
              patient:this.defaultPatient,
              patientId:this.defaultPatientId
            })
          }
        }
      })

      //监听失去焦点 填入专家名到vuex的store
      _this.$refs.inputhos.addEventListener('blur', function () {
        _this.$store.commit("accompany/changeaccompany",{
          inputhospitalname:_this.inputhospital,
          choosehospital:'',
          choosehospitalId:''
        });
      });
      _this.$refs.desctextarea.addEventListener('blur', function () {
        _this.$store.commit("accompany/changeaccompany",{desc:_this.desc});
      });

      //进入页面的时候判断vuex的state中是否有医院名
      if(this.inputhospitalname){this.inputhospital=this.inputhospitalname}
      if(this.desccontent){this.desc=this.desccontent}
      if(this.choosehospital!='请选择'||!this.choosehospital){this.inputhospitalVisible = false}
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
      initPeopleNum(){
        for(let i=0;i<21;i++){
          this.valuesfemaleNum.push({sex:'男',num:String(i)})
          this.valuesmaleNum.push({sex:'女',num:String(i)})
        }
        this.slotPeopleNum=[
          {
            flex: 1,
            values: this.valuesfemaleNum,
            className: 'slot1',
            textAlign: 'center',
          },
          {
            flex: 1,
            values: this.valuesmaleNum,
            className: 'slot2',
            textAlign: 'center',
          }]
      },
      //选择陪诊人数
      fillPeopleNum(){
        this.peopleNum_flag = !this.peopleNum_flag;
        this.$store.commit("accompany/changeaccompany", {
          femaleNum:this.femaleNumPeople,//男人陪诊数
          maleNum:this.maleNumPeople,//女人陪诊数
        })
      },
      onValuesChangeNum(picker, values) {
        console.log(values)
        if(values[0].sex=='男'){
          this.femaleNumPeople=values[0].num
        }else if(values[0].sex=='女'){
          this.maleNumPeople=values[0].num
        }
      },
      submithelp(){
        if(!this.$store.state.accompany.accompany.visitTime){
          Toast('请您选择就诊时间')
          return false
        }else if(!this.$store.state.accompany.accompany.inputhospitalname && !this.$store.state.accompany.accompany.choosehospitalId){
          Toast('请您选择或输入就诊医院')
          return false
        }else if((!this.$store.state.accompany.accompany.maleNum || this.$store.state.accompany.accompany.maleNum=='0') && (!this.$store.state.accompany.accompany.femaleNum ||this.$store.state.accompany.accompany.femaleNum=='0')){
          Toast('请您选择陪诊人数')
          return false
        }else if(!this.$store.state.accompany.accompany.desc){
          Toast('请您输入病情描述')
          return false
        }else if(!this.$store.state.accompany.accompany.isselectAgreement){
          Toast('请您查看协议并勾选')
          return false
        }
        let data={
          "femaleNum":this.$store.state.accompany.accompany.femaleNum,// 陪诊女人数 ,
          "maleNum":this.$store.state.accompany.accompany.maleNum,//陪诊男人数 ,
          "pickupAddress":this.$store.state.accompany.accompany.pickupAddress,//接送地址
          "specialCar": this.$store.state.accompany.accompany.carappoint,//是否指定车接送标志
          "visitHosp": this.$store.state.accompany.accompany.inputhospitalname,//手写医院
          "visitHospId": this.$store.state.accompany.accompany.choosehospitalId,//所选医院Id

          "requirement": this.$store.state.accompany.accompany.desc,//病情描述
          "productIdList": [1],//全流程陪诊项目
          "fileKeyList":this.$store.state.accompany.accompany.picsmediaId,
          "fileType": window.Browser_Environment_Oklife=='wx'?1:0,
          "patientId": this.$store.state.accompany.accompany.patientId,
          "userId":this.userId,
          //todo "userId": 1,//调试开发用
          "visitDate": commonUtils.getTimeStamp(this.$store.state.accompany.accompany.visitTime),
        }

        api.accompanyApply({data:data}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            console.log(res)
            this.$store.commit('accompany/changeaccompany',{
              applytime:res.data.applyDate
            })
            this.$router.replace("accompanysuccess");
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
            _this.$store.commit('accompany/addpicslocalIdAndpicsmediaId',{
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
            _this.$store.commit('accompany/addpicslocalIdAndpicsmediaId',{
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
        this.$store.commit('accompany/deletepicslocalIdAndpicsmediaId',index)
      },
      addpic(){
        let _this=this
        if(window.Browser_Environment_Oklife=='wx'){
          wx.ready(function () {
            let callback=(mediaId,localId)=>{
              if(_this.picslocalId.length<20){
                _this.$store.commit('accompany/addpicslocalIdAndpicsmediaId',{
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
        this.$store.commit("accompany/changeaccompany",{patient:actions.name,patientId:actions.patientId})
        console.log(this.$store.state.accompany.accompany.patient)
        console.log(this.$store.state.accompany.accompany.patientId)
      },
      newpatients:function () {
        this.$router.push({name:'addpatient'})
//        alert('进入新增就诊人页面')
      },
      //指定车接送
      yes: function(carappointdoc,index){
        this.carappoint=carappointdoc.name;
        this.carappointcolor=false;
        this.$store.commit("accompany/changeaccompany",{carappoint:1});
        this.$router.push({name:'pickupAddress'})
      },
      no: function(carappointdoc,index){
        this.$store.commit("accompany/changeaccompany",{
          carappoint:0,
          pickupAddress:''//清空地址
        });
      },
      //勾选协议
      selectAgreement(){
        this.$store.commit('accompany/changeaccompany',{
          isselectAgreement:!this.isselectAgreement
        })
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
  .infoUl{width:100%;background:#fff;margin-top:px2rem(20);overflow:hidden;border-bottom: px2rem(1) solid #d9d9d9}
  .infoUl div{width:px2rem(676);height:px2rem(100);margin-left:px2rem(40);border-bottom:1px solid #D9D9D9;}
  .infoUl div:last-child{border-bottom:none;}
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
  .choosehospitalBox{position:relative}
  .hospitalname{position:absolute;top:0;left:0;width:px2rem(500);height:100%;border:none;font-size: px2rem(30)}
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
  .pick-mark {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    .headertitle{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 110px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      padding: 0 px2rem(175);
      font-size: px2rem(34);
      background: #ffffff;
      z-index: 9999;
    }
    .btn-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom:180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: px2rem(80);
      padding: 0 px2rem(40);
      font-size: px2rem(34);
      background: #efeff4;
    .btn-cancel {
      color: #707274;
    }
    .btn-sure {
      color: #4776E5;
    }
  }
  .select {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
  }
  .picker-items {
    background: #eee;
  .picker-slot {
    font-size: px2rem(14);
  }
  .picker-item {
  &.picker-selected {
     color: #535353;
   }
  }
  .picker-center-highlight {
  &:after, &:before {
              background: #fff;
            }
  }
  }
  }
  .bigPhoto{position:fixed; width:100%;height:auto; vertical-align:middle; top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);}
  .agreementcontain{
    margin-top: px2rem(20);
    font-size: px2rem(26);
    text-align: center;
    .text{
      color: #666666;
    }
    .goAgreement{
      margin-left: px2rem(8);
      color: $mainC;
      display: inline-block;
      height: px2rem(40);
      border-bottom:px2rem(1) solid $mainC;
    }
  }
  .selectAgreement{
    vertical-align: middle;
    background-image: url('../../assets/tongyixieyi.png');
    background-size: cover;
    display: inline-block;
    width:px2rem(26);
    height:px2rem(26) ;
  }
  .noselectAgreement{
    vertical-align: middle;
    background-image: url('../../assets/notongyixieyi.png');
    background-size: cover;
    display: inline-block;
    width:px2rem(26);
    height: px2rem(26);
  }

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
  /*修改陪诊人数选择*/
  .peopleNum .picker-slot{
    position: relative;
    left: px2rem(125) !important;
    margin-right: px2rem(250);
  }
</style>
