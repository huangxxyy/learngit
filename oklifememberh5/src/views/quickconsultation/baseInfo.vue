<template>
  <div class="space" ref="sheight">
    <div class="infoUl">
      <div>
        <router-link :to="{name:'height'}" >
          <span class="fl color333">身高</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.height!='请填写'}">{{height}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'weight'}" >
          <span class="fl color333">体重</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.weight!='请填写'}">{{weight}}</span>
        </router-link>
      </div>
      <div>
        <a disabled  @click="">
          <span class="fl color333">BMI数值</span>
          <span class="fr color666">{{bmi}}</span>
        </a>
      </div>
      <div>
        <router-link :to="{name:'waistline'}" >
          <span class="fl color333">腰围</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.waistline!='请填写'}">{{waistline}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'paunch'}" >
          <span class="fl color333">腹围</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.paunch!='请填写'}">{{paunch}}</span>
        </router-link>
      </div>
    </div>
    <div class="infoUl">
      <div>
        <router-link :to="{name:'bloodpressureS'}" >
          <span class="width8rem fl color333">平时血压(收缩压)</span>
          <i class="rightIcon"></i>
          <span class="width fr color999" :class="{color666:this.bloodpressureS!='请填写'}">{{bloodpressureS}}</span>
        </router-link>
      </div>
      <div>
        <router-link  :to="{name:'bloodpressureZ'}" >
          <span class="width8rem fl color333">平时血压(舒张压)</span>
          <i class="rightIcon"></i>
          <span class="width fr color999" :class="{color666:this.bloodpressureZ!='请填写'}">{{bloodpressureZ}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'bloodsuger'}">
          <span class="fl color333">平时血糖</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.bloodsuger!='请填写'}">{{bloodsuger}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'heartrate'}">
          <span class="fl color333">平时安静心率</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.heartrate!='请填写'}">{{heartrate}}</span>
        </router-link>
      </div>
    </div>
    <div class="infoUl">
      <div>
        <router-link :to="{name:'allergy'}">
          <span class="fl color333">过敏禁忌</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.allergy!='请填写'}">{{allergy}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'nowsick'}">
          <span class="fl color333">现病史</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.nowsick!='请填写'}">{{nowsick}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'historysick'}" >
          <span class="fl color333">过往史</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.historysick!='请填写'}">{{historysick}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'familysick'}">
          <span class="fl color333">家族史</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.familysick!='请填写'}">{{familysick}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'marriagehistory'}">
          <span class="fl color333">婚育史</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.marriagehistory!='请填写'}">{{marriagehistory}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'personhistory'}">
          <span class="fl color333">个人史</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.personhistory!='请填写'}">{{personhistory}}</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'livinghabit'}">
          <span class="fl color333">生活习惯</span>
          <i class="rightIcon"></i>
          <span class="fr color999" :class="{color666:this.livinghabit!='请填写'}">{{livinghabit}}</span>
        </router-link>
      </div>

    </div>
    <div class="btnBox">
      <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
    </div>
  </div>
</template>

