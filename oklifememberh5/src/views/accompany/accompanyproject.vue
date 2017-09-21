<template>
  <div class="projectdetailcontainer">
    <img src="../../assets/peizhen_banner@3x.jpg" class="headercontainer">
    <p class="projecttitle">服务项目</p>
    <template  v-for="item in list">
      <p class="title">{{item.title}}</p>
      <p class="subtitle">{{item.content}}</p>
    </template>

  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        list:[
          {title:'1、乘车路线指引',
            content:'指引就诊者到院的行车路线，包括地铁、公交及自驾路线，供就诊者参考'
          },
          {title:'2、停改诊通知',
            content:'医生因故停诊、改期的，提前1天通知，除外就诊当天医生临时停诊'
          },
          {title:'3、办理就诊卡',
            content:'帮助办理就诊卡，患者提供医院规定的办卡所需证件，如提前办理，患者可自行邮递证件'
          },
          {title:'4、取号',
            content:'患者可提前转账支付挂号费用，也可陪诊人员垫付挂号费用，患者到院后返还。'
          },
          {title:'5、分诊',
            content:'为节省就诊时间，提取取号后提前到分诊台分诊，再与您在约定地点汇合'
          },
          {title:'6、医生面诊陪同',
            content:'因为涉及患者个人的疾病隐私，在患者同意的情况下，可协助患者陈述病史，整理就诊资料，如患者不同意，陪诊人员在诊室外等候'
          },
          {title:'7、用药指导',
            content:'按照处方内容给患者讲解用药剂量及用法'
          },
          {title:'8、预约检查',
            content:'帮助患者预约特殊检查，完成预约后立即通知患者检查时间，检查前一天提醒，并告知检前注意事项。'
          },
          {title:'9、陪同检查',
            content:'优化检查顺序，节约时间，检查注意事项提醒等'
          },
          {title:'10、标本送检',
            content:'代送标本及化验单到检验科室'
          },
          {title:'11、划价缴费',
            content:'代排队，费用由患者自己缴纳'
          },
          {title:'12、代取药物',
            content:'取药前拍下处方，取药后要与患者核对药品名称及数量'
          },
          {title:'13、领取报告',
            content:'领取就诊当天的各项检查报告'
          },
          {title:'14、解读医嘱',
            content:'用通俗易懂的语言为患者解释医嘱，告知注意事项，避免患者片面理解或遗忘医生的建议，贻误病情'
          },
          {title:'15、入院手续办理',
            content:'仅帮助排队，住院费用需要患者自行到缴费窗口缴纳，负责将患者送到住院病区。'
          }
        ]
      }
    },
    computed: {},
    watch: {},
    mounted () {
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '项目详情' // 标题
      });
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .projectdetailcontainer {
    /*margin-top: px2rem(88);*/;
    padding-bottom: px2rem(150);
    background: #ffffff;
  }

  .headercontainer {
    margin: 0 0 0 0;
    height: px2rem(300);
    display: flex;
  }

  .projecttitle {
    margin: px2rem(40) 0 px2rem(30) 0;
    font-family: "PingFang SC";
    font-size: px2rem(30);
    color: #333333;
    text-align: center;
    height: px2rem(50);
    line-height: px2rem(40);
    background:url(../../assets/underLine.png) no-repeat center bottom;
    background-size:px2rem(130);
  }

  .title {
    margin: px2rem(20) px2rem(30) 0 px2rem(30);
    text-align: left;
    font-family: "PingFang SC";
    font-size: px2rem(30);
    color: #333333;
    line-height: px2rem(40);
  }

  .subtitle {
    margin: px2rem(10) px2rem(30) 0 px2rem(76);
    text-align: left;
    font-family: "PingFang SC";
    font-size: px2rem(28);
    color: #666666;
    line-height: px2rem(40);
  }


</style>
