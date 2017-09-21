<template>
  <div class="bindmobile">
    <div class="wxcontainall">
      <div class="containphoto">
        <img class="wxphoto" :src="headImgUrl" alt=""><span class="wxnickname">{{nickName}}</span>
      </div>
      <div class="line1">
        <span class="text1">亲爱的微信平台用户：</span><span>{{nickName}}</span>
      </div>
      <span class="line2">为了给您更好的服务，请输入您的手机号</span>
    </div>
    <div class="contain">
      <div class="containcell">
        <input type="number" class="inputcell inputcellphone" placeholder="请输入手机号" onkeypress="return (/[\d]/.test(String. fromCharCode(event.keyCode)))" oninput="if(value.length>11)value=value.slice(0,11)" ref="inputphone" v-model="phone">
        <div class="left">
            <img class="imgphone" src="../../assets/huisephone.png" v-show="isshowphone">
          <img class="imgphone" src="../../assets/wxphoe.png" v-show="!isshowphone">
            <div class="countrynum">+86 <img class="imgjiantou" src="../../assets/downjiantou.png" alt=""></div>
        </div>
        <div class="right">
          <img src="../../assets/wxclear.png" class="clear" v-if="clearshowphone" @click="clearinput(1)"
               ref="clearimgphone">
        </div>
      </div>
      <hr class="line">
      <div class="containcell">
        <input type="number" class="inputcell inputnum" placeholder="请输入验证码" ref="inputcode" v-model="code"  onkeypress="return (/[\d]/.test(String. fromCharCode(event.keyCode)))" oninput="if(value.length>11)value=value.slice(0,11)">
        <div class="left">
          <img class="imgnum" slot="iconleft" src="../../assets/huisenum.png" v-show="isshownum">
          <img class="imgnum" slot="iconleft" src="../../assets/num.png" v-show="!isshownum">
        </div>
        <div class="right">
          <img src="../../assets/wxclear.png" class="clear" v-if="clearshowcode" @click="clearinput(2)"
               ref="clearimgcode">
          <oklife-button v-bind:disabled="isdisabled" v-bind:disabledtime="disabledtime" @click="getVerifiCode"
                         height="1.334rem" width="3.734rem" ><span v-text="buttontextcontent"></span></oklife-button>
        </div>
      </div>
    </div>
    <oklife-button @click="submitphoneLogin" height="2.347rem" width="16.8rem" ><span>提交</span></oklife-button>
  </div>
</template>

<script>
  import oklifeButton from '@/components/button'
  import validatorUtils from '../../commonutils/validatorUtils'
  import commonutils from '../../commonutils/commonUtils'
  import api from '../../server/api'
  import { mapGetters } from 'vuex'
  import {Toast} from 'mint-ui';
  export default {
    name: 'bindmobile',
    data () {
      return {
        phone: '',
        code: '',
        isdisabled: 'true',//按钮是否可用
        disabledtime: 'false',//倒计时按钮是否可用
        clearshowphone: false,
        clearshowcode: false,
        buttontextcontent: '获取',
        isshownum:true,
        isshowphone:true,
        thispage_isSkip: (commonutils.getRequest().entry==undefined?'':commonutils.getRequest().entry).substring(0,4)=='v1001'?false:true,//是否显示跳过
        thispage_skipto: (commonutils.getRequest().entry==undefined?'':commonutils.getRequest().entry).substring(0,4)=='v1001'?'':'authorize',//点跳过后到哪个路由页面
      }
    },
    computed: {
      ...mapGetters({
        headImgUrl:'common/headImgUrl',
        nickName:'common/nickName'
      })
    },
    mounted () {
      let _this = this;
      let entry=commonutils.getRequest().entry==undefined?'':commonutils.getRequest().entry
      console.log(entry)
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow:true,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: this.thispage_isSkip,//是否显示跳过
        skipto: this.thispage_skipto,//点跳过后到哪个路由页面
        title: '登录/注册' // 标题
      });
      _this.$nextTick(function () {
        _this.$refs.inputphone.addEventListener('focus', function () {
          if (_this.phone) {
            _this.clearshowphone = true;
          } else {
            _this.clearshowphone = false;
          }
          _this.isshowphone=false
        }, false);
        _this.$refs.inputcode.addEventListener('focus', function () {
          if (_this.code) {
            _this.clearshowcode = true;
          } else {
            _this.clearshowcode = false;
          }
          _this.isshownum=false
        }, false);
        document.addEventListener('click', function (e) {//监听document,除input和clear外，点击都消失
          if (_this.$refs.clearimgphone == e.target || _this.$refs.inputphone == e.target)return
          _this.clearshowphone = false;
          _this.isshowphone=true;
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
      phone(){
        if (this.phone) {
          this.clearshowphone = true
        } else {
          this.clearshowphone = false
        }
        if (validatorUtils.isMobile(this.phone)) {
          this.isdisabled = 'false';
        } else {
          this.isdisabled = 'true';
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
      submitphoneLogin(){
        if(this.phone==''){
          Toast({
            message: '请输入您的手机号',
            position: 'center',
            duration: 2000
          });
          return
        }else if(this.code==''){
          Toast({
            message: '请输入验证码',
            position: 'center',
            duration: 2000
          });
          return
        }

        //验证手机并注册登录，如手机号已经注册过APP，会返回账号，如未注册则账号返回空；
        let params={
            data:Object.assign(this.$store.state.common.UserInfoByAuthCode,{"cellphone":this.phone,"identityCode":this.code}),
            $router:this.$router
        };
        console.log(params);
        this.$store.dispatch('common/lightAppLogin',params);//注册并登录

      },
      clearinput(index){
        if (1 == index) {
          this.phone = '';
          this.clearshowphone = false;
        } else if (2 == index) {
          this.code = '';
          this.clearshowcode = false;
        }
      },
      getVerifiCode(){
        let _this = this;
        if (this.isdisabled == 'true' || this.disabledtime == 'true')return  //倒计时显示了，则不允许点击
        let params={
            "cellphone": this.phone,
        };
        api.geticode({params:params}).then((res) => {
          if(res==undefined){
            Toast({
              message: '网络异常，验证码未发送！',
              position: 'center',
              duration: 2000
            });
            return
          }else if(0==res.code){
            console.log (res);
            Toast({
              message: '验证码已发送！',
              position: 'center',
              duration: 2000
            });
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
          }else if(1==res.code){
            console.log (res);
            Toast({
              message: '服务器异常，请重新获取！',
              position: 'center',
              duration: 2000
            });
          }
        })
      }
    },
    components: {
      oklifeButton,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
.bindmobile{
  /*margin-top: px2rem(88);*/;
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
    width: 80%;
  }
  .inputnum{
    padding-left: px2rem(45);
    width: 50%;
  }
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
