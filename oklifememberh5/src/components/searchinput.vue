<template>
  <input type="text" class="searchinput" placeholder="搜索">
</template>

<script>
  export default {
    name: '',
    data() {
      return {}
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
    methods: {},
    components: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../static/css/base/min.scss";

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: $font999;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: $font999;
  }

  input:-ms-input-placeholder{
    color: $font999;
  }

  input::-webkit-input-placeholder{
    color: $font999;
  }
.searchinput{
  height: px2rem(56);
  width:px2rem(690);
  outline: none;
  border-radius:px2rem(8);
  border:px2rem(1) #cacaca solid;
  background-image: url('../assets/sousuo.png');
  background-repeat: no-repeat;
  background-size: px2rem(28);
  background-position:45% 50% ;
  background-color: #ffffff;
  padding-left: px2rem(340);
  box-sizing: border-box;
  font-size: px2rem(28);
}
</style>
