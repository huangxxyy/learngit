import commonUtils from '../commonutils/commonUtils'
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time == 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function oklifeFormatTime(time, option){
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();
  const dyear=d.getFullYear()
  const nowyear=new Date().getFullYear()
  const diff = (now - d) / 1000;

  if (diff < 60) {//1Minute
    return '刚刚'
  } else if (diff < 3600 * 24) {
    if (option) {
      return parseTime(time, option)
    } else {
      return d.getHours() + '时' + d.getMinutes() + '分'
    }
  } else if (diff < 3600 * 24 * 2) {
    return '昨天 '+d.getHours() + '时' + d.getMinutes() + '分'
  } else if(diff < 3600 * 24 * 3){
    return '前天 '+d.getHours() + '时' + d.getMinutes() + '分'
  }else if(diff >= 3600 * 24 * 3 && dyear==nowyear){
    if (option) {
      return parseTime(time, option)
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
  }else if(diff >= 3600 * 24 * 3 && dyear!=nowyear) {
    if (option) {
      return parseTime(time, option)
    } else {
      return d.getFullYear()+'年'+d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
  }
}



export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  } else {
    if (option) {
      return parseTime(time, option)
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

export function getTimeStamp(val) {//时间选择器--过滤器 带时分秒
  if (val == "请选择") {
    return "请选择"
  } else {
    return commonUtils.getDate(val, true)
  }
}

export function getTime(val) {//时间选择器--过滤器 不带时分秒
  if(val=="请选择"){
    return "请选择"
  }else{
    return commonUtils.getDate(val,false)
  }
}

export function getpositiveRate(val) {//好评率--小数转百分数
  if (val == null) {
    return ""
  } else {
    return val*100+'%'
  }
}

export function putlength(val) {//截取医院详情过多字符
  if (val == null) {
    return ""
  } else if(val.length>110){
    return val.slice(0, 110)
  }
}

export function hidenum(val) {//隐藏手机号
  if(val=="请填写"||val=="用于接收就诊信息，请认真填写"){
    return val
  }else{
    let start = val.slice(0, 3);
    let end = val.slice(-3);
    return start + '*****' + end;
  }
}

export function hidenumidcard(val) {//隐藏身份证号
  if(val=="请填写"){
    return val
  }else{
    let start = val.slice(0, 3);
    let end = val.slice(-4);
    return start + '***********' + end;
  }
}

export function getGllipsis(val) {//文字超过3个显示...
  if(val.length>3){
    return val.slice(0,3)+'...'
  }else{
    return val
  }
}

export function getGllipsisThree(val) {//文字超过4个显示...
  if(val.length>4){
    return val.slice(0,4)+'...'
  }else{
    return val
  }
}

export function getLevel(val) {
  if(val==1){
    return '三甲级'
  }else if(val==2){
    return '二甲级'
  }else if(val==3){
    return '一甲级'
  }else if(val==4){
    return '三乙级'
  }else if(val==5){
    return '二乙级'
  }else if(val==6){
    return '一乙级'
  }else if(val==7){
    return '三丙级'
  }else if(val==8){
    return '二丙级'
  }else if(val==9){
    return '一丙级'
  }
}
