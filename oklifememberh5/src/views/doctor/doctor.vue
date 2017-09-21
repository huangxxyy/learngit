<template>
  <div class="space">
    <doctor-scroll v-bind:doctors="doctorScrollList"></doctor-scroll>
    <div class="searchcontain">
      <div class="searchtitle">
        <div class="searchcell" @click="condition1xialashow=!condition1xialashow;condition3xialashow=true">
          <span class="searchtext">{{selectcondition1}}</span>
          <img class="triangle-down" v-show="condition1xialashow" src="../../assets/xiala1.png">
          <img class="triangle-down" v-show="!condition1xialashow" src="../../assets/xiala2.png">
        </div>
        <router-link :to="{name:'selectDisease',params: { from: 'doctor'}}" class="searchcell" tag="div">
          <span class="">{{orderDoctorSelectdisease=='不知道什么疾病'?'疾病':orderDoctorSelectdisease | getGllipsis}}</span>
          <img class="triangle-down" src="../../assets/xiala1.png">
          <img class="triangle-down" v-show="false" src="../../assets/xiala2.png">
        </router-link>
        <div class="searchcell" @click="condition3xialashow=!condition3xialashow;condition1xialashow=true">
          <span class="searchtext">{{selectcondition3=='不限定'?'地区':selectcondition3 | getGllipsis}}</span>
          <img class="triangle-down" v-show="condition3xialashow" src="../../assets/xiala1.png">
          <img class="triangle-down" v-show="!condition3xialashow" src="../../assets/xiala2.png">
        </div>
      </div>
      <transition name="move">
        <div class="model1" ref="bgopacity" v-show="!condition1xialashow || !condition3xialashow">
          <!--排序下拉框-->
          <div class="mark" v-show="!condition1xialashow">
            <span :class="{'selected':isselectedorder==1}" @click="selectcondition(1)">综合排序</span>
            <span :class="{'selected':isselectedorder==2}" @click="selectcondition(2)">诊断量</span>
            <span :class="{'selected':isselectedorder==3}" @click="selectcondition(3)">好评率</span>
            <span :class="{'selected':isselectedorder==4}" @click="selectcondition(4)">关注人数</span>
          </div>
          <!--地区下拉框-->
          <div class="mark" v-show="!condition3xialashow">
            <div class="condition3title">优质医疗资源地区</div>
            <ul class="hospitalarea">
              <li :class="{'areaselected':isselectedarea==area.cityId}" @click="selectconditionarea(area.cityId,area.cityName)" v-for="(area,index) in hiQRCity">{{area.cityName}}</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="doctorResults" ref="doctorResults">
      <mt-loadmore  @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore" :top-distance="60" :bottom-distance="60" :auto-fill="false" >

        <ul>
          <router-link class="doctorResultCell" v-for="(item, index) in doctorsList" :to="{name:'expertInfo',params:{id:item.specId}}" tag="li" :key="item.specId">
            <img :src="item.headPath" class="doctorResultsHeadPortrait" onerror="this.src='./img/doctorAvatar.png';this.onerror=null"/>
            <div class="doctorResultsText">
              <div>
                <span class="name">{{item.givenName}}</span>
                <span class="fontSmall">{{item.title}}</span>
                <img src="../../assets/yijingkaitong.png" alt="" class="yijingkaitong" v-show="item.vMark==1?true:false">
              </div>
              <div>
                <span class="goodAt" v-for="(goodat, index) in item.specDisease" v-if="index<3">{{goodat.disName}}</span>
              </div>
              <br>
              <div>
                <span class="superSmall">已诊断：{{item.receiver}}人</span>
                <span class="superSmall">被关注：{{item.follower}}人</span>
              </div>
            </div>
          </router-link>
        </ul>

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="fading-circle" color="#4776E5"></mt-spinner>
          </span>
        </div>

        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="fading-circle" color="#4776E5"></mt-spinner>
          </span>
        </div>

      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import api from '../../server/api'
  import {Indicator, Loadmore,Spinner } from 'mint-ui';
  import { mapState,mapGetters } from 'vuex'
  import doctorScroll from './doctorscroll.vue'
  export default {
    data () {
      return {
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        translate: 0,
        moveTranslate: 0,
        initpageNum:1,
        initpageSize:4,
        pageNum:1,
        pageSize:4,

        condition1xialashow:true,

        condition3xialashow:true,
        hiQRCity:[],

        doctorsList: [],
        doctorisselect:'',

        doctorScrollList:[],
        isShowAppHeader:''
      }
    },
    computed: {
      ...mapState({
        isselectedorder:state =>state.doctorAndhospital.doctortab.orderBy,

        orderDoctorSelectdisease: state =>state.doctorAndhospital.doctortab.orderselectdisease,//疾病名字
        orderDoctorSelectdiseaseId: state => state.doctorAndhospital.doctortab.orderselectdiseaseId,//疾病Id

        selectcondition3:state =>state.doctorAndhospital.doctortab.selectArea,//地区名字
        isselectedarea:state =>state.doctorAndhospital.doctortab.selectAreaId,//地区Id
      }),
      ...mapGetters({
        selectcondition1:'doctorAndhospital/getdoctortaborderBy'
      })
    },
    mounted () {

      this.$nextTick (function () {
        //横向滚动
        this.initDoctorScroll()
        //获取专家列表、优质医疗资源地区
        this.initDoctor()
        this.gethiQRCity()
      })
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    beforeRouteLeave (to, from, next) {
      next()
    },
    watch: {},
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        let _this = this
        setTimeout(() => {
          _this.pageNum++
          let data = {
            'cityId': _this.isselectedarea,
            'disId': _this.orderDoctorSelectdiseaseId,
            'orderBy': _this.isselectedorder,//综合排序
            'pageDto': {
              'pageNum': _this.pageNum,
              'pageSize': _this.pageSize
            }
          }
          let callback = (res) => {
            if (res.data.pager.totalPages <=_this.pageNum) {
              _this.allLoaded = true
            }else{
              _this.allLoaded = false
            }
            for (var i = 0, len = res.data.records.length; i < len; i++) {
              _this.doctorsList.push(res.data.records[i])
            }
            console.log(_this.doctorsList)
            _this.$refs.loadmore.onBottomLoaded()
            _this.$nextTick(function () {//设置下拉框透明背景高度
              if(document.getElementsByClassName("doctorResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop){
                _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop+'px'
              }else{
                this.$refs.bgopacity.style.height = document.getElementsByClassName("doctorResults")[0].offsetHeight+'px';
              }
            })
          }
          console.log(data)
          _this.getDoctor(data, callback)
        },1200)
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        let _this=this
        setTimeout(() => {
          _this.initDoctor()
          _this.pageNum=1
          _this.allLoaded = false;
        }, 1200);
      },
      initDoctorScroll(){//获取横向滚动6位专家
        let _this=this
        let data={
          "cityId": '',
          'disId': '',
          "orderBy": 1,//排序依据（1：综合排序（默认）2：诊断量3：好评率4：关注人数） ,
          "pageDto": {
            "pageNum": 1,
            "pageSize": 5
          }
        }
        let callback = (res) => {
          _this.doctorScrollList=res.data.records
        }
        _this.getDoctor(data, callback)
      },
      initDoctor(){//获取初始化专家列表
        let _this=this
        let data={
          "cityId": _this.isselectedarea,
          'disId': _this.orderDoctorSelectdiseaseId,
          "orderBy": _this.isselectedorder,//默认综合排序
          "pageDto": {
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          }
        }
        let callback = (res) => {
          _this.doctorsList=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          if (res.data.pager.hasNextPage) {
            _this.allLoaded = false
          }else{
            _this.allLoaded = true
          }
          _this.$nextTick(function () {//设置下拉框透明背景高度
            if(document.getElementsByClassName("doctorResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop){
              _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop+50+'px'
            }else{
              this.$refs.bgopacity.style.height = document.getElementsByClassName("doctorResults")[0].offsetHeight+'px';
            }
          })
        }
        _this.getDoctor(data, callback)

      },
      getDoctor(data,callback){//获取专家列表
        console.log(data)
        api.specialistOrder({data:data}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            callback(res)
          }
        })
      },
      gethiQRCity(){//获取优质医疗资源地区
        let _this=this
        api.hiQRCity({}).then((res) => {
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            _this.hiQRCity=res.data
            _this.hiQRCity.push( {
              "cityId": '',
              "cityName": "不限定",
              "remark": ''
            })
          }
        })
      },
      selectcondition(index){
        let _this=this
        _this.condition1xialashow = !_this.condition1xialashow;
        _this.condition3xialashow = true;
        _this.$store.commit('doctorAndhospital/changedoctortab',{
          orderBy:index
        })

        let data={
          "cityId": _this.isselectedarea,
          'disId': _this.orderDoctorSelectdiseaseId,
          "orderBy": _this.isselectedorder,//所选排序规则
          "pageDto": {
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          }
        }
        let callback = (res) => {
          _this.doctorsList=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          _this.pageNum=_this.initpageNum
          if (res.data.pager.hasNextPage) {
            _this.allLoaded = false
          }else{
            _this.allLoaded = true
          }
          _this.$nextTick(function () {//设置下拉框透明背景高度
            if(document.getElementsByClassName("doctorResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop){
              _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop+50+'px'
            }else{
              this.$refs.bgopacity.style.height = document.getElementsByClassName("doctorResults")[0].offsetHeight+'px';
            }
          })
        }
        _this. getDoctor(data,callback)
      },
      selectconditionarea(cityId,cityName){
        let _this=this
        this.condition1xialashow = true;
        this.condition3xialashow = !this.condition3xialashow;
        _this.$store.commit('doctorAndhospital/changedoctortab',{
          selectArea:cityName,//选择的地区
          selectAreaId:cityId,//选择的地区ID
        })

        let data={
          "cityId": _this.isselectedarea,
          'disId': _this.orderDoctorSelectdiseaseId,
          "orderBy": _this.isselectedorder,//所选排序规则
          "pageDto": {
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          }
        }
        let callback = (res) => {
          _this.doctorsList=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          _this.pageNum=_this.initpageNum
          if (res.data.pager.hasNextPage) {
            _this.allLoaded = false
          }else{
            _this.allLoaded = true
          }
          _this.$nextTick(function () {//设置下拉框透明背景高度
            if(document.getElementsByClassName("doctorResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop){
              _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("doctorResults")[0].offsetTop+50+'px'
            }else{
              this.$refs.bgopacity.style.height = document.getElementsByClassName("doctorResults")[0].offsetHeight+'px';
            }
          })
        }
        _this. getDoctor(data,callback)
      }
    },
    components: {doctorScroll}
  }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .space {
    background: $spackbg;
    margin-top: px2rem(88);
  }
  .searchcellcontain{
    width: 100%;
    height: px2rem(100);
    line-height:px2rem(100);
    text-align: center;
  }

  .triangle-down {
    display: inline-block;
    margin-left:px2rem(10);
    width: px2rem(20);
  }
  .searchcontain{
    margin-top: px2rem(20);
    border-top:px2rem(1) solid #D9D9D9;
    width:100%;
    position: relative;
  }
  .searchtitle {
    width: 100%;
    height: px2rem(100);
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
  }

  .searchcell {
    width: 33%;
    height: px2rem(100);
    line-height: px2rem(100);
    text-align: center;
    color: $font666;
    font-size: $font28;
    float: left;
  }
  .model1{
    z-index: 100;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
  span{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    height: px2rem(100);
    line-height:px2rem(100);
    color: #333333;
    font-size:px2rem(28);
    border-bottom: px2rem(1) solid #d9d9d9;
  }
  div:last-child{
    border-bottom:none;
  }
  }
  .mark{
    width:100%;
    height: px2rem(400);
    padding-left:px2rem(30);
    box-sizing: border-box;
    background-color: #ffffff;
  .selected{
    color: #4776e5;
    background-image: url("../../assets/gou.png");
    background-repeat: no-repeat;
    background-position: 90% 50%;
    -webkit-background-size:  px2rem(26);
    background-size: px2rem(26);
  }
  }
  .condition3title{
    height:px2rem(100);
    line-height:px2rem(100);
    background-color:#fafafa;
    margin-left: px2rem(-30);
    padding-left: px2rem(30);
    font-size: px2rem(28);
  }
  .hospitalarea li{
    box-sizing: border-box;
    width:px2rem(300);
    height:px2rem(100);
    line-height: px2rem(100);
    background-color: #ffffff;
    float: left;
    margin-right:px2rem(30);
    font-size: px2rem(28);
  }
  .areaselected{
    color: #4776e5;
    background-image: url("../../assets/gou.png");
    background-repeat: no-repeat;
    background-position: 100% 50%;
    -webkit-background-size:  px2rem(26);
    background-size: px2rem(26);
    border-bottom: px2rem(1) solid #4776E5;
  }
  .hospitalarea li:nth-child(n){
    margin-right:px2rem(60);
  }
  .move-enter-active,.move-leave-active {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;

  }
  .move-enter, .move-leave-active {
    -webkit-transform: translateY(-8%);
    -moz-transform: translateY(-8%);
    -ms-transform: translateY(-8%);
    transform: translateY(-8%);
    opacity: 0;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
  }
  .doctorResults {
    width: 100%;
    background-color: #fff;
    padding-left: px2rem(30);
    padding-right:px2rem(30);
    margin-bottom: px2rem(20);
    border-bottom: px2rem(1) solid #d9d9d9;
    box-sizing: border-box;
    /*包裹loadermore组件的容器需要加Y轴滚动条，要不然不能再加载*/
    overflow-y: scroll;
  }

  .doctorResultCell {
    position: relative;
    height: px2rem(200);
    box-sizing: border-box;
    border-bottom: 1px solid #d9d9d9;
    padding-top: px2rem(30);
    padding-bottom: px2rem(30);
  }
  .doctorResults .doctorResultCell:last-child{
    border-bottom:none;
  }

  .doctorResultsHeadPortrait {
    width: px2rem(140);
    height: px2rem(140);
    border-radius: px2rem(8);
    margin-right: px2rem(20);
    float: left;
  }

  .doctorResultsText {
    display: inline-block;
    float: left;
  }
  .yijingkaitong{
    width:px2rem(26);
  }

  .goodAt {
    float: left;
    display: inline-block;
    font-size: $fontSuperSmall;
    margin-right: px2rem(20);
    background-color: #ecf2fe;
    padding: 0 px2rem(10) 0 px2rem(10);
    border-radius: px2rem(4);
    text-align: center;
    color: #83a6e2;
    border:px2rem(1) solid #b4cdf8;
    height: px2rem(40);
    line-height: px2rem(40);
  }
  .name {
    width: px2rem(220);
    height: px2rem(40);
    font-size: $font32;
    color: $font333;
    text-align: center;
    margin-bottom: px2rem(20);
  }
  .fontSmall{
    font-size:$fontSmall ;
    text-align: center;
    color: $font666;
  }
  .superSmall {
    font-size: $fontSuperSmall;
    text-align: center;
    color: $font666;
  }
  .xuanzhongpic{
    width:px2rem(44);
    position: absolute;
    right:px2rem(0);
    top:px2rem(78)
  }
  .fixedbutton{
    position: fixed;
    bottom:0;
    width:100%;
    outline: none;
    border:none;
    text-align: center;
    color:$fontfff;
    font-size: px2rem(36);
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    height: px2rem(88);
  }

  /*上拉加载下拉刷新*/
  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }
  mint-loadmore-top{
    color:$mainC
  }
  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle;
    color:$mainC
  }

  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    color:$mainC
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle;
    color:$mainC
  }

  .page-loadmore-desc {
    text-align: center;
    color:$mainC;
    padding-bottom: 5px
  }

  .page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1px solid #eee
  }

  .page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
  }

  .page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
  }

  .page-loadmore-wrapper {
    overflow: scroll
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle;
    color:$mainC
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    color:$mainC
  }

</style>
