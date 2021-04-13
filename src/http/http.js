import axios from 'axios';
import { Modal, message } from 'ant-design-vue';
import router from '@/router';
import Store from '../store';

import RES_CODE from './response.code.conf';

const WHITE_URL = ['/auth/role/judge', '/auth/user/judge', '/customer/judge'];

// 请求超时时间
axios.defaults.timeout = 50000;

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (config.url.includes('login')) {
      return config;
    }
    config.headers['Authorization'] = 'Bearer ' + (Store.getters['user/token'] || '');
    return config;
  },
  error => {
    return error;
  }
);

// content-type headers
// const ContentType = {
//   get: 'application/json;charset=UTF-8',
//   post: 'application/x-www-form-urlencoded;charset=UTF-8',
//   file: 'multipart/form-data;charset=UTF-8',
//   xml: 'text/xml;charset=UTF-8'
// };

const throttle = (fn, wait) => {
  let previous = 0;
  return function() {
    let now = new Date().getTime();
    if (now - previous > wait) {
      fn.apply(this, arguments);
      previous = now;
    }
  };
};

/**
 * 信息提示，使用节流函数
 */
const messageFn = throttle(msg => {
  message.error(msg);
}, 300);

/**
 * http class
 */
class Http {
  /**
   * axios 错误处理
   * @param {*} err
   */
  errorHandel(err, reject) {
    // console.error(err.response);

    const { status } = err.response;
    let { message, error } = err.response.data;
    // console.log(status, message);

    message = message ? message : error ? error : '服务器异常';

    switch (status) {
      // 用户未登录或token失效
      case 401:
        if (message === 'email or password error') {
          messageFn(message);
        } else {
          window.localStorage.removeItem('token');
          router.push({ name: 'login' });
        }

        break;
      case 403:
        messageFn(message);
        break;
      case 404:
        messageFn(message);
        break;
      case 405:
        messageFn(message);
        break;
      case 500:
        if (message === 'Token失效，请重新登录') {
          if (!['/login', '/forget', '/reg'].includes(window.location.pathname)) {
            window.localStorage.removeItem('token');
            router.push({ name: 'login' });
          }
          return;
        }
        messageFn(message);
        break;
      default:
        break;
    }

    reject(err);
  }

