<template>
  <div class="container">
    <img src="../../assets/planform_home_icon.jpg" class="home">

    <div class="containerbox">
      <p class="title">{{contentlist[0].content}}</p>
      <img src="../../assets/planform_name_icon.jpg" class="headercontainer">
      <p class="title">{{contentlist[1].content}}</p>
      <img src="../../assets/planform_famaly_icon.jpg" class="headercontainer">
      <p class="title content">{{contentlist[2].content}}</p>
      <p class="title content">{{contentlist[3].content}}</p>
      <img src="../../assets/planform_computer_icon.jpg" class="headercontainer">
      <p class="title content">{{contentlist[4].content}}</p>
      <p class="title contentbottom">{{contentlist[5].content}}</p>
      <p class="title content" style="text-indent: 0">核心服务包括：</p>

      <div class="headercontainer" style="flex: block;">
        <div class="introdutionicon" >
          <img src="../../assets/planform_pic.jpg" style="margin: 0 0 0 0;width:100%;">
        </div>

        <div class="introdutionicon">
          <div class="planformpiciconMargin">
          <img src="../../assets/planform_left.png" class="arrow"">
          <p class="subtitle">01</p>
          <img src="../../assets/planform_right.png" class="arrow"">
          </div>

          <div class="headercontainerMargin">
            <img src="../../assets/planform_pic_icon.png" class="planformpicicon">
            <p class="planformpiciconText">大病求医</p>
          </div>

          <p class="title headercontainerMargin" style="text-indent: 0; ">告别传统求医，开启绿色通道，名医联盟，为患者精准导医</p>
          <img src="../../assets/planform_pic_line.png" class="planformpiciconline">
        </div>
      </div>

      <div class="headercontainer planformpiciconMarginTop" style="flex: block;">
        <div class="introdutionicon">
          <div class="planformpiciconMargin" style="margin-left: 0;">
            <img src="../../assets/planform_left.png" class="arrow"">
            <p class="subtitle">02</p>
            <img src="../../assets/planform_right.png" class="arrow"">
          </div>

          <div class="headercontainerMargin" style="margin-left: 0">
            <img src="../../assets/planform_pic_icon2.png" class="planformpicicon">
            <p class="planformpiciconText">就医陪同</p>
          </div>

          <p class="title headercontainerMargin" style="text-indent: 0; margin-left: 0">工作太忙？医院环境不熟？就诊全程陪同让您安心工作、舒适就医</p>
          <img src="../../assets/planform_pic_line.png" class="planformpiciconline" style="margin-left: 0">
        </div>

        <div class="introdutionicon" >
          <img src="../../assets/planform_pic2.jpg" style="margin: 0 0 0 0;width:100%;">
        </div>
      </div>


      <div class="headercontainer planformpiciconMarginTop" style="flex: block;">
        <div class="introdutionicon" >
          <img src="../../assets/planform_pic3.jpg" style="margin: 0 0 0 0;width:100%;">
        </div>

        <div class="introdutionicon">
          <div class="planformpiciconMargin">
            <img src="../../assets/planform_left.png" class="arrow"">
            <p class="subtitle">03</p>
            <img src="../../assets/planform_right.png" class="arrow"">
          </div>

          <div class="headercontainerMargin">
            <img src="../../assets/planform_pic_icon3.png" class="planformpicicon">
            <p class="planformpiciconText">二次会诊</p>
          </div>

          <p class="title headercontainerMargin" style="text-indent: 0; ">担心误诊、误治？权威专家二次为您把关</p>
          <img src="../../assets/planform_pic_line.png" class="planformpiciconline">
        </div>
      </div>
      </div>


    <div class="footerView">
      <div class="footerTextView">
        <p class="footerTitle" >行业：</p>
        <p class="footerSubTitle" >医疗科技</p>
      </div>

      <div class="footerTextView">
        <p class="footerTitle" >地区：</p>
        <p class="footerSubTitle" >广东深圳福田区</p>
      </div>

      <div class="footerTextView">
        <p class="footerTitle" >公司：</p>
        <p class="footerSubTitle" >深圳生命量医疗科技有限公司</p>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              contentlist:[
                {
                  "content":'深圳生命量医疗科技有限公司（OKLIFE）是一家互联网医疗高科技企业，中科院授权合作单位，专注于全球医疗检测与监测、健康大数据收集与挖掘以及大病跨区域无国界医疗，以整合全球优质医疗资源为核心，打造"无国界医疗"的全球医疗生态体系。'
                },
                {
                  "content":'生命量OKLIFE 无国界医疗是以"尊重生命、守护健康"为基本，将医患关系回归本源，医者俱仁心患者有知情，倾力打造无国界互联网医疗平台，建立一个健康、医疗和康复的全医疗服务模式，缓解社会就医难题。'
                },
                {
                  "content":'公司以健康监测为切入点，探寻互联网医疗的落地方案与可持续商业模式；以健康管理和康复指导为基础，建立互联网医疗平台，开启居家健康管理的新模式；链接全球优质医疗资源，实现"异地看专家、出国看大病"的医疗服务体系。将公司建设成为互联网医疗行业领军企业。'
                },
                {
                  "content":'生命量医疗基于雄厚的金融资本，依托来自全国三甲医院与华为、中兴等顶尖技术人才组成的"IT+医疗"精英团队、以及稳固的客户群体，为公司的迅速成长奠定了坚实的基础。'
                },
                {
                  "content":'公司以"医疗无国界，生命最尊贵"为核心理念，坚持只有创新，不革命！拥抱敢于颠覆、富于创造、勇于拼搏的人才，为人类的健康与生命事业共同奋斗。'
                },
                {
                  "content":'平台可根据患者的需求智能匹配专家，并经过专业平台医生精选，找到对应疾病的权威专家，并针对性的解决病痛问题，实现金准导医，并在此基础上提供相关续性服务。'
                }
              ]
            }
        },
        computed: {},
        watch: {},
      mounted () {
        let _this=this
        this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
          isshow:true,//是否显示头部
          isBack: true,  // 是否显示返回
          handleback:_this.handleback,
          isShare: false, // 是否显示分享
          sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
          isSkip: false,//是否显示跳过
          skipto: '',//点跳过后到哪个路由页面
          title: '关于oklife' // 标题
        });
      },
        beforeRouteEnter(to, from, next){
            next()
        },
        methods: {
          handleback(){
            //alert("监听到页面后退按钮");//根据自己的需求实现自己的功能
            if ('wx' == window.Browser_Environment_Oklife) {
              if (wx) {
                wx.ready(function () {
                  wx.closeWindow()
                })
              } else if (WeixinJSBridge) {
                WeixinJSBridge.call('closeWindow')
              }
            } else if ('app' == window.Browser_Environment_Oklife) {
              let jump = {//返回上层原生页面
                'nativeType': 'back'
              }
              let Success = () => {}
              let error = () => {}
              cordova.plugins.oklife.skipNative(Success, error, jump)//调用原生插件跳入原生快速咨询页面
            }
          },
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .container {
    /*margin-top: px2rem(88);*/
    background: #ffffff;
  }

  .containerbox {
    margin: 0 px2rem(30) 0 px2rem(30);
  }

  .home{
    margin: 0 0 0 0;
    width:100%;
    display: flex;
  }

  .headercontainer {
    margin: 0 0 0 0;
    width:100%;
    display: flex;
  }


  .introdutionicon{
    width:50%;
    display: inline-block;
  }

  .title {
    margin: px2rem(60) 0 px2rem(40) 0;
    text-align: left;
    font-family: "PingFang SC";
    font-size: px2rem(30);
    color: #333333;
    line-height: px2rem(40);
    text-indent: px2rem(60);
  }

  .content {
    margin: px2rem(40) 0 px2rem(40) 0 ;
  }

  .contentbottom {
    margin: px2rem(100) 0 px2rem(40) 0 ;
  }

  .subtitle {
    text-align: center;
    font-family: "PingFang SC";
    font-size: px2rem(30);
    color: #4385f5;
    line-height: px2rem(40);
    display: inline-block;
  }

  .arrow {
    margin-top: px2rem(0);
    margin-right:0;
    margin-left:0;
    width:px2rem(124);
    display: inline-block;
  }

  .headercontainerMargin{
    margin:px2rem(40) px2rem(30) px2rem(38) px2rem(30);
  }

  .planformpiciconMargin{
    margin-top: px2rem(30);
    margin-left: px2rem(30)
  }


  .planformpicicon{
    margin-left: 0;
    text-align: left;
    width: px2rem(50);
    height: px2rem(50);
    display: inline-block;
  }

  .planformpiciconText{
       margin-left:  px2rem(10);
       width:px2rem(200) ;
       text-align: left;
       font-family: "PingFang SC";
       font-size: px2rem(38);
       color: #4385f5;
       line-height: px2rem(40);
       display: inline-block;
     }

  .planformpiciconline{
    margin-left:px2rem(30);
    width: px2rem(280);
    text-align: center;
  }


  .planformpiciconMarginTop{
    margin-top: px2rem(150);
  }


  .footerView{
    background:url("../../assets/planform_foot.png");
    background-repeat:no-repeat;
    background-size: cover;
    height: px2rem(520);
    box-sizing: border-box;
    padding-top: px2rem(200);
    display:block;
  }

  .footerTextView{
      height: px2rem(48);
    }

  .footerTitle{
    margin-left: px2rem(30);
    margin-right: px2rem(0);
    text-align: left;
    font-family: "PingFang SC";
    font-size: px2rem(30);
    color: #333333;
    font-size: px2rem(24);
    display: inline-block;
    line-height: px2rem(30);
  }

  .footerSubTitle{
    padding-left: 0;
    margin-left: 0;
    text-align: left;
    font-family: "PingFang SC";
    font-size: px2rem(18);
    color: #999999;
    display: inline-block;
    line-height: px2rem(30);
  }


</style>
