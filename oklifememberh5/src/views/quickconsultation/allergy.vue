<template>
  <div class="exparea">
      <div class="containlist">
        <div class="item" @click="selectinput">
          <img src="../../assets/xuanzhong.png" class="xuanzhongpic" v-if="selectshow=='no'" >
          <img src="../../assets/weixuanzhong.png" class="xuanzhongpic" v-if="selectshow=='-1'">
          <span class="itemtext">暂无</span>
        </div>
        <mt-checklist
          align="right"
          v-model="value"
          :options="options">
        </mt-checklist>
    </div>

      <div class="textarea">
        <textarea v-model="allergyInput" @blur="inputblur" placeholder="请您填写药物、食物过敏史、接触某些物品（如：染发剂）过敏史" maxlength="500" @input="descInput"></textarea>
        <i class="inputclear" v-if="allergyInput?true:false" @click="handleClear"></i>
        <span>{{remnant}}字</span>
      </div>

    <div class="btnBox">
      <oklife-button @click="submit" height="2.347rem" width="16.8rem" color="#4776e5">确定</oklife-button>
    </div>
  </div>
</template>
<script>
  import validatorUtils from '../../commonutils/validatorUtils'
  import { Toast,Checklist } from 'mint-ui'
  import oklifeButton from '../../../src/components/button'
  import defaultButton from '../../../src/components/defaultbutton'
  import api from '../../server/api'
  export default {
    data () {
      return {
        remnant: 500,
        currentValue:false,
        //allergy: this.$store.getters['baseInfo/allergy']=="请填写"?"":this.$store.getters['baseInfo/allergy'],
        arealist:[],
        selectshow:'-1',
        allergyInput:'',
        value:[],//临时存放禁忌名字
        allergyNameId:'',//临时存放禁忌Id
        options:[]
      }
    },
    computed: {
      patientId(){
        return this.$store.state.baseInfo.baseInfo.patientId
      },
    },
    mounted () {
      //触发异步请求action内的方法   dispath('方法名')
      this.$store.commit('common/changeHeaderConf', {
        isBack: true,  // 是否显示返回
        isShare: false, // 是否显示分享
        isSkip:false,//是否显示跳过
        skipto:'',//点跳过后到哪个路由页面
        title: '过敏禁忌' // 标题
      })
      api.getnkdaList({}).then(res=>{
        for(var i=0;i<res.data.length;i++){
          this.options.push(res.data[i].name)
        }
        //console.log(this.options)
      })
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {
      value(){
          if(this.value){
            this.selectshow='-1';
          }else{
              return false
          }
      },
      allergyInput(){
        if(this.allergyInput){
          this.selectshow='-1';
        }else{
          return false
        }
      },
    },
    methods: {
      submit: function () {
          console.log(this.selectshow+this.value)
        if (this.selectshow=='-1'&&this.value=='') {
          let instance = Toast('不能为空哦')
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else if(this.selectshow=='no') {
          this.$store.commit("baseInfo/changebaseInfo",{allergy:'暂无'})
          this.$router.push({name:"baseInfo",params:{id:this.patientId}})
        }else if(this.selectshow=='-1'&&this.value!=null) {
            var values=this.value.join(',');
          this.$store.commit("baseInfo/changebaseInfo",{allergy:values})
          this.$router.push({name:"baseInfo",params:{id:this.patientId}})
        }
      },
      selectinput(){
        if(this.selectshow=='no'){
          this.selectshow='-1';
        }else{
          this.value=[]
          this.allergyInput = '';
          this.$nextTick(()=>{
            this.selectshow='no'
          })
        }
      },
      inputblur(){
        if(this.allergyInput!=null){
          this.value.push(this.allergyInput)
        }
      },
      descInput(){
        var txtVal = this.allergyInput.length;
        this.remnant = 500 - txtVal;
      },
      handleClear:function () {
        this.allergyInput = '';
        this.remnant = 500
      },
    },
    components: {
      Toast,
      defaultButton,
      oklifeButton,
      Checklist
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/base/min.scss";
  .marginB30{margin-bottom:px2rem(60);}
  .marginT10{position:relative;top:px2rem(20);}
  div.textarea {
    position: relative;
  }
  div.textarea textarea {
    background: #fff;
    font-size: px2rem(32);
    color: $font333;
    line-height: px2rem(50);
    border:none;
    width:px2rem(690);
    height:px2rem(260);
    padding:px2rem(20) px2rem(30);
    resize : none;
    font-family: "PingFangSC-Regular";
  }
  div.textarea span{position:absolute;bottom:px2rem(20);right:px2rem(20);color:$font999;font-size:px2rem(28);}
  div.textarea i.inputclear {
    position: absolute;
    top: px2rem(30);
    right:px2rem(20);
    display: inline-block;
    width: px2rem(28);
    height: px2rem(28);
    background: url(../../assets/clear.png) no-repeat;
    background-size: px2rem(28);
  }
  .btnBox{margin-top:px2rem(80);}

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
    margin-top: px2rem(108);
  }

  .containlist {
    margin-bottom: px2rem(20);
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
  .item img{float:right;margin-top:px2rem(22);margin-right:px2rem(30);}
  .item:last-child{
    border-bottom: none;
  }

  .itemtext {
    font-size: px2rem(32);
    color:#333333;
    box-sizing: border-box;
  }
</style>
<style lang="scss">
  @import "../../../static/css/base/min.scss";
  .mint-checklist{margin:0;}
  .mint-checklist-title{display:none;}
  .mint-cell{min-height:px2rem(100);height:px2rem(100);
    border-bottom:px2rem(1) #D9D9D9 solid;
    color:#333333;
    box-sizing: border-box;
  }
  .mint-cell:last-child{border-bottom:none;}
  .mint-cell-wrapper{font-size: px2rem(32);line-height:px2rem(100);padding:0;}
  .mint-checklist-label{padding:0;width:px2rem(720);}
  .mint-checkbox-label{margin-left:0;}
  .mint-checkbox-core{ width: px2rem(44);height:px2rem(44);background:url(../../assets/weixuanzhong.png) no-repeat center center;
    border:none;background-size:px2rem(44);margin-right:px2rem(30)}
  .mint-checkbox-input:checked + .mint-checkbox-core{
    width: px2rem(44);height:px2rem(44);background:url(../../assets/xuanzhong.png) no-repeat center center;
    border:none;background-size:px2rem(44);
  }
  .mint-checkbox-input:checked + .mint-checkbox-core::after{display: none;}
</style>
