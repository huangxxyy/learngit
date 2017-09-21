<template>
  <div class="patientinfo">
      <div class="infoUl">
        <div>
          <router-link :to="{name:'patientname'}">
            <span class="fl color333">真实姓名</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="givenNamecolor?color999:color666">{{patientName}}</span>
          </router-link>
        </div>
        <div>
          <a disabled  @click="country_flag = !country_flag">
            <span class="fl color333">国籍</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="nationalityIdcolor?color999:color666">{{nationalityId}}</span>
          </a>
        </div>
        <div>
          <a disabled @click="idcard_flag = !idcard_flag">
            <span class="fl color333">证件类型</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="idCardTypecolor?color999:color666">{{idCardType}}</span>
          </a>
        </div>
        <div>
          <router-link :to="{name:'patientIdcard'}">
            <span class="fl color333">证件号码</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="idCardcolor?color999:color666">{{idCard}}</span>
          </router-link>
        </div>
        <div>
          <a disabled @click="flagShowSex">
            <span class="fl color333">性别</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="sexcolor?color999:color666">{{sex}}</span>
          </a>
        </div>
        <div>
          <a disabled  @click="openPicker">
            <span class="fl color333">出生日期</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="birthdaycolor?color999:color666">{{birthday}}</span>
          </a>
        </div>
        <div>
          <router-link :to="{name:'patientPhone'}">
            <span class="fl color333">手机号码</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="cellphonecolor?color999:color666">{{cellPhone}}</span>
          </router-link>
        </div>
        <div>
          <a disabled @click="relationshipVisible=!relationshipVisible">
            <span class="fl color333">关系</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="relationshipcolor?color999:color666">{{relationship}}</span>
          </a>
        </div>
        <div>
          <router-link :to="{name:'patientinsurance'}">
            <span class="fl color333">社保号</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="sincolor?color999:color666">{{sin}}</span>
          </router-link>
        </div>
      </div>
      <div class="infoUl">
        <div>
          <router-link :to="{name:'patiEmrg'}">
            <span class="fl color333 width7">紧急联系人姓名</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="patiEmrgcolor?color999:color666">{{patiEmrg}}</span>
          </router-link>
        </div>
        <div>
          <router-link :to="{name:'patiEmrgPhone'}">
            <span class="fl color333">手机号码</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="patiEmrgPhonecolor?color999:color666">{{patiEmrgPhone}}</span>
          </router-link>
        </div>
      </div>
      <div class="infoUl">
          <span class="fl colorMain">设置为默认就诊人</span>
          <oklife-switch v-model="byDefault" @change="defaultperson" class="mtswitch"></oklife-switch>
      </div>
      <oklife-button class="submitBtn" @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
    <!--默认就诊人-->
    <transition name="openmessage">
      <div class="pick-mark" v-show="messageBoxVisition">
        <div class="messageBox">
          <h4>确定修改默认就诊人吗？</h4>
          <a class="cancelBtn" disabled  @click="cancel">取消</a>
          <a class="confirmBtn" disabled  @click="confirm">确定</a>
        </div>
      </div>
    </transition>
    <!--证件类型-->
    <transition name="move">
      <div class="pick-mark" v-show="idcard_flag">
        <div class="btn-wrap">
          <a class="btn-cancel" @click="idcard_flag = !idcard_flag">取消</a>
          <span>请选择证件类型</span>
          <a class="btn-sure" @click="fillIdcard">确定</a>
        </div>
        <mt-picker class="select" :slots="slotIdcard"  @change="onValuesChangeIdcard"></mt-picker>
      </div>
    </transition>
    <!--国籍-->
    <transition name="move">
      <div class="pick-mark" v-show="country_flag">
        <div class="btn-wrap">
          <a class="btn-cancel" @click="country_flag = !country_flag">取消</a>
          <span>请选择国籍</span>
          <a class="btn-sure" @click="fillCountry">确定</a>
        </div>
        <mt-picker class="select" :slots="slotCountry"  @change="onValuesChangeCountry"></mt-picker>
      </div>
    </transition>
    <!--与本人关系-->
    <mt-actionsheet
      :actions="actions"
      v-model="relationshipVisible">
    </mt-actionsheet>
    <!--性别-->
    <transition name="move">
      <div class="pick-mark" v-show="sex_flag">
        <div class="btn-wrap">
          <a class="btn-cancel" @click="sex_flag = !sex_flag">取消</a>
          <span></span>
          <a class="btn-sure" @click="fillSex">确定</a>
        </div>
        <mt-picker class="select"  :slots="slotSex"  @change="onValuesChangeSex" ></mt-picker>
      </div>
    </transition>
    <!--三联动生日-->
    <div class="datapickerBox" v-show="age_flag">
      <mt-datetime-picker class="datapicker" :visibleItemCount="itemCount" v-model="defaultIndex"
        type="date" v-bind:start-date='startDate' v-bind:end-date="endDate"
        year-format="{value} 年" @cancel="ageBoxHidden"
        month-format="{value} 月"
        date-format="{value} 日" ref="picker"  @confirm="selecttime">
      </mt-datetime-picker>
      <div class="ageBox">
        <span @click="agestage0(6)">0-6岁</span>
        <span @click="agestage(7,18)">7-18岁</span>
        <span @click="agestage(19,40)">19-40岁</span>
        <span @click="agestage(41,60)">41-60岁</span>
        <span @click="agestage(61,80)">61-80岁</span>
        <span @click="agestage(81,120)">80岁以上</span>
      </div>
    </div>
  </div>
  </template>

