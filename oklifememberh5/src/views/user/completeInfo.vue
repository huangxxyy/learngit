<template>
  <div class="completeInfo">
    <div class="tipsBox">
      <greay-background-p greayBackgroundP="医生希望你完善信息，以便了解您的情况，平台更好的为您服务"></greay-background-p>
    </div>
    <div class="infoUl">
      <div>
        <router-link :to="{name:'completename'}">
          <span class="fl color333">真实姓名</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="givenNamecolor?color999:color666">{{givenName}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'completePhone'}">
          <span class="fl color333">手机号码</span>
          <i class="rightIcon"></i>
          <span class="fr" v-bind:class="cellphonecolor?color999:color666">{{cellPhone}}</span>
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
        <router-link :to="{name:'completeIdcard'}">
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
    </div>
    <div class="btnBox">
      <oklife-button @click="submitComplete"  height="2.347rem" width="16.8rem" color="#4776e5">确认完善信息</oklife-button>
    </div>
    <!--<router-link to="" class="jumpComplete">暂不完善，跳过</router-link>-->
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
  </div>
</template>

<script>
  import { Actionsheet,Picker,DatetimePicker,Toast  } from 'mint-ui';
  import { mapState,mapGetters } from 'vuex'
  import validator from '../../commonutils/validatorUtils'
  import commonUtils from '../../commonutils/commonUtils'
  import greayBackgroundP from '../../components/greayBackgroundP'
  import oklifeButton from '../../../src/components/button'
  import axios from 'axios'
  var slotAge=new Array();
  for(var ages=0;ages<120;ages++){
    slotAge.push(ages)
  }
  export default {
    name:"completeInfo",
    data () {
      return {
        completeuserId:'',
        age_flag:false,
        idcard_flag:false,
        sex_flag:false,
        ages_flag:false,
        country_flag:false,
        slotAge:[{values:slotAge}],
        appointcardtype:[{name:"大陆身份证",method:this.cardtype},{name:"护照",method:this.cardtype},{name:"港澳台胞证",method:this.cardtype},{name:"其他",method:this.cardtype}],
        appointsex:[{name:"男",method:this.sexchoose},{name:"女",method:this.sexchoose}],
        slotCountry:[{values:["中国"]}],
        color999:"color999",
        color666:"color666",
      }
    },
    computed: {
      ...mapState({
        givenName: state => state.completeInfo.completeInfo.givenName,
        age: state => state.completeInfo.completeInfo.age,
        //nationalityId: state => state.completeInfo.completeInfo.nationalityId,
      }),
      ...mapGetters({
        sex: "completeInfo/getsex",
        idCardType: "completeInfo/getidcardType",
        cellPhone:"completeInfo/toTel",
        idCard:"completeInfo/toidCard",
        nationalityId:"completeInfo/getnationality"
      }),
      //为空时颜色为#999，不为空时为#666；
      cellphonecolor() {
        if (this.cellPhone == "用于接收就诊信息，请认真填写") {
          return true;
        } else {
          return false;
        };
      },
      givenNamecolor(){
        if (this.givenName == "请填写您的真实姓名") {
          return true;
        } else {
          return false;
        };
      },
      nationalityIdcolor(){
        if (this.nationalityId == "请选择您的国籍") {
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
      sexcolor(){
        if (this.sex == "请选择") {
          return true;
        } else {
          return false;
        };
      },
      agecolor(){
        if (this.age == "请选择") {
          return true;
        } else {
          return false;
        };
      },
    },
    beforeRouteEnter(to, from, next){
      console.warn('to.params.id:'+to.params.id)
      next(vm => {
        if (from.path == "/completeList/completename" || from.path == "/completeList/completePhone" || from.path == "/completeList/completeIdcard") {
          vm.completeuserId=to.params.id
          console.log( vm.completeuserId)
          vm.$store.commit('completeInfo/changcompleteInfo',{id:to.params.id})
          return
        } else {
          vm.completeuserId=to.params.id
          console.log( vm.completeuserId)
          vm.$store.commit('completeInfo/changcompleteInfo',{id:to.params.id})
          vm.$store.dispatch("completeInfo/getsyncuserinfo", {params: {"id": to.params.id}})
        }
      })
    },
    watch: {},
    methods: {
      //判断是否有证件类型 以确定性别是否显示
      flagShowSex(){
        if (this.idCardType == '大陆身份证' && this.idCard !== '请填写') {
          this.sex_flag = false
        } else {
          this.sex_flag = true
        }
      },
      flagShowAge(){
        if (this.idCardType == '大陆身份证' && this.idCard !== '请填写') {
          this.ages_flag = false
        } else {
          this.ages_flag = true
        }
      },
      //填入证件类型
      cardtype:function(actions,index){
        this.idCardTypecolor=false;
        this.$store.commit('completeInfo/changcompleteInfo', {idCardType:index+1})
        if(index+1==1&&this.$store.state.completeInfo.completeInfo.idCard!="请填写"){
          if(validator.isCardID(this.$store.state.completeInfo.completeInfo.idCard)){
            this.$store.commit('completeInfo/changcompleteInfo', {
              sex:commonUtils.getsexByIdCard(this.$store.state.completeInfo.completeInfo.idCard),
              age:commonUtils.getAgeByIdCard(this.$store.state.completeInfo.completeInfo.idCard)
            });
          }else{
            this.$store.commit('completeInfo/changcompleteInfo', {idCard:"请填写"})
          }
        }else{
          return;
        }
      },
      //填入性别
      sexchoose:function(actions,index){
        this.sexcolor=false;
        this.$store.commit('completeInfo/changcompleteInfo', {sex: index+1})
      },

      //填入年龄
      onValuesChangeAge(picker, values){
        this.valueAge = values[0]
      },
      fillAge(){
        this.ages_flag = !this.ages_flag
        this.$store.commit('completeInfo/changcompleteInfo', {age: this.valueAge})
        console.log(this.valueAge)
      },
      //填入国籍
      fillCountry(){
        this.country_flag = !this.country_flag
        this.$store.commit('completeInfo/changcompleteInfo', {nationalityId: this.valueCountry == '中国' ? 1 : null})
      },
      onValuesChangeCountry(picker, values) {
        this.valueCountry = values[0]
        //console.log(this.valueCountry)
      },
      submitComplete(){
        if (this.givenName == '请填写您的真实姓名' || this.cellPhone == '请填写' || this.idCard == '请填写' ||
          this.nationalityId == null) {
          let instance = Toast('您的资料尚不完善')
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else {
          console.log(this.completeuserId)
          this.$store.dispatch('completeInfo/custinfo', {
            'id': this.completeuserId,
            'custinfo': {
              'data': {
                'age': this.age,
                'cellphone': this.$store.state.completeInfo.completeInfo.cellPhone,
                'givenName': this.givenName,
                'idCard': this.$store.state.completeInfo.completeInfo.idCard,
                'idCardType': this.$store.state.completeInfo.completeInfo.idCardType,
                'nationalityId': this.nationalityId=="中国"?1:null,
                'sex': this.$store.state.completeInfo.completeInfo.sex
              }
            },
            $router: this.$router
          })
        }
      }
    },
    mounted () {
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '完善个人资料' // 标题
      });
    },
    components: {
      Picker, DatetimePicker,greayBackgroundP,oklifeButton,Toast,Actionsheet
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
  .completeInfo{position: relative;height: 100%;font-size: px2rem(28);}
  .btnBox{position: relative;top:px2rem(40);}
  .infoUl{width:100%;background:#fff; position: relative;}
  .infoUl div{width:px2rem(676);height:px2rem(100);border-bottom:1px solid #D9D9D9;margin-left:px2rem(40);}
  .infoUl div:last-child{border:none;}
  .infoUl div.photoDiv{height:px2rem(141);}
  .infoUl div.photoDiv span{height:px2rem(141);line-height:px2rem(141);}
  .infoUl div span,.infoUl div i{line-height:px2rem(100);}
  .infoUl div a{display:inline-block;width:100%;height:100%;}
  .infoUl div span.fl{font-size:px2rem(32);width:px2rem(150);}
  .infoUl div span{font-size:px2rem(30);}
  .infoUl div i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:100%;background:url("../../assets/go.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}
  .jumpComplete{font-size:$font28;color:$mainC;line-height: px2rem(50);display:block;width:100%;height:px2rem(50);text-align: center;
    position:relative;top:px2rem(60);}

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
  .datapicker{position:fixed;bottom:4rem;}
  .ageBox{position:fixed;bottom:0;height:3.6rem;padding-top:0.4rem;width:100%;background:#fff;z-index: 2006;}
  .ageBox span{float:left;display:inline-block;width:33%;line-height:1.8rem;border-bottom:1px solid $bColor;
    text-align: center;color:$font666;}
  .ageBox span.active{color:$mainC;}
</style>
<style lang="scss" >
  @import "../../../static/css/base/min.scss";
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

