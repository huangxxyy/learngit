<template>
<div class="search">
  <div class="containsearchheader fixed">
    <div v-if="isShowAppHeader" class="appHeaderSpace"></div>
    <header class="header">
      <h1 class="header-title"><input type="search" v-model="searchContent" @keyup.13="submitSearch" :placeholder="cansearch"></h1>
      <div class="header-button right" @click="back">取消</div>
    </header>
  </div>
  <div class="searchHistory" v-show="isshowhistory">
    <span class="historytitle">搜索记录</span>
    <div class="nocontent" v-show="searchHistory.length==0">
      <img class="nocontentpic" src="../../assets/nocontent.png">
      <span>暂无搜索记录</span>
    </div>
    <ul class="historylist" v-show="!searchHistory.length==0">
      <li class="historyitem" v-for="(historyitem,index) in searchHistory">{{historyitem}}<i class="searchcancel" @click="cancelitemhistory(index)"></i></li>
      <li class="clearHistoryButton" @click="clearAllHistory">清空搜索记录</li>
    </ul>
  </div>
  <div class="nocontent" v-show="nocontent">
    <img class="nocontentpic" src="../../assets/nocontent.png">
    <span>暂无此关键词相关搜索</span>
  </div>
  <ul class="contentList" v-show="contentList.length">
    <li class="contentItem" v-for="contentItem in contentList"><span class="contentLeft" ref="contentlefthightligth">{{contentItem.name}}</span><span class="contentRight">{{contentItem.job}}</span></li>
  </ul>
</div>
</template>

