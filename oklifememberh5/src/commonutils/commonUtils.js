/**
 * Created by hh on 2017/7/18.
 */
/**************************************************************
 @author huanghuang
 @date: 2017-03-04
 @description 通用方法export default commonUtils;
 ******************************************************************/

var config = {
  "isDebug": false,
  "islocal": true,
  "localTimeOut": "30",
  "timeOut": "3000" // 请求超时
};

var commonUtils = (function () {
  /**
   *
   * @描述：获取sessionStorage信息，session级别缓存
   * @作者：huanghuang
   * @版本: 1.0
   * @创建时间: 2017-3-5
   * @param key 设置的key,
   * @returns value值
   */
  function getSStorageInfo(key) {
    try {
      var keys = "";
      var value = sessionStorage.getItem(keys);
      if (isEmpty(value)) {
        value = sessionStorage.getItem(key);
      }
      return value ? value : null;
    }
    catch (e) {
      alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！");
    }
  }


  /**
   *
   * @描述：保存sessionStorage信息，session级别缓存
   * @作者：huanghuang
   * @版本: 1.0
   * @创建时间: 2015-3-27
   * @param key 设置的key
   * @param value 设置的值
   */
  function setSStorageInfo(key, value) {
    try {
      sessionStorage.setItem(key, value);
    }
    catch (e) {
      alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！");
    }
  }

  /**
   *
   * @描述：清除sessionStorage中的数据，这里分3种情况：
   * 1、如果不传key，则清除所有的sessionStorage数据
   * 2、如果key为字符串变量，则清除key对应的sessionStorage数据
   * 3、如果key为Boolean类型变量true，则清除所有的sessionStorage数据（支持多模块）
   * @作者：huanghuang
   * @版本: 1.0
   * @创建时间: 2016-3-27
   * @param key 设置的key
   */
  function clearSStorage(key) {
    try {
      if (key === true) {
        sessionStorage.clear();
      }
      else {
        if (key) {
          sessionStorage.removeItem(key);
        }
        else {
          for (var pkey in sessionStorage) {
            sessionStorage.removeItem(pkey);
          }
        }
      }
    }
    catch (e) {
      alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！");
    }
  }

  /**
   * 保存数据到本地缓存
   * @param key
   * @param value
   */
  function setLStorageInfo(key, value) {
    if (config.islocal) {
      var timestamp = getTimeStamp();//存储的时间戳
      var storageinfo = {
        "timestamp": timestamp,
        key: value
      };
      var infotxt = jsonToString(storageinfo);
      try {
        localStorage.setItem(key, infotxt);
      } catch (e) {
        alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
      }
    } else {
      if (config.isDebug) {
        alert("未开启离线缓存模式，不支持localStorage缓存！");
      }
    }
  }

  /**
   * 获取本地缓存，如果缓存超时，清除本地缓存
   * @param key
   * @returns {*}
   */
  function getLStorageInfo(key) {
    if (config.islocal) {
      var timestamp1 = getTimeStamp();//存储的时间戳
      var timeout = config.localTimeOut;//离线缓存数据超时时间(分钟为单位)
      var value = null;
      try {
        value = localStorage.getItem(key);
      } catch (e) {
        alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
      }
      var storageinfo = stringToJson(value);//转换成json对象
      var timestamp2 = storageinfo.timestamp;//获取时间戳
      var time = (timestamp1 - timestamp2) / 1000 / 60;
      var keyValue = storageinfo.key;//获取数据
      if (time > timeout) {
        clearLStorage(key);//清理本地离线缓存数据
        if (config.isDebug) {
          alert(key + "【离线缓存已经超时" + Math.round(time - timeout) + "分钟,已经被清理！】");
        }
        return null;
      }
      else {
        keyValue = keyValue ? keyValue : null
        if (config.isDebug && isNotEmpty(keyValue)) {
          alert("获得离线缓存数据" + key + "=" + keyValue + "【数据将在" + Math.round(timeout - time) + "分钟后失效！】");
        }
        return keyValue;
      }
    }
    else {
      if (config.isDebug) {
        alert("未开启离线缓存模式，不支持localStorage缓存！");
      }
    }
  }

  /**
   * 清除本地缓存
   * @param key
   */
  function clearLStorage(key) {
    try {
      if (config.islocal) {
        if (key === true) {
          localStorage.clear();
        }
        else {
          if (key) {
            localStorage.removeItem(key);
          }
          else {
            for (var pkey in localStorage) {
              localStorage.removeItem(pkey);
            }
          }
        }
      } else {
        if (config.isDebug) {
          alert("未开启离线缓存模式，不支持localStorage缓存！");
        }
      }
    }
    catch (e) {
      alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
    }
  }

//----------------------------------------------------------
//    功能：根据身份证号获得出生日期1987-03-28
//    参数：身份证号 idCard
//    返回值：
//    出生日期
//----------------------------------------------------------
  function getBirthdayByIdCard(idCard){
    var birthdayno,birthdaytemp;
    if(idCard.length==18){
      birthdayno=idCard.substring(6,14)
    }else if(idCard.length==15){
      birthdaytemp=idCard.substring(6,12);
      birthdayno="19"+birthdaytemp
    }else{
      alert("错误的身份证号码，请核对！");
      return false
    }
    var birthday=birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8);
    return birthday
  }

//----------------------------------------------------------
//    功能：根据身份证号获得年龄
//    参数：身份证号 idCard
//    返回值：
//    年龄
//----------------------------------------------------------
  function getAgeByIdCard(idCard){
    var birthyear,birthdaytemp;
    if(idCard.length==18){
      birthyear=idCard.substring(6,10)
    }else if(idCard.length==15){
      birthdaytemp=idCard.substring(6,8);
      birthyear="19"+birthdaytemp
    }else{
      alert("错误的身份证号码，请核对！");
      return false
    }
    var d = new Date()
    var age=d.getFullYear()-birthyear+1
    console.log(d.getFullYear()+" "+birthyear)
    return age
  }

//----------------------------------------------------------
//    功能：根据身份证号获得性别
//    参数：身份证号 idCard
//    返回值：1男性，2女性
//    性别
//----------------------------------------------------------
  function getsexByIdCard(idCard){
    var sexno,sex;
    if(idCard.length==18){
      sexno=idCard.substring(16,17)
    }else if(idCard.length==15){
      sexno=idCard.substring(14,15)
    }else{
      alert("错误的身份证号码，请核对！");
      return false
    }
    var tempid=sexno%2;
    if(tempid==0){
      sex=2
    }else{
      sex=1
    }
    return sex
  }


  /**
   * 获取url ? 之后的参数
   * @returns {Object}
   */
  function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }


  /**
   * 传入字符串url，获取?之后的参数
   * @returns {Object}
   */
  function getRequestByUrl(url) {
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.split('?')[1];
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }

  /**
   * 往history中压入#连接
   */
  function pushHistory() {
    var state = {
      title: "title",
      url: "#"
    };
    window.history.pushState(state, "title", "#");
  }

  /**
   * 获取时间戳
   * @time 日期字符串；'1987-03-28'，'1987/03/28'
   * @returns {string}
   */
  function getTimeStamp(time) {//注意后台给我们的时间戳是秒为单位，所以要乘以1000，转换成毫秒
    if (time == '' || time == null || time == undefined){
      time=new Date();
    }else {
      time = new Date(time);
    }
    var timeStr = Math.round(time.getTime() );
    var timestamp = timeStr.toString();//一定要转换字符串
    return timestamp;
  }


  /**author:huanghuang *day:2017/03/15
   * 将时间戳转换成yyyy-MM-dd hh：ii:ss,注意后台给我们的时间戳是秒为单位，所以要乘以1000，转换成毫秒,icon之间的分隔符‘-’，‘/’
   * @param   value  时间戳的字符串
   * @param bool true带时分秒，false不带时分秒,为string
   */
  function getDate(value, bool,icon) {
    //要附带时分秒
    var d = new Date(Number(value));
    if(icon==undefined){
      icon='/'
    }
    var day = [d.getFullYear(), (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), d.getDate() < 10 ? '0' + d.getDate() : d.getDate()].join(icon);
    var timer = [d.getHours(), d.getMinutes(), d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()].join(':');
    bool = bool==undefined?true:bool;
    var getdate = bool ? day + ' ' + timer : day;
    return getdate;
  }


  /**
   * JSON转成字符串
   * @param jsonData
   * @returns {string}
   */
  function jsonToString(jsonData) {
    if (isNotEmpty(jsonData)) {
      return JSON.stringify(jsonData);
    }
    return "";
  }

  /**
   * 字符串转成JSON
   * @param strData
   * @returns {*}
   */
  function stringToJson(strData) {
    if (isNotEmpty(strData)) {
      var str = '(' + strData + ')'; //json字符串
      return eval(str);
    }
    return "";
  }

  /**
   * 判断参数是否不为空
   * @param param
   * @returns {boolean}
   */
  function isNotEmpty(param) {
    if (param == null || param == undefined || typeof(param) == "undefined" || param == "" || param == "undefined" || param == "null") {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 判断参数是否为空
   * @param param
   * @returns {boolean}
   */
  function isEmpty(param) {
    if (param == null || param == undefined || typeof(param) == "undefined" || param == "" || param == "undefined" || param == "null") {
      return true;
    } else {
      return false;
    }
  }

  /**
   *根据判断localstorge中是否有userInfo对象，校验是否登录
   *@param e是vue实例
   * **/
  function isLogin(e) {
    if (!getLStorageInfo('userInfo')) {
      e.$router.go({name: 'login'});
    }
  }
  /**
   *检测数组中是否有匹配的字符串
   *@param array检测的数组
   * teststr匹配的字符串
   * **/

  function arrayTest (array,teststr) {
    let num=0
    for(let i=0,len=array.length;i<len;i++){
      if(array[i]==teststr){
        num++
      }
    }
    if(num==0){
      return false
    }else {
      return true
    }
  }

  return {
    version: "1.0",
    getSStorageInfo: getSStorageInfo,
    setSStorageInfo: setSStorageInfo,
    clearSStorage: clearSStorage,
    getBirthdayByIdCard:getBirthdayByIdCard,
    getAgeByIdCard:getAgeByIdCard,
    getsexByIdCard:getsexByIdCard,
    getRequest: getRequest,
    getRequestByUrl:getRequestByUrl,
    getTimeStamp: getTimeStamp,
    getDate: getDate,
    pushHistory: pushHistory,
    isNotEmpty: isNotEmpty,
    isEmpty: isEmpty,
    jsonToString: jsonToString,
    stringToJson: stringToJson,
    setLStorageInfo: setLStorageInfo,
    getLStorageInfo: getLStorageInfo,
    clearLStorage: clearLStorage,
    isLogin: isLogin,
    arrayTest:arrayTest
  };
})();
export default commonUtils;
