<template>
  <div class="textarea">
    <textarea
           :placeholder="placeholder"
           :disabled="disabled"
    @textarea="handleTextarea"
    ref="textarea">{{text}}</textarea>
    <i class="inputclear" v-if="currentValue?true:false"
       @click="handleClear"></i>
  </div>
</template>
<!--<oklife-textarea placeholder="请输入详细地址"  rows="2" height="2.347rem" width="18.4rem" font-size="1rem" ></oklife-textarea>-->
<script>
  export default {
    data() {
      return {
        text:''
      };
    },
    props: {
      placeholder: String,
      disabled: Boolean,
      disableClear: Boolean,
      showicon:Boolean,
      currentValue:String,
      height:String,
      width:String,
      fontSize:String
    },
    mounted () {
      this.$nextTick(function () {
        this.$refs.textarea.style.height=this.height;
        this.$refs.textarea.style.width=this.width;
        this.$refs.textarea.style.fontSize=this.fontSize;
      })

    },
    methods: {
      handleTextarea(evt) {
        this.currentValue = evt.target.text;
      },
      handleClear() {
        this.currentValue = '';
      }
    },

    watch: {
      value(val) {
        this.currentValue = text;
      },
      currentValue(val) {
        this.$emit('textarea', text);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../static/css/base/min.scss";

  div.textarea {
    position: relative;
  }

  div.textarea textarea {
    width: 100%;
    background: #fff;
    font-size: px2rem(32);
    color: $font333;
    line-height: px2rem(88);
    text-indent: px2rem(30);
    border:none;
    width:px2rem(750);
    height:px2rem(196);
    resize : none;
  }

  div.textarea i.inputclear {
    position: absolute;
    top: px2rem(30);
    right:px2rem(30);
    display: inline-block;
    width: px2rem(28);
    height: px2rem(28);
    background: url(../assets/clear.png) no-repeat;
    background-size: px2rem(28);
  }
</style>
