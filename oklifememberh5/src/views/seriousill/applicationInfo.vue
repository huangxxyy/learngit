<template>
  <div class="space">
    <div class="box">
      <h4 class="infoCard">就诊信息<!--<span>申请中</span>--></h4>
      <p>就诊人：<span>{{datas.patientName}} {{datas.age}}岁 {{datas.sex==1?"男":"女"}}</span></p>
      <p>选择疾病：<span>{{datas.disName}}</span></p>
      <p>意向地：<span>{{datas.expArea }}</span></p>
      <p>就诊时间：<span>{{datas.visitStartDate|getTime}}-{{datas.visitEndDate|getTime}}</span></p>
      <p>指定专家：<span>否</span></p>
    </div>
    <div class="box">
      <h4 class="recode">病历描述</h4>
      <p class="font28">{{datas.diseaseDesc}}</p>
    </div>
    <div class="box box2">
      <h3><i></i>拍照上传的疾病相关资料</h3>
      <p class="font26">门诊病历、出院小结、检查报告等</p>
      <ul class="picture">
        <li v-for="(img,index) in images" v-if="index<4">
          <img :src="img" onerror="this.src='./img/picture.png';this.onerror=null"/>
        </li>
      </ul>
      <transition :name="
          images.length>3&&images.length<8?
          'toggle':images.length>7&&images.length<12?
          'toggle2':images.length>11&&images.length<16?
          'toggle3':images.length>15&&images.length<20?
          'toggle4':''
         ">
        <ul class="picture pictureshow" v-show="pictureVisible">
          <li v-for="(img,index) in images" v-if="index>3">
            <img :src="img" onerror="this.src='./img/picture.png';this.onerror=null"/>
          </li>
        </ul>
      </transition>
      <div class="pull" v-show="images.length>4" @click="pictureVisible=!pictureVisible;pulltext=!pulltext">
        <p v-show="pulltext"><i></i>展开</p>
        <p v-show="!pulltext"><i class="active"></i>收起</p>
      </div>
    </div>
    <div class="btnBox">
      <oklife-button v-show="cancelFlag" @click="submitComplete"  height="2.347rem" width="16.8rem" color="#4776e5">取消申请</oklife-button>
      <a v-show="!cancelFlag" disabled  class="grayBtn">取消申请</a>
    </div>
  </div>
</template>

