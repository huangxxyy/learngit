<template>
  <div class="space">
    <mt-loadmore @translate-change="translateChange" @top-status-change="handleTopChange"  :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore" :top-distance="60" :bottom-distance="60" :auto-fill="false" >
      <div class="expertList" v-if="datas.length!=0">
        <div class="expertBox" v-for="(item,index) in datas">
          <router-link to=""><!---todo {name:'', params:{id:item.appId}}----->
            <div class="expertPhoto">
              <img src="../../assets/doctor.png"/>
            </div>
            <div class="expertBoxP">
              <p class="p1">{{item.givenName }}<span>{{item.applyDate|getTimeStamp}}</span></p>
              <p class="width10">{{item.problemDesc}}</p><a disabled>{{item.status==100?'申请中':'已结束'}}</a>
            </div>
          </router-link>
        </div>
      </div>
    </mt-loadmore>
    <div class="nothing" v-if="datas.length==0">
      <img src="../../assets/nodoctor.png"/>
      <p class="addparientP">您还没有问题提交<br /><span>快去向平台医生提问吧</span></p>
      <router-link :to="{name:'Submitq'}" class="enjoy">去咨询</router-link>
    </div>
  </div>
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
        doctorListVisition:false,
        nothingVisition:false,
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
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow: true,//是否显示头部
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '我的提问' // 标题
      });
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

        api.getmyQuestion({params:{"id":this.userId}},{data:data}).then(res => {
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
    position:relative;
    width:px2rem(118);
    height:px2rem(118);
    overflow:hidden;
    float: left;
  }
  .expertPhoto img{position:absolute;bottom:0;left:0;width:px2rem(100);height:px2rem(100);border-radius:px2rem(8);}
  .expertPhoto i{display:inline-block;width:px2rem(36);height:px2rem(36);background:#ff0000;color:#fff;line-height:px2rem(36);text-align: center;
  position:absolute;top:0;right:0;border:1px solid #fff;border-radius:50%;font-size:px2rem(26);}
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
    margin-top:px2rem(10);
    overflow: hidden;
    word-break: break-all;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .expertBoxP p.width10{width:10rem;display:inline-block;float:left;}
  .expertBoxP p.p1 {
    font-size: $fontNavm;
    color: $font333;
    line-height: px2rem(60);
  }

  .expertBoxP p.p1 span {
    font-size: px2rem(24);
    color: $font666;
    float:right;
  }
  .expertBoxP a{display:inline-block;margin-top:px2rem(10);width:px2rem(96);height:px2rem(40);border-radius:px2rem(4);border:1px solid #4385f5;color:#4385f5;
  line-height:px2rem(40);text-align: center;
  font-size:px2rem(26);float:right;}
  .nothing{text-align: center;}
  .nothing img {
    display: block;
    margin: auto;
    width: px2rem(308);
    height: px2rem(338);
    margin-top: px2rem(240);
  }
  .nothing p.addparientP{
    font-size:px2rem(32);
    color:$font999;
    line-height:px2rem(50);
  }
  .nothing p.addparientP span{
    font-size:px2rem(20);
    line-height:px2rem(40);
  }
  .nothing a.enjoy{
    display:inline-block;
    border-radius:px2rem(8);
    width:px2rem(300);
    height:px2rem(88);
    border:1px solid #4385f5;
    color:#4385f5;
    line-height:px2rem(88);
    margin-top:px2rem(20);
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
