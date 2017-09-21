<template>
  <div class="bindmobile">
    <div class="contain">
      <div class="containcell">
        <!--<input type="number" class="inputcell inputcellphone" placeholder="请输入手机号" onkeypress="return (/[\d]/.test(String. fromCharCode(event.keyCode)))" oninput="if(value.length>11)value=value.slice(0,11)" ref="inputphone" v-model="phone">-->
        <label class="inputcell inputcellphone" >{{cellPhone}}</label>
        <div class="left">
          <img class="imgphone" src="../../assets/huisephone.png" v-show="isshowphone">
          <!--<img class="imgphone" src="../../assets/wxphoe.png" v-show="!isshowphone">-->
          <div class="countrynum">+86 <img class="imgjiantou" src="../../assets/downjiantou.png" alt=""></div>
        </div>
        <!--<div class="right">
          <img src="../../assets/wxclear.png" class="clear" v-if="clearshowphone" @click="clearinput(1)"
               ref="clearimgphone">
        </div>-->
      </div>
      <hr class="line">
      <div class="containcell">
        <input type="number" class="inputcell inputnum" placeholder="请输入验证码" ref="inputcode" v-model="code"  onkeypress="return (/[\d]/.test(String. fromCharCode(event.keyCode)))" oninput="if(value.length>11)value=value.slice(0,11)">
        <div class="left">
          <img class="imgnum" slot="iconleft" src="../../assets/huisenum.png" v-show="isshownum">
          <img class="imgnum" slot="iconleft" src="../../assets/huisenum.png" v-show="!isshownum">
        </div>
        <div class="right">
          <img src="../../assets/clear.png" class="clear" v-if="clearshowcode" @click="clearinput(2)"
               ref="clearimgcode">
          <oklife-button v-bind:disabled="isdisabled" v-bind:disabledtime="disabledtime" @click="getVerifiCode"
                         height="1.334rem" width="3.734rem" ><span v-text="buttontextcontent"></span></oklife-button>
        </div>
      </div>
      <hr class="line">
      <div class="containcell">
        <input type="text" class="inputcell inputaccount" placeholder="首位必须是字母，账号必须是字母和数字组合" ref="inputaccount" v-model="loginAccount">
        <div class="left">
          <img class="imgphone" src="../../assets/photo.png" v-show="isshowaccount">
          <img class="imgphone" src="../../assets/photo.png" v-show="!isshowaccount">
        </div>
        <div class="right">
          <img src="../../assets/clear.png" class="clear" v-if="clearshowaccount" @click="clearinput(1)"
               ref="clearimgaccount">
        </div>
      </div>
    </div>
    <oklife-button @click="submitphone" height="2.347rem" width="16.8rem" ><span>确定</span></oklife-button>
    <!--<div class="skipcontain">-->
    <!--<span class="skiptext">跳过</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  import oklifeButton from '@/components/button'
  import validator from '../../commonutils/validatorUtils'
  import { mapState,mapGetters } from 'vuex'
  import {Toast} from 'mint-ui';
  export default {
    name: 'changeAccount',
    data () {
      return {
        code: '',
        isdisabled: 'false',
        disabledtime: 'false',
        clearshowphone: false,
        clearshowcode: false,
        clearshowaccount:false,
        buttontextcontent: '获取',
        isshownum:true,
        isshowphone:true,
        isshowaccount:true,
        cellPhone:this.$store.getters['userinfo/toTel']=='用于接收就诊信息，请认真填写'?'':this.$store.getters['userinfo/toTel'],
        cellPhoneState:this.$store.state.userinfo.userinfo.cellPhone,
        loginAccount:this.$store.state.userinfo.userinfo.loginAccount=='未设置'?'':this.$store.state.userinfo.userinfo.loginAccount
      }
    },
    computed: {
      userId(){
        return this.$store.state.common.loginInfo.userId
      }
    },
    mounted () {
//        document.getElementsByTagName('title')[0].text='登录/注册';
//        alert(document.getElementsByTagName('title')[0].text);
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        title: '修改账号' // 标题
      });
      let _this = this;
      _this.$nextTick(function () {
        _this.$refs.inputcode.addEventListener('focus', function () {
          if (_this.code) {
            _this.clearshowcode = true;
          } else {
            _this.clearshowcode = false;
          }
          _this.isshownum=false
        }, false);
        _this.$refs.inputaccount.addEventListener('focus', function () {
          if (_this.loginAccount) {
            _this.clearshowaccount = true;
          } else {
            _this.clearshowaccount = false;
          }
          _this.isshowaccount=false
        }, false);
        document.addEventListener('click', function (e) {//监听document,除input和clear外，点击都消失
          if (_this.$refs.clearimgaccount == e.target || _this.$refs.inputaccount == e.target)return
          _this.clearshowaccount = false;
          _this.isshowaccount=true;
        })
        document.addEventListener('click', function (e) {//监听document,除input和clear外，点击都消失
          if (_this.$refs.clearimgcode == e.target || _this.$refs.inputcode == e.target) return
          _this.clearshowcode = false;
          _this.isshownum=true;
        })
      })
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {
      loginAccount(){
        if (this.loginAccount) {
          this.clearshowaccount = true
        } else {
          this.clearshowaccount = false
        }
      },
      code(){
        if (this.code) {
          this.clearshowcode = true
        } else {
          this.clearshowcode = false
        }
      }
    },
    methods: {
      submitphone(){
        var inputAccount=this.loginAccount;
        var vcode=this.code;
        if(!validator.isEnNumerFirstEn(inputAccount)){
          let instance = Toast('首位必须是字母，账号必须是字母和数字组合');
          setTimeout(() => {
            instance.close();
          }, 2000);
        }else if(vcode == ''){
          let instance = Toast('验证码不能为空');
          setTimeout(() => {
            instance.close();
          }, 2000);
        }else {
          this.$store.dispatch("userinfo/changeAccount",{
            "id": this.userId,
            "loginAccount": {
              "data": {
                "loginAccount": this.loginAccount,
                "identityCode": "8888"
              }
            }
          });
          this.$router.push({name:"userinfo"})
        }
        //todo 发送手机号+验证码到后台，验证手机，如验证通过则跳入授权页面
      },
      clearinput(index){
        if (1 == index) {
          this.loginAccount = '';
          this.clearshowaccount = false;
        } else if (2 == index) {
          this.code = '';
          this.clearshowcode = false;
        }
      },
      getVerifiCode(){
        if (this.disabledtime == 'true')return
        alert('已经发送验证码');
        let _this = this;
        _this.$store.dispatch("userinfo/geticode", {params:{"cellphone": _this.cellPhoneState}})
        setTimeout(function () {
          _this.isdisabled = 'false';
          _this.disabledtime = 'true';
        },1000);
        let time = 60;
        let settime = setInterval(function () {
          time--;
          _this.buttontextcontent = time + 's';
          if (-1 == time) {
            _this.buttontextcontent = '重新获取';
            _this.disabled = 'false';
            _this.disabledtime = 'false';
            clearInterval(settime)
          }
        }, 1000)

      }
    },
    /*filters: {
      //隐藏手机号码 前三后三显示
      toTel: function (value) {
          let start = value.slice(0, 3);
          let end = value.slice(-3);
          return start + '*****' + end;
      },
    },*/
    components: {
      oklifeButton,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .bindmobile{
    margin-top: px2rem(20);
  }
  .contain {
    margin-bottom: px2rem(100);
    padding-left: px2rem(60);
    border-bottom: 1px solid #d9d9d9;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  .wxcontainall{
    height: px2rem(420);
    width:100%;
    background-color: #EFEFF4;
  }
  .containphoto{
    text-align: center;
    color: #333333;
    font-size: px2ren(14);
  }
  .wxphoto{
    display: block;
    width: px2rem(164);
    height: px2rem(164);
    border-radius:px2rem(82);
    margin-left: auto;
    margin-right: auto;
    margin-top: px2rem(74);
    border:px2rem(1) solid #e1e1e1;
  }
  .wxnickname{
    display: block;
    margin-top: px2rem(16);
  }
  .line1{
    margin-top: px2rem(60);
    margin-left: px2rem(60);
    color: #999999;
    font-size: px2rem(24);
  }
  .line2{
    color: #999999;
    font-size: px2rem(24);
    margin-top: px2rem(10);
    margin-left: px2rem(60);
  ;
  }

  .line {
    background-color: #d9d9d9;
    height: 1px;
    border: none
  }

  .containcell {
    position: relative;
    background-color: #ffffff;
  }

  .inputcell {
    border: none;
    height: px2rem(100);
    font-size: px2rem(28);
    line-height: px2rem(100);
  }
  .inputcellphone{
    box-sizing: border-box;
    padding-left: px2rem(145);
    padding-top:px2rem(4);
    width: 82%;
  }
  .inputnum{
    padding-left: px2rem(45);
    width: 50%;
  }
  .inputaccount{width:82%;padding-left:px2rem(45);}
  .left{
    color: #333333 ;
    font-size: px2rem(28);
  }
  .countrynum{
    display: inline-block;
    position: absolute;
    top:px2rem(28);
    left:px2rem(48);
    font-size: px2rem(28);

  }
  .left .imgphone {
    position: absolute;
    top: px2rem(28);
    width: px2rem(28)
  }
  .left .imgjiantou{
    width: px2rem(24);
  }
  .left .imgnum {
    position: absolute;
    top: px2rem(36);
    width: px2rem(28)
  }

  .right {
    position: absolute;
    right: px2rem(60);
    top: px2rem(26);
  .clear{
    margin-right: px2rem(30);
  }
  }

  .clear {
    display: inline-block;
    width: px2rem(28);
  }

  .right div {
    display: inline-block;
  }

  .right button span {
    font-size: px2rem(30)
  }

</style>
