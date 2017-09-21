<template>
  <div :class="{photoDiv: isphoto}">
    <router-link  :to="routerlink" :disabled="disabled" :@click.native="eventfunction">
      <span class="fl color333">{{ lititle }}</span>
      <i class="rightIcon" v-show="showi"></i>
      <img :src="imgsrc" class="photo fr"  v-show="showimg"/>
      <span class="fr" :class="fontcolor" v-show="showspan">{{ livalue }}</span>
    </router-link>
  </div>
</template>

<script>
  export default {
      name:'infoli',
    data () {
      return {

      }
    },
    methods: {

    },
    props:{
      isphoto:String,//是否是带头像的行
      routerlink:String,//a链接
      vlink:String,
      disabled:String,//a链接是否可用
      lititle:String,//行名
      showi:String,//是否显示右侧小箭头
      imgsrc:String,//图片路径
      showimg:String,//是否显示图片
      fontcolor:String,//行值颜色
      showspan:String,//是否显示右侧行值
      livalue: {
        type: String,//行值类型
        default: ''//行值默认内容
      },
      eventfunction:String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../static/css/base/min.scss";
  .fl{float:left;}
  .fr{float:right;}
  .color333{color:$font333;}
  .color666{color:$font666;}
  .color999{color:$font999;}
  .infoUl div{width:px2rem(676);height:px2rem(100);border-bottom:1px solid #D9D9D9;padding-right:px2rem(44);}
  .infoUl div:last-child{border-bottom:0px solid #D9D9D9;}
  .infoUl div.photoDiv{height:px2rem(141);}
  .infoUl div.photoDiv span{height:px2rem(141);line-height:px2rem(141);}
  .photoDiv img{width:px2rem(100);height:px2rem(100);margin-top:px2rem(20);border-radius:px2rem(4);}
  .infoUl div span,.infoUl div i{line-height:px2rem(100);}
  .infoUl div a{display:inline-block;width:100%;height:100%;}
  .infoUl div span.fl{font-size:px2rem(32);width:px2rem(150);}
  .infoUl div span{font-size:px2rem(30);}
  .infoUl div i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:100%;background:url("../../assets/gonext.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}

</style>
