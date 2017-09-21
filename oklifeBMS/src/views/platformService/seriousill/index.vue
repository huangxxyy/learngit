<template>
  <div class="space">
    <p class="absolute mySeriousill">我的大病求医</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未完成" name="first">
        <div class="selectList">
          <div class="selectBox">
            <span>服务类型:</span>
            <el-select v-model="valueService" placeholder="全部">
              <el-option
                v-for="item in optionsService"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="selectBox">
            <span>状态:</span>
            <el-select v-model="valueStatus" placeholder="全部">
              <el-option
                v-for="item in optionsStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="selectBox selectSex">
            <span>性别:</span>
            <el-select v-model="valueSex" placeholder="全部">
              <el-option
                v-for="item in optionsSex"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="selectBox selectAge">
            <span>年龄:</span>
            <el-select v-model="valueAge" placeholder="全部">
              <el-option
                v-for="item in optionsAge"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="selectBox selectTime">
            <span>时间段:</span>
            <el-select v-model="valueTime" placeholder="全部">
              <el-option
                v-for="item in optionsTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="selectBox selectDate">
            <el-date-picker
              v-model="valueDate0"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="valueDate1"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
          <div class="selectBox">
            <oklife-input placeholder="名字/手机号码" type="text"  height="30px" width="254px" font-size="14px" :searchIcon=true></oklife-input>
          </div>
          <div class="selectBox">
            <el-button type="primary">搜索</el-button>
          </div>
        </div>
        <div class="orderList">
          <div class="orderBox" :class="{urgent:item.isUrgent==1}" v-for="(item,index) in datas">
            <div v-if="item.isUrgent==1" class="urgentTag"></div>
            <div class="orderTitle">
              <img :src="item.filePath"/>
              <p>{{item.givenName}} <span> {{item.sex==1?'男':'女'}} </span><span> {{item.age}}岁</span>
                <i :class="{backgroundBlue:item.status==0}">{{item.status==0?'待确认':'导医中'}}</i>
              </p>
              <p class="telPhone">{{item.cellphone}}</p>
            </div>
            <p class="ellipsis">病因：{{item.desc}}</p>
            <p class="p1"><router-link to="">详情</router-link><em>{{item.applyTime}}</em></p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="second">配置管理</el-tab-pane>
    </el-tabs>
    <p class="absolute managementTask">管理任务（<span>28</span>）</p>

  </div>
</template>

