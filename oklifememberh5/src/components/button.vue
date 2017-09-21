<template>
  <div class="containbutton">
    <button
      class="button"
      :class="{'disabled':disabled=='true','disabledtime':disabledtime=='true'}"
      @click="handleClick"
      ref="button">
      <label class="button-text"><slot></slot></label>
    </button>
  </div>
</template>

<!--eg:-->
<!--<oklife-button @click="submit" height="2.347rem" width="18.4rem" color="#4776e5">确认</oklife-button>-->


<script>
  export default {
    data () {
      return {}
    },
    props: {
      height: String,
      width: String,
      disabled:String,
      disabledtime:String
    },
    computed: {},
    mounted () {
        this.$nextTick(function () {
          this.$refs.button.style.height=this.height;
          this.$refs.button.style.width=this.width;
        })

    },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {},
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../static/css/base/min.scss";
  .containbutton{
    display: flex;
    justify-content: center;
  }
  button {
    appearance: none;
    border-radius: px2rem(8);
    border: 0;
    box-sizing: border-box;
    color: #ffffff;
    display: block;
    font-size: px2rem(36);
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
  }

  .disabled {
    color:#cccccc;
    background: #fff;
    border:px2rem(1) solid #cccccc;
    border-radius:px2rem(8);
  }
  .disabledtime {
    color:#4776E5;
    background: #fff;
    border:px2rem(1) solid #cccccc;
    border-radius:px2rem(8);
  }
</style>
