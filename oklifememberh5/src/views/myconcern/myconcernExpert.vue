<template>
  <mt-loadmore @translate-change="translateChange" @top-status-change="handleTopChange"  :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore" :top-distance="60" :bottom-distance="60" :auto-fill="false" >
    <div class="expertList" ref="expertList" v-if="datas!==null">
        <div class="expertBox" v-for="(item,index) in datas">
          <router-link :to="{name:'expertInfo',params:{id:item.specId}}">
            <img class="expertPhoto" :src="item.headPath==null?'./img/doctorAvatar.png':item.headPath" onerror="this.src='./img/doctorAvatar.png';this.onerror=null"/>
            <div class="expertBoxP">
              <p class="p1">{{item.givenName }}<span> {{item.title}} </span> <img src="../../assets/v.png" v-show="item.vMark==1">
              </p>
              <p class="tab">
                <span v-for="tab in item.specDisease">{{tab.disName}}</span>
              </p>
              <p>已诊断：{{item.receiver}}人 &nbsp; &nbsp;被关注：{{item.follower}}人</p>
            </div>
          </router-link>
        </div>
    </div>
  </mt-loadmore>
</template>

<script>
  import api from '../../server/api'
  import {Indicator, Loadmore,Spinner } from 'mint-ui';
  export default {
    name: 'myconcernExpert',
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
        datas:[],
        //todo userId:1,
        //userId:this.$store.state.common.loginInfo.userId
      }
    },
    computed: {
      userId(){
          return this.$store.state.common.loginInfo.userId
      }
    },
    watch: {},
    mounted () {
      this.$nextTick (function () {
        this.initDoctor()
      })
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        let _this = this
        setTimeout(() => {
          _this.pageNum++
          let data={
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
          }
          let callback = (res) => {
            if (res.data.pager.totalPages <=_this.pageNum) {
              _this.allLoaded = true
            }else{
              _this.allLoaded = false
            }
            for (var i = 0, len = res.data.records.length; i < len; i++) {
              _this.datas.push(res.data.records[i])
            }
            console.log(_this.datas)
            _this.$refs.loadmore.onBottomLoaded()
          }
          //console.log(data)
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
      initDoctor(){//获取初始化专家列表
        let _this=this
        let data={
            "pageNum": _this.initpageNum,
            "pageSize": _this.initpageSize
        }
        let callback = (res) => {
          _this.datas=res.data.records
          _this.$refs.loadmore.onTopLoaded();
          if (res.data.pager.totalPages <=_this.pageNum) {
            _this.allLoaded = true
          }else{
            _this.allLoaded = false
          }
        }
        _this.getDoctor(data, callback)

      },
      getDoctor(data,callback){//获取专家列表

        api.getmyconcernExpert({params:{"id":this.userId}},{data:data}).then(res => {
          if(res==undefined){
            return false
          }else if (0 == res.code) {
            callback(res)
            console.log(res.data.records)
          }
        })
      },
    },
    components: {
      Indicator, Loadmore,Spinner
  }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .expertList {
    width: 100%;
    height: auto;
    overflow-y: scroll;
  }

  .expertList .expertBox:first-child {
    border-top: none;
  }

  .expertBox {
    float: left;
    width: px2rem(690);
    padding: px2rem(30);
    background: #fff;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: px2rem(20);
  }

  .expertBox .expertPhoto {
    width: px2rem(140);
    height: px2rem(140);
    border-radius: px2rem(8);
    float: left;
  }

  .expertBox .expertBoxP {
    display: inline-block;
    margin-left: px2rem(20);
    float: left;
    width: px2rem(530);
  }

  .expertBoxP p {
    font-size: px2rem(24);
    color:$font666;
    line-height: px2rem(40);
  }

  .expertBoxP p.p1 {
    font-size: $fontNavm;
    color: $font333;
    line-height: px2rem(60);
  }

  .expertBoxP p.p1 span {
    font-size: px2rem(26);
    color: $font666;
  }

  .expertBoxP p.p1 img {
    width: px2rem(24);
    height: px2rem(24);
  }

  .expertBoxP p.tab span {
    padding: 0 px2rem(8);
    border-radius: px2rem(4);
    background: #ecf2fe;
    border: 1px solid #b4cdf7;
    margin-right: px2rem(20);
    font-size: px2rem(26);
    color: #8eaee4;
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
