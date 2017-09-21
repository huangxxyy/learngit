<template>
  <div class="containbutton">
    <button
      class="button"
      @click="handleClick"
      ref="button">
      <label class="button-text"><slot></slot></label>
    </button>
  </div>
</template>

<!--eg:-->
<!--<default-button @click="feedback" height="2.347rem" width="8.29rem">意见反馈</default-button>-->


<script>
  export default {
    data () {
      return {}
    },
    props: {
      height: String,
      width: String,
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
    border-radius: px2rem(8);
    border: 1px solid #5390f4;
    box-sizing: border-box;
    color: #5390f4;
    display: block;
    font-size: px2rem(36);
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    background:transparent;
  }
</style>
