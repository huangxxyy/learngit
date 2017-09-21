<template>
  <div class="hospital">
    <div class="hospitalswiper">
      <mt-swipe :auto="4000" class="bannerhospitalcontain">
        <mt-swipe-item v-for="item in hospitalBanner" :key="item.hospId">
          <span class="hospitaltext">
            <span v-for="(dis,index) in item.diseaseDto" :key="index" v-if="index<3">{{dis?dis.disName:''}}
              <span v-if="index<(item.diseaseDto.length>2?2:item.diseaseDto.length-1)">、</span>
            </span>等疾病
          </span>
          <img :src="item.hospPicPath" class="bannerhospital" onerror="this.src='./img/bannerhospital1.jpg';this.onerror=null">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="searchcontain">
      <div class="searchtitle">
        <div class="searchcell" @click="levelxialashow=!levelxialashow;areaxialashow=true;typexialashow=true">
          <span class="searchtext">{{level}}</span>
          <img class="triangle-down" v-show="levelxialashow" src="../../assets/xiala1.png">
          <img class="triangle-down" v-show="!levelxialashow" src="../../assets/xiala2.png">
        </div>
        <div class="searchcell" @click="typexialashow=!typexialashow;levelxialashow=true;areaxialashow=true">
          <span class="searchtext">{{type}}</span>
          <img class="triangle-down" v-show="typexialashow" src="../../assets/xiala1.png">
          <img class="triangle-down" v-show="!typexialashow" src="../../assets/xiala2.png">
        </div>
        <router-link :to="{name:'selectDisease',params:{from:'hospital'}}" class="searchcell" tag="div">
          <span class="">{{orderHospitalSelectdisease=='不知道什么疾病'?'疾病':orderHospitalSelectdisease | getGllipsis}}</span>
          <img class="triangle-down" src="../../assets/xiala1.png">
          <img class="triangle-down" v-show="false" src="../../assets/xiala2.png">
        </router-link>
        <div class="searchcell" @click="areaxialashow=!areaxialashow;levelxialashow=true;typexialashow=true">
          <span class="searchtext">{{area=='不限定'?'地区':area}}</span>
          <img class="triangle-down" v-show="areaxialashow" src="../../assets/xiala1.png">
          <img class="triangle-down" v-show="!areaxialashow" src="../../assets/xiala2.png">
        </div>
      </div>
      <transition name="move">
        <div class="model1" ref="bgopacity" v-show="!levelxialashow || !areaxialashow || !typexialashow">
          <!--等级-->
          <div class="levelmark" v-show="!levelxialashow">
            <ul class="hospitalevel">
              <li :class="{'areaselected':isselectedlevel==1}" @click="selectconditionlevel(1)">三甲级</li>
              <li :class="{'areaselected':isselectedlevel==2}" @click="selectconditionlevel(2)">二甲级</li>
              <li :class="{'areaselected':isselectedlevel==3}" @click="selectconditionlevel(3)">一甲级</li>
              <li :class="{'areaselected':isselectedlevel==4}" @click="selectconditionlevel(4)">三乙级</li>
              <li :class="{'areaselected':isselectedlevel==5}" @click="selectconditionlevel(5)">二乙级</li>
              <li :class="{'areaselected':isselectedlevel==6}" @click="selectconditionlevel(6)">一乙级</li>
              <li :class="{'areaselected':isselectedlevel==7}" @click="selectconditionlevel(7)">三丙级</li>
              <li :class="{'areaselected':isselectedlevel==8}" @click="selectconditionlevel(8)">二丙级</li>
              <li :class="{'areaselected':isselectedlevel==9}" @click="selectconditionlevel(9)">一丙级</li>
              <li :class="{'areaselected':isselectedlevel==''}" @click="selectconditionlevel('')">不限定</li>
            </ul>
          </div>
          <!--类型-->
          <div class="typemark" v-show="!typexialashow">
            <ul class="hospitaltype">
              <li :class="{'typeselected':isselectedtype==1}" @click="selectconditiontype(1)">公立</li>
              <li :class="{'typeselected':isselectedtype==2}" @click="selectconditiontype(2)">私立</li>
              <li :class="{'typeselected':isselectedtype==''}" @click="selectconditiontype('')">不限定</li>
            </ul>
          </div>
          <!--地区下拉框-->
          <div class="areamark" v-show="!areaxialashow">
            <div class="condition3title">优质医疗资源地区</div>
            <ul class="hospitalarea">
              <li :class="{'areaselected':isselectedarea==area.cityId}" @click="selectconditionarea(area.cityId,area.cityName)" v-for="(area,index) in hiQRCity">{{area.cityName}}</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="hospitalResults" ref="hospitalResults">
      <mt-loadmore @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom"
                   @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore"
                   :top-distance="60" :bottom-distance="60" :auto-fill="false">
        <ul>
          <router-link class="hospitalResultCell" v-for="(item, index) in hospitalsList" :to="{name:'hospitalInfo',params:{id:item.hospitalModel.hospId}}" tag="li" :key="item.hospitalModel.hospId">
            <img :src="item.hospitalModel==undefined?'':item.hospitalModel.hospPicPath" class="hospitalResultsHeadPortrait"/>
            <img src="../../assets/gongli.png" alt="" class="gongli" v-show="item.hospitalModel==undefined?true:item.hospitalModel.property==1">
            <img src="../../assets/sili.png" alt="" class="gongli" v-show="item.hospitalModel==undefined?true:item.hospitalModel.property==2">
            <div class="hospitalResultsText">
              <div>
                <span class="name">{{item.hospitalModel==undefined?'':item.hospitalModel.hospName}}</span>
                <span class="level">{{item.hospitalModel==undefined?'':item.hospitalModel.hospLevelId | getLevel}}</span>
              </div>
              <div class="goodAtcontain">
                <span class="goodAt" v-for="(disease, index) in item.diseaseDto" v-if="index<3">{{disease==undefined?'':disease.disName}}</span>
              </div>
              <div>
                <span class="superSmall">{{item.hospitalModel==undefined?'':item.hospitalModel.watchword}}</span>
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
  import {Indicator, Loadmore,Spinner,Swipe, SwipeItem } from 'mint-ui';
  import { mapState,mapGetters } from 'vuex'
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
        initpageSize:5,
        pageNum:1,
        pageSize:5,

        levelxialashow:true,
        typexialashow:true,
        areaxialashow:true,

        hospitalsList: [],
        hiQRCity:[],
        hospitalBanner:[],
        bannerNum:3
      }
    },
    computed: {
      ...mapState({
        orderHospitalSelectdisease: state =>state.doctorAndhospital.hospitaltab.orderselectdisease,//疾病名字
        orderHospitalSelectdiseaseId: state => state.doctorAndhospital.hospitaltab.orderselectdiseaseId,//疾病Id

        area:state =>state.doctorAndhospital.hospitaltab.selectArea,//地区名字
        isselectedarea:state =>state.doctorAndhospital.hospitaltab.selectAreaId,//地区Id

        isselectedtype:state =>state.doctorAndhospital.hospitaltab.property,
        isselectedlevel:state =>state.doctorAndhospital.hospitaltab.hospLevelId,
        userId:state=>state.common.loginInfo.userId
      }),
      ...mapGetters({
        level:'doctorAndhospital/getHospitaltabHospLevelId',
        type:'doctorAndhospital/getHospitaltabProperty',
      })
    },
    mounted () {
      this.$nextTick (function () {
        //初始化banner
        this.initHospitalBanner()
        //获取专家列表、优质医疗资源地区
        this.initHospital()
        this.gethiQRCity()
      })
    },
    beforeRouteEnter(to, from, next){
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
            "cityId": _this.isselectedarea,
            "disId": _this.orderHospitalSelectdiseaseId,
            "hospLevelId":  _this.isselectedlevel,
            'pageDto': {
              'pageNum': _this.pageNum,
              'pageSize': _this.pageSize
            },
            "property":  _this.isselectedtype
          }
          let callback = (res) => {
            if (res.data.pager.hasNextPage) {
              _this.allLoaded = false
            }else{
              _this.allLoaded = true
            }
            for (var i = 0, len = res.data.records.length; i < len; i++) {
              _this.hospitalsList.push(res.data.records[i])
            }
            console.log(_this.hospitalsList)
            _this.$refs.loadmore.onBottomLoaded()
            _this.$nextTick(function () {//设置下拉框透明背景高度
              if(document.getElementsByClassName("hospitalResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop){
                _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop+'px'
              }else{
                this.$refs.bgopacity.style.height = document.getElementsByClassName("hospitalResults")[0].offsetHeight+'px';
              }
            })
          }
          console.log(data)
          _this.getHospital(data, callback)
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
          _this.initHospital()
          _this.pageNum=1
          _this.allLoaded = false;
        }, 1200);
      },
      initHospitalBanner(){
        let _this=this
        let data={
          "num": this.bannerNum,
          "userId": this.userId?this.userId:0
        }
        api.hospitalBanner({data:data}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            _this.hospitalBanner=res.data
          }
        })
      },
      initHospital(){//获取初始化医院列表
        let _this=this
        let data={
          "cityId": _this.isselectedarea,
          "disId": _this.orderHospitalSelectdiseaseId,
          "hospLevelId": _this.isselectedlevel,
          "pageDto": {
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          },
          "property": _this.isselectedtype
        }
        let callback = (res) => {
          console.log(res)
          if (res.data.pager.hasNextPage) {
            _this.allLoaded = false
          }else{
            _this.allLoaded = true
          }
          _this.hospitalsList=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          _this.$nextTick(function () {//设置下拉框透明背景高度
            if(document.getElementsByClassName("hospitalResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop){
              _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop+50+'px'
            }else{
              this.$refs.bgopacity.style.height = document.getElementsByClassName("hospitalResults")[0].offsetHeight+'px';
            }
          })
        }
        _this.getHospital(data, callback)

      },
      getHospital(data,callback){//获取医院列表
        console.log(data)
        api.hospitallistOrder({data:data}).then((res)=>{
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
      selectconditiontype(index){
        let _this=this
        _this.areaxialashow = true
        _this.levelxialashow = true
        _this.typexialashow = !_this.typexialashow;
        _this.$store.commit('doctorAndhospital/changehospitaltab',{
          property:index
        })
        let data={
          "cityId": _this.isselectedarea,
          "disId": _this.orderHospitalSelectdiseaseId,
          "hospLevelId": _this.isselectedlevel,
          "pageDto": {
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          },
          "property": _this.isselectedtype
        }
        let callback = (res) => {
          _this.hospitalsList=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          _this.pageNum=_this.initpageNum
          if (res.data.pager.hasNextPage) {
            _this.allLoaded = false
          }else{
            _this.allLoaded = true
          }
          _this.$nextTick(function () {//设置下拉框透明背景高度
            if(document.getElementsByClassName("hospitalResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop){
              _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop+50+'px'
            }else{
              this.$refs.bgopacity.style.height = document.getElementsByClassName("hospitalResults")[0].offsetHeight+'px';
            }
          })
        }
        _this. getHospital(data,callback)
      },
      selectconditionlevel(index){
        let _this=this
        _this.typexialashow = true;
        _this.areaxialashow = true;
        _this.levelxialashow = !_this.levelxialashow;
        _this.$store.commit('doctorAndhospital/changehospitaltab',{
          hospLevelId:index
        })
        let data={
          "cityId": _this.isselectedarea,
          "disId": _this.orderHospitalSelectdiseaseId,
          "hospLevelId": _this.isselectedlevel,
          "pageDto": {
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          },
          "property": _this.isselectedtype
        }
        let callback = (res) => {
          _this.hospitalsList=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          _this.pageNum=_this.initpageNum
          if (res.data.pager.hasNextPage) {
            _this.allLoaded = false
          }else{
            _this.allLoaded = true
          }
          _this.$nextTick(function () {//设置下拉框透明背景高度
            if(document.getElementsByClassName("hospitalResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop){
              _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop+50+'px'
            }else{
              this.$refs.bgopacity.style.height = document.getElementsByClassName("hospitalResults")[0].offsetHeight+'px';
            }
          })
        }
        _this. getHospital(data,callback)
      },
      selectconditionarea(cityId,cityName){
        let _this=this
        this.isselectedarea = cityId;
        this.levelxialashow = true;
        this.typexialashow = true;
        this.areaxialashow = !this.areaxialashow;

        _this.$store.commit('doctorAndhospital/changehospitaltab',{
          selectArea:cityName,//选择的地区
          selectAreaId:cityId,//选择的地区ID
        })
        let data={
          "cityId": _this.isselectedarea,
          "disId": _this.orderHospitalSelectdiseaseId,
          "hospLevelId": _this.isselectedlevel,
          "pageDto": {
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          },
          "property": _this.isselectedtype
        }
        let callback = (res) => {
          _this.hospitalsList=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          _this.pageNum=_this.initpageNum
          if (res.data.pager.hasNextPage) {
            _this.allLoaded = false
          }else{
            _this.allLoaded = true
          }
          _this.$nextTick(function () {//设置下拉框透明背景高度
            if(document.getElementsByClassName("hospitalResults")[0].offsetHeight<document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop){
              _this.$refs.bgopacity.style.height=document.documentElement.clientHeight-document.getElementsByClassName("hospitalResults")[0].offsetTop+50+'px'
            }else{
              this.$refs.bgopacity.style.height = document.getElementsByClassName("hospitalResults")[0].offsetHeight+'px';
            }
          })
        }
        _this. getHospital(data,callback)
      }
    },
    components: {Indicator, Loadmore,Spinner,Swipe,SwipeItem}
  }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .hospital {
    background: $spackbg;
    margin-top: px2rem(88);
    height: 100%;
  }
  .hospital .hospitalswiper{
    height:px2rem(260);
  }
  .hospital .bannerhospital{
    height:px2rem(260)
  }
  .hospital .hospitaltext{
    position: absolute;
    display: inline-block;
    width: px2rem(750);
    z-index: 100;
    height: px2rem(50);
    line-height:px2rem(50);
    background: rgba(0,0,0,0.3);
    color: #ffffff;
    font-size: px2rem(24);
    bottom: px2rem(0);
    padding-left: px2rem(30);
  }
  .hospital .triangle-down {
    display: inline-block;
    margin-left:px2rem(10);
    width: px2rem(20);
  }
  .hospital .searchcontain{
    width:100%;
    position: relative;
  }
  .hospital .searchtitle {
    width: 100%;
    height: px2rem(100);
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }

  .hospital .searchcell {
    width: 25%;
    height: px2rem(100);
    line-height: px2rem(100);
    text-align: center;
    color: $font666;
    font-size: $font28;
    float: left;
  }
  .hospital .model1{
    position: absolute;
    z-index: 1001;
    width: 100%;
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
  .hospitalevel li{
    box-sizing: border-box;
    width:px2rem(310);
    height:px2rem(100);
    line-height: px2rem(100);
    background-color: #ffffff;
    float: left;
    margin-right:px2rem(30);
    font-size: px2rem(28);
  }


  .hospital .levelmark{
    width:100%;
    height: px2rem(500);
    padding-left:px2rem(30);
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
  .hospital .typemark{
    width:100%;
    height: px2rem(300);
    padding-left:px2rem(30);
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
  .hospital .areamark{
    width:100%;
    height: px2rem(400);
    padding-left:px2rem(30);
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
  .hospital .condition3title{
    height:px2rem(100);
    line-height:px2rem(100);
    background-color:#fafafa;
    margin-left: px2rem(-30);
    padding-left: px2rem(30);
    font-size: px2rem(28);
  }
  .hospital .hospitaltype li{
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #D9D9D9;
    width:100%;
    height:px2rem(100);
    line-height: px2rem(100);
    background-color: #ffffff;
    float: left;
    padding-right:px2rem(30);
    font-size: px2rem(28);
  }
  .hospital .hospitaltype li:last-child{
    border-bottom: none;
  }
  .hospital .hospitalarea li{
    box-sizing: border-box;
    width:px2rem(315);
    height:px2rem(100);
    line-height: px2rem(100);
    background-color: #ffffff;
    float: left;
    margin-right:px2rem(30);
    font-size: px2rem(28);
  }
  .hospital .typeselected{
    color: #4776e5;
    background-image: url("../../assets/gou.png");
    background-repeat: no-repeat;
    background-position: 90% 50%;
    -webkit-background-size:  px2rem(26);
    background-size: px2rem(26);
  }
  .hospital .areaselected{
    color: #4776e5;
    background-image: url("../../assets/gou.png");
    background-repeat: no-repeat;
    background-position: 100% 50%;
    -webkit-background-size:  px2rem(26);
    background-size: px2rem(26);
    border-bottom: px2rem(1) solid #4776E5;
  }
  .hospital .hospitalarea li:nth-child(n){
    margin-right:px2rem(60);
  }
  .hospitalResults {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-left: px2rem(30);
    padding-right: px2rem(30);
    margin-bottom: px2rem(20);
    border-bottom: px2rem(1) solid #d9d9d9;
    box-sizing: border-box;
    /*包裹loadermore组件的容器需要加Y轴滚动条，要不然不能再加载*/
    overflow-y: scroll;
  }

  .hospitalResultCell {
    width: 100%;
    height: px2rem(200);
    box-sizing: border-box;
    border-bottom: 1px solid #d9d9d9;
    padding-top: px2rem(30);
    padding-bottom: px2rem(30);
  }
  .hospitalResults .hospitalResultCell:last-child{
    border-bottom:none;
  }

  .hospitalResultsHeadPortrait {
    width: px2rem(140);
    height: px2rem(140);
    border-radius: px2rem(8);
    margin-right: px2rem(20);
    float: left;
  }

  .hospitalResultsText {
    float: left;
    width: px2rem(530);
  }
  .gongli{
    width:px2rem(46);
    position: absolute;
    left:0
  }

  .goodAtcontain{
    overflow: hidden;
  }

  .goodAt {
    float: left;
    display: inline-block;
    font-size: $fontSuperSmall;
    margin-right: px2rem(20);
    background-color: #ECF1FC;
    padding: 0 px2rem(10) 0 px2rem(10);
    border-radius: px2rem(8);
    border:px2rem(1) solid #b4cdf8;
    text-align: center;
    color: #83a6e2;
  }
  .name {
    width: px2rem(230);
    height: px2rem(40);
    font-size: $font32;
    color: $font333;
    text-align: center;
  }
  .level{
    float: right;
    color: #fcb201;
    font-size: px2rem(24);
  }

  .superSmall {
    font-size: px2rem(24);
    color: $font666;
    display: inline-block;
    width: px2rem(512);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
<style lang="scss">
.hospital .hospitalswiper .mint-swipe-indicators {
    position: absolute;
    left:88%;
    bottom: 3%;
    z-index: 888;
    div{
      opacity: 0.8;
    }
  }
</style>
