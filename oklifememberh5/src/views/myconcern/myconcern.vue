<template>
<div class="space">
  <div class="tabBtn">
    <span v-for="(tab,index) in tabs"
          :class="{'active': index === selected}"
          @click="choose(index)">{{tab.tabName}}</span>
  </div>
  <component :is="currentView" transition="fade" transition-mode="out-in"></component>
</div>
</template>

<script>
  import myconcernExpert from '../myconcern/myconcernExpert'
  import myconcernDisease from '../myconcern/myconcernDisease'
    export default {
        name: '',
        data () {
            return {
              tabs:[
                {tabName:"专家"},
                {tabName:"疾病"}
              ],
              selected:'',
              currentView:'',
            }
        },
        computed: {},
        watch: {},
        mounted () {
          this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
            isshow:true,//是否显示头部
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
            isSkip: false,//是否显示跳过
            skipto: '',//点跳过后到哪个路由页面
            title: '我的关注' // 标题
          });
        },
        beforeRouteEnter(to, from, next){
          next(vm => {
            console.log(from.path.split('/')[1]);
            if (from.path.split('/')[1]=="fdisease") {
              vm.selected=1;
              vm.currentView='rank_tab_1';
            } else {
              vm.selected=0;
              vm.currentView='rank_tab_0';
            };
          })
        },
        methods: {
          choose(index){
            this.selected = index;
            this.currentView = 'rank_tab_' + index;
            console.log(this.currentView)
          }
        },
        components: {
          'rank_tab_0':myconcernExpert,
          'rank_tab_1':myconcernDisease
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/;
  }
  .tabBtn{margin-top:px2rem(20);width:px2rem(690);padding:0 px2rem(30);border-top:1px solid #d9d9d9;height:px2rem(100);background:#fff;}
  .tabBtn span{float: left;display:inline-block;width:50%;line-height:px2rem(96);font-size:px2rem(32);color:$font999;border-bottom:px2rem(4) solid $font999;
  text-align: center;}
  .tabBtn span.active{color:#4285f4;border-color:#4285F4;}
</style>
