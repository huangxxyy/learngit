<template>
  <div class="doctorheadercontain">
    <div v-if="isShowAppHeader" class="appHeaderSpace fixed"></div>
    <div class="doctorheader">
      <div id="doctor_tab_container" class="tab_container">
        <router-link :to="{name:'doctor'}" activeClass="tab_selected" class="tab_left" tag="div">
          专家
        </router-link>
        <router-link :to="{name:'hospital'}" activeClass="tab_selected" class="tab_right" tag="div">
          医院
        </router-link>
      </div>
    </div>
    <img @click="handleClick" class="sousuoicon" src="../../assets/whitesousuo.png">
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
          return {
            isShowAppHeader:''
          }
        },
        computed: {},
        watch: {},
        mounted(){
          let _this = this
          if ('app' == window.Browser_Environment_Oklife) {
            _this.isShowAppHeader = true
          }else if('wx' == window.Browser_Environment_Oklife){
            _this.isShowAppHeader = false
          }else {
            _this.isShowAppHeader = true
          }
        },
        beforeRouteEnter(to, from, next){
            next ()
        },
        methods: {
          handleClick(evt) {
            this.$emit('click', evt);
          }
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
.doctorheadercontain{
  position: fixed;
  width: 100%;
  z-index: 1000;
}
  .doctorheader {
    width: 100%;
    height: px2rem(88);
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    z-index: 1001;
    border-bottom: 1px solid $line;
    display: flex;
    align-items:center;
    box-sizing: border-box;
    text-align: center;
  }
  .appHeaderSpace{
    width: 100%;
    height: px2rem(40);
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    z-index: 1000;
    display: flex;
    align-items:center;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: px2rem(-1);
  }

  .tab_container {
    margin: 0 auto;
    width: px2rem(322);
    height: px2rem(56);
    text-align: center;
    display: flex;
    align-items:center;
    font-size: px2rem(32);
  }

  .tab_left {
    border-radius: px2rem(8) 0 0 px2rem(8);
    width: px2rem(166);
    height: px2rem(56);
    text-align: center;
    line-height: px2rem(56);
    font-size: $fontSmall;
    border:px2rem(1) solid #ffffff;
    border-right: none;
    color: #ffffff;
    background: transparent;
  }

  .tab_right {
    border-radius: 0 px2rem(8) px2rem(8) 0;
    width: px2rem(166);
    height: px2rem(56);
    text-align: center;
    line-height: px2rem(56);
    font-size: $fontSmall;
    border:px2rem(1) solid #ffffff;
    border-left: none;
    color: #ffffff;
    background: transparent;
  }

  .tab_selected {
    color: $mainC;
    background: #ffffff;
  }
  .sousuoicon{
    position: absolute;
    right: px2rem(25);
    bottom: px2rem(25);
    height: px2rem(40);
    z-index: 1005;
  }


</style>