<script>
  import api from '../../server/api'
  import oklifeButton from '../../../src/components/button'
  import { mapState,mapGetters } from 'vuex'
  export default {
    name: '',
    data () {
      return {
        color999:"color999",
        color666:"color666",
      }
    },
    computed: {
      ...mapState({
        userId:state=>state.common.loginInfo.userId
        //todo userId:2
      }),
      ...mapGetters({
       height: "baseInfo/goheight",
        weight: "baseInfo/goweight",
        bmi: "baseInfo/gobmi",
        waistline: "baseInfo/gowaistline",
        paunch: "baseInfo/gopaunch",
        bloodpressureS: "baseInfo/gobloodpressureS",
        bloodpressureZ: "baseInfo/gobloodpressureZ",
        bloodsuger: "baseInfo/gobloodsuger",
        heartrate: "baseInfo/goheartrate",
        allergy: "baseInfo/goallergy",
        nowsick: "baseInfo/gonowsick",
        historysick: "baseInfo/gohistorysick",
        familysick: "baseInfo/gofamilysick",
        marriagehistory: "baseInfo/gomarriagehistory",
        personhistory: "baseInfo/gopersonhistory",
        livinghabit: "baseInfo/golivinghabit",
      }),
      patientId(){
        return this.$route.params.id
      },
      scrollTop(){
        return this.$store.state.baseInfo.baseInfo.scrollTop
      },
    },
    watch: {

    },
    /*created: function () {
      var patientId = this.$route.params.id;
    },*/
    mounted () {
      this.$store.commit('common/changeHeaderConf', {
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '基本信息' // 标题
      });
      this.$store.commit('baseInfo/changebaseInfo',{patientId:this.$route.params.id})
    },
    beforeRouteLeave(to, from, next){
      let _this=this
      //console.warn(document.body.scrollTop)
      this.$store.commit('baseInfo/changebaseInfo',{scrollTop:document.body.scrollTop})
      //console.log(_this.$store.state.baseInfo.baseInfo.scrollTop)
      next ()

    },
    beforeRouteEnter(to, from, next){
      next(vm=>{
        if (from.path.split('/')[2]=="easemobInline"){
          vm.$store.dispatch('baseInfo/gethealthRd',{params:{patientId:vm.patientId}})
        }else{
          if (vm.scrollTop===""||vm.scrollTop===null) {
            document.body.scrollTop = vm.$refs.sheight.offsetHeight-document.body.clientHeight+200;
          }else{
            document.body.scrollTop=vm.$store.state.baseInfo.baseInfo.scrollTop
          }
        }
      })
    // next()
    },
    methods: {
      submit(){
        let data={
          healthRdId:this.$store.state.baseInfo.baseInfo.healthRdId,//档案编号
          modifyBy:this.$store.state.common.loginInfo.userId,//修改人编号
          patientId:this.patientId,
          height:this.$store.state.baseInfo.baseInfo.height,
          weight:this.$store.state.baseInfo.baseInfo.weight,//体重
          waist:this.$store.state.baseInfo.baseInfo.waistline,//腰围
          belly:this.$store.state.baseInfo.baseInfo.paunch,//腹围
          dBPEnd:this.$store.state.baseInfo.baseInfo.dBPEnd,//舒张压最高
          dBPStart:this.$store.state.baseInfo.baseInfo.dBPStart,//舒张压最低
          sBPEnd:this.$store.state.baseInfo.baseInfo.sBPEnd,//收缩压最高
          sBPStart:this.$store.state.baseInfo.baseInfo.sBPStart,//收缩压最低
          blvdSugarEnd:this.$store.state.baseInfo.baseInfo.blvdSugarEnd,//血糖最低
          blvdSugarStart:this.$store.state.baseInfo.baseInfo.blvdSugarStart,//血糖最低
          heartRateEnd:this.$store.state.baseInfo.baseInfo.heartRateEnd,//心率最高
          heartRateStart:this.$store.state.baseInfo.baseInfo.heartRateStart,//心率最低
          nkda:this.allergy,//过敏禁忌
          hpi:this.nowsick,//现病史
          pmh:this.historysick,//过往史
          fmh:this.familysick,//家族史
          obstHistory:this.marriagehistory,//婚育史
          persHistory:this.personhistory,//个人史
          generalHabits:this.livinghabit,//生活习惯
        }
        api.updatehealthRd({data:data}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
              console.log(res.data)
              this.$store.dispatch('baseInfo/revertState')
              this.$router.push({name:'easemobInline'})
          }
        })
      }
    },
    components: {
      oklifeButton
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/;
  }
  .fl{float:left;}
  .fr{float:right;}
  .color333{color:$font333;}
  .color999{color:$font999;}
  .color666{color:$font666;}
  .infoUl{width:100%;background:#fff;margin-top:px2rem(20);}
  .infoUl div{width:px2rem(676);height:px2rem(100);margin-left:px2rem(40);border-bottom:1px solid #D9D9D9;}
  .infoUl div:last-child{border-bottom:0px solid #D9D9D9;}
  .infoUl div a{display:inline-block;width:100%;height:100%;line-height:px2rem(100);}
  .infoUl div span.fl{font-size:px2rem(32);width:px2rem(225);}
  .infoUl div span.width8rem{width:8rem;}
  .infoUl div span{font-size:px2rem(30);}
  .infoUl div span.fr{width:px2rem(400);overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  text-align: right;}
  .infoUl div span.width{width:px2rem(300);overflow: hidden;}
  .infoUl div i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:100%;background:url("../../assets/go.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}
  .btnBox{margin:px2rem(80) 0;}
</style>
