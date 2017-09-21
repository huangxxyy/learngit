<template>
  <div class="backgroundfff">
    <mt-loadmore @translate-change="translateChange" @top-status-change="handleTopChange"  :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore" :top-distance="60" :bottom-distance="60" :auto-fill="false" >

      <div class="fdisease" ref="fdisease">
        <div class="disease">
          <span class="ill" v-for="item in datas" :class="item.followed==0?'noselect':'select'" @click.self="select($event)"
            ref="ills">{{item.categoryName}}</span>
        </div>
      </div>
    </mt-loadmore>
    <div class="btn">
      <oklife-button @click="focusills" height="2.347rem" width="12.8rem"><span>关注</span></oklife-button>
    </div>
  </div>
</template>

<script>
  import api from '../../server/api'
  import {Indicator, Loadmore,Spinner ,Toast} from 'mint-ui';
  import oklifeButton from '@/components/button'
  export default {
    data () {
      return {
        followType:2,
        datas: [],
        selectill: [],
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        translate: 0,
        moveTranslate: 0,
        initpageNum:1,
        initpageSize:20,
        pageNum:1,
        pageSize:5,
      }
    },
    computed: {
      userId(){
          return this.$store.state.common.loginInfo.userId
      }
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    mounted(){
      this.$store.commit('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '关注疾病' // 标题
      });
      this.$nextTick (function () {
        this.initDoctor()
      })
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
          _this.$nextTick(()=>{
            for(let i=0;i<_this.datas.length;i++) {
              _this.$refs.ills[i].style.marginLeft=(Math.random()*(3-1+1)+1).toFixed(2)+'rem'
            }
          })
        }
        _this.getDoctor(data, callback)

      },
      getDoctor(data,callback){//获取列表

        api.getmyconcernDisease({params:{"id":this.userId}},{data:data}).then(res => {
          if(res==undefined){
            return false
          }else if (0 == res.code) {
            callback(res)
          }
        })
      },
      select(event){
        if (event.target.getAttribute('class').indexOf('noselect') == -1) {
          event.target.setAttribute('class', 'ill noselect');
        } else {
          event.target.setAttribute('class', 'ill select');
        }
      },
      focusills(){
        let _this = this;
        for (let i = 0, len = _this.$refs.ills.length; i < len; i++) {
          if (this.$refs.ills[i].getAttribute('class').indexOf('noselect') == -1) {
            _this.selectill.push(_this.datas[i].disCategoryId)
          }
        }
        console.log(_this.selectill);
        api.followingDis({
          data:{
            custId:_this.userId,
            targetId:_this.selectill
          }
        }).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            Toast({
              message: '关注成功',
              position: 'center',
              duration: 2000
            });
            setTimeout(function(){
              _this.$router.push({name:"myconcern"});
            },2000);
          }
        })
      }
    },
    components: {
      Indicator, Loadmore,Spinner,oklifeButton
    },

  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .btn{position:fixed;bottom:0;left:0;width:100%;height:px2rem(88);padding:px2rem(30) 0;margin:0 auto;background:#fff;text-align:center;}
  .backgroundfff{width:100%;height:100%;background:#fff;}
  .fdisease {
    position: relative;
    height: 100%;
    background-color: #ffffff;
    font-size: px2rem(28);
  }

  .disease {
    margin-bottom: px2rem(218);
    width:px2rem(720);
    padding-right:px2rem(30);
  }

  .ill {
    display: inline-block;
    box-sizing: border-box;
    height: px2rem(60);
    line-height: px2rem(60);
    border-radius: px2rem(200);
    padding: 0 px2rem(24);
    margin-top: px2rem(40);
    margin-left: px2rem(80);
  }

  .noselect {
    color: #666666;
    background-color: #ECF1FC;
  }

  .select {
    color: #ffffff;
    background-color: #7E9FEC;
  }

  .disease span:first-child {
    display: inline-block;
    margin-left: px2rem(150);
    margin-top: px2rem(240);
  }

  .disease span:nth-child(2), :nth-child(6), :nth-child(10) {
    margin-left: px2rem(150);
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
