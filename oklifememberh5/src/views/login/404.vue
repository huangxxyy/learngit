<template>
  <div class="errorPage">
    <img src="../../assets/404.png"/>
    <div class="errortext">
      <p class="errorP">网络异常，请重新加载</p><span v-text="loadtext" class="text"></span>
    </div>
    <a class="reload" @click="reLoad">重新加载</a>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../static/css/base/min.scss';

  .errorPage {
    /*margin-top: px2rem(88);*/;
    /*text-align: center;*/
  }

  .errorPage img {
    display: block;
    margin: auto;
    width: px2rem(260);
    height: px2rem(260);
    margin-top: px2rem(200);
  }

  .errortext{
    width:px2rem(400);
    margin: auto;
    padding-left: px2rem(80);
    color: $font999 ;
  }
  .errorPage p {
    display: inline-block;
    font-size: px2rem(32);
    margin-top: px2rem(40);
  }

  .reload {
    border-radius: px2rem(8);
    display: block;
    width: px2rem(260);
    height: px2rem(80);
    color: $mainC;
    border: px2rem(2) solid $mainC;
    line-height: px2rem(80);
    text-align: center;
    margin: px2rem(60) auto auto auto;
  }

  .reload:hover {
    color: #31529f;
    border-color: #31529f;
  }
</style>

<script>
  import commonUtils from '../../commonutils/commonUtils'
  export default {

    data () {
      return {
        loadtext:'',
        index:0,
        frompath:''
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to.path)
      console.log(to.from)
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.frompath=from.path;
      })
    },
    computed: {},
    watch: {},
    methods: {
      reLoad: function () {
        let entry= commonUtils.getRequest().entry;
        if (window.Browser_Environment_Oklife == 'wx') {
          switch (entry) {
            case 'v1001001':
              this.$router.push({name: 'Submitq'})
              break
            case 'v1001002':
              this.$router.push({name: 'userinfo'})
              break
            case 'v1001003':
              this.$router.push({name: 'myQuestion'})
              break
            case 'v1001004':
              this.$router.push({name: 'myDoctor'})
              break
            case 'v1001005':
              this.$router.push({name: 'myconcern'})
              break
            case 'v1001006':
              this.$router.push({name: 'Submithelp'})
              break
            case 'v1002001':
              this.$router.push({name: 'doctor'})
              break
            case 'v1003001':
              this.$router.push({name: 'accompany'})
              break
            case 'v1003002':
              this.$router.push({name: 'appdownload'})
              break
            case 'v1003003':
              this.$router.push({name: 'customerservice'})
              break
            case 'v1003004':
              this.$router.push({name: 'agreement'})
              break
            case 'v1003005':
              this.$router.push({name: 'about'})
              break
            default:
              console.log('非法路径')
              this.$router.push({name: 'fillphone'})
          }
        }else if (window.Browser_Environment_Oklife == 'app'){
          switch (entry) {
            case 'v1001002':
              this.$router.push({name: 'myDoctor'})
              break
            case 'v1001003':
              this.$router.push({name: 'myconcern'})
              break
            case 'v1001004':
              this.$router.push({name: 'Submithelp'})
              break
            case 'v1001005':
              this.$router.push({name: 'accompany'})
              break
            case 'v1001006':
              this.$router.push({name: 'addpatient'})
              break
            case 'v1001007'://问卷详情
              this.$router.push({name: ''})
              break
            case 'v1003001':
              this.$router.push({name: 'doctor'})
              break
            case 'v1003007':
              this.$router.push({name: 'help'})
              break


            case 'v1003004':
              this.$router.push({name: 'agreement'})
              break
            case 'v1003005':
              this.$router.push({name: 'about'})
              break
            default:
              console.log('非法路径')
              this.$router.push({name: 'fillphone'})
          }
        }
      },
      initloading(){
        let text=['.','..','...','....'];
        this.loadtext=text[this.index];
        this.index++;
        if(this.index>=4){
          this.index=0
        }
      }
    },
    components: {},
    mounted(){
      setInterval(this.initloading,1000);
      this.$store.commit ('common/changeHeaderConf', {
        isshow:true,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '网络异常' // 标题
      })
    }
  }
</script>
