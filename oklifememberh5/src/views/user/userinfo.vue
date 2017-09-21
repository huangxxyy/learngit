<template>
  <div class="userinfo">
      <div class="infoUl">
        <div class="photoDiv">
          <router-link to="">
              <span class="fl color333">头像</span>
              <img :src="avatar" @click="photo_flag = !photo_flag" class="photo fr" onerror="this.src='./img/defaultAvatar.png';this.onerror=null"/>
          </router-link>
        </div>
        <div>
          <a disabled @click="accountRouter">
            <span class="fl color333">账号</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="loginAccountcolor ? color999 : color666">{{loginAccount}}</span>
          </a>
        </div>
        <div>
          <router-link :to="{name:'inputbabyname'}" >
            <span class="fl color333">昵称</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="nicknamecolor ? color999 : color666">{{nickName}}</span>
          </router-link>
        </div>
        <div>
          <router-link :to="{name:'phonenumber'}">
            <span class="fl color333">手机号码</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="cellphonecolor?color999:color666">{{cellPhone}}</span>
          </router-link>
        </div>
      </div>
      <div class="infoUl">
        <div>
          <router-link :to="{name:'inputname'}">
            <span class="fl color333">真实姓名</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="givenNamecolor?color999:color666">{{givenName}}</span>
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
          <router-link :to="{name:'idcard'}">
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
          <a disabled @click="flagShowAge">
            <span class="fl color333">年龄</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="agecolor?color999:color666">{{age}}</span>
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
          <a disabled @click="merry_flag = !merry_flag">
            <span class="fl color333">是否已婚</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="marriedFlagcolor?color999:color666">{{marriedFlag}}</span>
          </a>
        </div>
        <div>
          <router-link :to="{name:'insurance'}">
            <span class="fl color333">社保号</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="sincolor?color999:color666">{{sin}}</span>
          </router-link>
        </div>
      </div>
      <div class="infoUl">
        <div>
          <a disabled @click="address_flag = !address_flag">
            <span class="fl color333">居住区域</span>
            <i class="rightIcon"></i>
            <span class="fr" v-bind:class="provinceNamecolor?color999:color666">{{provinceName}}</span>
          </a>
        </div>
        <div>
          <router-link :to="{name:'address'}">
            <span class="fl color333">详细地址</span>
            <i class="rightIcon"></i>
            <span class="fr ellipsis" v-bind:class="addresscolor?color999:color666">{{address}}</span>
          </router-link>
        </div>
      </div>
    <!--头像放大-->
    <transition name="scale">
      <div class="pick-mark"  @click="photo_flag = !photo_flag" v-show="photo_flag">
        <img :src="avatar" class="bigPhoto" onerror="this.src='./img/defaultAvatar.png';this.onerror=null"/>
      </div>
    </transition>
      <!--三联动城市-->
    <transition name="move">
      <div class="pick-mark" v-show="address_flag">
        <div class="btn-wrap">
          <a class="btn-cancel" @click="address_flag = !address_flag">取消</a>
          <span>请选择地址</span>
          <a class="btn-sure" @click="fillAddress">确定</a>
        </div>
        <mt-picker class="select" :slots="slots"  @change="onValuesChangeCity" value-key="provinceName"></mt-picker>
      </div>
    </transition>
    <!--证件类型-->
    <mt-actionsheet
      :actions="appointcardtype"
      v-model="idcard_flag">
    </mt-actionsheet>
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
    <!--性别-->
    <mt-actionsheet
      :actions="appointsex"
      v-model="sex_flag">
    </mt-actionsheet>
    <!--婚否-->
    <mt-actionsheet
      :actions="appointmerry"
      v-model="merry_flag">
    </mt-actionsheet>
    <!--年龄-->
    <transition name="move">
      <div class="pick-mark" v-show="ages_flag">
        <div class="btn-wrap">
          <a class="btn-cancel" @click="ages_flag = !ages_flag">取消</a>
          <span></span>
          <a class="btn-sure" @click="fillAge">确定</a>
        </div>
        <mt-picker class="select" :slots="slotAge"  @change="onValuesChangeAge"></mt-picker>
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
  import { Actionsheet,Picker,DatetimePicker  } from 'mint-ui';
  import { mapState,mapGetters } from 'vuex'
  import {initaddr, slots} from '../../assets/address';
  import validator from '../../commonutils/validatorUtils'
  import commonUtils from '../../commonutils/commonUtils'
  import axios from 'axios'
  var slotAge=new Array();
  for(var ages=0;ages<120;ages++){
    slotAge.push(ages)
  }
  export default {
    data () {
      return {
        startDate:new Date("1900/01/01"),
        endDate:new Date(),
        age_flag:false,
        itemCount:5,
        //isActive:false,
        photo_flag: false,
        address_flag: false,
        idcard_flag:false,
        sex_flag:false,
        ages_flag:false,
        merry_flag:false,
        country_flag:false,
        birthday_flag:false,
        slots: slots,
        slotAge:[{values:slotAge}],
        temp_addr: '',
        appointcardtype:[{name:"大陆身份证",method:this.cardtype},{name:"护照",method:this.cardtype},{name:"港澳台胞证",method:this.cardtype},{name:"其他",method:this.cardtype}],
        appointsex:[{name:"男",method:this.sexchoose},{name:"女",method:this.sexchoose}],
        appointmerry:[{name:"已婚",method:this.merrychoose},{name:"未婚",method:this.merrychoose}],
        slotCountry:[{values:["中国"]}],
        defaultIndex:'1980/01/01',
        localaddr:[],
        cityId:"",
        proId:"",
        areaId:"",
        color999:"color999",
        color666:"color666",
      }
    },
    computed: {
      ...mapState({
        userId:state=>state.common.loginInfo.userId,
        avatar: state => state.userinfo.userinfo.avatar,
        loginAccount: state => state.userinfo.userinfo.loginAccount,
        nickName: state => state.userinfo.userinfo.nickName,
        provinceName: state => state.userinfo.userinfo.provinceName,
        address: state => state.userinfo.userinfo.address,
        givenName: state => state.userinfo.userinfo.givenName,
        age: state => state.userinfo.userinfo.age,
        nationalityId: state => state.userinfo.userinfo.nationalityId,
      }),
      ...mapGetters({
        sex: "userinfo/getsex",
        marriedFlag: "userinfo/getmarried",
        idCardType: "userinfo/getidcardType",
        birthday: "userinfo/getbirthday",
        cellPhone:"userinfo/toTel",
        idCard:"userinfo/toidCard",
        sin:"userinfo/tosin",
      }),
//为空时颜色为#999，不为空时为#666；
      loginAccountcolor() {
        if (this.loginAccount == "未设置") {
          return true;
        } else {
          return false;
        };
      },
      nicknamecolor() {
        if (this.nickName == "未设置") {
          return true;
        } else {
          return false;
        };
      },
      cellphonecolor() {
        if (this.cellPhone == "用于接收就诊信息，请认真填写") {
          return true;
        } else {
          return false;
        };
      },
      givenNamecolor() {
        if (this.givenName == "请填写您的真实姓名") {
          return true;
        } else {
          return false;
        };
      },
      nationalityIdcolor() {
        if (this.nationalityId == "请选择您的国籍") {
          return true;
        } else {
          return false;
        };
      },
      idCardTypecolor() {
        if (this.idCardType == "婴幼儿无身份可不填写") {
          return true;
        } else {
          return false;
        };
      },
      idCardcolor() {
        if (this.idCard == "请填写") {
          return true;
        } else {
          return false;
        };
      },
      sexcolor() {
        if (this.sex == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      agecolor() {
        if (this.age == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      birthdaycolor() {
        if (this.birthday == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      marriedFlagcolor() {
        if (this.marriedFlag == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      sincolor() {
        if (this.sin == "请填写") {
          return true;
        } else {
          return false;
        };
      },
      provinceNamecolor() {
        if (this.provinceName == "请选择您的所在城市") {
          return true;
        } else {
          return false;
        };
      },
      addresscolor() {
        if (this.address == "请填写您的具体地址") {
          return true;
        } else {
          return false;
        };
      },
    },
    beforeRouteEnter(to, from, next){
      next()
    },
      watch: {},
      methods: {
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
        accountRouter(){
          if (this.cellPhone !== "用于接收就诊信息，请认真填写") {
            this.$router.push({name:"changeAccount"})
          } else {
            this.$router.push({name:"changeAccountNP"})
          }
        },
        //填入证件类型
        cardtype:function(actions,index){
          this.idCardTypecolor=false;
          this.$store.commit("userinfo/changUserinfo",{"idCardType":index+1});
          if(index+1==1&&this.$store.state.userinfo.userinfo.idCard!=null){
            console.log(this.$store.state.userinfo.userinfo.idCard);
            if(validator.isCardID(this.$store.state.userinfo.userinfo.idCard)){
              this.$store.commit('userinfo/changUserinfo', {
                sex:commonUtils.getsexByIdCard(this.$store.state.userinfo.userinfo.idCard),
                birthday:commonUtils.getTimeStamp(commonUtils.getBirthdayByIdCard(this.$store.state.userinfo.userinfo.idCard))
              });
            }else{
              this.$store.commit('userinfo/changUserinfo', {idCard:"请填写"})
            }
          }else{
            return;
          }
        },
        //填入性别
        sexchoose:function(actions,index){
          this.sexcolor=false;
          this.$store.dispatch("userinfo/changeSex", {
            "id": this.userId,
            "sex": {
              "data": {
                "sex": index+1
              }
            }
          })
        },
        //填入婚否
        merrychoose:function(actions,index){
          this.marriedFlagcolor=false;
          this.$store.dispatch("userinfo/changeMarriedFlag", {
            "id": this.userId,
            "marriedFlag": {
              "data": {
                "marriedFlag": index+1
              }
            }
          })
        },
        onValuesChangeMerry(picker, values) {
          this.valueMerry = values[0];
        },
        //填入年龄
        onValuesChangeAge(picker, values){
          this.valueAge = values[0];
        },
        fillAge(){
          this.ages_flag = !this.ages_flag;
          this.$store.dispatch("userinfo/changeAge", {
            "id":this.userId,
            "age": {
              "data": {
                "age": this.valueAge
              }
            }
          })
        },
        //填入国籍
        fillCountry(){
          this.country_flag = !this.country_flag;
          this.$store.dispatch("userinfo/changeNationality", {
            "id": this.userId,
            "nationalityId": {
              "data": {
                "nationalityId": this.valueCountry == "中国" ? 1 : null
              }
            }
          })
        },
        onValuesChangeCountry(picker, values) {
          this.valueCountry = values[0];
        },
        fillAddress() {
          // 填入省市区
          let _this = this;
          this.addr = this.temp_addr;
          this.address_flag = !this.address_flag;

          this.$store.commit('userinfo/changUserinfo', {
            provinceName: this.temp_addr
          }, {root: true})
          this.$store.dispatch("userinfo/changeprovinces", {
            "id": this.userId,
            "provinces": {
              "data": {
                "provinceId": this.proId,
                "cityId": this.cityId,
                "areaId": this.areaId
              }
            }
          })
        },
        initAddress(addr) {
          this.localaddr = addr;

          this.slots[0].values = this.localaddr.filter((item, index) => {
            if (item.parentId=== 0) {
              return item;
            }
            //console.log(item);
          });

        },
        onValuesChangeCity(picker, values) {
          // 防止没有省份时报错
          if (values[0]) {
            this.slots[1].values = this.localaddr.filter((item, index) => {
              if (item.parentId === values[0].provinceId) {
                return item;
              }
            });
            //console.log(this.slots[1].values)
            this.proId = values[0].provinceId
          }
          // 防止没有市时报错
          if (values[1]) {
            this.slots[2].values = this.localaddr.filter((item, index) => {
              if (item.parentId === values[1].provinceId) {
                return item;
              }
            });
            this.cityId = values[1].provinceId
          }
          // 防止没有区时报错
          if (values[2]) {
            // 这里可以指定地址符，此处以空格进行连接
            this.temp_addr = values[0].provinceName + ' ' + values[1].provinceName + ' ' + values[2].provinceName;
            this.areaId = values[2].provinceId

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
          this.$store.dispatch("userinfo/changeBirthday", {
            "id": this.userId,
            "birthday": {
              "data": {
                "birthday": commonUtils.getTimeStamp(birthdayvalue)
              }
            }
          })
        },
        ageBoxHidden(){
          this.age_flag = false;
        }
      },
      mounted () {
        //触发异步请求action内的方法   dispatch('方法名')
        this.$store.commit('common/changeHeaderConf', {
          isBack: true,  // 是否显示返回
          isShare: false, // 是否显示分享
          isSkip: false,//是否显示跳过
          skipto: '',//点跳过后到哪个路由页面
          title: '个人信息' // 标题
        });
        this.$store.dispatch("userinfo/getsyncuserinfo",{params: {"id": this.userId}});
        initaddr(this.initAddress);
        console.log(this.sin)
      },
      components: {
        Picker, DatetimePicker,Actionsheet
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
  .infoUl div span{font-size:px2rem(30);}
  .infoUl div i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:100%;background:url("../../assets/go.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}
  .bigPhoto{position:fixed; width:90%;height:auto;margin:0 5%; vertical-align:middle;border-radius: 50%; top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);}
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
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

  }
  .scale-enter, .scale-leave-active {
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
