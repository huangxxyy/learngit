/**
 * Created by hh on 2017/7/17.
 */
//封装get/post方法
import axios from 'axios'
import { Indicator,Toast } from 'mint-ui';
// axios 配置
axios.defaults.timeout = 20000;

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://192.168.1.158:2222/customer/api/v1';

axios.defaults. transformRequest=[function (data) {
  //这里可以在发送请求之前对请求参数做处理
  var serizeData=JSON.stringify(data);
  return serizeData;
}];

axios.defaults.transformResponse=[function (data) {
  //这里提前处理返回的数据
  var objData=JSON.parse(data);
  return objData;
}];

//http请求拦截
axios.interceptors.request.use (config => {
  //  Loading方法
  Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  return config
}, error => {
  Indicator.close ()
  Toast({
    message: '请求超时',
    position: 'center',
    duration: 2000
  });
  return Promise.reject (error)
})


//http响应拦截器,返回状态判断
axios.interceptors.response.use (response => {
  Indicator.close ();
  return response
}, error => {
  Indicator.close ();
  Toast({
    message: '提交请求失败',
    position: 'center',
    duration: 2000
  });
  return Promise.resolve (error.response)
})

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg);
  }
  return res
}

export default {
  post (url, data, config) {
    return axios.post(url, {},Object.assign(data,config)).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, data, config) {
    return axios.get(url,Object.assign(data,config)).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  put (url,data,config) {
    return axios.put(url,{},Object.assign(data,config)).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }

}
