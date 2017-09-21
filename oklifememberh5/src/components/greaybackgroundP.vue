<template>
  <p class="greayBackgroundP">{{ greayBackgroundP }}</p>
</template>

<script>
  export default {
      name:'greayBackgroundP',
    data () {
      return {

      }
    },
    methods: {

    },
    props:{
      greayBackgroundP:String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../static/css/base/min.scss";
  .greayBackgroundP{background:#EFEFF4;color:$font999;font-size:px2rem(28);line-height:px2rem(46);padding:px2rem(10) px2rem(40);border-bottom:1px solid #D9D9D9;}
</style>
