<template>
  <div class="bindmobile">
    <div class="contain">
      <div class="containcell">
        <input type="text" class="inputcell inputcellphone" onkeypress="return (/[\d]/.test(String. fromCharCode(event.keyCode)))" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入手机号"  ref="inputphone" v-model="cellPhone" />
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
        <input type="number" class="inputcell inputnum" placeholder="请输入验证码" ref="inputcode" v-model="code">
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
    <oklife-button @click="submitphone" height="2.347rem" width="16.8rem" ><span>确定</span></oklife-button>
  </div>
</template>

<script>
  import oklifeButton from '@/components/button'
  import validator from '../../commonutils/validatorUtils'
  import commonutils from '../../commonutils/commonUtils'
  import api from '../../server/api'
  import {Toast} from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'bindmobile',
    data () {
      return {
        code: '',
        isdisabled: 'true',
        disabledtime: 'false',
        clearshowphone: false,
        clearshowcode: false,
        buttontextcontent: '获取',
        isshownum:true,
        isshowphone:true,
        cellPhone:this.$store.getters['patientinfo/toTel']=="请填写"?"":this.$store.getters['patientinfo/toTel'],
        patientId:this.$store.state.patientinfo.patientinfo.patientId
      }
    },
    computed: {
    },
    mounted () {
//        document.getElementsByTagName('title')[0].text='登录/注册';
//        alert(document.getElementsByTagName('title')[0].text);
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        title: '就诊人手机号' // 标题
      });
            let _this = this;
            _this.$nextTick(function () {
              _this.$refs.inputphone.addEventListener('focus', function () {
                console.log(_this.cellPhone)
                if (_this.cellPhone) {
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
      cellPhone(){
        if (this.cellPhone) {
          this.clearshowphone = true
        }else {
          this.clearshowphone = false
        }
        if (validator.isMobile(this.cellPhone)) {
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
      clearinput(index){
        if (1 == index) {
          this.cellPhone = '';
          this.clearshowphone = false;
        } else if (2 == index) {
          this.code = '';
          this.clearshowcode = false;
        }
      },
      getVerifiCode(){
        if (this.isdisabled == 'true' || this.disabledtime == 'true')return
        Toast('已经发送验证码');
        this.$store.dispatch("patientinfo/geticode", {params:{"cellphone": this.cellPhone}})
        let _this = this;
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

      },
        submitphone(){
          if (this.cellPhone == '') {
            Toast({
              message: '请输入您的手机号',
              position: 'center',
              duration: 2000
            });
          } else if (this.code == '') {
            Toast({
              message: '请输入验证码',
              position: 'center',
              duration: 2000
            });
          }else{
            //todo 发送手机号+验证码到后台，验证手机，如验证通过则跳入授权页面
            api.identifyIdCode({data:{cellphone: this.cellPhone,
              identityCode:this.code}}).then(res => {
              if(res.code==0) {
                this.$store.commit('patientinfo/changpatientinfo',{cellPhone:this.cellPhone});
                if(this.$store.state.patientinfo.patientinfo.patientId ==null){
                    this.$router.push({name:'added'})
                  }else{
                    this.$router.push({path:'revise/'+this.patientId})
                  }
              }else if(res.errors.code==1002){
                Toast({
                  message: '验证码错误',
                  position: 'center',
                  duration: 2000
                });
              }else{
                Toast({
                  message: "网络异常，请稍后再试",
                  position: 'center',
                  duration: 2000
                });
              }
            })
          }
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
