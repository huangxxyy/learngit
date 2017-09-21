<template>
  <div class="contaninselect fixed">
    <div v-if="isShowAppHeader" class="appHeaderSpace"></div>
    <header class="header">
      <div class="header-button left">
        <button @click="backgo"><img src="../../assets/back_fff.png"></button>
      </div>
      <router-link :to="{name:'search'}">
      <h1 class="header-title" ><input type="text" placeholder="疾病"></h1>
      </router-link>
      <div class="header-button right">
        <button><img src="../../assets/zixun.png" @click="contactCustomer"></button>
      </div>
    </header>
    <div class="diseasecontain">
      <ul class="left" ref="leftul">
        <li v-for="(item, index) in itemlist" :class="{'department':true, 'active':isactive==index}"
            @click="handledisease(item.stDeptId,index)">{{item.stDeptName}}
        </li>
      </ul>
      <ul class="right" ref="rightul">
        <li class="disease" v-for="disease in this.diseaseList" @click="selectDisease(disease.disId,disease.disName)">{{disease.disName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../../server/api'
  export default {
    name: '',
    data () {
      return {
        itemlist:[],
        diseaseList:[],
        isactive:0,
        isShowAppHeader:''
      }
    },
    computed: {

    },
    watch: {},
    beforeRouteEnter(to, from, next){

    },
    mounted () {
      let _this = this
      this.$store.commit('common/changeHeaderConf', {//设置当前头部信息
        isshow:false,//是否显示头部
        isBack: false,  // 是否显示返回
        isShare: false, // 是否显示分享
        sharecontent:{},//分享的内容{title:'',subtitle:'',abstract:'',imgurl:''}
        isSkip: false,//是否显示跳过
        skipto: '',//点跳过后到哪个路由页面
        title: '' // 标题
      });

      if ('app' == window.Browser_Environment_Oklife) {
        _this.isShowAppHeader = true
      }else if('wx' == window.Browser_Environment_Oklife){
        _this.isShowAppHeader = false
      }else {
        _this.isShowAppHeader = true
      }
      this.$nextTick(function () {
        this.$refs.leftul.style.height=(document.documentElement.clientHeight-44)+'px'
        this.$refs.rightul.style.height=(document.documentElement.clientHeight-44)+'px'

        //获取标准科室列表及疾病列表，并处理数据格式
        api.getStDeptAndDiseaseList({}).then((res)=>{
          if (undefined == res) {
            return false
          } else if (0 == res.code) {
            this.itemlist=res.data
            this.itemlist.push( {
              "stDeptId": '',
              "stDeptName": "不知道什么疾病",
              "diseaseList": [
                {
                  "disId": '',
                  "disName": "不知道什么疾病",
                  "disAlias": ""
                }
              ]
            })
            this.handledisease(this.itemlist[0].stDeptId,0)
          }
        })
      })
    },
    beforeRouteEnter(to, from, next ){
      next ()
    },
    methods: {
      backgo(){
        this.$router.go(-1)
      },
      contactCustomer() {
        alert('联系客服')
      },
      handledisease(id,index){
        this.isactive=index
        var diseaseList=[]
        for(var i=0,leni=this.itemlist.length;i<leni;i++){
         if(id==this.itemlist[i].stDeptId){
           diseaseList=this.itemlist[i].diseaseList
           this.diseaseList=diseaseList
           return
         }
        }
      },
      selectDisease(disId,disName){
        if(this.$route.params.from=='editMedicalRecordPage'){
          let jump = {
            "nativeType": "editMedicalRecordPage",
            "data": {
              "selectDisease": {
                "name":disName,
                "id":disId
              }
            }
          }
          let Success=()=>{}
          let error=()=>{}
          cordova.plugins.oklife.skipNative(Success, error, jump);
          return false
        }else if(this.$route.params.from=='Submithelp'){
          this.$store.commit('seriousill/changeseriousill',{
            selectDisease:disName,
            selectDiseaseId:disId,
          })
        }else if(this.$route.params.from=='selectDoctor'){
          this.$store.commit('seriousill/changeseriousill',{
            orderDoctorSelectdisease:disName,
            orderDoctorSelectdiseaseId:disId,
          })
        }else if(this.$route.params.from=='doctor'){
          this.$store.commit('doctorAndhospital/changedoctortab',{
            orderselectdisease:disName,//专家页面排序选择的疾病
            orderselectdiseaseId:disId,//专家页面排序选择的疾病id
          })
        }else if(this.$route.params.from=='selecthospital'){
          this.$store.commit('accompany/changeaccompany',{
            orderHospitalSelectdisease:disName,
            orderHospitalSelectdiseaseId:disId
          })
        }else if(this.$route.params.from=='hospital'){
          this.$store.commit('doctorAndhospital/changehospitaltab',{
            orderselectdisease:disName,//专家页面排序选择的疾病
            orderselectdiseaseId:disId,//专家页面排序选择的疾病id
          })
        }
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #ffffff;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #ffffff;
  }

  input:-ms-input-placeholder{
    color: #ffffff;
  }

  input::-webkit-input-placeholder{
    color: #ffffff;
  }
  .contaninselect{
    position: fixed;
    width:100%;
    z-index: 1000;
  }
  .header {
    align-items: center;
    background: -webkit-linear-gradient(to right, #5390f4 , #2470f2); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #5390f4 , #2470f2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #5390f4 , #2470f2); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5390f4 , #2470f2); /* 标准的语法（必须放在最后） */
    box-sizing: border-box;
    color: $fontfff;
    display: flex;
    font-size: $fontNav;
    height: px2rem(88);
    line-height: 1;
    padding: 0 px2rem(30);
    text-align: center;
    white-space: nowrap;
    z-index: 1000;
  }
  .appHeaderSpace{
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
  .header-button{
    font-size: $fontNavm;
    -webkit-box-flex: .5;
    -ms-flex: .5;
    flex: .5;
  }
  .header-button button{
    background-color: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 0;
    font-size: inherit;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    box-sizing: border-box;
  }
  .header button {
    flex: .5;
  }
  .header button img{
    height: px2rem(48);
  }
  .header a {
    color: inherit;
  }
  header .left {
    text-align: left;
  }
  header .right {
    text-align: right;
    color: $fontfff;
  }
  .header-title {
    font-size: inherit;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    input{
      box-sizing: border-box;
      width:px2rem(578);
      background-image: url('../../assets/sousuowhite.png');
      background-repeat: no-repeat;
      background-size:px2rem(32);
      background-position: px2rem(20) px2rem(12);
      background-color: rgba(239,239,243,0.6);
      padding-left: px2rem(66);
      height: px2rem(56);
      border-radius: px2rem(32);
      outline: none;
      border:none;
      font-size: px2rem(28);
      color: rgb(255,255,255);
    }
  }
  .fixed {
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
  }
  .diseasecontain{
    /*margin-top: px2rem(88);*/;
  }
  .diseasecontain .left{
    overflow-x: scroll;
    float: left;
    background:$fontfff ;
  }
  .diseasecontain .department{
    height: px2rem(132);
    width: px2rem(300);
    background: $fontfff;
    color: $font666;
    font-size: px2rem(32);
    text-align: center;
    border-bottom:px2rem(1) solid $spackbg;
    line-height:  px2rem(132);
  }
  .diseasecontain .right{
    float: left;
    overflow-x: scroll;
  }
  .diseasecontain .disease{
    height: px2rem(132);
    width: px2rem(400);
    text-align: left;
    color: $font333;
    font-size: px2rem(32);
    line-height:  px2rem(132);
    padding-left: px2rem(30);
    border-bottom:px2rem(1) solid $spackbg;
    background: $spackbg;
  }
  .diseasecontain .active{
    background: $spackbg;
    color: $mainC;
  }
</style>