<script>
  import api from '../../server/api'
  import oklifeButton from '../../components/button'
  import { Toast } from 'mint-ui'
  import wechatUtils from '../../commonutils/wechatUtils'
  const wx=require('weixin-js-sdk')
  export default {
    name: '',
    data () {
      return {
        pullVisible:false,
        pictureVisible:false,
        isActive:false,
        pulltext:true,
        pushtext:false,
        datas:[],
        cancelFlag:true,
        images:[]
      }
    },
    computed: {
      appId(){
        return this.$route.params.id
      },
    },
    watch: {},
    mounted () {
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '申请内容' // 标题
      });
      let _this=this
      api.getEventInfo({params:{appId:_this.appId}}).then(res=>{
        if(res==undefined){
          return false
        }else if(res.code==0){
          _this.cancelFlag=6;
          var result =res.data;
          for(var i=0;i<result.length;i++) {
            if(_this.cancelFlag<result[i].eventStatus)
              {
                _this.cancelFlag = false;
                console.log(_this.cancelFlag);
                break;
              }
          }
        }
      })
      api.getSeriousIllnessInf({params:{appId:_this.appId}}).then(res=>{
        if(res==undefined){
          return false
        }else if(res.code==0){
          _this.datas=res.data
          var result =res.data.fileList;
          if(result==null){
            return false;
          }else{
            for(var i=0;i<result.length;i++) {
              if(result[i].filePath==null) {
                let callback=(localId)=>{
                  _this.images.push(localId)
                }
                wechatUtils.wxdownloadImage(result[i].mediaCode, callback, wx)
              }else{
                _this.images.push (result[i].filePath)
              }
            }
          }
        }
      });
    },
    beforeRouteEnter(to, from, next){
      next ()
    },
    methods: {
      submitComplete: function () {
        this.$router.push({name:'cancelApply',params:{id:this.appId}})
      }
    },
    components: {
      oklifeButton,Toast
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    margin-top: px2rem(108);
    padding-bottom:px2rem(120);
  }
  h3,h4{font-weight: normal;}
  .box{width:100%;margin-top:px2rem(20);padding-bottom:px2rem(30);border-top:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;background:$fontfff;}
  .box h4,.box h3{color:#4285F4;width:px2rem(690);padding:0 px2rem(30);font-size:$fontNavm; text-indent:px2rem(50);line-height:px2rem(100);border-bottom:1px solid #d9d9d9;}
  .box h4.infoCard{background:url("../../assets/infoCard.png") no-repeat px2rem(30) center;background-size:px2rem(38) px2rem(42);}
  .box h4.recode{background:url("../../assets/recode.png") no-repeat px2rem(30) center;background-size:px2rem(38) px2rem(42);}
  .box p{width:px2rem(690);line-height:px2rem(100);border-bottom:1px solid #d9d9d9;font-size:$fontNavm;color:$font333;margin:0 px2rem(30);}
  .box p span{color:$font666;font-size:px2rem(30);}
  .box p:last-child{border-bottom:none;}
  .box p.font28{font-size:$font28;line-height:px2rem(40);padding:px2rem(10) 0;}
  .box h3{color:$font333;border-bottom:none;text-indent:0;}
  .box h3 i{width:px2rem(20);height:px2rem(20);background:#4285F4;border-radius:50%;margin-right:px2rem(20);display:inline-block;line-height:px2rem(100);}
  .box p.font26{font-size:$fontSmall;color:$font999;line-height:px2rem(26);text-indent: px2rem(40);border:none;}
  .box2{padding-bottom:px2rem(30);}
  .picture, .pictureshow {
    width: px2rem(690);
    margin:0 px2rem(30);
    overflow: hidden;
  }
  .btnBox .grayBtn{background:#d9d9d9;color:#fff;
    text-align: center; height:2.347rem; width:16.8rem;margin:0 auto;line-height:2.347rem;display: inline-block;}
  .picture li {
    width: px2rem(154);
    margin-right: px2rem(15);
    margin-top: px2rem(20);
    height: px2rem(154);
    float: left;
    border-radius: px2rem(8);
    border: 1px solid #4385F5;
    overflow: hidden;
  }

  .picture li:nth-child(4n) {
    margin-right: px2rem(0);
  }  .box .picture li img{width:px2rem(154);height:px2rem(154);}
  .space .box:last-child{margin-bottom:px2rem(120);}
  .pull{width:100%;height:px2rem(80);text-align: center;}
  .pull p{font-size:px2rem(28);color:#999; line-height:px2rem(80); border:none;}
  .pull p i{transition: all 0.4s;display:inline-block;width:px2rem(26);height:px2rem(16);margin-right:px2rem(10);background:url(../../assets/pull.png) no-repeat;background-size:px2rem(26);}
  .pull p i.active{background:url(../../assets/push.png) no-repeat;background-size:px2rem(26);}
  .btnBox{margin-top:px2rem(120); text-align: center}
  .toggle-enter-active{
    transition:all .5s ease;
    height:px2rem(180);
  }
  .toggle-leave-active{
    transition:all .5s ease;
    height:0;
    opacity: 0;
  }
  .toggle-leave{
    opacity: 1;
    height:px2rem(180);
  }
  .toggle-enter{
    opacity:0;
    height: 0;
  }

  .toggle2-enter-active{
    transition:all .5s ease;
    height:px2rem(360);
  }
  .toggle2-leave-active{
    transition:all .5s ease;
    height:0;
    opacity: 0;
  }
  .toggle2-leave{
    opacity: 1;
    height:px2rem(360);
  }
  .toggle2-enter{
    opacity:0;
    height: 0;
  }

  .toggle3-enter-active{
    transition:all .5s ease;
    height:px2rem(540);
  }
  .toggle3-leave-active{
    transition:all .5s ease;
    height:0;
    opacity: 0;
  }
  .toggle3-leave{
    opacity: 1;
    height:px2rem(540);
  }
  .toggle3-enter{
    opacity:0;
    height: 0;
  }

  .toggle4-enter-active{
    transition:all .5s ease;
    height:px2rem(720);
  }
  .toggle4-leave-active{
    transition:all .5s ease;
    height:0;
    opacity: 0;
  }
  .toggle4-leave{
    opacity: 1;
    height:px2rem(720);
  }
  .toggle4-enter{
    opacity:0;
    height: 0;
  }

</style>