<script>
  import { Picker,DatetimePicker,Switch,Actionsheet,Toast } from 'mint-ui';
  import {mapState,mapGetters } from 'vuex'
  import validator from '../../commonutils/validatorUtils'
  import commonUtils from '../../commonutils/commonUtils'
  import oklifeButton from '../../../src/components/button'
  import axios from 'axios'
  export default {
    data () {
      return {
        startDate:new Date("1900/01/01"),
        endDate:new Date(),
        age_flag:false,
        itemCount:5,
        idcard_flag:false,
        sex_flag:false,
        country_flag:false,
        birthday_flag:false,
        relationshipVisible:false,
        slotIdcard:[{values: ["大陆身份证","护照","港澳台胞证","其他"]}],
        slotSex:[{values:["男","女"]}],
        slotCountry:[{values:["中国"]}],
        defaultIndex:'1980/01/01',
        color999:"color999",
        color666:"color666",
        byDefault:false,
        messageBoxVisition:false,
        actions:[{name:"本人",method:this.chooserelationship},{name:"父母",method:this.chooserelationship},{name:"子女",method:this.chooserelationship},{name:"亲属",method:this.chooserelationship}],
      }
    },
    computed: {
      ...mapState({
          userId:state=>state.common.loginInfo.userId
        //todo userId:2
      }),
      ...mapGetters({
        sex: "patientinfo/getsex",
        idCardType: "patientinfo/getidcardType",
        birthday: "patientinfo/getbirthday",
        cellPhone:"patientinfo/toTel",
        idCard:"patientinfo/toidCard",
        sin:"patientinfo/tosin",
        nationalityId:"patientinfo/getnationalityId",
        relationship:"patientinfo/getrelationship",
        patientName:"patientinfo/getgivenName",
        patiEmrg:"patientinfo/getpatiEmrg",
        patiEmrgPhone:"patientinfo/getpatiEmrgPhone",
        //byDefault:"patientinfo/getbyDefault"
      }),
      //为空时颜色为#999，不为空时为#666；
      cellphonecolor() {
        if (this.cellPhone == "请填写") {
          return true;
        } else {
          return false;
        };
      },
      givenNamecolor(){
        if (this.patientName == "请填写真实姓名") {
          return true;
        } else {
          return false;
        };
      },
      nationalityIdcolor(){
        if (this.nationalityId == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      idCardTypecolor(){
        if (this.idCardType == "婴幼儿无身份可不填写") {
          return true;
        } else {
          return false;
        };
      },
      idCardcolor(){
        if (this.idCard == "请填写") {
          return true;
        } else {
          return false;
        };
      },
      relationshipcolor(){
        if (this.relationship == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      sexcolor(){
        if (this.sex == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      birthdaycolor(){
        if (this.birthday == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      patiEmrgcolor(){
        if (this.patiEmrg == "请填写") {
          return true;
        } else {
          return false;
        };
      },
      patiEmrgPhonecolor(){
        if (this.patiEmrgPhone == "请填写") {
          return true;
        } else {
          return false;
        };
      },
      sincolor(){
        if (this.sin == "请填写") {
          return true;
        } else {
          return false;
        };
      },

    },
    beforeRouteEnter(to, from, next){
      next()
    },
      watch: {
      },
      methods: {
        chooserelationship:function(actions,index){
          this.relationshipcolor=false;
          this.$store.commit("patientinfo/changpatientinfo",{relationship:index+1})
        },
        defaultperson(byDefault){
          //console.log(this.byDefault)
          if (this.byDefault) {
            this.messageBoxVisition = true;
          } else {
            this.$store.commit("patientinfo/changpatientinfo", {byDefault: 0})
          }
        },
        cancel(){
          this.$store.commit("patientinfo/changpatientinfo", {byDefault: 0})
          this.messageBoxVisition = false;
        },
        confirm(){
          this.$store.commit("patientinfo/changpatientinfo", {byDefault: 1})
          this.messageBoxVisition = false;
        },
        //判断是否有证件类型 以确定性别是否显示
        flagShowSex(){
          if (this.idCardType == "大陆身份证" && this.idCard !== "") {
            this.sex_flag = false;
          } else {
            this.sex_flag = true;
          }
        },
        flagShowAge(){
          if (this.idCardType == "大陆身份证" && this.idCard !== "") {
            this.ages_flag = false;
          } else {
            this.ages_flag = true;
          }
        },
        openPicker() {
          if (this.idCardType == "大陆身份证" && this.idCard !== "") {
            this.age_flag = false;
          } else {
            this.age_flag = true;
            this.$refs.picker.open();
          }
        },
        //填入证件类型
        fillIdcard(){
          var cardType = {"大陆身份证": 1, "护照": 2, "港澳台胞证": 3, "其他": 4};
          var keyvalue = this.valueIdcard;
          this.idcard_flag = !this.idcard_flag;
          this.$store.commit("patientinfo/changpatientinfo",{"idCardType": cardType[keyvalue]})

          if(cardType[keyvalue]==1&&this.$store.state.patientinfo.patientinfo.idCard!=null){
            console.log(this.$store.state.patientinfo.patientinfo.idCard);
            if(validator.isCardID(this.$store.state.patientinfo.patientinfo.idCard)){
              this.$store.commit('patientinfo/changpatientinfo', {
                sex:commonUtils.getsexByIdCard(this.$store.state.patientinfo.patientinfo.idCard),
                birthday:commonUtils.getTimeStamp(commonUtils.getBirthdayByIdCard(this.$store.state.patientinfo.patientinfo.idCard))
              });
            }else{
              this.$store.commit('patientinfo/changpatientinfo', {idCard:null})
            }
          }else{
              return;
          }
        },
        onValuesChangeIdcard(picker, values) {
          this.valueIdcard = values[0];
        },
        //填入性别
        fillSex(){
          this.sex_flag = !this.sex_flag;
          this.$store.commit("patientinfo/changpatientinfo",{"sex": this.valueSex == "男" ? 1 : 2})
        },
        onValuesChangeSex(picker, values) {
          this.valueSex = values[0];
        },
         //填入国籍
        fillCountry(){
          this.country_flag = !this.country_flag;
          this.$store.commit("patientinfo/changpatientinfo",{"nationalityId": this.valueCountry == "中国" ? 1 : null})
        },
        onValuesChangeCountry(picker, values) {
          this.valueCountry = values[0];
        },
        agestage0(age){
          var myDate = new Date();
          var ageStart;
          ageStart = myDate.getFullYear() - age;
          this.startDate = new Date(ageStart + '/01/01');
          this.endDate = new Date();
        },
        agestage(age1, age2){
          var myDate = new Date();
          var ageStart;
          var ageEnd;
          ageEnd = myDate.getFullYear() - age1;
          ageStart = myDate.getFullYear() - age2;
          this.startDate = new Date(ageStart + '/01/01');
          this.endDate = new Date(ageEnd + '/12/31');
          //this.isActive=true;
        },
        selecttime(values) {
          this.age_flag = false;
          var birthdayvalue = values.getFullYear() + '/' + ((values.getMonth() + 1) < 10 ? '0' + (values.getMonth() + 1) : (values.getMonth() + 1)) + '/' + (values.getDate() < 10 ? '0' + values.getDate() : values.getDate());
          this.$store.commit("patientinfo/changpatientinfo", {"birthday": commonUtils.getTimeStamp(birthdayvalue)})
        },
        ageBoxHidden(){
          this.age_flag = false;
        },
        submit(){
            //判断必填项是否已输入完全
          if(this.patientName == "请填写真实姓名"){
            let instance = Toast('请填写就诊人真实姓名');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if(this.nationalityId=="请选择"){
            let instance = Toast('请选择就诊人国籍');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if(this.idCardType=="请选择"){
            let instance = Toast('请选择就诊人证件类型');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if(this.idCard=="请填写"){
            let instance = Toast('请填写就诊人证件号码');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if(this.sex=="请选择"){
            let instance = Toast('请选择就诊人性别');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if(this.birthday=="请选择"){
            let instance = Toast('请选择就诊人出生日期');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if(this.cellPhone=="请填写"){
            let instance = Toast('请填写就诊人电话号码');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if(this.relationship=="请选择"){
            let instance = Toast('请选择就诊人与本人关系');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else{
              let params={
                $router:this.$router,
                  data:{
                patientName: this.patientName,
                sex: this.$store.state.patientinfo.patientinfo.sex,
                nationalityId: this.$store.state.patientinfo.patientinfo.nationalityId,
                idCardType: this.$store.state.patientinfo.patientinfo.idCardType,
                idCard: this.$store.state.patientinfo.patientinfo.idCard,
                cellPhone: this.$store.state.patientinfo.patientinfo.cellPhone,
                birthday: this.$store.state.patientinfo.patientinfo.birthday,
                relationship: this.$store.state.patientinfo.patientinfo.relationship,
                patiEmrg:this.patiEmrg,
                patiEmrgPhone:this.patiEmrgPhone,
                sin: this.$store.state.patientinfo.patientinfo.sin,
                mgrId:this.userId,
                byDefault:this.$store.state.patientinfo.patientinfo.byDefault,
              }
              }
            this.$store.dispatch("patientinfo/insertpatient", params)
          }
        }
      },
      mounted () {
        //触发异步请求action内的方法   dispatch('方法名')
        this.$store.commit('common/changeHeaderConf', {
          isBack: true,  // 是否显示返回
          isShare: false, // 是否显示分享
          isSkip: false,//是否显示跳过
          skipto: '',//点跳过后到哪个路由页面
          title: '新增就诊人' // 标题
        });
      },
      components: {
        Picker, DatetimePicker, oklifeSwitch:Switch,oklifeButton,Actionsheet,Toast
      }
  }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .fl{float:left;}
  .fr{float:right;}
  .color333{color:$font333;}
  .color999{color:$font999;}
  .color666{color:$font666;}
  .ellipsis{text-overflow:ellipsis;width:px2rem(480);white-space:nowrap; overflow:hidden;text-align: right; }
  .infoUl{margin-top:px2rem(20);width:100%;float:right;background:#fff;}
  .infoUl div{width:px2rem(676);height:px2rem(100);border-bottom:1px solid #D9D9D9;margin-left:px2rem(40);}
  .infoUl div:last-child{border-bottom:0px solid #D9D9D9;}
  .infoUl div.photoDiv{height:px2rem(141);}
  .infoUl div.photoDiv span{height:px2rem(141);line-height:px2rem(141);}
  .photoDiv img{width:px2rem(100);height:px2rem(100);margin-top:px2rem(20);border-radius:50%;}
  .infoUl div span,.infoUl div i{line-height:px2rem(100);}
  .infoUl div a{display:inline-block;width:100%;height:100%;}
  .infoUl div span.fl{font-size:px2rem(32);width:px2rem(150);}
  .infoUl div span.width7{width:7rem;}
  .infoUl div span{font-size:px2rem(30);}
  .infoUl div i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:100%;background:url("../../assets/go.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}
  .pick-mark {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
  .btn-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 180px;
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
  .datapicker{position:fixed;bottom:4rem;}
  .ageBox{position:fixed;bottom:0;height:3.6rem;padding-top:0.4rem;width:100%;background:#fff;z-index: 2006;}
  .ageBox span{float:left;display:inline-block;width:33%;line-height:1.8rem;border-bottom:1px solid $bColor;
    text-align: center;color:$font666;}
  .ageBox span.active{color:$mainC;}
  .messageBox{text-align: center;width:px2rem(540);height:px2rem(208);background:#fff;border-radius:px2rem(24);
    position:fixed;top:50%;margin-top:px2rem(-52);left:px2rem(105);}
  .messageBox  h4{color:#000;font-size:px2rem(34);line-height:px2rem(120);border-bottom:1px solid #ddd;}
  .messageBox  a{ width:px2rem(268);height:px2rem(88);color:#0079ff;display:inline-block;float: left;line-height:px2rem(88);border-right:1px solid #ddd;}
  .messageBox  a:last-child{border:none;}
.mtswitch{float:right;margin-top:px2rem(20);
  margin-right:px2rem(40);}
  .colorMain{color:$mainC; line-height:px2rem(100);font-size:px2rem(30);text-indent: px2rem(40);}
  .submitBtn{float:left;margin:px2rem(80) px2rem(50);}
</style>
<style>
  .mint-datetime .picker-toolbar{background:#efeff4 !important;}
  .mint-datetime-action{width:20% !important;}
  .mint-datetime-cancel{color:#707274 !important;}
  .mint-datetime-confirm{color:#4776E5 !important;}
  .mint-switch-input:checked + .mint-switch-core{background:#0DFF36;border-color:#0DFF36;}
</style>
