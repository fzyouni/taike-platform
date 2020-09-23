import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import conf from '@/config'
import { getToken } from '@/libs/util'
import { Message } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  const info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 2000
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      debugger
      this.destroy(url)
      const data = res.data
      if (data.status === 'success') {
        return data
      } else {
        setTimeout(Message.error(data.message + '错误码：' + data.code), 2000)
      }
    }, error => {
      this.destroy(url)
      const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
      const errorInfo = {
        statusText,
        status,
        request: { responseURL: config.url }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    // 请求参数体里面包含 data,说明是post请求，将参数格式转化，方便后端接收
    if (Object.prototype.hasOwnProperty.call(options, 'data')) {
      options.data = qs.stringify(options.data)
    }
    // 当前请求非登录请求,给请求header加上authToken,用于后端校验用户信息
    if (options.url !== conf.loginUrl && !Object.prototype.hasOwnProperty.call(options, 'headers')) {
      options.headers = { authToken: getToken() }
    }
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
