<template>
  <div class="exparea">
    <div class="containlist">
      <div class="item" v-for="(area,index) in arealist" @click="select(area.cityId,area.cityName)">
        <img src="../../assets/xuanzhong.png" class="xuanzhongpic" v-show="selectshow==area.cityId" >
        <img src="../../assets/weixuanzhong.png" class="xuanzhongpic" v-show="selectshow!=area.cityId">
        <span class="itemtext">{{area.cityName}}</span>
      </div>
      <div class="item">
        <img src="../../assets/xuanzhong.png" class="xuanzhongpic" v-show="selectshow=='qita'" @click="selectinput">
        <img src="../../assets/weixuanzhong.png" class="xuanzhongpic" v-show="selectshow!='qita'" @click="selectinput">
        <input type="text" class="inputtext itemtext" v-show="selectshow=='qita'" placeholder="请输入其他意向地" v-model="qitatext" @blur="inputblur">
        <div class="divtext" v-show="selectshow!='qita'" @click="selectinput">请输入其他意向地</div>
      </div>
    </div>
    <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5"><span>确定</span></oklife-button>
  </div>
</template>

  <style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #999999;
    font-size: px2rem(32);
    font-weight: normal;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color:  #999999;
    font-size: px2rem(32);
    font-weight: normal;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color:  #999999;
    font-size: px2rem(32);
    font-weight: normal;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:  #999999;
    font-size: px2rem(32);
    font-weight: normal;
  }
  .exparea {
    margin-top: px2rem(20);
  }

  .containlist {
    margin-bottom: px2rem(60);
    background: #ffffff;
    border-top: px2rem(1) solid #D9D9D9;
    border-bottom:px2rem(1) solid #D9D9D9;
    width: 100%;
    box-sizing: border-box;
    padding-left: px2rem(30);
  }

  .xuanzhongpic {
    width: px2rem(44)
  }

  .item {
    height: px2rem(100);
    line-height: px2rem(100);
    border-bottom:px2rem(1) #D9D9D9 solid;
    font-size: px2rem(32);
    color:#333333;
    box-sizing: border-box;
  }
  .item:last-child{
    border-bottom: none;
  }

  .itemtext {
    margin-left: px2rem(30);
    font-size: px2rem(32);
    color:#333333;
    box-sizing: border-box;
  }

  .inputtext {
    outline: none;
    border: none;
    height: 100%;
    width: 80%;
    display: inline-block;
    box-sizing: border-box;
    border-bottom: px2rem(1) #D9D9D9 solid;
  }

  .divtext {
    display: inline-block;
    color: #999999;
    box-sizing: border-box;
    font-size: px2rem(32);
    width: 80%;
    padding-left: px2rem(30);
  }
  </style>

  <script>
    import validatorUtils from '../../commonutils/validatorUtils'
    import { Toast } from 'mint-ui'
    import oklifeButton from '../../../src/components/button'
    import { mapState } from 'vuex'
    import api from '../../server/api'
      export default {
      name:'inputname',
        data () {
            return {
              arealist:[],
              selectshow:'-1',
              qitatext:'',
              temporaryexpArea:'',//临时存放意向地名字
              temporaryexpAreaId:''//临时存放意向地Id
            }
        },
        computed:{
          expArea(){
            return this.$store.state.seriousill.seriousill.expArea  //意向地名字
          },
          expAreaId(){
            return this.$store.state.seriousill.seriousill.expAreaId  //意向地Id
          },
        },
        methods:{
          submit: function () {
            if (this.selectshow=='-1') {
              let instance = Toast('不能为空哦')
              setTimeout(() => {
                instance.close()
              }, 2000)
            } else if(this.selectshow=='qita' && !this.qitatext) {
              let instance = Toast('不能为空哦')
              setTimeout(() => {
                instance.close()
              }, 2000)
            }else if(this.selectshow!='-1' && this.selectshow!='qita') {
              this.$store.commit('seriousill/changeseriousill',{
                expArea:this.temporaryexpArea,
                expAreaId:this.temporaryexpAreaId
              })
              this.$router.push({name:'Submithelp'})
            }else if(this.selectshow!='-1' && this.selectshow=='qita') {
              this.$store.commit('seriousill/changeseriousill',{
                expArea:this.temporaryexpArea,
                expAreaId:this.temporaryexpAreaId
              })
              this.$router.push({name:'Submithelp'})
            }
          },
          select(cityId,cityName){
            if(this.selectshow==cityId){
              this.selectshow='-1';
              this.temporaryexpArea='不限定'
              this.temporaryexpAreaId=''
            }else{
              this.selectshow=cityId
              this.temporaryexpArea=cityName
              this.temporaryexpAreaId=cityId
            }
          },
          selectinput(){
            if(this.selectshow=='qita'){
              this.selectshow='-1';
            }else{
              this.selectshow='qita'
            }
          },
          inputblur(){
            if(this.selectshow=='qita'){
              this.temporaryexpArea=this.qitatext
              this.temporaryexpAreaId=''
            }
          }
        },
        mounted () {
          //触发异步请求action内的方法   dispath('方法名')
          this.$store.commit('common/changeHeaderConf', {
            isshow:true,//是否显示头部
            isBack: true,  // 是否显示返回
            isShare: false, // 是否显示分享
            isSkip:false,//是否显示跳过
            skipto:'',//点跳过后到哪个路由页面
            title: '意向地' // 标题
          })
          //获取优质医疗资源地区
          let _this=this
          api.hiQRCity({}).then((res) => {
            if (undefined == res) {
              return false
            } else if (0 == res.code) {
              _this.arealist = res.data
              if(_this.expArea!='不限定' && _this.expAreaId){
                _this.selectshow=_this.expAreaId
              }else if(_this.expArea!='不限定' && !_this.expAreaId){
                _this.selectshow='qita'
                _this.qitatext=_this.expArea
              }
            }
          })

          if(this.$store.state.seriousill.seriousill.expAreaId){
            this.selectshow=this.$store.state.seriousill.seriousill.expAreaId
            this.temporaryexpArea=this.$store.state.seriousill.seriousill.expArea
            this.temporaryexpAreaId=this.$store.state.seriousill.seriousill.expAreaId
          }else if(this.$store.state.seriousill.seriousill.expArea && !this.$store.state.seriousill.seriousill.expAreaId){
            this.selectshow='qita'
            this.temporaryexpArea=this.$store.state.seriousill.seriousill.expArea
            this.temporaryexpAreaId=this.$store.state.seriousill.seriousill.expAreaId
          }
        },
        beforeRouteEnter(to, from, next){
          next()
        },
        watch: {},
        components: {
          oklifeButton,
          Toast
        }
    }
</script>
