<template>
  <div class="space">
    <p class="pageTitle">
      填写确认记录
      <router-link to="" class="closepage"></router-link>
    </p>
    <div class="statusColumn">
      <p>大病求医任务编号：<span>{{orderId}}</span><i>确认需求</i></p>
      <div class="urgent" @click="isUrgent">紧急任务</div>
      <button type="button">变更跟进人</button>
    </div>

  </div>
</template>

<script>
  import oklifeInput from '../../../components/input.vue'
  export default {
    name: '',
    data() {
      return {

      }
    },
    computed: {},
    watch: {},
    beforeRouteEnter(to, from, next) {
      next()
    },
    mounted() {

      //
    },
    destroyed() {
      //
    },
    methods: {

    },
    components: {
      oklifeInput
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
  p{margin:0;padding:0;}

  $color666:#666;
  $colorfff:#fff;
  $colorMain:#5690fc;
  $fontSize18:18px;
  $fontSize16:16px;
  $fontSize14:14px;
  .space{width:100%;height:auto;float:left;position:relative;}
  .space p.absolute{font-size:$fontSize18;color:$color666; display:inline-block;width:200px;height:50px;line-height:50px;position:absolute;}
  .space p.mySeriousill{text-align:center;background:#f2f7ff;}
  .space p.managementTask{font-size:$fontSize16;color:#2e4989;right:30px;text-align:right;text-indent:25px;
    background:url(../../../assets/renwurukou.png) no-repeat 0 center;width:auto;top:0;}
  .space p.managementTask span{color:#fb0006;}
  /*下拉选*/
  .selectList{background:#f2f3f5;padding:25px 10px 0 40px;float:left;width:100%; box-sizing:border-box;}
  .selectList .selectBox{margin-right:30px;margin-bottom:25px;float:left;width:auto;height:30px;font-size:$fontSize16;line-height:30px;color:#333;}


</style>
<style rel="stylesheet/scss" lang="scss">
  .space .el-tabs__header{margin:0;}
  .space .el-tabs__nav{margin-left:200px;}
  .space .el-tabs__item{width:180px;text-align: center;padding:0;height:50px;line-height:50px;}
  .space .el-tabs__active-bar{height:4px;}
  .space .el-input__icon+.el-input__inner{padding-right:22px;}
  .space .el-select,.space .el-date-editor.el-input{width:120px;height:30px;}
  .selectSex .el-select,.selectAge .el-select{width:80px;}
  .selectTime .el-select{width:100px;}
  .space .el-input__inner{width:100%;height:30px;border:1px solid #5690fd;overflow: hidden;color:#333;
    background:#fff url(../../../assets/selectBg.png) no-repeat 98px center; border-radius:4px;
  }
  .selectSex .el-input__inner,.selectAge .el-input__inner{background-position:58px center}
  .selectTime .el-input__inner{background-position:78px center}
  .space .el-input__inner:hover,.el-select>.el-input:hover .el-input__inner{border-color:#5690fd;}
  .space .el-input__icon{width:22px;height:30px;}
  .space .el-icon-caret-top:before{content: '\E603';}
  .space .el-select .el-input .el-input__icon{color:#fff;font-size:10px;}
  .selectDate .el-input__inner{background-image:url(../../../assets/rili.png);}
  .space .el-icon-date:before{content: ''}
  .space .el-button{width:90px;padding:0;line-height:30px;}

</style>
