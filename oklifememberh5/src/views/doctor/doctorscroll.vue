<template>
  <div class="hide_scroll_bar">
    <div class="horizontalscroll">
      <div class="sortMenu-ul" ref="sortMenuUl">
        <router-link class="cell" v-for="(item, index) in doctors" ref="cell"
                     :to="{name:'expertInfo',params:{id:item.specId}}" tag="span" :key="item.specId">
          <img :src="item.headPath" class="doctorHeadPortrait" onerror="this.src='./img/doctorAvatar.png';this.onerror=null"/>
          <img src="../../assets/yijingkaitong.png" alt="" class="yijingkaitong">
          <div class="name">{{item.givenName}}</div>
          <div class="duty">{{item.title}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {

            }
        },
        props:{
          doctors:Array
        },
        computed: {},
        watch: {
          doctors(){
            let _this=this
            this.$nextTick(()=>{
              let len=_this.doctors.length
             _this.$refs.sortMenuUl.style.minWidth=5.4*len+'rem'
            })
          }
        },
        mounted () {

        },
        beforeRouteEnter(to, from, next){
            next ()
        },
        methods: {},
        components: {}
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .hide_scroll_bar{
    height: px2rem(368);
    overflow-y: hidden;
    border-bottom: px2rem(2) solid #d9d9d9;
  }
  .horizontalscroll {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    height: px2rem(378);
    background-color: #fff;
    margin-top: px2rem(20);
    border-bottom: 1px solid $line;
    -webkit-overflow-scrolling:auto
  }

  .sortMenu-ul {
    height: px2rem(378);
    -webkit-overflow-scrolling:touch
  }

  .cell {
    position: relative;
    width: px2rem(160);
    height: px2rem(378);
    margin-right: px2rem(10);
    margin-left: px2rem(30);
    float: left;
  }
  .yijingkaitong{
    width:px2rem(26);
    position: absolute;
    top:px2rem(166);
    left:px2rem(128);
    z-index: 10;
  }
  .doctorHeadPortrait {
    margin-top: px2rem(50);
    box-sizing: border-box;
    width: px2rem(160);
    height: px2rem(160);
    border-radius: px2rem(80);
    border: px2rem(2) solid #fcb201;
  }
  .name {
    margin-top: px2rem(30);
    font-size: $font32;
    color: $font333;
    text-align: center;
    line-height: px2rem(32);
  }
  .duty {
    margin-top: px2rem(10);
    margin-bottom:px2rem(50);
    font-size: $fontSmall;
    text-align: center;
    color: $font666;
    line-height: px2rem(26);
  }
</style>
