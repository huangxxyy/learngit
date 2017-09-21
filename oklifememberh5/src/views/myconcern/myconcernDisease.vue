<template>
  <div>
    <mt-loadmore @translate-change="translateChange" @top-status-change="handleTopChange"  :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore" :top-distance="60" :bottom-distance="60" :auto-fill="false" >
      <div class="diseaseList">
        <div class="diseaseBox" v-for="item in datas" v-if="item.followed==1">
          <router-link disabled to="">
            <div class="diseaseBoxP">
              <h4>{{item.categoryName}}</h4>
            </div>
          </router-link>
        </div>
      </div>
    </mt-loadmore>
    <div class="btn">
      <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">设置关注疾病</oklife-button>
    </div>
  </div>


</template>

<script>
  import api from '../../server/api'
  import {Indicator, Loadmore,Spinner } from 'mint-ui';
  import oklifeButton from '../../../src/components/button'
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
        datas:[],
        //todo userId:1,
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
      getDoctor(data,callback){//获取列表

        api.getmyconcernDisease({params:{"id":this.userId}},{data:data}).then(res => {
          if(res==undefined){
            return false
          }else if (0 == res.code) {
            callback(res)
            console.log(res.data.records)
          }
        })
      },
      submit(){
          this.$router.push({name:'fdisease'})
      }
    },
    components: {
      Indicator, Loadmore,Spinner,oklifeButton
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  .diseaseList {
    width: 100%;
    height: auto;
  }
  .diseaseList .diseaseBox:first-child {
    border-top: none;
  }
  .diseaseBox {
  float: left;
  width: px2rem(674);
  height:px2rem(100);
  padding:0 px2rem(30);
  background: #fff;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-left:px2rem(16) solid #A1BDFF;
  margin-bottom: px2rem(20);
  }

  .diseaseList .diseaseBoxP {
    display: inline-block;
    margin-top: px2rem(10);
    float: left;
    width: px2rem(600);
  }
  .diseaseBoxP h4 {
    font-weight: normal;
    font-size: px2rem(32);
    color:$font333;
    line-height: px2rem(60);
    padding:px2rem(20) 0;
  }
  .diseaseBoxP p {
    font-size: px2rem(30);
    color:$font666;
    line-height: px2rem(40);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
  }
  .diseaseBox .rightIcon{display:inline-block;width:px2rem(24);height:px2rem(180);
    background:url("../../assets/go.png") no-repeat center center;background-size:px2rem(15) px2rem(30);
    float: right;margin-right:p2rem(30);}
  .btn{position:fixed;bottom:0;left:0;width:100%;height:px2rem(88);padding:px2rem(30) 0;margin:0 auto;background:#EFEFF4;text-align:center;}

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
