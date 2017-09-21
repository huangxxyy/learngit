<template>
  <div>
  <div v-if="isShowAppHeader && isshow" class="appHeaderSpace fixed"></div>
  <header class="header fixed" v-if="isshow" :class="{'margin40':isShowAppHeader}">
    <div class="header-button left">
      <button @click="handleback" v-show="isBack"><img src="../assets/back_fff.png"></button>
    </div>
    <h1 class="header-title" v-text="title"></h1>
    <div class="header-button right" >
      <button v-show="isShare" @click="shareplugin">分享</button>
      <button v-show="isSkip" @click="skiptorouter">跳过</button>
    </div>
  </header>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'oklife-header',
    data () {
      return {
        isShowAppHeader:''
      }
    },
    computed: {
      // Getting Vuex State from store/modules/commonutils
      ...mapState({
        isshow:state => state.common.headerConf.isshow,
        isBack: state => state.common.headerConf.isBack,
        title: state => state.common.headerConf.title,
        isShare: state => state.common.headerConf.isShare,
        sharecontent:state => state.common.headerConf.sharecontent,
        isSkip: state => state.common.headerConf.isSkip,
        skipto:state => state.common.headerConf.skipto,
        handleback:state=>state.common.headerConf.handleback,//获取当前页面返回的处理回调函数
      })
    },
    methods:{
      selectshow(){
        this.$emit('click', evt);
      },
      skiptorouter(){
          this.$router.push(this.skipto)
      },
      shareplugin(){//调用原生分享插件
        alert('分享成功：标题-'+this.sharecontent.title+'，副标题-'+this.sharecontent.subtitle+'，摘要：'+this.sharecontent.subtitle)
//        cordova.plugins.Share.shareMethod(this.sharecontent)
      }
    },
    mounted(){
      let _this = this
      if ('app' == window.Browser_Environment_Oklife) {
        _this.isShowAppHeader = true
      }else if('wx' == window.Browser_Environment_Oklife){
        _this.isShowAppHeader = false
      }else {
        _this.isShowAppHeader = true
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../static/css/base/min.scss";
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
  position: relative;
  text-align: center;
  white-space: nowrap;
  z-index: 9999;
  border:none;
}
.margin40{
  margin-top:px2rem(39);
  border:none;
}
.appHeaderSpace{
  background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
  height: px2rem(40);
  z-index: 9999;
  border:none;
}
.header-button{
  font-size: $fontNavm;
  -webkit-box-flex: .5;
  -ms-flex: .5;
  flex: .5;
}
.header-button button{
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  box-sizing: border-box;
}
button {
  flex: .5;
}
button img{
  height: px2rem(42);
}
a {
  color: inherit;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
  color: $fontfff;
  font-size: px2rem(30);
}
.header-title {
  font-size: inherit;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.fixed {
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
}
</style>