<script>
  import oklifeInput from '../../../components/input.vue'
  export default {
    name: '',
    data() {
      return {
        activeName:'first',
        optionsService: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '导医'
        }, {
          value: '2',
          label: '导诊'
        }, {
          value: '3',
          label: '导医导诊'
        }],
        valueService: '',
        optionsStatus:[{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '导医'
        }, {
          value: '2',
          label: '导诊'
        }, {
          value: '3',
          label: '导医导诊'
        }],
        valueStatus: '',
        optionsSex:[
          {
            value: '0',
            label: '男'
          }, {
            value: '1',
            label: '女'
          }
        ],
        valueSex: '',
        optionsAge:[
          {
            value: '0',
            label: '0~8'
          }, {
            value: '1',
            label: '9~18'
          }, {
            value: '2',
            label: '19~40'
          },{
            value: '3',
            label: '41~60'
          },{
            value: '4',
            label: '41~60'
          },{
            value: '5',
            label: '80以上'
          },
        ],
        valueAge: '',
        optionsTime:[
          {
            value: '0',
            label: '一周以内'
          }, {
            value: '1',
            label: '一月以内'
          }
        ],
        valueTime:'',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        valueDate0:'',
        valueDate1:'',
        datas:[
          {
            "isUrgent":1,
            "filePath":"a",
            "givenName":"张文静",
            "sex":1,
            "age":27,
            "status":0,
            "cellphone":'13855689974',
            "desc":"这里是病情描述,这里是病情描述,这里是病情描述，这里是病情描述这里是病情描述这里是病情描述这里是病情描述，这里是病情描述",
            "applyTime":"2017/8/22",
            "patientId":12
          },
          {
            "isUrgent":2,
            "filePath":"a",
            "givenName":"张文静",
            "sex":2,
            "age":27,
            "status":1,
            "cellphone":'13855689974',
            "desc":"这里是病情描述,这里是病情描述,这里是病情描述，这里是病情描述这里是病情描述这里是病情描述这里是病情描述，这里是病情描述",
            "applyTime":"2017/8/22",
            "patientId":13
          },
          {
            "isUrgent":2,
            "filePath":"a",
            "givenName":"张文静",
            "sex":2,
            "age":27,
            "status":1,
            "cellphone":'13855689974',
            "desc":"这里是病情描述,这里是病情描述,这里是病情描述，这里是病情描述这里是病情描述这里是病情描述这里是病情描述，这里是病情描述",
            "applyTime":"2017/8/22",
            "patientId":13
          },
          {
            "isUrgent":2,
            "filePath":"a",
            "givenName":"张文静",
            "sex":2,
            "age":27,
            "status":1,
            "cellphone":'13855689974',
            "desc":"这里是病情描述,这里是病情描述,这里是病情描述，这里是病情描述这里是病情描述这里是病情描述这里是病情描述，这里是病情描述",
            "applyTime":"2017/8/22",
            "patientId":13
          },
          {
            "isUrgent":2,
            "filePath":"a",
            "givenName":"张文静",
            "sex":2,
            "age":27,
            "status":1,
            "cellphone":'13855689974',
            "desc":"这里是病情描述,这里是病情描述,这里是病情描述，这里是病情描述这里是病情描述这里是病情描述这里是病情描述，这里是病情描述",
            "applyTime":"2017/8/22",
            "patientId":13
          },
          {
            "isUrgent":2,
            "filePath":"a",
            "givenName":"张文静",
            "sex":2,
            "age":27,
            "status":1,
            "cellphone":'13855689974',
            "desc":"这里是病情描述,这里是病情描述,这里是病情描述，这里是病情描述这里是病情描述这里是病情描述这里是病情描述，这里是病情描述",
            "applyTime":"2017/8/22",
            "patientId":13
          },
          {
            "isUrgent":2,
            "filePath":"a",
            "givenName":"张文静",
            "sex":2,
            "age":27,
            "status":1,
            "cellphone":'13855689974',
            "desc":"这里是病情描述,这里是病情描述,这里是病情描述，这里是病情描述这里是病情描述这里是病情描述这里是病情描述，这里是病情描述",
            "applyTime":"2017/8/22",
            "patientId":13
          },
        ],
      }
    },
    computed: {},
    watch: {},
    beforeRouteEnter(to, from, next) {
      next()
    },
    mounted() {
      //
    },
    destroyed() {
      //
    },
    methods: {},
    components: {
      oklifeInput
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
  p{margin:0;padding:0;}

  $color666:#666;
  $colorfff:#fff;
  $colorMain:#5690fc;
  $fontSize18:18px;
  $fontSize16:16px;
  $fontSize14:14px;
  .space{width:100%;height:auto;float:left;position:relative;}
  .space p.absolute{font-size:$fontSize18;color:$color666; display:inline-block;width:200px;height:50px;line-height:50px;position:absolute;}
  .space p.mySeriousill{text-align:center;background:#f2f7ff;}
  .space p.managementTask{font-size:$fontSize16;color:#2e4989;right:30px;text-align:right;text-indent:25px;
    background:url(../../../assets/renwurukou.png) no-repeat 0 center;width:auto;top:0;}
  .space p.managementTask span{color:#fb0006;}
  /*下拉选*/
  .selectList{background:#f2f3f5;padding:25px 10px 0 40px;float:left;width:100%; box-sizing:border-box;}
  .selectList .selectBox{margin-right:30px;margin-bottom:25px;float:left;width:auto;height:30px;font-size:$fontSize16;line-height:30px;color:#333;}

  /*订单*/
  .orderList{width:100%;padding:0 7px;box-sizing: border-box;
    float: left;margin-top:-20px;margin-bottom:33px;}
  .orderList .orderBox{padding:20px;width:350px;height:180px;border-radius:8px;border:1px solid #5590fc;float:left;
    margin:0 33px;margin-top:50px;position:relative; transition:all 0.3s linear;}
  .orderList .orderBox:hover{box-shadow: 0px 0px 5px #5590fc;}
  .orderBox.urgent{border:1px solid #ff7972;}
  .orderBox.urgent:hover{box-shadow: 0px 0px 5px #ff7972;}
  .orderBox .urgentTag{position:absolute;top:0;left:0;width:60px;height:60px;background:url(../../../assets/urgentTag.png);
    z-index:2;}
  .orderBox p{color:#666;font-size:14px;line-height:24px;}
  .orderTitle{float: left;}
  .orderTitle img{width:50px;height:50px;float: left;}
  .orderTitle p{display:inline-block;width:245px;float: left;font-size:16px;color:#333;margin-left:10px;line-height:26px;}
  .orderTitle p span{font-size:14px;color:#666;}
  .orderTitle p i{font-style: normal;width:64px;height:20px;line-height:20px;text-align:center;
    font-size:12px;color:#5690fc;border-radius:10px;display:inline-block;float:right;
  border:1px solid #5590fc;}
  .orderTitle p i.backgroundBlue{background:#78a0e8;color:#fff;}
  .orderTitle p.telPhone{font-size:14px;color:#5690fc;}
  .orderTitle:after{clear: both;content: '';}
  .orderBox p.ellipsis{
    letter-spacing: 1px;
    width:100%;
    height:72px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    overflow: hidden;}
  .orderBox p.p1{width:100%;color:#5690fc;}
  .orderBox p.p1 em{float:right;color:#999;font-style: normal;}

</style>
<style rel="stylesheet/scss" lang="scss">
  .space .el-tabs__header{margin:0;}
  .space .el-tabs__nav{margin-left:200px;}
  .space .el-tabs__item{width:180px;text-align: center;padding:0;height:50px;line-height:50px;}
  .space .el-tabs__active-bar{height:4px;}

  .space .el-select,.space .el-date-editor.el-input{width:120px;height:30px;}
  .selectSex .el-select,.selectAge .el-select{width:80px;}
  .selectTime .el-select{width:100px;}
  .space .el-input__inner{width:100%;height:30px;border:1px solid #5690fd;overflow: hidden;color:#333;
    background:#fff url(../../../assets/selectBg.png) no-repeat 98px center; border-radius:4px;
  }
  .selectSex .el-input__inner,.selectAge .el-input__inner{background-position:58px center}
  .selectTime .el-input__inner{background-position:78px center}
  .space .el-input__inner:hover,.el-select>.el-input:hover .el-input__inner{border-color:#5690fd;}
  .space .el-input__icon{width:22px;height:30px;}
  .space .el-icon-caret-top:before{content: '\E603';}
  .space .el-select .el-input .el-input__icon{color:#fff;font-size:10px;}
  .selectDate .el-input__inner{background-image:url(../../../assets/rili.png);}
  .space .el-icon-date:before{content: ''}

  .space .el-button{width:90px;padding:0;line-height:30px;}
</style>
