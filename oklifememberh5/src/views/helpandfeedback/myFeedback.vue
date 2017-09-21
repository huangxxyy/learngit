<template>
  <div class="space">
    <div class="search">

    </div>
    <div class="feedbackList" v-show="!nothingVisition">
      <div class="feedbackBox" v-for="(item,a) in datas">
        <router-link :to="{name:'leaveMessage',params:{problemId:item.problemId}}">
          <p class="p1">{{item.lastTalkDate|getTime}}
            <i :class="item.status==1?
            'unanswered':item.status==2?
            'replied':'solved'">{{item.status==1?'未回复':item.status==2?'已回复':'已解决'}}</i>
          </p>
          <p>{{item.problemDesc}}</p>
          <ul class="picture">
            <li v-for="(filePath,index) in item.attachList" v-if="index<4">
              <img :src="filePath.filePath" onerror="this.src='./img/picture.png';this.onerror=null"/>
            </li>
          </ul>
          <transition :name="
          item.attachList.length>3&&item.attachList.length<8?
          'toggle':item.attachList.length>7&&item.attachList.length<12?
          'toggle2':item.attachList.length>11&&item.attachList.length<16?
          'toggle3':item.attachList.length>15&&item.attachList.length<20?
          'toggle4':''
         ">
            <ul class="picture pictureshow" v-show="pictureVisible===a">
              <li v-for="(filePath,index) in item.attachList" v-if="index>3">
                <img :src="filePath.filePath" onerror="this.src='./img/picture.png';this.onerror=null"/>
              </li>
            </ul>
          </transition>
          <div class="pull" v-show="item.attachList.length>4" @click="isshowpic(a)">
            <p v-show="!(pictureVisible===a)"><i></i>展开</p>
            <p v-show="pictureVisible===a"><i class="active"></i>收起</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="nothing" v-show="nothingVisition">
      <img src="../../assets/addparient.png"/>
      <p class="addparientP">您还未反馈过意见，赶快去使用</p>
    </div>
  </div>
</template>

<script>
  import api from '../../server/api'
  export default {
    name: '',
    data () {
      return {
        istoggle:true,
        istoggle2:false,
        istoggle3:false,
        istoggle4:false,
        pictureVisible: '-1',
        isActive: false,
        pulltext: true,
        unanswered:'unanswered',
        replied:'replied',
        solved:'solved',
        datas: [],
        nothingVisition:true,

      }
    },
    computed: {
      userId(){
        return this.$store.state.common.loginInfo.userId
      },
    },
    watch: {

    },
    mounted () {
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow: true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '我的反馈' // 标题
      });
      let _this=this;
      api.getmyfeedback({params:{"userId":this.userId}}).then(res=>{
        if (undefined == res) {
          return false
        } else if (0 == res.code) {
          this.datas = res.data
          if(_this.datas.length==0){
            _this.nothingVisition=true;
          }else{
            _this.nothingVisition=false;
          };
        }
      })
      var result =this.datas;
      var attachList='';
      for(var i=0;i<result.length;i++){
        attachList = result[i].attachList;
        console.log(attachList.length)
      }
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    methods: {
      isshowpic(index){
        if(this.pictureVisible==index){
          this.pictureVisible='-1'
        }else{
          this.pictureVisible=index
        }
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .space {
    /*margin-top: px2rem(88);*/;
  }

  .feedbackList {
    width: 100%;
    height: auto;
  }

  .feedbackList .feedbackBox {
    float: left;
    width: px2rem(690);
    padding: px2rem(30);
    background: #fff;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: px2rem(20);
  }

  .feedbackBox p {
    font-size: px2rem(30);
    color: $font333;
    margin: px2rem(20) 0;
    line-height: px2rem(40);
  }

  .feedbackBox p.p1 {
    color: $font999;
    font-size: px2rem(26);
    margin:0;
  }

  .feedbackBox p.p1 i{
    display: inline-block;
    padding: 0 px2rem(18);
    font-size: px2rem(24);
    line-height: px2rem(36);
    color: $fontfff;
    font-style: normal;
    border-radius: px2rem(15);
    float:right;
  }
  .feedbackBox p.p1 i.unanswered{
    background: #a1bdff;
  }
  .feedbackBox p.p1 i.replied{
    background: #85e3c8;
     }
  .feedbackBox p.p1 i.solved{
    background: #efeff4;
    color:$font999;
  }
   .picture, .pictureshow {
    width: px2rem(690);
    height:auto;
    overflow: hidden;
  }

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
  }

  .picture li img {
    width: px2rem(154);
    height: px2rem(154);
  }

  .pull {
    width: 100%;
    height: px2rem(80);
    text-align: center;
    -webkit-user-select: none;
  }

  .pull p {
    font-size: px2rem(28);
    color: #999;
    line-height: px2rem(80);
  }

  .pull p i {
    transition: all 0.4s;
    display: inline-block;
    width: px2rem(26);
    height: px2rem(16);
    margin-right: px2rem(10);
    background: url(../../assets/pull.png) no-repeat;
    background-size: px2rem(26);
  }

  .pull p i.active {
    background: url(../../assets/push.png) no-repeat;
    background-size: px2rem(26);
  }
  .nothing img {
    display: block;
    margin: auto;
    width: px2rem(414);
    height: px2rem(352);
    margin-top: px2rem(152);
  }
  .addparientP{
    margin:px2rem(80) auto;
    color: $font999 ;
    font-size:$fontNavm;line-height:px2rem(32);
    text-align:center;
  }
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
