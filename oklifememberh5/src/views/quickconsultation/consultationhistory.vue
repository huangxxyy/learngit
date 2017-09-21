<template>
<div class="space">咨询记录页</div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {}
        },
        computed: {},
        watch: {},
        mounted () {
          this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
            isshow:true,//是否显示头部
            isBack: false,  // 是否显示返回
            isShare: false, // 是否显示分享
            sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
            isSkip: false,//是否显示跳过
            skipto: '',//点跳过后到哪个路由页面
            title: '咨询记录' // 标题
          });
        },
        beforeRouteEnter(to, from, next){
            next ()
        },
        methods: {},
        components: {}
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .space{
    /*margin-top: px2rem(88);*/;
  }
</style>
