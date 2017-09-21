<template>
<div >
  <div class="headerBg">
    <img v-for="filePath in datas.hospPicPath" :src="filePath.filePath" onerror="this.src='./img/bannerhospital1.jpg';this.onerror=null" />
  </div>
  <div class="infobox infoboxPull">
    <h4 class="honorIcon">医院荣誉资质</h4>
      <p v-show="hidenP">{{datas.qualifiDesc|putlength}}<i>...</i>
        <span v-show="pulltext" @click="pulltext=!pulltext;hidenP=!hidenP">查看更多&gt;&gt;</span>
      </p>
      <p v-show="!hidenP">{{datas.qualifiDesc}}
        <span v-show="!pulltext" @click="pulltext=!pulltext;hidenP=!hidenP">&lt;&lt;收起更多</span>
      </p>
      <div class="hospitalHonor">
        <img v-for="filePath in datas.qualifyPicDto" :src="filePath.filePath" onerror="this.src='./img/picture.png';this.onerror=null" />
      </div>
  </div>
  <div class="infobox departmentbox">
    <h4 class="departmentIcon">优势科室</h4>
    <ul class="departmentUl">
      <li v-for="department in datas.department">
        <img :src="department.deptPicPath" onerror="this.src='./img/keshi.png';this.onerror=null" />
        <p>{{department.deptName}}</p>
      </li>
    </ul>
  </div>
  <div class="infobox">
    <h4 class="teamIcon">专家团队</h4>
    <div class="teamBox">
      <ul class="teamUl" ref="teamUlwidth">
        <li v-for="item in datas.specShortDto">
          <router-link :to="{name:'expertInfo',params:{id:item.specId}}">
            <div class="teamImg">
              <img :src="item.avater"  onerror="this.src='./img/doctorAvatar.png';this.onerror=null"/>
              <p>{{item.specName}}</p>
            </div>
            <p class="p1">{{item.titleName}}</p>
            <p>就诊人次:{{item.receiver}}</p>
            <p>好评率:{{item.positiveRate|getpositiveRate}}</p>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
  <div class="infobox hospitalBase">
    <h4 class="addressIcon"><a  @click="goMap"><em>地址：</em><span>{{datas.address}}</span><i class="rightIcon"></i></a></h4>
    <h4 class="businessTimeIcon">营业时间：{{datas.businessHours}}</h4>
    <h4 class="telIcon">电话：{{datas.officePhone}}</h4>
  </div>
</div>
</template>