<script>
  import commonUtils from '../../commonutils/commonUtils'
  export default {
    name: '',
    data() {
      return {
        isshowhistory:true,
        nocontent:false,
        searchContent:'',
        cansearch:'',
        contentList:[],
        searchHistory:[],
        isShowAppHeader:''
      }
    },
    computed: {

    },
    watch: {

    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        if(from.path=='/selectDoctor'){
          vm.cansearch='专家'
          vm.searchHistory=JSON.parse(localStorage.getItem('searchHistory_doctor'))|| []
        }else if(from.path.split('/')[1]=='selectDisease'){
          vm.cansearch='疾病'
          vm.searchHistory=JSON.parse(localStorage.getItem('searchHistory_disease'))||[]
        }else if(from.path=='/doctormain/hospital'){
          vm.cansearch='医院'
          vm.searchHistory=JSON.parse(localStorage.getItem('searchHistory_hospital'))||[]
        }else if(from.path=='/doctormain/doctor'){
          vm.cansearch='专家'
          vm.searchHistory=JSON.parse(localStorage.getItem('searchHistory_doctor'))|| []
        }else{
          vm.cansearch='专家 / 医院/ 疾病'
        }
      })
    },
    mounted() {
      let _this = this
      if ('app' == window.Browser_Environment_Oklife) {
        _this.isShowAppHeader = true
      }else if('wx' == window.Browser_Environment_Oklife){
        _this.isShowAppHeader = false
      }else {
        _this.isShowAppHeader = true
      }
      document.getElementsByClassName('selectbutton')[0].style.display='none';
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow:false,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '' // 标题
      });
      this.keyhighlight()
    },
    destroyed() {
      //
    },
    methods: {
      submitSearch(){
        let searchContent=this.searchContent
        let searchHistory_doctor=JSON.parse(localStorage.getItem('searchHistory_doctor')) || []
        let searchHistory_hospital=JSON.parse(localStorage.getItem('searchHistory_hospital')) || []
        let searchHistory_disease=JSON.parse(localStorage.getItem('searchHistory_disease')) || []
        if(this.cansearch=='专家'){
          if(!commonUtils.arrayTest(searchHistory_doctor,searchContent)){
            searchHistory_doctor.unshift(searchContent)
            localStorage.setItem('searchHistory_doctor',JSON.stringify(searchHistory_doctor))
          }
        }else if(this.cansearch=='医院'){
          if(!commonUtils.arrayTest(searchHistory_hospital,searchContent)){
            searchHistory_hospital.unshift(searchContent)
            localStorage.setItem('searchHistory_hospital',JSON.stringify(searchHistory_hospital))
          }
        }else if(this.cansearch=='疾病'){
          if(!commonUtils.arrayTest(searchHistory_disease,searchContent)){
            searchHistory_disease.unshift(searchContent)
            localStorage.setItem('searchHistory_disease',JSON.stringify(searchHistory_disease))
          }
        }
        alert('搜索')
        //todo 暂无接口搜索

      },
      cancelitemhistory(index){
        this.searchHistory.splice(index, 1)
        if(this.cansearch=='专家'){
          localStorage.setItem('searchHistory_doctor',JSON.stringify(this.searchHistory))
        }else if(this.cansearch=='医院'){
          localStorage.setItem('searchHistory_hospital',JSON.stringify(this.searchHistory))
        }else if(this.cansearch=='疾病'){
          localStorage.setItem('searchHistory_disease',JSON.stringify(this.searchHistory))
        }
      },
      clearAllHistory(){
        this.searchHistory=[]
        if(this.cansearch=='专家'){
          localStorage.setItem('searchHistory_doctor',JSON.stringify(this.searchHistory))
        }else if(this.cansearch=='医院'){
          localStorage.setItem('searchHistory_hospital',JSON.stringify(this.searchHistory))
        }else if(this.cansearch=='疾病'){
          localStorage.setItem('searchHistory_disease',JSON.stringify(this.searchHistory))
        }
      },
      keyhighlight(){//highlight搜索关键字高亮
        let searchContent =this.searchContent//搜索关键字
        let elArray=this.$refs.contentlefthightligth
        if(elArray!=undefined){
          for(let i=0,len=elArray.length;i<len;i++){
            elArray[i].innerHTML=elArray[i].innerHTML.replace(eval('/'+searchContent+'/g'), '<span style="color:#356cf2">'+searchContent+'</span>')
          }
        }
      },
      back(){
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #ffffff;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #ffffff;
  }

  input:-ms-input-placeholder{
    color: #ffffff;
  }

  input::-webkit-input-placeholder{
    color: #ffffff;
  }
  .containsearchheader{
    width: 100%;
    position: fixed;
    z-index: 1001;
  }
  .header {
    align-items: center;
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    box-sizing: border-box;
    color: $fontfff;
    display: flex;
    font-size: $fontNav;
    height: px2rem(88);
    line-height: 1;
    padding: 0 px2rem(30);
    text-align: center;
    white-space: nowrap;
  }
  .appHeaderSpace{
    width: 100%;
    height: px2rem(40);
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    z-index: 1000;
    display: flex;
    align-items:center;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: px2rem(-1);
  }
  .header-button{
    font-size: px2rem(32);
    -webkit-box-flex: .5;
    -ms-flex: .5;
    flex: .5;
    margin-left: px2rem(20);
  }
  .header button {
    flex: .5;
  }
  .header a {
    color: inherit;
  }
  header .right {
    text-align: right;
    color: $fontfff;
  }
  .header-title {
    font-size: inherit;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    input{
      box-sizing: border-box;
      width:px2rem(606);
      height: px2rem(56);
      background-image: url('../../assets/sousuowhite.png');
      background-repeat: no-repeat;
      background-size:px2rem(32);
      background-position: px2rem(20) px2rem(12);
      background-color: rgba(239,239,243,0.6);
      padding-left: px2rem(66);
      padding-right:px2rem(20);
      height: px2rem(56);
      border-radius: px2rem(32);
      outline: none;
      border:none;
      font-size: px2rem(28);
      color: rgb(255,255,255);
    }
  }
  .fixed {
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1001;
  }
  .contentList{
    width: 100%;
    height: 100%;
    /*margin-top: px2rem(88);*/;
    background-color: #ffffff;
    box-sizing: border-box;
    padding-left:px2rem(30);
    padding-right: px2rem(30);
    border-bottom: px2rem(1) solid #D9D9D9;
    margin-bottom: px2rem(106);
  }
  .contentList .contentItem{
    height: px2rem(100);
    background-color: #ffffff;
    border-bottom: px2rem(1) solid #D9D9D9;
    color: #333333;
    font-size:px2rem(30);
    line-height: px2rem(100);
    &:last-child{
      border-bottom: none;
    }
  }
  .contentList .contentItem .contentRight{
    float: right;
    color: #666666;
    font-size: px2rem(28);
  }
  .nocontent{
    width: 100%;
    text-align: center;
    padding-top: px2rem(200);
    padding-bottom: px2rem(700);
    box-sizing: border-box;
    color:$font999;
    font-size: px2rem(26);
  }
  .nocontentpic{
    display: block;
    margin: auto;
    width: px2rem(200);
  }
  .searchHistory{
    width: 100%;
    /*margin-top: px2rem(88);*/;
    padding-bottom: px2rem(80);
    box-sizing: border-box;
    background: #ffffff;
  }
  .searchHistory .historytitle{
    display: block;
    width:100%;
    height: px2rem(88);
    line-height: px2rem(88);
    padding-left: px2rem(30);
    box-sizing: border-box;
    color: #333333;
    font-size:px2rem(32);
    border-bottom: px2rem(1) solid #D9D9D9;
  }
  .searchHistory .historylist{
    padding-left:px2rem(30);
    padding-right:px2rem(30);
    box-sizing: border-box;
    .historyitem{
      position: relative;
      height: px2rem(88);
      line-height: px2rem(88);
      color: #999999;
      font-size: px2rem(28);
      border-bottom: px2rem(2) solid #D9D9D9;
      &:before{
        content:'';
        display: inline-block;
        width:px2rem(30);
        height:px2rem(30);
        background-image: url('../../assets/searchtime.png');
        background-size: cover;
        margin-right: px2rem(20);
        vertical-align: middle;
      }
       .searchcancel{
         display: inline-block;
         background-image: url('../../assets/searchcancel.png');
         background-size: cover;
         width:px2rem(20);
         height: px2rem(20);
         position: absolute;
         right: 0;
         top:px2rem(35)
       }
    }
    .clearHistoryButton{
      display: block;
      height: px2rem(88);
      line-height:px2rem(88);
      width: px2rem(400);
      border:px2rem(2) solid #4385f5;
      border-radius: px2rem(44);
      text-align: center;
      font-size:px2rem(36);
      color: #4285f4;
      margin: auto;
      margin-top: px2rem(80);
    }
  }
</style>
