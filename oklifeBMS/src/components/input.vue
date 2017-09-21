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
    <i class="searchIcon" v-if="searchIcon"></i>
  </div>
</template>
<!--<oklife-input placeholder="请输入真实姓名" type="text"  height="2.347rem" width="18.4rem" font-size="1rem" ></oklife-input>-->
<script>
  export default {
    data() {
      return {
        currentValue: this.value,
      };
    },
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,//默认值
      disabled: Boolean,//是否可用
      value: {},
      height:String,
      width:String,
      fontSize:String,
      maxlength:String,//最大字符长度
      oninput:String,
      searchIcon:Boolean//是否显示搜索图标
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
  div.input {
    position: relative;
  }

  div.input input {
    width: 100%;
    height: 100%;
    background: #fff;
    color:#333;
    line-height:100%;
    border:1px solid #5690fd;
    border-radius:4px;
    box-sizing: border-box;
    padding-left:30px;
  }
  div.input i {
    position: absolute;
    top:0px;
    left:0px;
    display: inline-block;
    width:30px;
    height:30px;
    background:url(../assets/sousuo.png) no-repeat center center;
  }
  input::-webkit-input-placeholder { /* WebKit browsers */
    color:#97a8be;
  }
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #97a8be;
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #97a8be;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #97a8be;
  }
</style>
