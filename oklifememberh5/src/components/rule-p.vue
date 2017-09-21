<template>
  <p class="rule color999">{{ ruletext }}</p>
</template>

<script>
  export default {
      name:'rulep',
    data () {
      return {

      }
    },
    methods: {

    },
    props:{
      ruletext:String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../static/css/base/min.scss";
  .color999{color:$font999;}
  .rule{font-size:px2rem(26);line-height:px2rem(88);margin-left:px2rem(30);}
</style>
