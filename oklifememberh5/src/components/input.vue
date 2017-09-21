<template>
  <div class="input">
    <input :type="type"
           :placeholder="placeholder"
           :disabled="disabled"
           :value="currentValue"
           @input="handleInput"
           ref="input"
    :maxlength="maxlength"
    :oninput="oninput"/>
    <!--onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))加进去可以避免number型的时候可输入e-->
    <i class="inputclear" v-if="currentValue?true:false"
       @click="handleClear"
    ></i>
  </div>
</template>
<!--<oklife-input placeholder="请输入真实姓名" type="text"  height="2.347rem" width="18.4rem" font-size="1rem" ></oklife-input>-->
<script>
  export default {
    data() {
      return {
        currentValue: this.value
      };
    },
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      disabled: Boolean,
      disableClear: Boolean,
      showicon:Boolean,
      value: {},
      height:String,
      width:String,
      fontSize:String,
      maxlength:String,
      oninput:String,
    },
    mounted () {
      this.$nextTick(function () {
        this.$refs.input.style.height=this.height;
        this.$refs.input.style.width=this.width;
        this.$refs.input.style.fontSize=this.fontSize;
      })

    },
    methods: {
      handleInput(evt) {
        this.currentValue = evt.target.value;
      },
      handleClear() {
        this.currentValue = '';
      }
    },

    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      }
    },
    computed:{

    }
  };
</script>

<style lang="scss" scoped>
  @import "../../static/css/base/min.scss";

  div.input {
    position: relative;
  }

  div.input input {
    width: 100%;
    height: px2rem(88);
    background: #fff;
    font-size: px2rem(32);
    color: $font333;
    line-height: px2rem(88);
    text-indent: px2rem(30);
    border:none;
  }

  div.input i {
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
