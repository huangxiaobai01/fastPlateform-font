// axios 拦截封装
import axios from 'axios'
// import * as qs from 'qs'
// import env from 'env'
// import Cookies from 'js-cookie'
// import Router from '../router'
// import store from '../store'
import ElementUI from 'element-ui'
import {Loading} from 'element-ui';

// apiBaseUrl
let apiBaseUrl = "";
console.log('env:' + process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'dev':
    apiBaseUrl = "http://localhost:3000/"; // 开发环境
    // apiBaseUrl = "http://192.168.16.102:8080/";   // 测试环境
    // apiBaseUrl = "https://linkedsee.sinoxk.com/";   //开发环境url
    // apiBaseUrl = "http://192.168.5.122:9091/"   // 创杰 环境url/
    // apiBaseUrl = "http://192.168.5.49:9091/"   // 雨康环境url
    break
  case 'pro':
    apiBaseUrl = "/"   //生产环境url
    break
  case 'test':
    apiBaseUrl = "/"   //测试环境打包环境url
    break
  case 'grayscale':
    apiBaseUrl = "/"   //测试环境打包环境url
    break
}

// 请求数组
let httpSends = []
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 默认配置
const DEFAULTCONFIG = {
  baseURL: apiBaseUrl,
  headers: {'Content-Type': 'application/json;charset=UTF-8', 'channel': 'web'}
};
// 请求成功标识符
// const isSuccess = res => res.code !== undefined && res.code !== null && Number(res.code) === 200

const resFormat = res => res.data || {};

const http = {};
const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']
let golbalLoading = null
function deleteHttp (list, key) {
  let hLength = list.length
  for (let i = 0; i < hLength; i++) {
    if (list[i] === key) {
      list.splice(i, 1)
      break
    }
  }
  if (!list.length) {
    if (golbalLoading) {
      golbalLoading.close()
    }
    golbalLoading = null
  }
}
methods.forEach(v => {
  http[v] = (url, data, baseUrl, headers, responseType, noLoading) => {
    debugger
    let new_headers = '';
    // 除登录接口外，其他接口默认带token
    // if (url.indexOf('login') > 0) {
    //   new_headers = headers || DEFAULTCONFIG.headers
    // } else {
    //   const token = Cookies.get('fontuserInfo') ?  JSON.parse(Cookies.get('fontuserInfo')).token : ''
    //   new_headers = headers || Object.assign(DEFAULTCONFIG.headers, {'token': token})
    // }
    new_headers = headers || Object.assign(DEFAULTCONFIG.headers, {})
    // 接口唯一标识
    let httpBs = Math.random()
    const axiosConfig = {
      method: v,
      url,
      baseURL: baseUrl || DEFAULTCONFIG.baseURL,
      headers: new_headers,
      responseType
    };
    const instance = axios.create(DEFAULTCONFIG)

    instance.interceptors.request.use(cfg => {
      const queryData = {};
      cfg.params = {
        ...cfg.params,
        ...queryData
      };
      return cfg
    }, (error) => Promise.reject(error));

    instance.interceptors.response.use(response => {
      deleteHttp(httpSends, httpBs)
      // status为200，同时response.data.code为1001则为授权过期
      if (response.data.code === 401) {
        // store.commit('RESET_LOGIN');
        // Router.replace({
        //   path: '/login'
        // });
        // location.reload()
        // return Promise.reject({ code: 1001, msg: '未授权' })
        return {}
      }
      debugger
      if (response.headers["content-disposition"] || response.headers['content-type'] !== 'application/json' ) {
        debugger
        let fileName = ''
        if (response.headers["content-disposition"]) {
          fileName = (response.headers["content-disposition"].split(';')[1]).split('=')[1]
        }
        return {
          code: 200,
          data: response.data,
          fileName: fileName
        }
      } else {
        // 普通接口
        if (response.data.code !== 200) {
          ElementUI.Notification.error({
            title: '错误',
            message: response.data.msg
          })
        }
        return resFormat(response)
      }
      // 如果是文件请求处理文件下载

      // 以下代码使用了resFormat之后仍然返回的是response.data 无意义
      // if (!isSuccess(response.data)) {
      //   const _err = {
      //     data: response.data,
      //     config: response.config,
      //     headers: response.headers

      //   }
      //   return resFormat(_err)
      // }

    }, error => {
      const _err = {
        msg: error.message || '网络故障',
        type: /^timeout of/.test(error.message) ? '' : '',
        config: error.config
      };
      deleteHttp(httpSends, httpBs)
      return Promise.reject(_err)
    });
    if (v === 'get') {
      axiosConfig.params = data
    } else if (v === 'delete') {
      axiosConfig.data = data
    } else if (data instanceof FormData) {
      axiosConfig.data = data
    } else {
      // axiosConfig.data = qs.stringify(data)
      axiosConfig.data = JSON.stringify(data)
    }
    axiosConfig.startTime = new Date()
    if (!noLoading) {
      if (!httpSends.length) {
        if (!golbalLoading) {
          golbalLoading = Loading.service({
            lock: true,
            text: '',
            spinner: '',
            background: 'rgba(0, 12, 49, 0.8)',
            customClass: 'globalLoading'
          })
        }
      }
      httpSends.push(httpBs)
    }
    return instance.request(axiosConfig).then(res => res).catch(err => Promise.reject({
      err,
      stack: err.msg || err.stack || ''
    }))
  }
});

http.baseUrl = apiBaseUrl;
export default http