  /**
   * get 请求(base)
   * @param {*} url string| object {map,url}
   * @param {*} params 参数object
   * @param {*} config 配置object
   */
  get(url, params = {}, config) {
    // 获取真实的url
    const _url = process.env.VUE_APP_BASE_URL + url;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      ...config
    };
    return new Promise((resolve, reject) => {
      axios
        .get(_url, { params, headers })
        .then(res => {
          const { data } = res;
          // 用户登录国期
          if (data['code'] === RES_CODE['Token_Exp_Code']) {
            router.push({ name: 'login' });
            return;
          }
          // unsuccess
          if (data['success'] === false && !WHITE_URL.includes(url)) {
            messageFn(data);
          }
          resolve(res);
        })
        .catch(err => {
          // console.log('err');
          this.errorHandel(err, reject);
        });
    });
  }

  /**
   * post 请求(base)
   * @param {*} url string | object{map,url}
   * @param {*} params 参数object
   * @param {*} config 配置
   */
  post(url, params = {}, config = {}) {
    // 获取真实的url
    const _url = process.env.VUE_APP_BASE_URL + url;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      ...config
    };
    return new Promise((resolve, reject) => {
      axios
        .post(_url, params, { headers })
        .then(res => {
          // console.log('res', res);
          const { data } = res;
          // 过期code
          if (data.code === RES_CODE['Token_Exp_Code']) {
            router.push({ name: 'login' });
            return;
          }
          // unsuccess
          if (data['code'] === -1 && !WHITE_URL.includes(url)) {
            // console.log('data', data);
            messageFn(data.message);
          }
          resolve(res);
        })
        .catch(err => {
          // console.log('err', err);
          this.errorHandel(err, reject);
        });
    });
  }

  file(url, params, config = {}) {
    // 获取真实的url
    const _url = process.env.VUE_APP_BASE_URL + url;
    const headers = {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      ...config
    };
    return new Promise((resolve, reject) => {
      axios
        .post(_url, params, { headers })
        .then(res => {
          // console.log('res', res);
          const { data } = res;
          // 过期code
          if (data.code === RES_CODE['Token_Exp_Code']) {
            router.push({ name: 'login' });
            return;
          }
          // unsuccess
          if (data['code'] === -1 && !WHITE_URL.includes(url['url'])) {
            messageFn(data.message);
          }
          resolve(res);
        })
        .catch(err => {
          // console.log('err', err);
          this.errorHandel(err, reject);
        });
    });
  }

  /**
   * 文件下载
   * @param {*} url
   * @param {*} params
   */

  downFile(url, params, _fileName = '下载文件') {
    // 获取真实的url
    const _url = typeof url === 'string' ? url : this.getRealUrl(url);
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: _url,
        // data: formData,
        params,
        responseType: 'blob',
        headers: {
          'X-Access-Token': window.localStorage.getItem('token')
        }
      })
        .then(data => {
          let fileName = data['headers']['content-disposition'].replace('attachment;filename=', '');
          fileName = decodeURIComponent(fileName);
          if (!data) {
            reject(data);
            return;
          }
          if (data['status'] === 200) {
            let linkUrl = window.URL.createObjectURL(new Blob([data.data])),
              link = document.createElement('a');
            link.style.display = 'none';
            link.href = linkUrl;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            // 然后移除
            document.body.removeChild(link);
            resolve({ success: true });
          } else {
            reject(data.data);
          }
        })
        .catch(err => {
          this.errorHandel(err, reject);
        });
    });
  }

  /**
   * 删除 delete http request
   * @param {*} url url string
   * @param {*} params params object
   * @param {*} param2 提示信息{title:string,message:string}
   */
  delete(
    url,
    params = {},
    { title, content } = {
      title: '删除提示',
      content: '此操作将永久删除, 是否继续?'
    },
    type = 'post'
  ) {
    return new Promise((resolve, reject) => {
      let confirmLoading = false;
      Modal.confirm({
        title,
        content,
        confirmLoading: confirmLoading,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        icon: '',
        onOk: () => {
          return new Promise((resolve2, reject2) => {
            confirmLoading = true;
            if (type === 'post') {
              this.post(url, params)
                .then(res => {
                  resolve(res);
                  confirmLoading = false;
                  resolve2(true);
                })
                .catch(err => {
                  reject(err);
                  confirmLoading = false;
                  resolve2(true);
                });
            } else {
              this.get(url, params)
                .then(res => {
                  resolve(res);
                  confirmLoading = false;
                  resolve2(true);
                })
                .catch(err => {
                  reject(err);
                  confirmLoading = false;
                  resolve2(true);
                });
            }
          });
        },
        onCancel() {
          confirmLoading = false;
          // console.log('Cancel');
        }
      });
    });
  }

  /**
   * 统计
   * @param {*} url
   * @param {*} params
   */
  log(url, params) {
    // 获取真实的url
    const _url = typeof url === 'string' ? url : this.getRealUrl(url);

    // const blob = new Blob(request, this.config.headers);
    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon(_url, params);
    // } else {
    const client = new XMLHttpRequest();
    client.open('POST', _url, false); // 第三个参数表明是同步的 xhr
    this.setContentType('post');
    // eslint-disable-next-line guard-for-in
    for (let key in this.config.headers) {
      client.setRequestHeader(key, this.config.headers[key]);
    }

    // client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

    let formData = '';
    // eslint-disable-next-line guard-for-in
    for (let it in params) {
      if (typeof params[it] === 'object') {
        params[it] = JSON.stringify(params[it]);
      }
      formData += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&';
    }

    formData = formData.substr(0, formData.length - 1);

    client.send(formData);
  }
  // }
}

export default Http;