<script>
  import myconcernExpert from '../myconcern/myconcernExpert'
  import myconcernDisease from '../myconcern/myconcernDisease'
  import oklifeButton from '../../../src/components/button'
  import api from '../../server/api'
    export default {
        name: '',
        data () {
            return {
              hidenP:true,
              pulltext:true,
              hospitalTitle:'',
              datas:[],
              doctors:[],
              latitude:'',//高德地图经度
              longitude:'',//高德地图维度
            }
        },
        computed: {
          hospId(){
            return this.$route.params.id
          },

        },
        watch: {

        },
        mounted () {
          let _this=this
          let len=this.doctors.length
          this.$refs.teamUlwidth.style.minWidth=4.8*len+'rem'
          api.hospitalInfo({params:{"hospId":this.hospId}}).then(response => {
            if(response.code==0){
              this.datas=response.data;
              this.latitude=response.data.latitude
              this.longitude=response.data.longitude
              this.doctors=response.data.specShortDto;
              console.log(response.data.hospPicPath[0].filePath)
              this.hospitalTitle=response.data.hospName
              this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
                isshow:true,//是否显示头部
                isBack: true,  // 是否显示返回
                isShare: false, // 是否显示分享
                sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
                isSkip: false,//是否显示跳过
                skipto: '',//点跳过后到哪个路由页面
                title: this.hospitalTitle // 标题
              });
            }else{
              Toast({
                message: '网络异常，请稍后再试',
                position: 'center',
                duration: 2000
              });
            }
          });
        },
        beforeRouteEnter(to, from, next){
            next ()
        },
        methods: {
          goMap: function () {//导航
            if (window.Browser_Environment_Oklife == 'app') {
              let _this = this
              let jump = {
                'nativeType': 'navigation',
                'data': {
                  ' latitude': _this.latitude,
                  ' longitude': _this.longitude
                }
              }
              let Success = (result) => {
                Indicator.close()
                Toast('导航结束')
              }
              let error = (err) => {
                Indicator.close()
                Toast('导航结束')
              }
              cordova.plugins.oklife.skipNative(Success, error, jump)
              Indicator.open({
                text: '导航中...',
                spinnerType: 'fading-circle'
              })
            }
          }

        },
        components: {
          oklifeButton
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
.headerBg img{width:100%;height:px2rem(260);}
  .infobox{margin-top:px2rem(20);width:px2rem(720);padding-left:px2rem(30);height:auto;background:#fff;
    border-top:1px solid #d9d9d9;
    border-bottom:1px solid #d9d9d9;
  float:left;
  overflow: hidden;}

  .infobox h4{width:100%;border-bottom:1px solid #d9d9d9;line-height:px2rem(100);
  font-weight:normal;
  font-size:px2rem(32);color:$font333;
    text-indent: px2rem(52);
    -webkit-user-select: none;
  }
  .infobox #body{transition: height .5s;
    box-sizing: border-box;}
  .infobox p{width:px2rem(690);margin:px2rem(20) 0;line-height:px2rem(40);font-size:px2rem(30);color:$font666;}
  .infobox h4.honorIcon{background:url(../../assets/honorIcon.png) no-repeat 0 center;background-size:px2rem(32);}
  .infobox h4.departmentIcon{background:url(../../assets/departmentIcon.png) no-repeat px2rem(30) center;background-size:px2rem(32);}
  .infobox h4.teamIcon{background:url(../../assets/teamIcon.png) no-repeat 0 center;background-size:px2rem(32);}

  .infobox .hospitalHonor{margin-left:px2rem(-30);width:px2rem(690);padding:px2rem(26) px2rem(30) 0;background:#f5f5f5;float:left; }
  .hospitalHonor img{width:px2rem(156);height:px2rem(108);margin-right:px2rem(20);float: left;margin-bottom:px2rem(26);}
  .hospitalHonor img:last-child{margin-right:0;}

  .departmentbox{width:100%;padding-left:0;}
  .departmentbox h4{width:px2rem(720);padding-left:px2rem(30);}
  .departmentbox ul.departmentUl{
    width:100%;float:left;
  }
  ul.departmentUl li{width:px2rem(186);height:px2rem(186);border-right:1px solid #efefef;border-top:1px solid #efefef;text-align: center;float:left;}
  ul.departmentUl li:nth-child(4n){border-right:0px;}
    ul.departmentUl li:nth-child(1),ul.departmentUl li:nth-child(2),ul.departmentUl li:nth-child(3),ul.departmentUl li:nth-child(4){
      border-top:0px;
    }
  ul.departmentUl li img{width:px2rem(44);height:px2rem(54);margin-top:px2rem(30);margin-bottom:px2rem(20);}
  ul.departmentUl li p{font-size:px2rem(24);color:$font666;line-height:px2rem(24);width:100%;margin:0;}

  .teamBox{width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    height:px2rem(346);}
  .teamBox ul.teamUl{width:auto;padding:px2rem(30) 0;float:left;}
  ul.teamUl li{width:px2rem(150);text-align: center;float:left;margin-right:px2rem(30);}
  ul.teamUl li .teamImg{position:relative;height:px2rem(180);}
  ul.teamUl li .teamImg img{width:100%;height:100%}
  ul.teamUl li .teamImg p{position:absolute;bottom:0;left:0;width:100%;height:px2rem(36);line-height:px2rem(36);background:rgba(0,0,0,0.5);color:$fontfff;font-size:px2rem(24);}
  ul.teamUl li p{font-size:px2rem(20);line-height:px2rem(30);color:$font999;width:100%;margin:0;}
  ul.teamUl li p.p1{font-size:px2rem(28);line-height:px2rem(50);color:#262626;}
  .hospitalBase{margin-bottom:px2rem(100);}
  .hospitalBase h4{font-size:px2rem(32);height:px2rem(100);}
  .hospitalBase h4 a{display:inline-block;width:100%;height:px2rem(100);margin-left:px2rem(-52);}
  .hospitalBase h4:last-child{border-bottom:0;}
  .hospitalBase h4 em{font-weight: normal;display:inline-block;float:left;}
  .hospitalBase h4 span{text-indent:0;float:left;display:inline-block;width:px2rem(480);text-overflow:ellipsis;white-space:nowrap; overflow:hidden; }
  .hospitalBase h4 i.rightIcon{float:right;display:inline-block;width:px2rem(16);height:px2rem(100);margin-right:px2rem(30);background:url("../../assets/go.png") no-repeat left center;margin-left:2.8%;background-size:px2rem(16);}
  .hospitalBase h4.addressIcon{background:url(../../assets/addressIcon.png) no-repeat 0 center;background-size:px2rem(32);}
  .hospitalBase h4.businessTimeIcon{background:url(../../assets/businessTimeIcon.png) no-repeat 0 center;background-size:px2rem(32);}
  .hospitalBase h4.telIcon{background:url(../../assets/telIcon.png) no-repeat 0 center;background-size:px2rem(32);}
  .infoboxPull span{display:inline-block;width:px2rem(200);height:px2rem(100);line-height: px2rem(100);float:right;text-align: right;color:#333;}
</style>
