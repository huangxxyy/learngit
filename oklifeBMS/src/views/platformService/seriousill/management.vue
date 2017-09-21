<template>
  <div class="space">
    <p class="absolute mySeriousill">管理大病求医</p>
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
        <div class="managementList">
          <el-checkbox-group
            v-model="checkedPatien" @change="alert">
            <el-checkbox v-for="(item,index) in datas" :label="item" :key="item" >
              <div class="orderBox">
                <div class="orderTitle">
                  <img :src="item.filePath"/>
                  <p>{{item.givenName}} <span> {{item.sex==1?'男':'女'}} </span><span> {{item.age}}岁</span>
                    <i class="telPhone">{{item.cellphone}}</i>
                  </p>
                  <p class="ellipsis">病因：{{item.desc}}</p>
                </div>
                <div class="status">
                  <p><span class="time">{{item.applyTime}}</span><i>{{item.status==0?'未分配':'已分配'}}</i></p>
                  <div class="linkBox">
                    <button type="button" >分配</button><!-- @click="alert(index)"-->
                    <router-link to="">详情</router-link>
                  </div>
              </div>

              </div>
              <div class="line"><i></i></div>
            </el-checkbox>
          </el-checkbox-group>
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
        checkedPatien: [],
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
            "patientId":14
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
            "patientId":15
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
            "patientId":16
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
            "patientId":17
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
            "patientId":18
          },
        ],
        checkedP:[]
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
    methods: {
      alert(){
        let i=0;
        for(i=0;i<this.checkedPatien.length;i++){
          console.log(this.checkedPatien[i].patientId)
        }
       // console.log(this.checkedP)
      }
    },
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

  /*管理列表*/
  .managementList{width:100%;float: left;}
  .orderBox{padding:27px 40px;width:100%;height:116px;float:left;
    position:relative;}
  .line{width:100%;height:1px;background:#d9d9d9;position:absolute;top:115px;left:40px;box-sizing: border-box;}
  .line i{display:inline-block;position:absolute;right:40px;width:40px;height:1px;background:#fff;}
  .orderBox p{color:#666;font-size:14px;line-height:24px;}
  .orderTitle{float: left;width:480px;}
  .status{float:right;width:350px;text-align: right; }
  .orderTitle img{width:60px;height:60px;float: left;border-radius:4px;}
  .orderTitle p{display:inline-block;width:400px;float: left;font-size:16px;color:#333;margin-left:20px;line-height:26px;}
  .orderTitle p span{font-size:12px;color:#666;}
  .orderTitle p i.telPhone{font-style: normal;font-size:12px;color:#5690fc;}
  .orderBox:after{clear: both;content: '';}
  .orderTitle p.ellipsis{font-size:12px;line-height:18px;
    letter-spacing: 1px;
    width:400px;
    height:36px;
    display: -webkit-box;
  -webkit-box-orient:vertical;
  text-overflow: ellipsis;
  overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;}
  .status p{width:auto;color:#666;float:right;font-size:14px;margin-bottom:10px;}
  .status p span{display:inline-block;padding-left:24px;margin-right:30px;
    background:url(../../../assets/timeIcon.png) no-repeat left center;line-height:20px;}
  .status p i{float:right;color:#5690fc;font-style: normal;display:inline-block;height:20px;
    line-height:20px;font-size:12px;background:#f6f9ff;padding:0 10px;border:1px solid #5690fc;border-radius:10px;}
  .status .linkBox{width:100%;float:right;}
  .status a,.status button{display:inline-block;width:120px;height:30px;border:1px solid #5690fc;border-radius:4px;font-size: 16px;color:#5690fc;
  margin-left:40px;text-align: center;transition:all 0.3s; text-align: center;line-height:30px;background:#fff;}
  .status button:hover,.status a:hover{color:#fff;background:#5690fc;}
</style>
<style rel="stylesheet/scss" lang="scss">
  .space .el-tabs__header{margin:0;}
  .space .el-tabs__nav{margin-left:200px;}
  .space .el-tabs__item{width:180px;text-align: center;padding:0;height:50px;line-height:50px;}
  .space .el-tabs__active-bar{height:4px;}
  .space .el-input__icon+.el-input__inner{padding-right:22px;}
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

  /*复选框*/
  .space .el-checkbox{ padding:27px 40px;height:116px;float:left;white-space:inherit;
    position:relative;transition:all 0.3s linear;width:100%;overflow:hidden; box-sizing: border-box;}
  .space .el-checkbox:hover{background:#e2ecff;}
  .space .el-checkbox__input{width:auto;margin-left:20px;margin-right:40px;float:left;position:absolute;top:48px; white-space:inherit;}
  .space .el-checkbox__label{width:100%;height:116px;margin-left:-80px;display:inline-block;font-weight: normal;position:absolute;left:80px;top:0;padding-left:80px;}
  .space .el-checkbox+.el-checkbox{margin-left:0;}
</style>
